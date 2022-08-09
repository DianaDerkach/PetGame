import { makeAutoObservable } from "mobx";

class ScoreStore {
  score = 0;
  constructor() {
    makeAutoObservable(this);
  }

  setScore = (newScore) => {
    this.score = newScore;
  }
}

export const scoreStore = new ScoreStore();
