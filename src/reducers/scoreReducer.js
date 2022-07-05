import { DECREMENT, INCREMENT } from "../old/actions/scoreActions";

export const scoreReducer = (state, action) => {
  switch(action.type) {
    case INCREMENT:
      return {
        ...state,
        score: state.score + 1
      }
    case DECREMENT:
      return {
        ...state,
        score: state.score - 1
      }
  }
}
