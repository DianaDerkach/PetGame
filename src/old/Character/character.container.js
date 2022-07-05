import React from 'react';
import {CharacterComponent} from './character.component';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export const CharacterContainer = ({ bias }) => {

  return <CharacterComponent bias={bias}/>;
};
