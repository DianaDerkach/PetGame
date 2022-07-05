import React, { useEffect } from "react";
import { ImageBackground, Text, View, StyleSheet } from "react-native";
import Animated, { interpolate, useAnimatedStyle, withDelay, withSpring, withTiming } from "react-native-reanimated";

export const CategoryCard = ({category}) => {
  const [counter, setCounter] = React.useState(1);
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  const categoryAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY:  withSpring(interpolate(counter, [1, 0], [700, 0]))}
      ]
    }
  })
  return (
    <Animated.View style={categoryAnimatedStyle}>
      <ImageBackground style={styles.container} source={category.img} imageStyle={styles.borderRadius}>
        <Text style={styles.title}>{category.text}</Text>
        <View style={[styles.button]}>
          <Text style={[styles.buttonText, { color: category.color }]}>Start</Text>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 96,
    width: 340,
    paddingHorizontal: 32,
    marginTop: 20,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFF',
    width: 58,
    height: 20,
  },
  buttonText: {
    fontSize: 10,
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    color: '#FFF',
  },
  borderRadius: {
    borderRadius: 10,
  }
});
