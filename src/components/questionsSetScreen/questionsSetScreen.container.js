import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {QuestionsSetScreenComponent} from './questionsSetScreen.component';
import {ChooseMode} from './components/chooseMode';
import {store} from '../../store/store';

export const QuestionsSetScreenContainer = ({navigation}) => {
  const route = useRoute();
  const {headerTitle, categoryTopics, img, category, prevScreen} = route.params;

  const renderItem = (categoryTopic) => {
    const title = categoryTopic.item.name;
    return (
      <TouchableOpacity style={[styles.item, {backgroundColor: store.currentCategory.color}]} onPress={() => {
        navigateToNextScreen(categoryTopic);
      }}>
        <Text style={{color: store.currentCategory.textColor}}>{title}</Text>
      </TouchableOpacity>);
  };

  const navigateToNextScreen = (categoryTopic) => {
    if (prevScreen === 'CategoryCard') {
      navigation.push('QuestionsSetScreen',
        {
          headerTitle: 'Choose question set',
          categoryTopics: store.getQuestionsSetsNames(categoryTopic),
          mainColor: store.currentCategory.color,
          textColor: store.currentCategory.textColor,
          img,
          category: store.questionSets,
          prevScreen: 'Topics',
        });
    }

    if (prevScreen === 'Topics') {
      showChooseModeDialog();
      const defineChosenQuestionsSet = category.find((questionsSet) => questionsSet.name === categoryTopic.item.name);
      if (defineChosenQuestionsSet) {
        store.setChosenQuestionsSet(defineChosenQuestionsSet);
      } else {
        throw new Error ('error in defining chosen questions set');
      }
    }
  };

  const showChooseModeDialog = () => store.setIsChooseModeDialog(true)

  const renderChooseMode = () => <ChooseMode headerBackground={img}/>;

  return (
    <QuestionsSetScreenComponent
      renderItem={renderItem}
      img={img}
      headerTitle={headerTitle}
      categoryTopics={categoryTopics}
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
