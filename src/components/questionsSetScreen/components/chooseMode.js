import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import dialogsStore from '../../../store/dialogsStore';
import questionsStore from '../../../store/questionsStore';
import questionSetStore from '../../../store/questionSetStore';
import categoriesStore from '../../../store/categoriesStore';

export const ChooseMode = ({
  chooseModeDialogAnimation,
  onDarkBackgroundPress,
}) => {
  const navigation = useNavigation();

  const onChoseModeButton = (chosenMode) => {
    dialogsStore.setChosenMode(chosenMode);
    dialogsStore.setIsChooseModeDialog(false);
    navigateToGameScreen();
  };

  const navigateToGameScreen = () => {
    navigation.navigate('Game',
      {
        chosenQuestionsSet: questionSetStore.chosenQuestionsSet,
        score: 0,
        questionNumber: 1,
        questions: questionsStore.getQuestions(questionSetStore.chosenQuestionsSet.name),
      });
  };

  return (
    <Animated.View style={[chooseModeDialogAnimation, styles.wrapper]}>
      <Pressable
        style={styles.darkBackground}
        onPress={onDarkBackgroundPress}
      >
        <Pressable style={styles.container} onPress={(e) => e.stopPropagation()}>
          <Text style={[styles.title, {color: categoriesStore.currentCategory.textColor}]}>Choose mode</Text>
          <View style={styles.textBox}>
            <Text style={[styles.modeDescription, {color: categoriesStore.currentCategory.textColor}]}>
              Learning mode - mode without timer,
              with opportunity to read theory about
              current question
            </Text>
            <Text style={[styles.modeDescription, {color: categoriesStore.currentCategory.textColor}]}>
              Hard mode - you have only 10 seconds
              to answer the question
            </Text>
          </View>
          <View style={styles.buttonsBox}>
            <TouchableOpacity
              style={[styles.learningButton, styles.button]}
              onPress={() => onChoseModeButton('Learning')}
            >
              <Text style={{color: categoriesStore.currentCategory.textColor}}>
                Learning
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[{backgroundColor: categoriesStore.currentCategory.textColor}, styles.button]}
              onPress={() => onChoseModeButton('Hard')}
            >
              <Text style={styles.hardText}>
                Hard
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper:  {
    width: '100%',
    height: '100%',
  },
  darkBackground: {
    width: Dimensions.get('window').width,
    height: '100%',
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.32)',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    position: 'relative',
    top: '20%',
    paddingHorizontal: 20,
    paddingTop: 20,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 20,
    color: '#9B61D5',
    textAlign: 'center',
  },
  textBox: {
    marginBottom: 20,
  },
  modeDescription: {
    fontSize: 12,
    marginBottom: 10,
    color: '#9B61D5',
  },
  buttonsBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    shadowColor: '#5e457a',
    shadowOffsetY: 20,
    shadowOffset: {height: 3, width: 0},
    shadowOpacity: 0.3,
    elevation: 8,
  },
  learningButton: {
    backgroundColor: '#fff',
  },

  hardText: {
    color: '#fff',
  },
  learningText: {
    color: '#9B6ACC',
  },
});
