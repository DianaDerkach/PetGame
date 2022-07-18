import React from "react";
import { ImageBackground, Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";

export const GameScreenComponent = ({
  category,
  questionNumber,
  numberOfQuestions,
  currentQuestion,
  answersAnimation,
  renderAnswerItem,
  chosenMode,
  timer,
  nextButton,
}) => {

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/img/headerBackground.png')}
        imageStyle={styles.borderRadius}
        style={[styles.header]}>
      </ImageBackground>
      <View style={styles.alignment}>
        <Animated.View style={[styles.questionBoard]}>
          <View style={styles.timer}>
            {(chosenMode === 'Hard') ? timer() : null}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Question {questionNumber}/{numberOfQuestions - 1}</Text>
            <Text style={styles.questionText}>{currentQuestion}</Text>
          </View>
        </Animated.View>
        <SafeAreaView style={styles.answerContainer}>
          <Animated.View style={answersAnimation}>
            <FlatList data={category.questions[questionNumber - 1].answers}
                      renderItem={ ({item}) => renderAnswerItem(item)}
            />
          </Animated.View>
        </SafeAreaView>
        { (chosenMode === 'Learning') ? nextButton() : null }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 184,
  },
  title: {
    color: '#9B6ACC',
    fontWeight: 'bold',
  },
  borderRadius: {
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  timer: {
    position: 'relative',
    bottom: 40,
  },
  alignment: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  questionBoard: {
    position: 'relative',
    top: -100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 308,
    height: 172,
    borderRadius: 25,
    backgroundColor: '#fff',
    shadowColor: '#5e457a',
    shadowOffsetY: 20,
    elevation: 8,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    bottom: 25,
  },
  questionText: {
    marginTop: 10,
    fontWeight: 'bold',
    color: '#9B6ACC',
  },
  answerContainer: {
    position: 'relative',
    top: -50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  }
})
