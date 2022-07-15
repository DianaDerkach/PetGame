import React, { useEffect, useState } from "react";
import { BookmarkScreenComponent } from "./bookmarkScreen.component";
import { useRoute } from "@react-navigation/native";
import { interpolate, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { BookmarkItem } from "./components/bookmarkItem";

export const BookmarkScreenContainer = () => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    let timeout
    if (counter > 0) {
      timeout = setTimeout(() => setCounter(counter - 1), 1000);
    }

    return () => clearTimeout(timeout)
  }, [counter]);
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withSpring(interpolate(counter, [1, 0], [-200,0]))},
      ]
    }
  });

  const renderBookmarkItem = (item) => {
    console.log(item);
    return <BookmarkItem bookmark={item}  />
  }
  return (
    <BookmarkScreenComponent
      headerAnimatedStyle={headerAnimatedStyle}
      renderBookmarkItem={renderBookmarkItem}
    />
  );
};
