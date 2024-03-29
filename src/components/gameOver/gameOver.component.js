import React from 'react';
import {ImageBackground, Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import {observer} from 'mobx-react-lite';
import categoriesStore from '../../store/categoriesStore';
import scoreStore from '../../store/scoreStore';

export const GameOverComponent = observer(({
  handleStartAgain,
  scoreCircleAnimation,
  navigateToGameScreen,
}) => {

  return (
    <ImageBackground
      source={require('../../assets/img/Background.png')}
      style={styles.container}
    >
      <View style={styles.circlesContainer}>
        <View style={[styles.thirdCircle, styles.borderRadius]}>
          <View style={[styles.secondCircle, styles.borderRadius]}>
            <Animated.View style={[styles.scoreCircle, styles.borderRadius, scoreCircleAnimation]}>
              <Text style={[styles.title, styles.text, {color: categoriesStore.currentCategory.textColor}]}>
                Your score
              </Text>
              <Text style={[styles.scoreText, styles.text, {color: categoriesStore.currentCategory.textColor}]}>
                {scoreStore.score}
              </Text>
            </Animated.View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.startButton, styles.buttons, styles.borderRadius]}
        onPress={handleStartAgain}
      >
        <Text style={[styles.startButtonText, {color: categoriesStore.currentCategory.textColor}]}>
        Start again
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[{backgroundColor: categoriesStore.currentCategory.textColor}, styles.buttons, styles.borderRadius]}
        onPress={navigateToGameScreen}
      >
        <Text style={[styles.backButtonText]}>
          Back to main screen
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
});

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
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: 'rgba(9,9,9,0.24)',
    shadowOpacity: 0.3,

  },
  text: {
    fontWeight: 'bold',
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
    elevation: 10,
    shadowColor: 'rgba(10,10,10,0.48)',
    shadowOpacity: 0.3,
  },
  thirdCircle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width / 3 + 80,
    height: Dimensions.get('window').width / 3 + 80,
    backgroundColor: '#C6A6E6',
    elevation: 4,
    shadowColor: '#B286DF',
    shadowOpacity: 0.5,
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
  buttonsText: {
    fontFamily: 'Montserrat',
    fontWeight: 15,
  },
  startButtonText: {
    fontWeight: 'bold',
  },
  backButtonText: {
    color: '#fff',
  },
});
