import React, {useEffect} from 'react';
import {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';
import {BookmarkScreenComponent} from './bookmarkScreen.component';
import {BookmarkItem} from './components/bookmarkItem';
import AsyncStorageService from '../../utils/asyncStorage/asyncStorageService';
import bookmarkStore from '../../store/bookmarkStore';

export const BookmarkScreenContainer = () => {
  const translateY = useSharedValue(-100);

  useEffect( () => {
    AsyncStorageService.getBookmarks()
      .then(bookmarkStore.setBookmarks)
      .catch((e) => console.log('getBookmark error ', e));
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
