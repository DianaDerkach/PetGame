import React from "react";
import { ImageBackground, Text, View, StyleSheet, FlatList } from "react-native";
import Animated from "react-native-reanimated";
import CircularProgress from 'react-native-circular-progress-indicator';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";

export const GameScreenComponent = ({
  category,
  questionNumber,
  numberOfQuestions,
  currentQuestion,
  currentTimeForAnswer,
  timerDuration,
  answersAnimation,
  onTimerAnimationComplete,
  timerColors,
  renderAnswerItem,
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
            <CircularProgress
              value={timerDuration}
              radius={40}
              duration={currentTimeForAnswer * 1000}
              progressValueColor={'#9B6ACC'}
              maxValue={timerDuration}
              titleStyle={{fontWeight: 'bold'}}
              onAnimationComplete={onTimerAnimationComplete}
              inActiveStrokeColor={timerColors.inActiveStrokeColor}
              activeStrokeColor={timerColors.activeStrokeColor}
              circleBackgroundColor={timerColors.circleBackgroundColor}
            />
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
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
    top: -30,
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  }
})
