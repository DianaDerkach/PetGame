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
    makeAutoObservable(this);
    this.fetchCategories().catch((error) => console.log('fetchCategories error ', error));
    this.fetchQuestionSets().catch((error) => console.log('fetchQuestionSets error ', error));
    this.fetchQuestions().catch((error) => console.log('fetchQuestions error', error));
  }

  setIsAnswerHasChosen = (isAnswerHasChosen) => {
    this.isAnswerHasChosen = isAnswerHasChosen;
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

  setShowHelpDialog = (showHelpDialog) => {
    this.showHelpDialog = showHelpDialog;
  };

  getQuestions = (chosenQuestionsSetName) =>{
    return this.questions.filter(({questions_sets: [question]}) => question?.name === chosenQuestionsSetName);
  };

  getFilteredQuestionsSets = (categoryTopic) => {
    return this.questionSets.filter((questionsSet) => questionsSet.topic.name === categoryTopic.item.name);
  };

  setIsChooseModeDialog = (isChooseModeDialog) => {
    this.isChooseModeDialog = isChooseModeDialog;
  };

  fetchCategories = async () => {
    try {
      const response = await fetch(`${this.BASE_URL}/api/categories?populate=*`);
      const {data: categories} = await response.json();

      this.categories = categories;
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
      const {data: questions} = await response.json();

      this.questions = questions;
    } catch (e) {
      console.log('fetch categories error ', e);
    }
  };
}

const store = new Store();
export default store;
