import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const CharacterComponent = ({ bias }) => {
  const translateX = useSharedValue(0);
  const opacityStyle = useAnimatedStyle(() => {
    console.log(bias);
    return {
      translateX: withSpring(interpolate(bias, [-50, 50], [-100, 100], Extrapolate.IDENTITY)),
    }
  });
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value + bias,
        },
      ],
    };
  });
  return <Animated.View style={[styles.character, opacityStyle]} />;
};

const styles = StyleSheet.create({
  character: {
    height: 100,
    width: 100,
    backgroundColor: '#2E2722',
    borderRadius: 100,
  },
});
