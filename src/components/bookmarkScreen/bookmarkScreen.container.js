import React, {useEffect} from 'react';
import {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {BookmarkScreenComponent} from './bookmarkScreen.component';
import {BookmarkItem} from './components/bookmarkItem';

export const BookmarkScreenContainer = () => {
  const translateY = useSharedValue(-100);

  useEffect( () => {
    translateY.value = withSpring(0);
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const renderBookmarkItem = (bookmark) => {
    return <BookmarkItem bookmark={bookmark} />;
  };

  return (
    <BookmarkScreenComponent
      headerAnimatedStyle={headerAnimatedStyle}
      renderBookmarkItem={renderBookmarkItem}
    />
  );
};
