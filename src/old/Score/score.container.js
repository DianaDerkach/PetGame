import React from "react";
import { ScoreComponent } from "./score.component";

export const ScoreContainer = ({score}) => {
  return (
    <ScoreComponent score={score}/>
  );
};

