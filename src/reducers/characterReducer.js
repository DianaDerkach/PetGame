import { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN } from "../old/actions/swipeActions";

export const characterReducer = (state, action) => {
  switch (action.type) {
    case SWIPE_UP:
      return {
        ...state,
        character: {
          bias: 0,
          category: 'none'
        }
      }
    case SWIPE_DOWN:
      return {
        ...state,
        character: {
          bias: 0,
          category: 'none'
        }
      }
    case SWIPE_LEFT:
      return {
        ...state,
        bias: -50,
        character: {
          bias: -50,
          category: 'eatable'
        }
      }
    case SWIPE_RIGHT:
      return {
        ...state,
        bias: 50,
        character: {
          bias: 50,
          category: 'uneatable'
        }
      }
  }
};
