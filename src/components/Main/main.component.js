import React from 'react';
import {Image, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Animated from 'react-native-reanimated';
import {observer} from 'mobx-react-lite';
import categoriesStore from '../../store/categoriesStore';

export const MainComponent = observer(({
  navigateToBookmarks,
  renderCategoryCard,
  headerAnimatedStyle,
}) => {
  return (
    <SafeAreaView style={styles.background}>
      <Animated.View style={headerAnimatedStyle}>
        <ImageBackground
          source={require('../../assets/img/Background.png')}
          imageStyle={styles.borderRadius}
          style={[styles.header]}
          resizeMode={'cover'}>
          <Text style={styles.text}>Choose questions pack to play</Text>
          <Image source={require('../../assets/img/idea.png')} style={styles.image}/>
        </ImageBackground>
      </Animated.View>
      <Animated.View style={[styles.categories]}>
        {categoriesStore.categories.map(renderCategoryCard)}
      </Animated.View>
      <TouchableOpacity onPress={navigateToBookmarks} style={styles.bookmarkButton}>
        <Image source={require('../../assets/img/bookmarkIcon.png')}/>
        <Text style={styles.bookmarkButtonText}> Go to bookmarks </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  text: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFF',
    width: 200,
  },
  image: {
    width: 133,
    height: 133,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
  },
  borderRadius: {
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  categories: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    top: -40,
  },
  bookmarkButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: '#9B61D5',
    paddingHorizontal: 30,
    paddingVertical: 15,
    width: '60%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {height: 3, width: 0},
    elevation: 4,
    marginBottom: 30,
  },
  bookmarkButtonText: {
    fontSize: 18,
    color: '#FFF',
  },
});
