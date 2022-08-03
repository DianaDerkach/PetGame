import React, {useEffect, useState} from 'react';
import { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import {useApi} from '../../utils/api';
import {MainComponent} from './main.component';
import {CategoryCard} from './components/CategoryCard';

export const MainContainer = ({navigation}) => {
  const [categories, setCategories] = useState();
  const translateY = useSharedValue(-200);
  const api = useApi();

  useEffect(() => {
    api.categories().then(setCategories);
    translateY.value = withSpring(0, {duration: 400, damping: 10})
  }, []);

  const navigateToBookmarks = () => {
    navigation.navigate('Bookmarks');
  };
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });
  const renderCategoryCard = (category) => {
    return <CategoryCard category={category} key={category.id}/>;
  };

  return (
    <MainComponent
      navigation={navigation}
      navigateToBookmarks={navigateToBookmarks}
      renderCategoryCard={renderCategoryCard}
      headerAnimatedStyle={headerAnimatedStyle}
      categories={categories}
    />
  );
};
