import React from "react";
import { QuestionsSetScreenComponent } from "./questionsSetScreen.component";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const QuestionsSetScreenContainer = ({navigation}) => {
  const route = useRoute();
  const { headerTitle, titles, mainColor, textColor, img, category, prevScreen } = route.params;

  const getTitle = (item) => {
    if (prevScreen === 'CategoryCard') {
      return item.item.name
    } else {
      return 'Set - ' + item.index
    }
  }

  const renderItem = (item) => {
    const title = getTitle(item);
    return (
      <TouchableOpacity style={[styles.item, {backgroundColor: mainColor}]} onPress={() => {
        navigateToNextScreen(item)
      }}>
        <Text style={{color: textColor}}>{title}</Text>
      </TouchableOpacity>)
  }

  const getTopicsName = () => {
    return titles.map((element) => element.name);
  }

  const navigateToNextScreen = (item) => {
    if (prevScreen === 'CategoryCard') {
      navigation.push('QuestionsSetScreen',
        {
          headerTitle: 'Choose question set',
          titles: getTopicsName(),
          mainColor: mainColor,
          textColor: textColor,
          img: img,
          category: category,
          prevScreen: 'Topics'
        })
    }
    if (prevScreen === 'Topics') {
      const currentTopic = category.topics.find((element) => element.name === item.item)
      navigation.navigate('Game',
        {
          category: currentTopic.questionSets[item.index],
          score: 0,
          questionNumber: 1,
        })
    }
  }
  return (
    <QuestionsSetScreenComponent
      renderItem={renderItem}
      img={img}
      mainColor={mainColor}
      headerTitle={headerTitle}
      titles={titles}
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
