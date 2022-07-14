import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

export const AnswerItem = ({
                             item,
                             handleNextQuestion,
                             currentRightAnswer,
                             score,
                           }) => {
  const [answerBackground, setAnswerBackground] = useState('#fff');
  const setAnswerItemBackground = () => {
    if (item === currentRightAnswer) {
      setAnswerBackground('#b2d092')
      console.log('right');
      setTimeout(() => handleNextQuestion(score + 1), 500);
    } else {
      console.log('wrong');
      setAnswerBackground('#ff6c6c');
      setTimeout(() => handleNextQuestion(score), 500);
    }
  }
  return (
    <TouchableOpacity style={[styles.answer]} onPress={setAnswerItemBackground}>
      <Text style={[styles.answerText]}>{item}</Text>
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
