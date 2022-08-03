import React from 'react';
import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';

export const BookmarkScreenComponent = ({
  headerAnimatedStyle,
  renderBookmarkItem,
  bookmarks,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/img/white_background.png')}
        style={styles.background}>
        <Animated.View style={headerAnimatedStyle}>
          <ImageBackground
            source={require('../../assets/img/headerBackground.png')}
            imageStyle={styles.borderRadius}
            style={[styles.header]}
            resizeMode={'cover'}>
            <Text style={styles.text}>Bookmarks</Text>
          </ImageBackground>
        </Animated.View>
        <FlatList
          keyExtractor={bookmark => bookmark.question}
          data={bookmarks}
          bounces={true}
          renderItem={renderBookmarkItem}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  background: {
    height: '100%',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
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
  },
  borderRadius: {
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },

});
