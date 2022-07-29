import React from "react";
import { GameOverComponent } from "./gameOver.component";
import { CommonActions, useRoute } from "@react-navigation/native";
import { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

export const GameOverContainer = () => {
  const route = useRoute();
  const { navigation, score, chosenQuestionsSet, chosenMode, mainColor, questions } = route.params;
  const animation = useSharedValue(1);
  const handleStartAgain = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {name: 'QuizGame'},
          {
            name: 'Game',
            params: {
              questionNumber: 1,
              navigation: navigation,
              score: 0,
              chosenQuestionsSet: chosenQuestionsSet,
              chosenMode: chosenMode,
              mainColor: mainColor,
              questions: questions,
            }
          }
        ]
      })
    )
  }

  const navigateToGameScreen = () => {
    navigation.navigate('QuizGame');
  }

  const scoreCircleAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withRepeat(withTiming(animation.value, {
            duration: 1000
          }, () => {
            animation.value = 1.1;
          }), -1, true)
        }
      ]
    }
  });

  return (
    <GameOverComponent
      score={score}
      handleStartAgain={handleStartAgain}
      scoreCircleAnimation={scoreCircleAnimation}
      navigateToGameScreen={navigateToGameScreen}
      mainColor={mainColor}
    />
  );
};
