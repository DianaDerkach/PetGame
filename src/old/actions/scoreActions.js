export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export const incrementScore = () => {
  return {
    type: INCREMENT
  }
}

export const decrementScore = () => {
  return {
    type: DECREMENT
  }
}
