import React, { useEffect, useState } from "react";
import { MainComponent } from "./main.component";
import { interpolate, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { CategoryCard } from "./components/CategoryCard";
import { useApi } from "../../utils/api";

export const MainContainer = ({navigation}) => {
  const [counter, setCounter] = useState(1);
  const [categories, setCategories] = useState();
  const api = useApi();

  useEffect(() => {
    api.categories().then(setCategories);
  }, [])

  useEffect(() => {
    let timeout
    if (counter > 0) {
      timeout = setTimeout(() => setCounter(counter - 1), 1000);
    }

    return () => clearTimeout(timeout)
  }, [counter]);

  const navigateToBookmarks = () => {
    navigation.navigate('Bookmarks');
  }
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withSpring(interpolate(counter, [1, 0], [-200,0]))},
      ]
    }
  });
  const renderCategoryCard = (category) => {
    return <CategoryCard category={category} key={category.id}/>
  }

  return (
    <MainComponent
      navigation={navigation}
      counter={counter}
      navigateToBookmarks={navigateToBookmarks}
      renderCategoryCard={renderCategoryCard}
      headerAnimatedStyle={headerAnimatedStyle}
      categories={categories}
    />
  );
};
