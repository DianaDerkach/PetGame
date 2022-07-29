import React from "react";
import { ImageBackground, Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import { CustomButton } from "./components/customButton";

export const GameScreenComponent = ({
  chosenQuestionsSet,
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
  headerBackground,
  showHelpDialog,
  bookmarkSetter,
  renderHelpDialog,
  setShowHelpDialog,
  answers,
}) => {

  return (
    <View style={styles.container}>
      {showHelpDialog ? renderHelpDialog() : null}
      <ImageBackground
        source={headerBackground}
        imageStyle={styles.borderRadius}
        style={[styles.header]}>
      </ImageBackground>
      <View style={styles.alignment}>
        <Animated.View style={[styles.questionBoard]}>
          <View style={styles.customButtonsContainer}>
            <CustomButton img={questionIcon} color={mainColor} onTouch={() => setShowHelpDialog(true)}/>
            <View style={styles.timer}>
              {(chosenMode === 'Hard') ? timer() : timerless()}
            </View>
            <CustomButton img={bookmarkIcon} color={mainColor} onTouch={bookmarkSetter}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: mainColor}]}>Question {questionNumber}/{numberOfQuestions - 1}</Text>
            <Text style={[styles.questionText, { color: mainColor}]}>{currentQuestion}</Text>
          </View>
        </Animated.View>
        <SafeAreaView style={styles.answerContainer}>
          <Animated.View style={answersAnimation}>
            <FlatList data={answers}
                      renderItem={ (answer) => renderAnswerItem(answer.item)}
            />
          </Animated.View>
        </SafeAreaView>
        { (chosenMode === 'Learning') ? nextButton() : null }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 184,
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
    top: -100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 308,
    height: 172,
    borderRadius: 25,
    backgroundColor: '#fff',
    shadowColor: '#5e457a',
    shadowOffsetY: 20,
    elevation: 8,
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
    position: 'relative',
    top: -50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  }
})
