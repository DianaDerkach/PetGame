import React, {useEffect} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {observer} from 'mobx-react-lite';
import {AnswerItem} from './components/answerItem';
import {GameScreenComponent} from './gameScreen.component';
import AsyncStorageService from '../../utils/asyncStorage/asyncStorageService';
import store from '../../store/store';
import bookmarkStore from '../../store/bookmarkStore';


export const GameScreenContainer = observer(() => {
  const navigation = useNavigation();
  const route = useRoute();
  const {questionNumber, headerBackground, score} = route.params;
  const numberOfQuestions = store.chosenQuestionsSet.questions.length;

  const translateX = useSharedValue(400);

  useEffect(() => {
    (async() => {
      try {
        await store.setCurrentQuestion(store.chosenQuestionsSet.questions[questionNumber - 1]);
        await store.setCurrentAnswers();
      } catch(e) {
        console.log('setCurrentQuestion or setCurrentAnswer error ', e);
      }
    })();
    store.setIsAnswerHasChosen(false);
    translateX.value = withSpring(0);
  }, []);

  const handleNextQuestion = (isNextButton) => {
    if ((store.chosenMode === 'Hard') || isNextButton) {
      if (questionNumber  === numberOfQuestions ) {
        navigateToGameOver();
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {name: 'QuizGame'},
              {
                name: 'Game',
                params: {
                  questionNumber: questionNumber + 1,
                  navigation,
                  headerBackground,
                },
              },
            ],
          }),
        );
      }
    }
  };


  const navigateToGameOver = () => {
    navigation.navigate('GameOver', {
      navigation: navigation,
    });
  };

  const setBookmarkHandler = async () => {
    try {
      const isBookmarkSet = await AsyncStorageService.setBookmark({
        question: store.currentQuestion.text,
        help: store.currentQuestion.help,
        rightAnswer: store.currentQuestion.rightAnswer,
      });
      bookmarkStore.setIsBookmarkSet(isBookmarkSet);

    } catch(e) {
      console.log('bookmark add error', e);
    }
  };

  const onNextQuestionPress = () => {
    handleNextQuestion( true);
  };

  const nextButton = () => {
    return (
      <TouchableOpacity
        style={[styles.nextButton, {backgroundColor: store.currentCategory.textColor}]}
        onPress={onNextQuestionPress}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    );
  };

  const answersAnimation = useAnimatedStyle(() => {
    return {
      flex: 1,
      transform: [
        {translateX: translateX.value},
      ],
    };
  });

  const onTimerAnimationComplete = () => {
    if (questionNumber === numberOfQuestions) {
      navigation.navigate('GameOver', {
        navigation,
        score,
      });
    } else {
      handleNextQuestion(score);
    }
  };

  const onOpenHelpDialog = () => {
    store.setShowHelpDialog(true);
  };

  const renderAnswerItem = (answer) => {
    return <AnswerItem
      answer={answer.item}
      navigateToGameOver={navigateToGameOver}
      currentRightAnswer={store.currentQuestion.rightAnswer}
      numberOfQuestions={numberOfQuestions}
      questionNumber={questionNumber}
      score={score}
      handleNextQuestion={handleNextQuestion}
    />;
  };

  return (
    <GameScreenComponent
      questionNumber={questionNumber}
      numberOfQuestions={numberOfQuestions}
      answersAnimation={answersAnimation}
      renderAnswerItem={renderAnswerItem}
      nextButton={nextButton}
      setBookmarkHandler={setBookmarkHandler}
      onOpenHelpDialog={onOpenHelpDialog}
      onTimerAnimationComplete={onTimerAnimationComplete}
    />
  );
});

const styles = StyleSheet.create({
  nextButton: {
    width: 300,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 50,
    position: 'relative',
    shadowColor: '#262626',
    shadowOffsetY: 20,
    shadowOffset: {height: 3, width: 0},
    shadowOpacity: 0.3,
    elevation: 8,
    marginBottom: 80,
  },

  buttonText: {
    color: '#fff',
  },
});
