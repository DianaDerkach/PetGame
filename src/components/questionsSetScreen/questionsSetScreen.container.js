import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {QuestionsSetScreenComponent} from './questionsSetScreen.component';
import {ChooseMode} from './components/chooseMode';
import {store} from '../../store/store';

export const QuestionsSetScreenContainer = ({navigation}) => {
  const route = useRoute();
  const {headerTitle, categoryTopics, mainColor, textColor, img, category, prevScreen} = route.params;
  const [isChooseModeDialog, setIsChooseModeDialog] = useState(false);
  const [chosenQuestionsSet, setChosenQuestionsSet] = useState();

  const renderItem = (categoryTopic) => {
    const title = categoryTopic.item.name;
    return (
      <TouchableOpacity style={[styles.item, {backgroundColor: mainColor}]} onPress={() => {
        navigateToNextScreen(categoryTopic);
      }}>
        <Text style={{color: textColor}}>{title}</Text>
      </TouchableOpacity>);
  };

  const navigateToNextScreen = (categoryTopic) => {
    if (prevScreen === 'CategoryCard') {
      navigation.push('QuestionsSetScreen',
        {
          headerTitle: 'Choose question set',
          categoryTopics: store.getQuestionsSetsNames(categoryTopic),
          mainColor,
          textColor,
          img,
          category: store.questionSets,
          prevScreen: 'Topics',
        });
    }

    if (prevScreen === 'Topics') {
      showChooseModeDialog();
      const defineChosenQuestionsSet = category.find((questionsSet) => questionsSet.name === categoryTopic.item.name);
      if (defineChosenQuestionsSet) {
        setChosenQuestionsSet(defineChosenQuestionsSet);
      } else {
        throw new Error ('error in defining chosen questions set');
      }
    }
  };

  const showChooseModeDialog = () => {
    setIsChooseModeDialog(true);
  };

  const renderChooseMode = () => {
    return <ChooseMode chosenQuestionsSet={chosenQuestionsSet} mainColor={textColor} headerBackground={img}/>;
  };

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
    marginBottom: 20,
  },
});
