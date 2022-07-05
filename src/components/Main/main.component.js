import React, { useEffect } from "react";
import { Image, Text, View, StyleSheet, ImageBackground, FlatList } from "react-native";
import Animated, {
  withSpring,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { CategoryCard } from "./components/CategoryCard";
import { categories } from "../../data/categories";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";

export const MainComponent = () => {
  const [counter, setCounter] = React.useState(1);
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withSpring(interpolate(counter, [1, 0], [-200,0]))},
      ]
    }
  });

  return (
    <View style={styles.background}>
      <Animated.View style={headerAnimatedStyle}>
        <ImageBackground
          source={require('../../assets/img/headerBackground.png')}
          imageStyle={styles.borderRadius}
          style={[styles.header]}
          resizeMode={"cover"}>
          <Text style={styles.text}>Choose questions pack to play</Text>
          <Image source={require('../../assets/img/idea.png')} style={styles.image}/>
        </ImageBackground>
      </Animated.View>
      <Animated.View style={[styles.categories]}>
        <SafeAreaView>
          <FlatList
            data={categories}
            renderItem={ ({item}) => <CategoryCard category={item} />}
            />
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    backgroundColor: '#F5F5F5',
  },
  text: {
    fontSize: 21,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
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
    height: 184,
  },
  categories: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  borderRadius: {
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  }
})
