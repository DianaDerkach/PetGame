import React, { useEffect } from "react";
import { MainComponent } from "./main.component";

export const MainContainer = ({navigation}) => {
  const [counter, setCounter] = React.useState(1);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  return (
    <MainComponent navigation={navigation} counter={counter} />
  );
};
