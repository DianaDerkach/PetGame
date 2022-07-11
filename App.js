import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { MainContainer } from "./src/components/Main/main.container";
import { GameScreenContainer } from "./src/components/gameScreen/gameScreen.container";
import { GameOverContainer } from "./src/components/gameOver/gameOver.container";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='QuizGame' component={MainContainer}/>
        <Stack.Screen name='Game' component={GameScreenContainer} />
        <Stack.Screen name='GameOver' component={GameOverContainer} />
      </Stack.Navigator>
     </NavigationContainer>
      );
};

export default App;
