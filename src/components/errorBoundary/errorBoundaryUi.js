import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

export const ErrorBoundaryUi = ({resetErrorBoundary, error}) => {
  return (
    <View style={styles.errorStyles}>
      <Text>Some error is special for you, my friend: {error} </Text>
      <TouchableOpacity onPress={resetErrorBoundary}></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create( {
  errorStyles: {
    height: '100%',
    backgroundColor: '#cbbdbd',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
