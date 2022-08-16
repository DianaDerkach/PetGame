import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageService {
  constructor() {
  }

  getBookmarks = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem('bookmarks');
      return JSON.parse(bookmarks);
    } catch(e) {
      console.log('getBookmarks error', e);
    }
  };

  clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('bookmarks');
    } catch(e) {
      console.log('getBookmarks error', e);
    }
  };

  setBookmark = async (newBookmark) => {
    try {
      const bookmark = {
        question: newBookmark.question,
        rightAnswer: newBookmark.rightAnswer,
        help: newBookmark.help,
      };
      const oldBookmarks = await this.getBookmarks() || [];

      await AsyncStorage.setItem('bookmarks', JSON.stringify([
        ...oldBookmarks,
        bookmark,
      ]));
    } catch(e) {
      console.log('setBookmark error ', e);
    }
  };

  deleteBookmark = async (question) => {
    try {
      const oldBookmark = await this.getBookmarks();
      const newBookmark = oldBookmark.filter((bookmark) => question !== bookmark.question);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(newBookmark));
      return true;
    } catch(e) {
      console.log('deleteBookmark error', e);
    }
  };
}
export default AsyncStorageService = new AsyncStorageService();
