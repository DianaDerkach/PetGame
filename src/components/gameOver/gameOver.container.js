import React from "react";
import { GameOverComponent } from "./gameOver.component";
import { useRoute } from "@react-navigation/native";

export const GameOverContainer = () => {
  const route = useRoute();
  const { navigation, score, category } = route.params;
  return (
    <GameOverComponent score={score} navigation={navigation} category={category}/>
  );
};
