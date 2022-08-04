import React from "react";
import {StyleSheet, TouchableOpacity} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import tick from '../../../assets/img/icons/tick.png';
export const CustomButton = ({
  color,
  img,
  onTouch,
  buttonType,
  isBookmarkSet,
  setButtonPressed
}) => {
  const bookmarkScale = useSharedValue(1);
  const bookmarkOpacity = useSharedValue(1);
  const tickScale = useSharedValue(0);
  const tickOpacity = useSharedValue(0);

  const decreasingAnimation = useAnimatedStyle(() => {
    return {
      opacity: bookmarkOpacity.value,
      transform: [{
        scale: bookmarkScale.value,
      }]

    }
  });

  const increasingAnimation = useAnimatedStyle(() => {
    return {
      opacity: tickOpacity.value,
      transform: [{
        scale: tickScale.value,
      }]
    }
  });

  const onBookmarkButton = () => {
    setButtonPressed(true);
    onTouch();
    bookmarkScale.value = withTiming(0, { duration: 900 });
    bookmarkOpacity.value = withTiming(0, { duration: 600 });
    tickScale.value = withSpring(1, { duration: 5000, damping: 6 });
    tickOpacity.value = withTiming(1, { duration: 500 });

  };

  return (
    <TouchableOpacity
      style={[styles.background, {backgroundColor: color}]}
      onPress={buttonType === 'bookmark' ? onBookmarkButton : onTouch}>
      <Animated.Image source={img} style={buttonType === 'bookmark' && decreasingAnimation}/>
      {buttonType === 'bookmark' &&
        <Animated.Image
          source={tick}
          style={[styles.bookmarkAdded, increasingAnimation]}
        />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'relative',
    top: -15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
    width: 36,
    height: 36,
    shadowColor: '#0a0a0a',
    shadowOffsetY: 20,
    elevation: 8,
    marginHorizontal: 15,
  },
  bookmarkAdded: {
    position: 'absolute'
  },
});
