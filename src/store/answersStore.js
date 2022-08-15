import {makeAutoObservable} from 'mobx';
import questionsStore from './questionsStore';

class AnswersStore {
  currentAnswers = [];
  wasAnswerChosen = false;

  constructor() {
    makeAutoObservable(this);
  }

  setWasAnswerChosen = (wasAnswerChosen) => {
    this.wasAnswerChosen = wasAnswerChosen;
  };

  setCurrentAnswers = () => {
    const [{answers}] =
      questionsStore.questions.filter((question) => question.text === questionsStore.currentQuestion.text);
    const [{
      createdAt, id, updatedAt, ...answersArr
    }] = answers;
    this.currentAnswers = Object.values(answersArr);
  };
}

const answersStore = new AnswersStore();
export default answersStore;
