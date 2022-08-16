import React from 'react';
import {ImageBackground, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import {observer} from 'mobx-react-lite';
//import {BASE_URL} from '@env';
import categoriesStore from '../../store/categoriesStore';
import dialogsStore from '../../store/dialogsStore';
import {ChooseMode} from './components/chooseMode';

export const QuestionsSetScreenComponent = observer(({
  headerTitle,
  categoryTopics,
  renderItem,
  chooseModeDialogAnimation,
  onDarkBackgroundPress,
}) => {
  return (
    <ImageBackground
      source={require('../../assets/img/white_background.png')}
      resizeMode={'cover'}
      style={styles.container}
    >
      {dialogsStore.isChooseModeDialog &&
        <ChooseMode
          chooseModeDialogAnimation={chooseModeDialogAnimation}
          onDarkBackgroundPress={onDarkBackgroundPress}
        />}
      <ImageBackground
        source={{uri: categoriesStore.currentCategory.image}}
        style={styles.header}
        imageStyle={styles.borderRadius}
      >
        <Text style={styles.headerText}>{headerTitle}</Text>
      </ImageBackground>
      <FlatList
        keyExtractor={(topic) => topic.id}
        style={styles.item}
        data={categoryTopics}
        renderItem={renderItem}
      />
    </ImageBackground>
  );
});

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
  },

});
