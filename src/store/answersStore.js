import {makeAutoObservable} from 'mobx';
import questionsStore from './questionsStore';

class AnswersStore {
  currentAnswers = [];
  isAnswerHasChosen = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsAnswerHasChosen = (isAnswerHasChosen) => {
    this.isAnswerHasChosen = isAnswerHasChosen;
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
