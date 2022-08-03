import React from 'react';
import {CommonActions, useRoute} from '@react-navigation/native';
import {useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import {GameOverComponent} from './gameOver.component';

export const GameOverContainer = () => {
  const route = useRoute();
  const {navigation, score, chosenQuestionsSet, chosenMode, mainColor, questions} = route.params;
  const animation = useSharedValue(1);

  const handleStartAgain = () => {
    navigation.push('Game',
      {
        questionNumber: 1,
        navigation,
        score: 0,
        chosenQuestionsSet,
        chosenMode,
        mainColor,
        questions,
      })
  }

  const navigateToGameScreen = () => {
    navigation.navigate('QuizGame');
  };

  const scoreCircleAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withRepeat(withTiming(animation.value, {
            duration: 1000,
          }, () => {
            animation.value = 1.1;
          }), -1, true),
        },
      ],
    };
  });

  return (
    <GameOverComponent
      score={score}
      handleStartAgain={handleStartAgain}
      scoreCircleAnimation={scoreCircleAnimation}
      navigateToGameScreen={navigateToGameScreen}
      mainColor={mainColor}
    />
  );
};
