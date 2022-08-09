import React, {useEffect} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {observer} from 'mobx-react-lite';
import CircularProgress from 'react-native-circular-progress-indicator';
import {AnswerItem} from './components/answerItem';
import {GameScreenComponent} from './gameScreen.component';
import {HelpDialog} from './components/helpDialog';
import AsyncStorageService from '../../utils/asyncStorage/asyncStorageService';
import {store} from '../../store/store';
import {bookmarkStore} from '../../store/bookmarkStore';

const timerColors = {
  inActiveStrokeColor: '#b2b2d7',
  activeStrokeColor: '#d9b1ff',
  circleBackgroundColor: '#fff',
};

export const GameScreenContainer = observer(() => {
  const navigation = useNavigation();
  const route = useRoute();
  const {questionNumber, headerBackground, score} = route.params;
  const numberOfQuestions = store.chosenQuestionsSet.questions.length;

  const translateX = useSharedValue(400);

  useEffect(() => {
    (async() => {
      await store.setCurrentQuestion(store.chosenQuestionsSet.questions[questionNumber - 1]);
      await store.setCurrentAnswers();
    })();

    if (questionNumber  === numberOfQuestions ) {
      navigateToGameOver();
    }

    translateX.value = withSpring(0);
  }, []);

  const handleNextQuestion = (isNextButton) => {
    if ((store.chosenMode === 'Hard') || isNextButton) {
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
  };

  const renderBookmarkStatus = () => {
   return (
       <Text style={styles.tooltip}>
         {bookmarkStore.isBookmarkSet ? 'Question was added to bookmarks successfully!' : 'Question already exists'}
       </Text>
     )
  }

  const navigateToGameOver = () => {
    navigation.navigate('GameOver', {
      navigation: navigation
    });
  };

  const timer = () => {
    return <CircularProgress
      value={store.currentQuestion.timeForAnswer}
      radius={40}
      duration={store.currentQuestion.timeForAnswer * 1000}
      progressValueColor={'#9B6ACC'}
      maxValue={store.currentQuestion.timeForAnswer}
      titleStyle={{fontWeight: 'bold'}}
      onAnimationComplete={onTimerAnimationComplete}
      inActiveStrokeColor={timerColors.inActiveStrokeColor}
      activeStrokeColor={timerColors.activeStrokeColor}
      circleBackgroundColor={timerColors.circleBackgroundColor}
    />;
  };

  const timerless = () => {
    return <View style={styles.block}/>;
  };

  const bookmarkSetter = async () => {
    try {
      const isBookmarkSet = await AsyncStorageService.setBookmark({
        question: store.currentQuestion.text,
        help: store.currentQuestion.help,
        rightAnswer: store.currentQuestion.rightAnswer,
      })

      isBookmarkSet ?
        bookmarkStore.setIsBookmarkSet(true)
        :
        bookmarkStore.setIsBookmarkSet(false)

    } catch(e) {
      console.log('bookmark add error', e)
    }
  };

  const onNextQuestionButton = () => {
    handleNextQuestion( true)
  }

  const nextButton = () => {
    return (
      <TouchableOpacity
      style={[styles.nextButton, {backgroundColor: store.currentCategory.textColor}]}
      onPress={onNextQuestionButton}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    )
  };

  const renderHelpDialog = () => <HelpDialog/>;

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
    console.log(store.showHelpDialog);
  }

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
      navigation={navigation}
      questionNumber={questionNumber}
      currentQuestion={store.currentQuestion.text}
      currentTimeForAnswer={store.currentQuestion.timeForAnswer}
      timerDuration={store.currentQuestion.timeForAnswer}
      numberOfQuestions={numberOfQuestions}
      answersAnimation={answersAnimation}
      onTimerAnimationComplete={onTimerAnimationComplete}
      timerColors={timerColors}
      renderAnswerItem={renderAnswerItem}
      timer={timer}
      nextButton={nextButton}
      timerless={timerless}
      renderHelpDialog={renderHelpDialog}
      headerBackground={headerBackground}
      bookmarkSetter={bookmarkSetter}
      renderBookmarkStatus={renderBookmarkStatus}
      onOpenHelpDialog={onOpenHelpDialog}
    />
  );
});

const styles = StyleSheet.create({
  block: {
    height: 60,
    width: 60,
  },
  nextButton: {
    width: 300,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 50,
    position: 'relative',
    shadowColor: '#0a0a0a',
    shadowOffsetY: 20,
    elevation: 8,
    marginBottom: 80,
  },
  buttonText: {
    color: '#fff',
  },
  tooltip: {
    color: 'black',
    textAlign: 'center',
  },
});
