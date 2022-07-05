import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export const ScoreComponent = ({score}) => {
  return <Text style={styles.score}>{score}</Text>;
};

const styles = StyleSheet.create({
  score: {
    fontSize: 45,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
