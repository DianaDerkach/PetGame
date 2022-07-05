import React from "react";
import { GameScreenComponent } from "./gameScreen.component";
import { questions } from "../../data/JS_questions";

export const GameScreenContainer = () => {
  return (
    <GameScreenComponent questions={questions} questionNumber={0}/>
  );
};
