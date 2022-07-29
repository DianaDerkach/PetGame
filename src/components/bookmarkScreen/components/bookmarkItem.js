import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { BookmarksContext } from "../../../utils/bookmarks";
import { useApi } from "../../../utils/api";

export const BookmarkItem = ({bookmark, setDeletingStatus}) => {
  const [bookmarks, setBookmarks] = useContext(BookmarksContext);
  const api = useApi();

  const deleteBookmark = () => {
    setBookmarks(bookmarks.filter((bookmarkItem) => bookmark.item.question !== bookmarkItem.question));
    api.deleteBookmark(bookmark.item.question).then((status) => setDeletingStatus(status)).catch((err) => console.log('deleteBookmark error', err))

  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.question]}>{bookmark.item.question}</Text>
      <Text style={styles.text}>{bookmark.item.help}</Text>
      <Text style={styles.text}>{'Right answer: ' + bookmark.item.rightAnswer}</Text>
      <TouchableOpacity style={styles.button} onPress={deleteBookmark}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(155,97,213,0.24)',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  text: {
    color: '#9B61D5',
    textAlign: 'left',
    marginBottom: 10,
  },
  button: {
    borderRadius: 50,
    backgroundColor: '#9B61D5',
    paddingHorizontal: 35,
    paddingVertical: 10,
    width: '45%',
    marginTop: 10,
  },
  deleteButton: {
    textAlign: 'center',
    color: '#fff',
  },
  question: {
    fontWeight: 'bold',
  }
})
