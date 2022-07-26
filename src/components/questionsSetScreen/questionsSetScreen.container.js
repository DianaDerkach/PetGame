import React, { useEffect, useState } from "react";
import { QuestionsSetScreenComponent } from "./questionsSetScreen.component";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ChooseMode } from "./components/chooseMode";
import { useApi } from "../../utils/api";

export const QuestionsSetScreenContainer = ({navigation}) => {
  const route = useRoute();
  const { headerTitle, categoryTopics, mainColor, textColor, img, category, prevScreen } = route.params;
  const [isChooseModeDialog, setIsChooseModeDialog] = useState(false);
  const [questionsSets, setQuestionsSets] = useState();
  const [chosenQuestionsSet, setChosenQuestionsSet] = useState();
  // const [item, setItem] = useState();
  const api = useApi('http://localhost:1339/');

  useEffect(() => {
    api.questionsSets().then( (questionSets) => {
      console.log('questionSets', questionSets);
     return setQuestionsSets(questionSets.data);
    });
  }, []);

  const renderItem = (categoryTopic) => {
    const title = getTitle(categoryTopic);
    return (
      <TouchableOpacity style={[styles.item, {backgroundColor: mainColor}]} onPress={() => {
        navigateToNextScreen(categoryTopic)
      }}>
        <Text style={{color: textColor}}>{title}</Text>
      </TouchableOpacity>)
  }

  const getTitle = (categoryTopic) => {
    if (prevScreen === 'CategoryCard') {
      return categoryTopic.item.name
    } else {
      return categoryTopic.item;
    }
  }

  const getQuestionsSetsNames = () => {
    return questionsSets.map((questionsSet) => questionsSet.name);
  }

  const navigateToNextScreen = (questionSet) => {
    if (prevScreen === 'CategoryCard') {
      navigation.push('QuestionsSetScreen',
        {
          headerTitle: 'Choose question set',
          categoryTopics: getQuestionsSetsNames(),
          mainColor: mainColor,
          textColor: textColor,
          img: img,
          category: questionsSets,
          prevScreen: 'Topics'
        })
    }
    if (prevScreen === 'Topics') {
      showChooseModeDialog();
      console.log('item is', questionSet);
      console.log('category is', category);
      setChosenQuestionsSet(category.find((questionsSet) => {
        console.log('questionsSets', questionsSet);
        console.log('in', questionsSet.name === questionSet.item, questionsSet.name);
        return questionsSet.name === questionSet.item;
      }));
    }
  }

  const showChooseModeDialog = () => {
    setIsChooseModeDialog(true);
  }

  const renderChooseMode = () => {
    return <ChooseMode questionsSets={questionsSets} chosenQuestionsSet={chosenQuestionsSet} mainColor={textColor} headerBackground={img}/>
  }

  return (
    <QuestionsSetScreenComponent
      renderItem={renderItem}
      img={img}
      headerTitle={headerTitle}
      categoryTopics={categoryTopics}
      isChooseModeDialog={isChooseModeDialog}
      renderChooseMode={renderChooseMode}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20
  }
})
