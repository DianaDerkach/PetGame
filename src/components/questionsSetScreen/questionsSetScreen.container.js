import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {observer} from 'mobx-react-lite';
import {QuestionsSetScreenComponent} from './questionsSetScreen.component';
import categoriesStore from '../../store/categoriesStore';
import questionSetStore from '../../store/questionSetStore';
import dialogsStore from '../../store/dialogsStore';

export const QuestionsSetScreenContainer = observer(({navigation}) => {
  const route = useRoute();
  const {headerTitle, categoryTopics, img, category, prevScreen} = route.params;
  const chooseModeDialogOpacity = useSharedValue(0);

  useEffect(() => {
    return () => {
      dialogsStore.setIsChooseModeDialog(false);
    };
  }, []);

  const renderItem = (categoryTopic) => {
    const title = categoryTopic.item.name;
    return (
      <TouchableOpacity style={[styles.item, {backgroundColor: categoriesStore.currentCategory.color}]} onPress={() => {
        navigateToNextScreen(categoryTopic);
      }}>
        <Text style={{color: categoriesStore.currentCategory.textColor}}>{title}</Text>
      </TouchableOpacity>);
  };

  const navigateToNextScreen = (categoryTopic) => {
    if (prevScreen === 'CategoryCard') {
      navigation.push('QuestionsSetScreen',
        {
          headerTitle: 'Choose question set',
          categoryTopics: questionSetStore.getFilteredQuestionsSets(categoryTopic),
          mainColor: categoriesStore.currentCategory.color,
          textColor: categoriesStore.currentCategory.textColor,
          img,
          category: questionSetStore.questionSets,
          prevScreen: 'Topics',
        });
    }

    if (prevScreen === 'Topics') {
      showChooseModeDialog();
      const defineChosenQuestionsSet = category.find((questionsSet) => questionsSet.name === categoryTopic.item.name);
      if (defineChosenQuestionsSet) {
        questionSetStore.setChosenQuestionsSet(defineChosenQuestionsSet);
      } else {
        throw new Error ('error in defining chosen questions set');
      }
    }
  };

  const chooseModeDialogAnimation = useAnimatedStyle(() => {
    console.log('in chooseModeDialogOpacity');
    return {
      opacity: chooseModeDialogOpacity.value,
    };
  });

  const showChooseModeDialog = () => {
    chooseModeDialogOpacity.value = withTiming(1, {duration: 500});
    dialogsStore.setIsChooseModeDialog(true);
  };

  const onDarkBackgroundPress = () => {
    chooseModeDialogOpacity.value = withTiming(0, {duration: 500});
    setTimeout(() => dialogsStore.setIsChooseModeDialog(false), 500);
  };

  return (
    <QuestionsSetScreenComponent
      renderItem={renderItem}
      headerTitle={headerTitle}
      categoryTopics={categoryTopics}
      chooseModeDialogAnimation={chooseModeDialogAnimation}
      onDarkBackgroundPress={onDarkBackgroundPress}
    />
  );
});

const styles = StyleSheet.create({
  item: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
});
