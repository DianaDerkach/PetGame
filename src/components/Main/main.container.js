import React, { useRef } from "react";
import { MainComponent } from "./main.component";

export const MainContainer = ({navigation}) => {
  return (
    <MainComponent navigation={navigation} />
  );
};
