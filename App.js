import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import MainContainer from "./src/components/Main/main.container";

const App = () => {
  return (
      <MainContainer/>
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
