import React from "react";
import { QuestionsSetScreenComponent } from "./questionsSetScreen.component";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

export const QuestionsSetScreenContainer = () => {
  const route = useRoute();
  const { headerTitle, titles, mainColor, textColor, img } = route.params;
  const renderItem = (item) => {
    return (
      <View style={[styles.item, {backgroundColor: mainColor}]}>
        <Text style={{color: textColor}}>item</Text>
      </View>)
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
