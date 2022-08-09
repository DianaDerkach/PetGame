import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import {GameOverComponent} from './gameOver.component';
import {scoreStore} from '../../store/scoreStore';

export const GameOverContainer = () => {
  const route = useRoute();
  const animation = useSharedValue(1);
  const {navigation} = route.params;

  const handleStartAgain = () => {
    scoreStore.setScore(0);
    navigation.push('Game',
      {
        questionNumber: 1,
        navigation,
      })
  }

  const navigateToGameScreen = () => {
    scoreStore.setScore(0);
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
      handleStartAgain={handleStartAgain}
      scoreCircleAnimation={scoreCircleAnimation}
      navigateToGameScreen={navigateToGameScreen}
    />
  );
};
