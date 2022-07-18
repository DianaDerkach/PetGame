import React, { useEffect, useState } from "react";
import { GameScreenComponent } from "./gameScreen.component";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import { interpolate, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { AnswerItem } from "./components/answerItem";
import CircularProgress from "react-native-circular-progress-indicator";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export const GameScreenContainer = () => {
  const [counter, setCounter] = useState(1);
  const navigation = useNavigation();
  const route = useRoute()
  const { category, score, questionNumber, chosenMode } = route.params
  const numberOfQuestions = category.questions.length;
  const currentQuestion = category.questions[questionNumber - 1].text;
  const currentRightAnswer = category.questions[questionNumber - 1].rightAnswer;
  const currentTimeForAnswer = category.questions[questionNumber - 1].timeForAnswer;
  const timerDuration = category.questions[0].timeForAnswer;
  const timerColors = {
    inActiveStrokeColor: '#b2b2d7',
    activeStrokeColor: '#d9b1ff',
    circleBackgroundColor: '#fff',
  }

  useEffect(() => {
    let timeout
    if (counter > 0) {
      timeout = setTimeout(() => setCounter(counter - 1), 1000);
    }

    return () => clearTimeout(timeout)
  }, [counter]);

  useEffect(() => {
    if (questionNumber  === numberOfQuestions ) {
      navigateToGameOver();
    }
  }, []);

  const navigateToGameOver = () => {
    navigation.navigate('GameOver', {
      navigation: navigation,
      category: category,
      score: score
    })
  }

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
    />
  }

  const nextButton = () => {
    return <TouchableOpacity style={styles.nextButton}>
      <Text style={styles.buttonText}>Next</Text>
    </TouchableOpacity>
  }

  const handleNextQuestion = (updatedScore) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: 'QuizGame' },
          {
            name: 'Game',
            params: {
              questionNumber: questionNumber + 1,
              navigation: navigation,
              category: category,
              score: updatedScore,
            }
          }
        ]
      })
    )
  }

  const answersAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withSpring(interpolate(counter, [1, 0], [400,0]))},
      ]
    }
  });

  const onTimerAnimationComplete = () => {
    if (questionNumber === numberOfQuestions) {
      navigation.navigate('GameOver', {
        navigation: navigation,
        category: category,
        score: score
      })
    } else {
      handleNextQuestion(score);
    }
  }

  const renderAnswerItem = (item) => {
    return <AnswerItem
      item={item}
      navigateToGameOver={navigateToGameOver}
      currentRightAnswer={currentRightAnswer}
      numberOfQuestions={numberOfQuestions}
      questionNumber={questionNumber}
      score={score}
      handleNextQuestion={handleNextQuestion}
    />
  }

  return (
    <GameScreenComponent
      category={category}
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
    />
  );
};

const styles = StyleSheet.create({
  nextButton: {
    backgroundColor: '#9B6ACC',
    width: '50%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 50,
    position: 'relative',
    top: -170,
    shadowColor: '#5e457a',
    shadowOffsetY: 20,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Montserrat',
  },
});
