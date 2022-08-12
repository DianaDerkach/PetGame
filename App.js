import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ErrorBoundary} from 'react-error-boundary';
import {BookmarkScreenContainer} from './src/components/bookmarkScreen/bookmarkScreen.container';
import {QuestionsSetScreenContainer} from './src/components/questionsSetScreen/questionsSetScreen.container';
import {GameScreenContainer} from './src/components/gameScreen/gameScreen.container';
import {GameOverContainer} from './src/components/gameOver/gameOver.container';
import {MainContainer} from './src/components/Main/main.container';
import {ErrorBoundaryUi} from './src/components/errorBoundary/errorBoundaryUi';

const Stack = createNativeStackNavigator();

const App = () => {
  const headerOptions = () => {
    return {
      headerStyle: {
        elevation: 0,
      },
    };
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryUi}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='QuizGame'
            component={MainContainer}
            options={headerOptions}
          />
          <Stack.Screen
            name='Game'
            component={GameScreenContainer}
            options={headerOptions}
          />
          <Stack.Screen
            name='GameOver'
            component={GameOverContainer}
            options={{
              headerBackVisible: false,
              headerOptions,
            }}
          />
          <Stack.Screen
            name='Bookmarks'
            component={BookmarkScreenContainer}
            options={headerOptions}
          />
          <Stack.Screen
            name='QuestionsSetScreen'
            component={QuestionsSetScreenContainer}
            options={headerOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
};

export default App;
