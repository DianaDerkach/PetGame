import React, { useEffect, useState } from "react";
import { GameScreenComponent } from "./gameScreen.component";
import { CommonActions, useRoute } from "@react-navigation/native";
import { interpolate, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { AnswerItem } from "./components/answerItem";

export const GameScreenContainer = () => {
  const [counter, setCounter] = useState(1);

  const route = useRoute()
  const {navigation, category, score, questionNumber} = route.params
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
    />
  );
};
