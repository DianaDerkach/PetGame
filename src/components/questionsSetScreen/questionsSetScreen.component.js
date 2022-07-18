import React from "react";
import { ImageBackground, Text, StyleSheet, FlatList } from "react-native";

export const QuestionsSetScreenComponent = ({
  headerTitle,
  titles,
  img,
  renderItem
                                            }) => {

  return (
    <ImageBackground
      source={require('../../assets/img/white_background.png')}
      styles={styles.container}
    >
      <ImageBackground
        source={img}
        style={styles.header}
        imageStyle={styles.borderRadius}
      >
        <Text style={styles.headerText}>{headerTitle}</Text>
      </ImageBackground>
      <FlatList
        style={styles.item}
        data={titles}
        renderItem={(item) => renderItem(item)}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 89,
  },
  borderRadius: {
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  headerText: {
    fontSize: 21,
    color: '#fff',
    alignItems: 'center',
  },
  item: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  }

});
