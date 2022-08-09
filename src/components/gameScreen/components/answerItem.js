import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {scoreStore} from '../../../store/scoreStore';

const rightAnswerColor = '#b2d092';
const wrongAnswerColor = '#ff6c6c';

export const AnswerItem = ({
  answer,
  handleNextQuestion,
  currentRightAnswer,
}) => {
  const [answerBackground, setAnswerBackground] = useState('#fff');

  const setAnswerItemBackground = () => {
    if (answer === currentRightAnswer) {
      setAnswerBackground(rightAnswerColor);
      scoreStore.setScore(scoreStore.score + 1);
      setTimeout(() => handleNextQuestion(false), 500);
    } else {
      setAnswerBackground(wrongAnswerColor);
      setTimeout(() => handleNextQuestion(false), 500);
    }
  };
  return (
    <TouchableOpacity style={[styles.answer]} onPress={setAnswerItemBackground}>
      <Text style={[styles.answerText]}>{answer}</Text>
      <View style={[styles.answerFeedback, {backgroundColor: answerBackground}]}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  answerFeedback: {
    position: 'absolute',
    opacity: 0.5,
    borderRadius: 100,
    width: 310,
    height: 40,
  },
  answerText: {
    color: '#000',
  },
  answer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    width: 310,
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 100,
  },
});
