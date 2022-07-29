import  {fetcher} from './fetcher'
import AsyncStorage from '@react-native-async-storage/async-storage';
export class Api {
  constructor(host) {
    this.host = host;
    this.api = `${this.host}/api`;
  }

  categories = async () => {
    console.log('in categoties back');
    return fetcher(`${this.api}/categories?populate=*`);
  };
  questionsSets = async () => fetcher(`${this.api}/questions-sets?populate=*`);
  questions =  async () => fetcher(`${this.api}/questions?populate=*`);

  getBookmarks = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem('bookmarks')
      console.log('getBookmarks success');
      return JSON.parse(bookmarks);
  } catch(e) {
      console.log('getBookmarks error', e);
    }

  }

  clearStorage = async () => {
    try {
      await AsyncStorage.removeItem('bookmarks');
    } catch(e) {
      console.log('getBookmarks error', e);
    }
  }

  setBookmark = async (newBookmark) => {
    try {
      const value = {
        question: newBookmark.question,
        rightAnswer: newBookmark.rightAnswer,
        help: newBookmark.help,
      };
      const oldValue = await this.getBookmarks() || [];
      await AsyncStorage.setItem('bookmarks', JSON.stringify([
        ...oldValue,
        value
      ]));
      console.log('bookmark successfully sets!');
    } catch(e) {
      console.log('setBookmark error ', e);
    }

  }

  deleteBookmark = async (question) => {
    try {
      const oldValue = await this.getBookmarks();
      const newValue = oldValue.filter((bookmark) => question !== bookmark.question);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(newValue));
      return true;
    } catch(e) {
      console.log('deleteBookmark error', e);
    }
  }
}
