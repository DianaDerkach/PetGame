import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import store from '../../../store/store';

export const HelpDialog = ({onCloseHelpDialog, helpDialogAnimation}) => {

  return (
    <Animated.View style={[styles.darkBackground, helpDialogAnimation]}>
      <View style={styles.container}>
        <Text style={[styles.title, {color: store.currentCategory.textColor}]}>
          Help
        </Text>
        <Text style={[styles.theory, {color: store.currentCategory.textColor}]}>
          {store.currentQuestion.help}
        </Text>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: store.currentCategory.textColor}]}
          onPress={onCloseHelpDialog}>
          <Text style={styles.buttonText}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  darkBackground: {
    opacity: 0,
    width: Dimensions.get('window').width,
    height: '100%',
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.32)',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: '20%',
    paddingHorizontal: 20,
    paddingTop: 20,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  theory: {
    fontSize: 15,
    marginBottom: 20,
  },
  button: {
    width: '45%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 50,
    position: 'relative',
    shadowColor: 'rgba(33,33,33,0.49)',
    shadowOpacity: 0.3,
    shadowOffsetY: 20,
    shadowOffset: {height: 3, width: 0},
    elevation: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
  },
});
