import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useApi} from '../../../utils/api';

export const ChooseMode = ({
  chosenQuestionsSet,
  mainColor,
  headerBackground,
}) => {
  const navigation = useNavigation();
  const api = useApi();
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    api.questions(chosenQuestionsSet.name).then(setQuestions);
  }, []);

  const navigateToGameScreen = (chosenMode) => {
    navigation.navigate('Game',
      {
        chosenQuestionsSet,
        score: 0,
        questionNumber: 1,
        chosenMode,
        mainColor,
        headerBackground,
        questions,
      });
  };
  return (
    <View style={styles.darkBackground}>
      <View style={styles.container}>
        <Text style={[styles.title, {color: mainColor}]}>Choose mode</Text>
        <View style={styles.textBox}>
          <Text style={[styles.modeDescription, {color: mainColor}]}>
            Learning mode - mode without timer,
            with opportunity to read theory about
            current question
          </Text>
          <Text style={[styles.modeDescription, {color: mainColor}]}>
            Hard mode - you have only 10 seconds
            to answer the question
          </Text>
        </View>
        <View style={styles.buttonsBox}>
          <TouchableOpacity
            style={[styles.learningButton, styles.button]}
            onPress={() => navigateToGameScreen('Learning')}
          >
            <Text style={{color: mainColor}}>
              Learning
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[{backgroundColor: mainColor}, styles.button]}
            onPress={() => navigateToGameScreen('Hard')}
          >
            <Text style={styles.hardText}>
              Hard
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
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
