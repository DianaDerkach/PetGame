import React, { useEffect } from "react";
import { ImageBackground, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useApi } from "../../../utils/api";


export const CategoryCard = ({category}) => {
  const translateY = useSharedValue(-400);
  const navigation = useNavigation();
  const api = useApi();

    useEffect(() => {
      translateY.value = withSpring(0, {duration: 500, damping: 10})
    },[])

  const categoryAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value
        }
      ]
    }
  })

  const navigateToSetScreen = (title) => {
    navigation.navigate('QuestionsSetScreen', {
      navigation: navigation,
      headerTitle: title,
      categoryTopics: category.topics,
      mainColor: category.color,
      textColor: category.textColor,
      img: getImg(),
      category: category,
      prevScreen: 'CategoryCard',
    })
  }
  const getImg = () => api.host + category.img.formats.thumbnail.url;

  return (
    <Animated.View style={categoryAnimatedStyle}>
      <TouchableOpacity onPress={() => navigateToSetScreen('Choose topic to start')}>
        <ImageBackground style={styles.container} source={{ uri: getImg() }} imageStyle={styles.borderRadius}>
          <Text style={styles.title}>{category.text}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 96,
    width: 340,
    paddingHorizontal: 32,
    marginTop: 20,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFF',
    width: 100,
    height: '25%',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    color: '#FFF',
  },
  borderRadius: {
    borderRadius: 10,
  }
});
