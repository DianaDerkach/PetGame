import React, {useRef} from 'react';
import {StyleSheet, TouchableOpacity, Animated} from 'react-native';
import tick from '../../../assets/img/icons/tick.png';
export const CustomButton = ({
  color,
  img,
  onTouch,
  buttonType,
}) => {
  const bookmarkScale = useRef(new Animated.Value(1)).current;
  const tickScale = useRef(new Animated.Value(0)).current;

  const decreasing = () => {
    Animated.timing(bookmarkScale, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const increasing = () => {
    Animated.spring(tickScale, {
      toValue: 1,
      bounciness: 20,
      speed: 5,
      useNativeDriver: true,
    }).start();
  };

  const onBookmarkButton = () => {
    onTouch();
    decreasing();
    increasing();
  };

  return (
    <TouchableOpacity style={[styles.background, {backgroundColor: color}]} onPress={onBookmarkButton}>
      <Animated.Image source={img} style={buttonType === 'bookmark' && {transform: [{scale: bookmarkScale}]}}/>
      {buttonType === 'bookmark' && <Animated.Image source={tick} style={[styles.bookmarkAdded, {transform: [{scale: tickScale}]}]}/>}
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
    position: 'absolute',
  },
});
