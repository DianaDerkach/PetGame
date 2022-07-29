import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { MainContainer } from "./src/components/Main/main.container";
import { GameScreenContainer } from "./src/components/gameScreen/gameScreen.container";
import { GameOverContainer } from "./src/components/gameOver/gameOver.container";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BookmarkScreenContainer } from "./src/components/bookmarkScreen/bookmarkScreen.container";
import { QuestionsSetScreenContainer } from "./src/components/questionsSetScreen/questionsSetScreen.container";
import { ApiProvider } from "./src/utils/api";
import { BookmarksContext } from "./src/utils/bookmarks";

const Stack = createNativeStackNavigator();


const App = () => {
  const [bookmarks, setBookmarks] = useState([]);
  return (
    <ApiProvider host={'http://192.168.100.106:1339'}>
      <BookmarksContext.Provider value={[bookmarks, setBookmarks]}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='QuizGame' component={MainContainer}/>
            <Stack.Screen name='Game' component={GameScreenContainer} />
            <Stack.Screen name='GameOver' component={GameOverContainer} />
            <Stack.Screen name='Bookmarks' component={BookmarkScreenContainer} />
            <Stack.Screen name='QuestionsSetScreen' component={QuestionsSetScreenContainer} />
          </Stack.Navigator>
        </NavigationContainer>
      </BookmarksContext.Provider>
    </ApiProvider>
      );
};

export default App;
