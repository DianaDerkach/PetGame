import {makeAutoObservable} from 'mobx';
import {BASE_URL} from '@env';

class QuestionSetStore {
  questionSets;
  chosenQuestionsSet = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchQuestionSets().catch((error) => console.log('fetchQuestionSets error ', error));
  }

  setChosenQuestionsSet = (chosenQuestionsSet) => {
    this.chosenQuestionsSet = chosenQuestionsSet;
  };

  fetchQuestionSets = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/questions-sets?populate=*`);
      const {data: questionSets} = await response.json();

      this.questionSets = questionSets;
    } catch (e) {
      console.log('fetch categories error ', e);
    }
  };

  getFilteredQuestionsSets = (categoryTopic) => {
    return this.questionSets.filter((questionsSet) => questionsSet.topic.name === categoryTopic.item.name);
  };
}

const questionSetStore = new QuestionSetStore();
export default questionSetStore;
