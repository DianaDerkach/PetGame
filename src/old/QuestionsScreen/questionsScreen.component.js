import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export const QuestionsScreenComponent = ({question}) => {
  return (
    <View style={styles.container}>
      <Text>{question}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 400,
    height: 100,
    backgroundColor: '#f5f1ed',
  },
  image: {
    width: 70,
    height: 70,
  },
});
