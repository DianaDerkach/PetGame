import React from 'react';
import {Text, View, StyleSheet, FlatList, ImageBackground} from 'react-native';
import Animated from 'react-native-reanimated';
import {observer} from 'mobx-react-lite';
import {CustomButton} from './components/customButton';
import store  from '../../store/store';
import bookmarkStore from '../../store/bookmarkStore';
import {HelpDialog} from './components/helpDialog';
import CircularProgress from 'react-native-circular-progress-indicator';

const questionIcon = require('../../assets/img/icons/questionIcon.png');
const bookmarkIcon = require('../../assets/img/icons/bookmarkIcon.png');

const timerColors = {
  inActiveStrokeColor: '#b2b2d7',
  activeStrokeColor: '#d9b1ff',
  circleBackgroundColor: '#fff',
};


export const GameScreenComponent = observer(({
  questionNumber,
  numberOfQuestions,
  answersAnimation,
  renderAnswerItem,
  nextButton,
  setBookmarkHandler,
  onOpenHelpDialog,
  onTimerAnimationComplete,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: store.BASE_URL + store.currentCategory.img.formats.thumbnail.url}}
        imageStyle={styles.borderRadius}
        style={styles.header}
        resizeMode={'cover'}/>
      {store.showHelpDialog && <HelpDialog/>}
      {bookmarkStore.isButtonPressed &&
        <View style={[styles.tooltip]}>
          <Text style={styles.tooltipText}>
            {bookmarkStore.isBookmarkSet ?
              'Question was added to bookmarks successfully!'
              :
              'Question already exists'}
          </Text>
        </View>
      }
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
              {(store.chosenMode === 'Hard') ?
                <CircularProgress
                  value={store.currentQuestion.timeForAnswer}
                  radius={40}
                  duration={store.currentQuestion.timeForAnswer * 1000}
                  progressValueColor={'#9B6ACC'}
                  maxValue={store.currentQuestion.timeForAnswer}
                  titleStyle={{fontWeight: 'bold'}}
                  onAnimationComplete={onTimerAnimationComplete}
                  inActiveStrokeColor={timerColors.inActiveStrokeColor}
                  activeStrokeColor={timerColors.activeStrokeColor}
                  circleBackgroundColor={timerColors.circleBackgroundColor}
                />
                :
                <View style={styles.block}/>
              }
            </View>
            <CustomButton
              img={bookmarkIcon}
              onTouch={setBookmarkHandler}
              buttonType={'bookmark'}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.title, {color: store.currentCategory.textColor}]}>
              Question {questionNumber}/{numberOfQuestions}
            </Text>
            <Text style={[styles.questionText, {color: store.currentCategory.textColor}]}>
              {store.currentQuestion.text}
            </Text>
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
          {(store.chosenMode === 'Learning') && nextButton()}
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
  tooltip: {
    position: 'absolute',
    zIndex: 2,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    shadowColor: '#645f5f',
    shadowRadius: 5,
    shadowOffset: {height: 3, width: 0},
    shadowOpacity: 0.3,
    elevation: 7,
  },

  tooltipText: {
    color: '#3d3c3c',
    textAlign: 'center',
  },
  block: {
    height: 60,
    width: 60,
  },
  header: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    position: 'absolute',
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
    shadowColor: '#313131',
    shadowOffsetY: 20,
    shadowOffset: {height: 3, width: 0},
    elevation: 8,
    marginTop: 60,
    shadowOpacity: 0.3,
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
