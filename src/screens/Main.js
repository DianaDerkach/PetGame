import React, { useReducer, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import GestureRecognizer from 'react-native-swipe-gestures';
import {ScoreComponent} from '../old/Score/score.component';
import { CharacterContainer } from '../old/Character/character.container';
import { swipeLeft, swipeRight, swipeUp } from "../old/actions/swipeActions";
import { QuestionsScreenContainer } from "../old/QuestionsScreen/questionsScreen.container";
import { scoreReducer } from "../reducers/scoreReducer";
import { characterReducer } from "../reducers/characterReducer";
import { combineReducers, initialState } from "../reducers/combineReducers";

export const Main = () => {
  const [data, dispatch] = useReducer(combineReducers({ characterReducer, scoreReducer }), initialState);
  const [questionToShow, setQuestionToShow] = useState({});
  const [screenQuestions, setScreenQuestions] = useState(data.questions.map((question) => question));

  const getQuestion = () => {
    const max = screenQuestions.length;
    if (max === 0) {
      setQuestionToShow({...questionToShow,
        question: 'THE GAME IS OVER',
        rightAnswer: 'Start Again',
        wrongAnswer: 'Exit Game'
      });
    } else {
      const index = Math.floor(Math.random() * max);
      setQuestionToShow({...questionToShow,
        question: screenQuestions[index].question,
        rightAnswer: screenQuestions[index].rightAnswer,
        wrongAnswer: screenQuestions[index].wrongAnswer
      });
      setScreenQuestions(screenQuestions.filter((item) => item.question !== screenQuestions[index].question));
    }
  }

  return (
    <GestureRecognizer
      onSwipeLeft={() => { dispatch(swipeLeft()); getQuestion(); }}
      onSwipeRight={() => { dispatch( swipeRight());  getQuestion(); }}
      onSwipeUp={() => { dispatch(swipeUp());  getQuestion(); }}
    >
       <View style={styles.container}>
        <View style={styles.background}>
          <View style={styles.topContainer}>
            <ScoreComponent score={data.score} />
            <QuestionsScreenContainer question={questionToShow.question} />
          </View>
          <View style={styles.answers}>
            <Text style={[styles.text, styles.leftText]}>{questionToShow.rightAnswer}</Text>
            <Text style={[styles.text, styles.rightText]}>{questionToShow.wrongAnswer}</Text>
          </View>
          <CharacterContainer bias={data.character.bias} />
        </View>
      </View>
      </GestureRecognizer>
  )};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  background: {
    padding: 30,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#c7c3ee"
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  answers: {
    display: 'flex',
    width: 450,
    height: 100,
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 35,
    transform: [{ rotate: '-90deg' }],
  },
  leftText: {
    marginRight: 200,
  },
  rightText: {
    marginLeft: 200,
  }
});
