import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const SLIDER_WIDTH = 300;

export const CustomSlider = () => {
  const translateX = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
    },
    onActive: (e, ctx) => {
      let newValue;

      newValue = e.translationX;

      if (newValue >= 0 && newValue <= 220) {
        translateX.value = newValue;
      }
    },
    onEnd: () => {
      const distance = translateX.value;

      if (distance > SLIDER_WIDTH - 100 || distance < 0) {
        translateX.value = withSpring(0);
      }
    },
  });

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateX.value, [0, 300], [1,0], Extrapolate.EXTEND),
    }
  });
  const transformStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    }
  });
  return (
    <View style={styles.container}>
      <View style={styles.sliderLine}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.slider, transformStyle]} />
        </PanGestureHandler>
        <Animated.Text style={[styles.sliderLineText, opacityStyle]}>Swipe to send deposite request</Animated.Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    top: 50,
  },
  sliderLine: {
    borderRadius: 5,
    width: SLIDER_WIDTH,
    backgroundColor: '#f7f6f9',
 },
  sliderLineText: {
    position: 'absolute',
    zIndex: -4,
    width: 200,
    left: 100,
    top: 23,
    color: '#bebee1',
    fontSize: 13,
  },
  slider: {
    width: 80,
    height: 60,
    backgroundColor: '#172f5b',
    borderRadius: 10,
  },
})
