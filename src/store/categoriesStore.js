import {makeAutoObservable} from 'mobx';
//import {BASE_URL} from '@env';

class CategoriesStore {
  categories = [];
  currentCategory = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchCategories().catch((error) => console.log('fetchCategories error ', error));
  }

  setCurrentCategory = (category) => {
    this.currentCategory = category;
  };

  fetchCategories = async () => {
    try {
      const response = await fetch('https://quiz-game-progger.herokuapp.com/api/categories?populate=*');
      const {data: categories} = await response.json();

      this.categories = categories;
    } catch (e) {
      console.log('fetch categories error ', e);
    }
  };
}

const categoriesStore = new CategoriesStore();
export default categoriesStore;
