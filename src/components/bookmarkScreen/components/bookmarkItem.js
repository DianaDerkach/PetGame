import React from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";

export const BookmarkItem = ({bookmark}) => {
  const renderAnswers = (item) => {
    return <Text style={styles.text}>{item.item}</Text>
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{bookmark.item.category}</Text>
      <Text style={styles.text}>{bookmark.item.question}</Text>
      <FlatList
        data={bookmark.item.answers}
        renderItem={(item) => renderAnswers(item)}
      />
      <Text style={styles.text}>{'Right answer: ' + bookmark.item.rightAnswer}</Text>
      <TouchableOpacity style={styles.button} >
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
    textAlign: 'center',
    marginBottom: 5,
  },
  button: {
    borderRadius: 50,
    backgroundColor: '#9B61D5',
    paddingHorizontal: 35,
    paddingVertical: 10,
    width: '35%',
    marginTop: 10,
  },
  deleteButton: {
    color: '#fff',
  }
})
