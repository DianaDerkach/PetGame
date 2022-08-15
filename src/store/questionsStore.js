import {makeAutoObservable} from 'mobx';
import {BASE_URL} from '@env';

class QuestionsStore {
  questions;
  currentQuestion = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchQuestions().catch((error) => console.log('fetchQuestions error', error));
  }

  getQuestions = (chosenQuestionsSetName) =>{
    return this.questions.filter(({questions_sets: [question]}) => question?.name === chosenQuestionsSetName);
  };

  fetchQuestions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/questions?populate=*`);
      const {data: questions} = await response.json();

      this.questions = questions;
    } catch (e) {
      console.log('fetch categories error ', e);
    }
  };

  setCurrentQuestion = (question) => {
    this.currentQuestion = question;
  };
}

const questionsStore = new QuestionsStore();
export default questionsStore;
