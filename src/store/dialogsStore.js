import {makeAutoObservable} from 'mobx';

class DialogsStore {
  chosenMode = '';
  showHelpDialog = false;
  isChooseModeDialog = false;

  constructor() {
    makeAutoObservable(this);
  }

  setChosenMode = (chosenMode) => {
    this.chosenMode = chosenMode;
  };

  setShowHelpDialog = (showHelpDialog) => {
    this.showHelpDialog = showHelpDialog;
  };

  setIsChooseModeDialog = (isChooseModeDialog) => {
    this.isChooseModeDialog = isChooseModeDialog;
  };
}

const dialogsStore = new DialogsStore();
export default dialogsStore;
