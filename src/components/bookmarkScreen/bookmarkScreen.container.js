import React, {useContext, useEffect, useState} from 'react';
import {Text} from 'react-native';
import {interpolate, useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {BookmarkScreenComponent} from './bookmarkScreen.component';
import {BookmarkItem} from './components/bookmarkItem';
import {BookmarksContext} from '../../utils/bookmarks';
import {useApi} from '../../utils/api';

export const BookmarkScreenContainer = () => {
  const [counter, setCounter] = useState(1);
  const [bookmarks, setBookmarks] = useContext(BookmarksContext);
  const api = useApi();

  useEffect( () => {
    api.getBookmarks()
      .then(setBookmarks)
      .catch((e) => console.log('getBookmark error ', e));
  }, []);

  useEffect(() => {
    let timeout;
    if (counter > 0) {
      timeout = setTimeout(() => setCounter(counter - 1), 1000);
    }

    return () => clearTimeout(timeout);
  }, [counter]);
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateY: withSpring(interpolate(counter, [1, 0], [-200,0]))},
      ],
    };
  });
  const showDeletingStatus = () => {
    return <Text>Bookmark deleted successfully</Text>;
  };
  const renderBookmarkItem = (bookmark) => {
    return <BookmarkItem bookmark={bookmark} />;
  };
  return (
    <BookmarkScreenComponent
      headerAnimatedStyle={headerAnimatedStyle}
      renderBookmarkItem={renderBookmarkItem}
      bookmarks={bookmarks}
      showDeletingStatus={showDeletingStatus}
    />
  );
};
