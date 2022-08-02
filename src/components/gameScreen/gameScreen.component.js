import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import Animated from 'react-native-reanimated';
import {CustomButton} from './components/customButton';

export const GameScreenComponent = ({
  questionNumber,
  numberOfQuestions,
  currentQuestion,
  answersAnimation,
  renderAnswerItem,
  chosenMode,
  timer,
  nextButton,
  timerless,
  mainColor,
  questionIcon,
  bookmarkIcon,
  showHelpDialog,
  bookmarkSetter,
  renderHelpDialog,
  setShowHelpDialog,
  answers,
  bookmarkAddingStatus,
}) => {

  return (
    <View style={styles.container}>
      {
        showHelpDialog && renderHelpDialog()
      }
      <Text style={styles.tooltip}>{bookmarkAddingStatus}</Text>
      <View style={styles.alignment}>
        <Animated.View style={[styles.questionBoard]}>
          <View style={styles.customButtonsContainer}>
            <CustomButton img={questionIcon} color={mainColor} onTouch={() => setShowHelpDialog(true)}/>
            <View style={styles.timer}>
              {(chosenMode === 'Hard') ? timer() : timerless()}
            </View>
            <CustomButton img={bookmarkIcon} color={mainColor} onTouch={bookmarkSetter} buttonType={'bookmark'}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.title, {color: mainColor}]}>Question {questionNumber}/{numberOfQuestions - 1}</Text>
            <Text style={[styles.questionText, {color: mainColor}]}>{currentQuestion}</Text>
          </View>
        </Animated.View>
        <View style={styles.answerContainer}>
          <Animated.View style={answersAnimation}>
            <FlatList
              data={answers}
              renderItem={renderAnswerItem}
            />
          </Animated.View>
          { (chosenMode === 'Learning') && nextButton() }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 50,
  },
  title: {
    fontWeight: 'bold',
  },
  borderRadius: {
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  customButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  timer: {
    position: 'relative',
    bottom: 40,
  },
  alignment: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  questionBoard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    width: 308,
    height: 172,
    borderRadius: 25,
    backgroundColor: '#fff',
    shadowColor: '#5e457a',
    shadowOffsetY: 20,
    elevation: 8,
    marginTop: 60,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    bottom: 25,
  },
  questionText: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  answerContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  tooltip: {
    color: 'black',
    textAlign: 'center',
  },
});
