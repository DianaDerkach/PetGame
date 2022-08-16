import React from 'react';
import {Text, View, StyleSheet, FlatList, ImageBackground} from 'react-native';
import Animated from 'react-native-reanimated';
import CircularProgress from 'react-native-circular-progress-indicator';
import {observer} from 'mobx-react-lite';
//import {BASE_URL} from '@env';
import {CustomButton} from './components/customButton';
import bookmarkStore from '../../store/bookmarkStore';
import {HelpDialog} from './components/helpDialog';
import categoriesStore from '../../store/categoriesStore';
import dialogsStore from '../../store/dialogsStore';
import questionsStore from '../../store/questionsStore';
import answersStore from '../../store/answersStore';

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
  helpDialogAnimation,
  onCloseHelpDialog,
}) => {
  const isHardMode = dialogsStore.chosenMode === 'Hard';
  const isLearningMode = dialogsStore.chosenMode === 'Learning';
  const renderStatus = () => {
    const text = bookmarkStore.isBookmarkSet
      ? <Text>Question was added to bookmarks successfully!</Text>
      : <Text>Question already exists</Text>;

    return text;
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: categoriesStore.currentCategory.image}}
        imageStyle={styles.borderRadius}
        style={styles.header}
        resizeMode={'cover'}/>
      {
        dialogsStore.showHelpDialog && (
          <HelpDialog helpDialogAnimation={helpDialogAnimation} onCloseHelpDialog={onCloseHelpDialog}/>
        )
      }
      {
        bookmarkStore.isButtonPressed && (
          <View style={[styles.tooltip]}>
            <Text style={styles.tooltipText}>
              {renderStatus()}
            </Text>
          </View>
        )
      }
      <View style={styles.alignment}>
        <Animated.View style={[styles.questionBoard]}>
          <View style={styles.customButtonsContainer}>
            <CustomButton
              img={questionIcon}
              color={categoriesStore.currentCategory.textColor}
              onTouch={onOpenHelpDialog}
              setButtonPressed={false}
            />
            <View style={styles.timer}>
              { isHardMode ?
                <CircularProgress
                  value={questionsStore.currentQuestion.timeForAnswer}
                  radius={40}
                  duration={questionsStore.currentQuestion.timeForAnswer * 1000}
                  progressValueColor={categoriesStore.categories.textColor}
                  maxValue={questionsStore.currentQuestion.timeForAnswer}
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
            <Text style={[styles.title, {color: categoriesStore.currentCategory.textColor}]}>
              Question {questionNumber}/{numberOfQuestions}
            </Text>
            <Text style={[styles.questionText, {color: categoriesStore.currentCategory.textColor}]}>
              {questionsStore.currentQuestion.text}
            </Text>
          </View>
        </Animated.View>
        <View style={styles.answerContainer}>
          <Animated.View style={answersAnimation}>
            <FlatList
              keyExtractor={(answer, index) => index}
              data={answersStore.currentAnswers}
              renderItem={renderAnswerItem}
              showsVerticalScrollIndicator={false}
            />
          </Animated.View>
          {isLearningMode && nextButton()}
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
