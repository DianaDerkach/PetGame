import React from "react";
import { ImageBackground, Text, View, StyleSheet, FlatList } from "react-native";
import Animated, { interpolate, useAnimatedStyle, withSpring } from "react-native-reanimated";
import CircularProgress from 'react-native-circular-progress-indicator';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import { AnswerItem } from "./components/answerItem";

export const GameScreenComponent = ({
  navigation,
  category,
  score,
  questionNumber,
  handleNextQuestion,
  numberOfQuestions,
  currentQuestion,
  currentRightAnswer,
  currentTimeForAnswer,
  timerDuration,
  navigateToGameOver,
  counter
}) => {


  const answersAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withSpring(interpolate(counter, [1, 0], [400,0]))},
      ]
    }
  });

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
              duration={currentTimeForAnswer * 1000 }
              progressValueColor={'#9B6ACC'}
              maxValue={timerDuration}
              titleStyle={{fontWeight: 'bold'}}
              onAnimationComplete={() => {
                if (questionNumber  === numberOfQuestions ) {
                  navigation.navigate('GameOver', {
                    navigation: navigation,
                    category: category,
                    score: score
                  })}
                else {
                  handleNextQuestion(score);
                }
              }}
              inActiveStrokeColor={'#b2b2d7'}
              activeStrokeColor={'#d9b1ff'}
              circleBackgroundColor={'#fff'}
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
                      renderItem={ ({item}) => <AnswerItem
                        item={item}
                        navigateToGameOver={navigateToGameOver}
                        currentRightAnswer={currentRightAnswer}
                        numberOfQuestions={numberOfQuestions}
                        questionNumber={questionNumber}
                        score={score}
                        handleNextQuestion={handleNextQuestion}
                      />}
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
