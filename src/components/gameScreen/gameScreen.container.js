import React, {useEffect} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated';
import {observer} from 'mobx-react-lite';
import {AnswerItem} from './components/answerItem';
import {GameScreenComponent} from './gameScreen.component';
import AsyncStorageService from '../../utils/asyncStorage/asyncStorageService';
import bookmarkStore from '../../store/bookmarkStore';
import questionSetStore from '../../store/questionSetStore';
import questionsStore from '../../store/questionsStore';
import answersStore from '../../store/answersStore';
import dialogsStore from '../../store/dialogsStore';
import categoriesStore from '../../store/categoriesStore';

export const GameScreenContainer = observer(() => {
  const navigation = useNavigation();
  const route = useRoute();
  const {questionNumber, headerBackground, score} = route.params;
  const numberOfQuestions = questionSetStore.chosenQuestionsSet.questions.length;

  const translateX = useSharedValue(400);
  const helpOpacity = useSharedValue(0);

  useEffect(() => {
    (async() => {
      try {
        await questionsStore.setCurrentQuestion(questionSetStore.chosenQuestionsSet.questions[questionNumber - 1]);
        await answersStore.setCurrentAnswers();
      } catch(e) {
        console.log('setCurrentQuestion or setCurrentAnswer error ', e);
      }
    })();
    answersStore.setIsAnswerHasChosen(false);
    translateX.value = withSpring(0);
  }, []);

  const handleNextQuestion = (isNextButton) => {
    if ((dialogsStore.chosenMode === 'Hard') || isNextButton) {
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
  const setBookmarkToAsyncStorage = async (newBookmark) => {
    try {
      await AsyncStorageService.setBookmark(newBookmark);
    } catch(e) {
      console.log('bookmark add error', e);
    }
  };

  const setBookmarkHandler = () => {
    const isBookmarkDuplicate = bookmarkStore.bookmarks.find((bookmark) => {
      return bookmark.question === questionsStore.currentQuestion.text;
    });

    if (!isBookmarkDuplicate) {
      const newBookmark = {
        question: questionsStore.currentQuestion.text,
        help: questionsStore.currentQuestion.help,
        rightAnswer: questionsStore.currentQuestion.rightAnswer,
      };

      bookmarkStore.setIsBookmarkSet(true);
      bookmarkStore.setBookmarks([...bookmarkStore.bookmarks, newBookmark]);

      setBookmarkToAsyncStorage(newBookmark).catch((e) => console.log('setBookmarkToAsyncStorage error: ', e));

    } else {
      bookmarkStore.setIsBookmarkSet(false);
    }
  };

  const onNextQuestionPress = () => {
    handleNextQuestion( true);
  };

  const nextButton = () => {
    return (
      <TouchableOpacity
        style={[styles.nextButton, {backgroundColor: categoriesStore.currentCategory.textColor}]}
        onPress={onNextQuestionPress}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    );
  };

  const answersAnimation = useAnimatedStyle(() => {
    return {
      marginVertical: 20,
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
  const onCloseHelpDialog = () => {
    helpOpacity.value = withTiming(0, {duration: 500});
    setTimeout(() => dialogsStore.setShowHelpDialog(false), 500);

  };

  const helpDialogAnimation = useAnimatedStyle(() => {
    return {
      opacity: helpOpacity.value,
    };
  });

  const onOpenHelpDialog = () => {
    dialogsStore.setShowHelpDialog(true);
    helpOpacity.value = withTiming(1, {duration: 500});
  };

  const renderAnswerItem = (answer) => {
    return <AnswerItem
      answer={answer.item}
      navigateToGameOver={navigateToGameOver}
      currentRightAnswer={questionsStore.currentQuestion.rightAnswer}
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
      helpDialogAnimation={helpDialogAnimation}
      onCloseHelpDialog={onCloseHelpDialog}
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
