import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { MainContainer } from "./src/components/Main/main.container";
import { GameScreenContainer } from "./src/components/gameScreen/gameScreen.container";

import { GameOverContainer } from "./src/components/gameOver/gameOver.container";

const App = () => {
  return (
      <GameOverContainer/>
      );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'space-between',
    alignItems: 'center'
    },
});

export default App;
