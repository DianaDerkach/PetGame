import React, {useContext, useEffect} from 'react';
import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import {BookmarkScreenComponent} from './bookmarkScreen.component';
import {BookmarkItem} from './components/bookmarkItem';
import {BookmarksContext} from '../../utils/bookmarks';
import AsyncStorageService from '../../utils/asyncStorage/asyncStorageService';

export const BookmarkScreenContainer = () => {
  const [bookmarks, setBookmarks] = useContext(BookmarksContext);
  const translateY = useSharedValue(-100);

  useEffect( () => {
    AsyncStorageService.getBookmarks()
      .then(setBookmarks)
      .catch((e) => console.log('getBookmark error ', e));
    translateY.value = withSpring(0)
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value
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
      bookmarks={bookmarks}
    />
  );
};
