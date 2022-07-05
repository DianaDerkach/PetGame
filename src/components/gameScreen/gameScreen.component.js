import React, { useEffect } from "react";
import { ImageBackground, Text, View, StyleSheet, FlatList } from "react-native";
import Animated, { interpolate, useAnimatedStyle, withSpring } from "react-native-reanimated";
import CircularProgress from 'react-native-circular-progress-indicator';
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";

export const GameScreenComponent = ({questions, questionNumber}) => {
  const [counter, setCounter] = React.useState(1);
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
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
        style={[styles.header]}
        resizeMode={"cover"}>
      </ImageBackground>
      <Animated.View style={[styles.questionBoard]}>
        <View style={styles.timer}>
          <CircularProgress
            value={10}
            radius={40}
            duration={10000}
            progressValueColor={'#9B6ACC'}
            maxValue={10}
            titleStyle={{fontWeight: 'bold'}}
            onAnimationComplete={() => {
              console.log('nextQuestion');
            }}
            inActiveStrokeColor={'#b2b2d7'}
            activeStrokeColor={'#d9b1ff'}
            circleBackgroundColor={'#fff'}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Question {questionNumber}/{questions.length}</Text>
          <Text style={styles.questionText}>{ questions[questionNumber].text }</Text>
        </View>
      </Animated.View>
      <SafeAreaView style={styles.answerContainer}>
        <Animated.View style={answersAnimation}>
          <FlatList data={questions[questionNumber].answers}
                    renderItem={ ({item}) => (
                      <View style={styles.answer}>
                        <Text>{item}</Text>
                      </View>
                    )}
          />
        </Animated.View>
      </SafeAreaView>
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
  questionBoard: {
    position: 'absolute',
    top: 150,
    left: 50,
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
  },
  answerContainer: {
    position: 'relative',
    top: 160,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  answer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    paddingLeft: 20,
    paddingVertical: 10,
    marginTop: 20,
    width: 310,
    height: 40,
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 100,
  }
})
