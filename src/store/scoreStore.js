import {makeAutoObservable} from 'mobx';

class ScoreStore {
  score = 0;
  constructor() {
    makeAutoObservable(this);
  }

  setScore = (newScore) => {
    this.score = newScore;
  };
}

const scoreStore = new ScoreStore();
export default scoreStore;
