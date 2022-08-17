import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import Animated from 'react-native-reanimated';
import categoriesStore from '../../../store/categoriesStore';
import questionsStore from '../../../store/questionsStore';

export const HelpDialog = ({onCloseHelpDialog, helpDialogAnimation}) => {
  return (
    <Animated.View style={[styles.darkBackground, helpDialogAnimation]}>
      <View style={styles.container}>
        <Text style={[styles.title, {color: categoriesStore.currentCategory.textColor}]}>
          Help
        </Text>
        <ScrollView style={styles.scrollView}>
          <Text style={[styles.theory, {color: categoriesStore.currentCategory.textColor}]}>
            {questionsStore.currentQuestion.help}
          </Text>
        </ScrollView>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: categoriesStore.currentCategory.textColor}]}
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
    display: 'flex',
    width: Dimensions.get('window').width,
    height: '100%',
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.32)',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: '15%',
    paddingHorizontal: 20,
    paddingVertical: 20,
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
  scrollView: {
    height: '40%',
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
  },
  buttonText: {
    color: '#fff',
  },
});
