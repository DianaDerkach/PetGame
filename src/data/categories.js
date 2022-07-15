export const categories = [
  {
    id: 1,
    text: 'JavaScript questions',
    color: 'rgba(228, 191, 134, 0.3)',
    textColor: 'rgba(228, 191, 134)',
    img: require('../assets/img/categoryBackgrounds/js_category.png'),
    topics: [
      {
        name: 'Basic',
        questionSets: [
          {
            name: 'Set-1',
            questions: [
              {
                text: 'How much data types do you know?',
                answers: ['2', '5', '8', '10'],
                rightAnswer: '8',
                timeForAnswer: 10,
              },
              {
                text: 'Choose the correct statement about const, let and var',
                answers: ['There is not difference', 'const and let have block and functional field of view', 'var has a block field of view'],
                rightAnswer: 'const and let have block and functional field of view',
                timeForAnswer: 7,
              },
            ]
          },
          {
            name: 'Set-2',
            questions: [
              {
                text: 'How you know?',
                answers: ['2c', '5x', '8z', '1s0'],
                rightAnswer: '8',
                timeForAnswer: 10,
              },
              {
                text: 'Choose the correct statement about const, let and var',
                answers: ['There is not difference', 'const and let have block and functional field of view', 'var has a block field of view'],
                rightAnswer: 'const and let have block and functional field of view',
                timeForAnswer: 7,
              },
            ]
          }
        ]
      },
      {
        name: 'Array and function',
        questionSets: [
          {
            text: 'What call and apply methods do?',
            answers: ['They call function with delay', 'It iterable methods', 'Pass execution context to function'],
            rightAnswer: 'Pass execution context to function',
            timeForAnswer: 7,
          },
          {
            text: 'What is the difference between call and apply?',
            answers: ['There is not difference', 'call changes function, apply dont change function', 'call takes separate arguments, apply takes array of args'],
            rightAnswer: 'call takes separate arguments, apply takes array of args',
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
  },
  {
    id: 2,
    text: 'React questions',
    color: 'rgba(160, 105, 215, 0.3)',
    textColor: 'rgba(160, 105, 215)',
    img: require('../assets/img/categoryBackgrounds/light-violet.png'),
    topics: [
      {
        name: 'Basic',
        questionSets: [
          {
            name: 'Set-1',
            questions: [
              {
                text: 'How much data types do you know?',
                answers: ['2', '5', '8', '10'],
                rightAnswer: '8',
                timeForAnswer: 10,
              },
              {
                text: 'Choose the correct statement about const, let and var',
                answers: ['There is not difference', 'const and let have block and functional field of view', 'var has a block field of view'],
                rightAnswer: 'const and let have block and functional field of view',
                timeForAnswer: 7,
              },
            ]
          }
        ]
      },
      {
        name: 'Array and function',
        questionSets: [
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
      }
    ],
  },
  {
    id: 3,
    text: 'Redux questions',
    color: 'rgba(79, 149, 208, 0.3)',
    textColor: 'rgba(79, 149, 208)',
    img: require('../assets/img/categoryBackgrounds/blue.png'),
    topics: [
      {
        name: 'Basic',
        questionSets: [
          {
            name: 'Set-1',
            questions: [
              {
                text: 'How much data types do you know?',
                answers: ['2', '5', '8', '10'],
                rightAnswer: '8',
                timeForAnswer: 10,
              },
              {
                text: 'Choose the correct statement about const, let and var',
                answers: ['There is not difference', 'const and let have block and functional field of view', 'var has a block field of view'],
                rightAnswer: 'const and let have block and functional field of view',
                timeForAnswer: 7,
              },
            ]
          }
        ]
      },
      {
        name: 'Array and function',
        questionSets: [
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
    ],
  },
  {
    id: 4,
    text: 'TypeScript questions',
    color: 'rgba(142, 163, 232, 0.3)',
    img: require('../assets/img/categoryBackgrounds/ts_category.png'),
    topics: [
      {
        name: 'Basic',
        questionSets: [
          {
            name: 'Set-1',
            questions: [
              {
                text: 'What is TypeScript?',
                answers: ['JS library', 'Strongly typed programming language', 'JS Framework', 'Weakly typed programming language',],
                rightAnswer: 'Strongly typed programming language',
                timeForAnswer: 9,
              },
              {
                text: 'What file tsconfig.json doesnt do?',
                answers: ['Save project dependences', ''],
                rightAnswer: 'none',
                timeForAnswer: 0,
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
      },
      {
        name: 'Array and function',
        questionSets: [
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
    ],
  },
]
