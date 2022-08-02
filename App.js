import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {ErrorBoundary} from 'react-error-boundary';
import { BookmarkScreenContainer } from "./src/components/bookmarkScreen/bookmarkScreen.container";
import { QuestionsSetScreenContainer } from "./src/components/questionsSetScreen/questionsSetScreen.container";
import { GameScreenContainer } from "./src/components/gameScreen/gameScreen.container";
import { ApiProvider } from "./src/utils/api";
import { GameOverContainer } from "./src/components/gameOver/gameOver.container";
import { MainContainer } from "./src/components/Main/main.container";
import { BookmarksContext } from "./src/utils/bookmarks";
import { ErrorBoundaryUi } from "./src/components/errorBoundary/errorBoundaryUi";

const Stack = createNativeStackNavigator();


const App = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const BASE_URL = 'http://192.168.100.106:1339';

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryUi}>
      <ApiProvider host={BASE_URL}>
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
    </ErrorBoundary>
      );
};

export default App;
