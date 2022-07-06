import React from "react";
import { ImageBackground, Text, View, StyleSheet } from "react-native";

export const GameOverComponent = ({score}) => {
  return (
    <ImageBackground
      source={require('../../assets/img/Background.png')}
      style={styles.container}
    >
      <View style={styles.circlesContainer}>
        <View style={[styles.thirdCircle, styles.borderRadius]}>
          <View style={[styles.secondCircle, styles.borderRadius]}>
            <View style={[styles.scoreCircle, styles.borderRadius]}>
              <Text style={[styles.title, styles.text]}>Your score</Text>
              <Text style={[styles.scoreText, styles.text]}>{score}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.startButton, styles.buttons, styles.borderRadius]}>
        <Text style={styles.startButtonText}>
        Start again
        </Text>
      </View>
      <View style={[styles.backButton, styles.buttons, styles.borderRadius]}>
        <Text style={styles.backButtonText}>
        Back to main screen
        </Text>
      </View>



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
