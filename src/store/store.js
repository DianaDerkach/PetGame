import {makeAutoObservable} from 'mobx';
class Store {
  categories = [];
  questionSets;
  questions;
  score = 0;
  BASE_URL = 'http://192.168.100.106:1339';

  constructor() {
    (async () => {
      await this.fetchCategories();
      await this.fetchQuestionSets();
      await this.fetchQuestions();
    })();
    makeAutoObservable(this);
  }

  resetScore() {
    this.score = 0;
  }

  incrementScore() {
    this.score += 1;
  }

  getQuestions = (chosenQuestionsSetName) => {
    return this.questions.filter(({questions_sets: [question]}) => question?.name === chosenQuestionsSetName);
  }

  getQuestionsSetsNames = (categoryTopic) => {
    return this.questionSets.filter((questionsSet) => questionsSet.topic.name === categoryTopic.item.name);
  };

  fetchCategories = async () => {
    try {
      const categories = await fetch(`${this.BASE_URL}/api/categories?populate=*`);
      const { data } = await categories.json();
      this.categories = data;
    } catch(e) {
      console.log('fetch categories error ', e);
    }
  }

  fetchQuestionSets = async () => {
      try {
        const response = await fetch(`${this.BASE_URL}/api/questions-sets?populate=*`);
        const { data }  = await response.json();
        this.questionSets = data;
      } catch(e) {
        console.log('fetch categories error ', e);
      }
    }

  fetchQuestions = async () => {
    try {
      const response = await fetch(`${this.BASE_URL}/api/questions?populate=*`);
      const { data } = await response.json();
      this.questions = data;
    } catch(e) {
      console.log('fetch categories error ', e);
    }
  }
}

export const store = new Store;
