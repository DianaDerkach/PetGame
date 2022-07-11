export const categories = [
  {
    id: 1,
    text: 'JS questions',
    color: '#8EA3E8',
    img: require('../assets/img/categoryBackgrounds/light-blue.png'),
    questions: [
      {
        text: 'How much data types do you know?',
        answers: ['2', '5', '8', '10'],
        rightAnswer: '8',
        timeForAnswer: 5,
      },
      {
        text: 'grence between const let and var?',
        answers: ['There is not difference', 'const and let is block field of view', 'var is a block field of view'],
        rightAnswer: 'const and let is block field of view',
        timeForAnswer: 7,
      },
      {
        text: 'What w const let and var?',
        answers: ['There is not difference', 'const and let is block field of view', 'var is a block field of view'],
        rightAnswer: 'const and let is block field of view',
        timeForAnswer: 6,
      },
      {
        text: 'What is the difference between const let and var?',
        answers: ['There is not difference', 'const and let is block field of view', 'var is a block field of view'],
        rightAnswer: 'const and let is block field of view',
        timeForAnswer: 5,
      },
      {
        text: ' ',
        answers: [''],
        rightAnswer: 'none',
        timeForAnswer: 0,
      },
    ]
  },
  {
    id: 2,
    text: 'React questions',
    color: '#A069D7',
    img: require('../assets/img/categoryBackgrounds/light-violet.png'),
    questions: [
      {
        text: 'What is not React hook?',
        answers: ['useState', 'useEffect', 'useSelect', 'useReducer'],
        rightAnswer: 'useSelect',
        timeForAnswer: 5,
      },
      {
        text: ' ',
        answers: [''],
        rightAnswer: 'none',
        timeForAnswer: 0,
      },
      ]
  },
  {
    id: 3,
    text: 'Redux questions',
    color: '#4F95D0',
    img: require('../assets/img/categoryBackgrounds/blue.png'),
    questions: [
      {
        text: 'What is dispatch?',
        answers: ['custom function', 'is not from redux', 'function, that takes actions', 'function, that takes reducer'],
        rightAnswer: 'function, that takes actions',
        timeForAnswer: 10,
      },
      {
        text: ' ',
        answers: [''],
        rightAnswer: 'none',
        timeForAnswer: 0,
      },
      ]
  }
]
