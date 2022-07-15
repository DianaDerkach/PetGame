import React from "react";
import { GameOverComponent } from "./gameOver.component";
import { CommonActions, useRoute } from "@react-navigation/native";

export const GameOverContainer = () => {
  const route = useRoute();
  const { navigation, score, category } = route.params;

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
              category: category
            }
          }
        ]
      })
    )
  }
  return (
    <GameOverComponent score={score}
                       navigation={navigation}
                       category={category}
                       handleStartAgain={handleStartAgain}
    />
  );
};
