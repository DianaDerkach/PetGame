import React from "react";
import { QuestionsScreenComponent } from "./questionsScreen.component";

export const QuestionsScreenContainer = ({question}) => {
  return (
    <QuestionsScreenComponent question={question}/>
  );
};
