import React from "react";
import { ImageBackground, Text, StyleSheet, FlatList, Dimensions } from "react-native";

export const QuestionsSetScreenComponent = ({
  headerTitle,
  categoryTopics,
  img,
  renderItem,
  isChooseModeDialog,
  renderChooseMode,
                                            }) => {

  return (
      <ImageBackground
        source={require('../../assets/img/white_background.png')}
        resizeMode={'cover'}
        style={styles.container}
      >
        { isChooseModeDialog ? renderChooseMode() : null }
        <ImageBackground
          source={{ uri: img }}
          style={styles.header}
          imageStyle={styles.borderRadius}
        >
          <Text style={styles.headerText}>{headerTitle}</Text>
        </ImageBackground>
        <FlatList
          style={styles.item}
          data={categoryTopics}
          renderItem={(categoryTopic) => renderItem(categoryTopic)}
        />
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
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
