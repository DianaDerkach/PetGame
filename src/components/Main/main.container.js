import React, {useEffect} from 'react';
import {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {observer} from 'mobx-react-lite';
import {MainComponent} from './main.component';
import {CategoryCard} from './components/CategoryCard';

export const MainContainer = observer(({navigation}) => {
  const translateY = useSharedValue(-200);

  useEffect(() => {
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
    />
  );
});
