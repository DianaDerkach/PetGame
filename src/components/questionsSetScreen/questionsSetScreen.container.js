import React, { useState } from "react";
import { QuestionsSetScreenComponent } from "./questionsSetScreen.component";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ChooseMode } from "./components/chooseMode";

export const QuestionsSetScreenContainer = ({navigation}) => {
  const route = useRoute();
  const { headerTitle, titles, mainColor, textColor, img, category, prevScreen } = route.params;
  const [isChooseModeDialog, setIsChooseModeDialog] = useState(false);
  const [currentTopic, setCurrentTopic] = useState();
  const [item, setItem] = useState();
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

  const showChooseModeDialog = () => {
    setIsChooseModeDialog(true);
  }
  const renderChooseMode = () => {
    return <ChooseMode currentTopic={currentTopic} item={item} mainColor={textColor} headerBackground={img}/>
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
      showChooseModeDialog()
      setItem(item);
      setCurrentTopic(category.topics.find((element) => element.name === item.item));
    }
  }
  return (
    <QuestionsSetScreenComponent
      renderItem={renderItem}
      img={img}
      headerTitle={headerTitle}
      titles={titles}
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
