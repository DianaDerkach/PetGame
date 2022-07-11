import React, { useEffect } from "react";
import { GameScreenComponent } from "./gameScreen.component";
import { CommonActions, useRoute } from "@react-navigation/native";

export const GameScreenContainer = () => {
  const [counter, setCounter] = React.useState(1);

  const route = useRoute()
  const {navigation, category, score, questionNumber} = route.params
  const numberOfQuestions = category.questions.length;
  const currentQuestion = category.questions[questionNumber - 1].text;
  const currentRightAnswer = category.questions[questionNumber - 1].rightAnswer;
  const currentTimeForAnswer = category.questions[questionNumber - 1].timeForAnswer;
  const timerDuration = category.questions[0].timeForAnswer;

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  useEffect(() => {
    if (questionNumber  === numberOfQuestions ) {
      navigateToGameOver();
    }
  }, [])

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
  const navigateToGameOver = () => {
    navigation.navigate('GameOver', {
      navigation: navigation,
      category: category,
      score: score
    })
  }

  return (
    <GameScreenComponent
      category={category}
      navigation={navigation}
      score={score}
      questionNumber={questionNumber}
      handleNextQuestion={handleNextQuestion}
      currentQuestion={currentQuestion}
      currentRightAnswer={currentRightAnswer}
      currentTimeForAnswer={currentTimeForAnswer}
      timerDuration={timerDuration}
      numberOfQuestions={numberOfQuestions}
      navigateToGameOver={navigateToGameOver}
      counter={counter}
    />
  );
};
