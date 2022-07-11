import React from "react";
import { ImageBackground, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { CommonActions } from "@react-navigation/native";

export const GameOverComponent = ({navigation, score, category}) => {
  const animation = useSharedValue(1);
  const scoreCircleAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withRepeat(withTiming(animation.value, {
            duration: 1000
          }, () => {
            animation.value = 1.1;
          }), -1, true)
        }
      ]
    }
  });

  const handleStartAgain = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {name: 'QuizGame'},
          {
            name: 'Game',
            params: {
              questionNumber: 1,
              navigation: navigation,
              score: 0,
              category: category
            }
          }
        ]
      })
    )
  }

  return (
    <ImageBackground
      source={require('../../assets/img/Background.png')}
      style={styles.container}
    >
      <View style={styles.circlesContainer}>
        <View style={[styles.thirdCircle, styles.borderRadius]}>
          <View style={[styles.secondCircle, styles.borderRadius]}>
            <Animated.View style={[styles.scoreCircle, styles.borderRadius, scoreCircleAnimation]}>
              <Text style={[styles.title, styles.text]}>Your score</Text>
              <Text style={[styles.scoreText, styles.text]}>{score}</Text>
            </Animated.View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.startButton, styles.buttons, styles.borderRadius]}
        onPress={() => {
          handleStartAgain();
        }}
      >
        <Text style={styles.startButtonText}>
        Start again
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backButton, styles.buttons, styles.borderRadius]}
        onPress={() => {
          navigation.navigate('QuizGame')
        }}
      >
        <Text style={styles.backButtonText}>
        Back to main screen
        </Text>
      </TouchableOpacity>



    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderRadius: {
    borderRadius: 200,
  },
  circlesContainer: {
    width: '100%',
    height: '47%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  scoreCircle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '80%',
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#673996',

  },
  text: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    color: '#9b61d5',
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
  },
  scoreText: {
    fontSize: 30,
  },
  secondCircle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    height: '80%',
    backgroundColor: '#C6A6E6',
    elevation: 10,
    shadowColor: '#7e49b4',
  },
  thirdCircle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '54%',
    height: '60%',
    backgroundColor: '#C6A6E6',
    elevation: 4,
    shadowColor: '#B286DF',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: '6%',
    fontWeight: 15,
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#fff',
  },
  backButton: {
    backgroundColor: '#cfbbee',
  },
  buttonsText: {
    fontFamily: 'Montserrat',
    fontWeight: 15,
  },
  startButtonText: {
    color: '#9b61d5',
    fontWeight: 'bold',
  },
  backButtonText: {
    color: '#fff',
 },
})