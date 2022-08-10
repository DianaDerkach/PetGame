import {makeAutoObservable} from 'mobx';

class BookmarkStore {
  bookmarks = [];
  isBookmarkSet;
  isButtonPressed = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsBookmarkSet = (bool) => {
    this.isBookmarkSet = bool;
  };

  setIsButtonPressed = (bool) => {
    this.isButtonPressed = bool;
  };

  setBookmarks = (bookmarks) => {
    this.bookmarks = bookmarks;
  };
}

const bookmarkStore = new BookmarkStore();
export default bookmarkStore;
