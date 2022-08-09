import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import Animated from 'react-native-reanimated';
import { observer } from "mobx-react-lite";
import {CustomButton} from './components/customButton';
import {store} from '../../store/store';
import { bookmarkStore } from "../../store/bookmarkStore";

const questionIcon = require('../../assets/img/icons/questionIcon.png');
const bookmarkIcon = require('../../assets/img/icons/bookmarkIcon.png');

export const GameScreenComponent = observer(({
  questionNumber,
  numberOfQuestions,
  answersAnimation,
  renderAnswerItem,
  timer,
  nextButton,
  timerless,
  bookmarkSetter,
  renderHelpDialog,
  onOpenHelpDialog,
  renderBookmarkStatus
}) => {
  return (
    <View style={styles.container}>
      {store.showHelpDialog && renderHelpDialog()}
      {bookmarkStore.isButtonPressed ? renderBookmarkStatus() : <></>}
       <View style={styles.alignment}>
        <Animated.View style={[styles.questionBoard]}>
          <View style={styles.customButtonsContainer}>
            <CustomButton
              img={questionIcon}
              color={store.currentCategory.textColor}
              onTouch={onOpenHelpDialog}
              setButtonPressed={false}
            />
            <View style={styles.timer}>
              {(store.chosenMode === 'Hard') ? timer() : timerless()}
            </View>
            <CustomButton
              img={bookmarkIcon}
              onTouch={bookmarkSetter}
              buttonType={'bookmark'}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.title, {color: store.currentCategory.textColor}]}>Question {questionNumber}/{numberOfQuestions - 1}</Text>
            <Text style={[styles.questionText, {color: store.currentCategory.textColor}]}>{store.currentQuestion.text}</Text>
          </View>
        </Animated.View>
        <View style={styles.answerContainer}>
          <Animated.View style={answersAnimation}>
            <FlatList
              keyExtractor={(answer, index) => index}
              data={store.currentAnswers}
              renderItem={renderAnswerItem}
            />
          </Animated.View>
          { (store.chosenMode === 'Learning') && nextButton() }
        </View>
      </View>
    </View>
  );
});

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
});
