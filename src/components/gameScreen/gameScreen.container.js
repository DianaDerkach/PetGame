import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import CircularProgress from 'react-native-circular-progress-indicator';
import {AnswerItem} from './components/answerItem';
import {GameScreenComponent} from './gameScreen.component';
import {HelpDialog} from './components/helpDialog';
import AsyncStorageService from '../../utils/asyncStorage/asyncStorageService';

const timerColors = {
  inActiveStrokeColor: '#b2b2d7',
  activeStrokeColor: '#d9b1ff',
  circleBackgroundColor: '#fff',
};

export const GameScreenContainer = () => {
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [filteredQuestion, setFilteredQuestion] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const {chosenQuestionsSet, score, questionNumber, chosenMode, mainColor, headerBackground, questions} = route.params;
  const numberOfQuestions = chosenQuestionsSet.questions.length;
  const currentQuestion = chosenQuestionsSet.questions[questionNumber - 1].text;
  const currentRightAnswer = chosenQuestionsSet.questions[questionNumber - 1].rightAnswer;
  const currentTimeForAnswer = chosenQuestionsSet.questions[questionNumber - 1].timeForAnswer;
  const timerDuration = chosenQuestionsSet.questions[0].timeForAnswer;
  const questionIcon = require('../../assets/img/icons/questionIcon.png');
  const bookmarkIcon = require('../../assets/img/icons/bookmarkIcon.png');
  const [isBookmarkSet, setIsBookmarkSet] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const translateX = useSharedValue(400)
  useEffect(() => {
    const filteredQuestion = questions.data.filter((questionItem) => questionItem.text === currentQuestion);
    const slicedAnswers = Object.values(filteredQuestion[0].answers[0]).slice(3);
    setCurrentScore(score)
    setFilteredQuestion(filteredQuestion);
    setCurrentAnswers(slicedAnswers);
    if (questionNumber  === numberOfQuestions ) {
      navigateToGameOver();
    }

    translateX.value = withSpring(0);
  }, []);

  const handleNextQuestion = (updatedScore, isNextButton) => {
    setCurrentScore(updatedScore);
    if ((chosenMode === 'Hard') || isNextButton) {
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
                chosenQuestionsSet,
                score: updatedScore,
                chosenMode,
                mainColor,
                headerBackground,
                questions,
              },
            },
          ],
        }),
      );
    }
  };

  const onCloseHelpDialog = () => setShowHelpDialog(false);

  const renderBookmarkStatus = () => {
   return (
       <Text style={styles.tooltip}>
         {isBookmarkSet ? 'Question was added to bookmarks successfully!' : 'Question already exists'}
       </Text>
     )
  }

  const navigateToGameOver = () => {
    navigation.navigate('GameOver', {
      navigation: navigation,
      chosenQuestionsSet: chosenQuestionsSet,
      score: score,
      chosenMode: chosenMode,
      mainColor: mainColor,
      questions: questions,
    });
  };

  const timer = () => {
    return <CircularProgress
      value={timerDuration}
      radius={40}
      duration={currentTimeForAnswer * 1000}
      progressValueColor={'#9B6ACC'}
      maxValue={timerDuration}
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

  const bookmarkSetter = () => {
    AsyncStorageService.setBookmark({
      question: currentQuestion,
      help: filteredQuestion[0].help,
      rightAnswer: filteredQuestion[0].rightAnswer,
    }).then(setIsBookmarkSet)
      .catch( (e) => console.log('bookmark add error', e));
  };

  const onNextQuestionButton = () => {
    handleNextQuestion(currentScore, true)
  }

  const nextButton = () => {
    return (
      <TouchableOpacity
      style={[styles.nextButton, {backgroundColor: mainColor}]}
      onPress={onNextQuestionButton}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    )
  };

  const renderHelpDialog = () => {
    return <HelpDialog
      onCloseHelpDialog={onCloseHelpDialog}
      mainColor={mainColor}
      theory={filteredQuestion[0].help}
    />;
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
        category: chosenQuestionsSet,
        score,
        chosenMode,
        mainColor,
      });
    } else {
      handleNextQuestion(score);
    }
  };
  const onOpenHelpDialog = () => setShowHelpDialog(true);

  const renderAnswerItem = (answer) => {
    return <AnswerItem
      answer={answer.item}
      navigateToGameOver={navigateToGameOver}
      currentRightAnswer={currentRightAnswer}
      numberOfQuestions={numberOfQuestions}
      questionNumber={questionNumber}
      score={score}
      handleNextQuestion={handleNextQuestion}
    />;
  };

  return (
    <GameScreenComponent
      chosenQuestionsSet={chosenQuestionsSet}
      navigation={navigation}
      questionNumber={questionNumber}
      currentQuestion={currentQuestion}
      currentTimeForAnswer={currentTimeForAnswer}
      timerDuration={timerDuration}
      numberOfQuestions={numberOfQuestions}
      answersAnimation={answersAnimation}
      onTimerAnimationComplete={onTimerAnimationComplete}
      timerColors={timerColors}
      renderAnswerItem={renderAnswerItem}
      chosenMode={chosenMode}
      timer={timer}
      nextButton={nextButton}
      timerless={timerless}
      mainColor={mainColor}
      questionIcon={questionIcon}
      bookmarkIcon={bookmarkIcon}
      showHelpDialog={showHelpDialog}
      renderHelpDialog={renderHelpDialog}
      setShowHelpDialog={setShowHelpDialog}
      headerBackground={headerBackground}
      answers={currentAnswers}
      bookmarkSetter={bookmarkSetter}
      isBookmarkSet={isBookmarkSet}
      renderBookmarkStatus={renderBookmarkStatus}
      setIsButtonPressed={setIsButtonPressed}
      isButtonPressed={isButtonPressed}
      onOpenHelpDialog={onOpenHelpDialog}
    />
  );
};

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
