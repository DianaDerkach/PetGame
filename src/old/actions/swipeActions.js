export const SWIPE_LEFT = 'SWIPE_LEFT';
export const SWIPE_RIGHT = 'SWIPE_RIGHT';
export const SWIPE_DOWN = 'SWIPE_DOWN';
export const SWIPE_UP = 'SWIPE_UP';

export const swipeLeft = () => {
  return {
    type: SWIPE_LEFT
  }
}

export const swipeRight = () => {
  return {
    type: SWIPE_RIGHT
  }
}

export const swipeUp = () => {
  return {
    type: SWIPE_UP
  }
}

export const swipeDown = () => {
  return {
    type: SWIPE_DOWN
  }
}
