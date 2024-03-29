import React from 'react';
import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {observer} from 'mobx-react-lite';
import bookmarkStore from '../../store/bookmarkStore';

export const BookmarkScreenComponent = observer(({
  headerAnimatedStyle,
  renderBookmarkItem,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/img/white_background.png')}
        style={styles.background}>
        <Animated.View style={headerAnimatedStyle}>
          <ImageBackground
            source={require('../../assets/img/headerBackground.png')}
            imageStyle={[styles.borderRadius]}
            style={[styles.header, styles.borderRadius]}
            resizeMode={'cover'}>
            <Text style={styles.text}>Bookmarks</Text>
          </ImageBackground>
        </Animated.View>
        <FlatList
          keyExtractor={bookmark => bookmark.question}
          data={bookmarkStore.bookmarks}
          bounces={true}
          renderItem={renderBookmarkItem}
          style={styles.bookmarks}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  bookmarks: {
    position: 'relative',
  },
  background: {
    height: '100%',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    width: 200,
    textAlign: 'center',

  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 184,
    width: '100%',
    opacity: 1,
  },
  borderRadius: {
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
});
