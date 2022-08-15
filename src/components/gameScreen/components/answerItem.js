import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {observer} from 'mobx-react-lite';
import scoreStore from '../../../store/scoreStore';
import answersStore from '../../../store/answersStore';

const rightAnswerColor = '#cae1b0';
const wrongAnswerColor = 'rgba(245,133,133,0.64)';

export const AnswerItem = observer(({
  answer,
  handleNextQuestion,
  currentRightAnswer,
}) => {
  const [answerBackground, setAnswerBackground] = useState('#fff');
  const setAnswerItemBackground = () => {
    if (!answersStore.wasAnswerChosen) {
      answersStore.setWasAnswerChosen(true);
      if (answer === currentRightAnswer) {
        setAnswerBackground(rightAnswerColor);
        scoreStore.setScore(scoreStore.score + 1);
      } else {
        setAnswerBackground(wrongAnswerColor);
      }
      setTimeout(() => handleNextQuestion(false), 500);
    }
  };
  return (
    <TouchableOpacity
      style={[styles.answer, {backgroundColor: answerBackground}]}
      onPress={setAnswerItemBackground}
    >
      <Text style={[styles.answerText]}>{answer}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  answerFeedback: {
    position: 'absolute',
    opacity: 0.5,
    borderRadius: 100,
    width: 310,
    height: 40,
  },
  answerText: {
    color: '#212020',
  },
  answer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    width: 310,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});
