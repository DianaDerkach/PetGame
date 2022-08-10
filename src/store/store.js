import {makeAutoObservable} from 'mobx';

class Store {
  BASE_URL = 'http://192.168.100.106:1339';

  categories = [];

  currentCategory = [];

  questionSets;

  chosenQuestionsSet = [];

  questions;

  currentQuestion = [];

  currentAnswers = [];

  chosenMode = '';

  showHelpDialog = false;

  isChooseModeDialog = false;

  isAnswerHasChosen = false;

  constructor() {
    this.fetchCategories().catch((error) => console.log('fetchCategories error ', error));
    this.fetchQuestionSets().catch((error) => console.log('fetchQuestionSets error ', error));
    this.fetchQuestions().catch((error) => console.log('fetchQuestions error', error));
    makeAutoObservable(this);
  }

  setIsAnswerHasChosen = (bool) => {
    this.isAnswerHasChosen = bool;
  };

  setChosenMode = (chosenMode) => {
    this.chosenMode = chosenMode;
  };

  setCurrentQuestion = (question) => {
    this.currentQuestion = question;
  };

  setCurrentAnswers = () => {
    const [{answers}] = this.questions.filter((question) => question.text === this.currentQuestion.text);
    const [{
      createdAt, id, updatedAt, ...answersArr
    }] = answers;
    this.currentAnswers = Object.values(answersArr);
  };

  setChosenQuestionsSet = (chosenQuestionsSet) => {
    this.chosenQuestionsSet = chosenQuestionsSet;
  };

  setCurrentCategory = (category) => {
    this.currentCategory = category;
  };

  setShowHelpDialog = (bool) => {
    this.showHelpDialog = bool;
  };

  getQuestions = (chosenQuestionsSetName) =>
    this.questions.filter(({questions_sets: [question]}) => question?.name === chosenQuestionsSetName);

  getFilteredQuestionsSets = (categoryTopic) =>
    this.questionSets.filter((questionsSet) => questionsSet.topic.name === categoryTopic.item.name);


  setIsChooseModeDialog = (bool) => {
    this.isChooseModeDialog = bool;
  };

  fetchCategories = async () => {
    try {
      const categories = await fetch(`${this.BASE_URL}/api/categories?populate=*`);
      const {data} = await categories.json();

      this.categories = data;
    } catch (e) {
      console.log('fetch categories error ', e);
    }
  };

  fetchQuestionSets = async () => {
    try {
      const response = await fetch(`${this.BASE_URL}/api/questions-sets?populate=*`);
      const {data: questionSets} = await response.json();

      this.questionSets = questionSets;
    } catch (e) {
      console.log('fetch categories error ', e);
    }
  };

  fetchQuestions = async () => {
    try {
      const response = await fetch(`${this.BASE_URL}/api/questions?populate=*`);
      const {data} = await response.json();

      this.questions = data;
    } catch (e) {
      console.log('fetch categories error ', e);
    }
  };
}

const store = new Store();
export default store;
