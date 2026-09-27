import { useReducer } from 'react';

export const initialState = {
  questions: [
    {
      id: 1,
      question: 'What is the capital of Australia?',
      options: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      answer: 'Canberra',
    },
    {
      id: 2,
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      answer: 'Mars',
    },
    {
      id: 3,
      question: 'Which React hook is used to manage complex state logic?',
      options: ['useState', 'useEffect', 'useReducer', 'useContext'],
      answer: 'useReducer',
    },
    {
      id: 4,
      question: 'What is the largest ocean on Earth?',
      options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
      answer: 'Pacific',
    },
    {
      id: 5,
      question: 'How many continents are there on Earth?',
      options: ['5', '6', '7', '8'],
      answer: '7',
    },
  ],
  currentQuestion: 0,
  selectedOption: '',
  score: 0,
  showScore: false,
};

export function quizReducer(state, action) {
  switch (action.type) {
    case 'SELECT_OPTION':
      return { ...state, selectedOption: action.payload };

    case 'NEXT_QUESTION': {
      if (!state.selectedOption) return state;

      const isCorrect = state.selectedOption === state.questions[state.currentQuestion].answer;
      const score = isCorrect ? state.score + 1 : state.score;
      const nextQuestion = state.currentQuestion + 1;

      if (nextQuestion >= state.questions.length) {
        return { ...state, score, selectedOption: '', showScore: true };
      }
      return { ...state, score, currentQuestion: nextQuestion, selectedOption: '' };
    }

    case 'RESTART_QUIZ':
      return { ...initialState, questions: state.questions };

    default:
      return state;
  }
}

export default function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { questions, currentQuestion, selectedOption, score, showScore } = state;

  const handleOptionSelect = (option) => {
    dispatch({ type: 'SELECT_OPTION', payload: option });
  };

  const handleNextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const handleRestartQuiz = () => {
    dispatch({ type: 'RESTART_QUIZ' });
  };

  if (showScore) {
    return (
      <div className="quiz center">
        <h2>
          Your Score: {score}/{questions.length}
        </h2>
        <button onClick={handleRestartQuiz}>Restart Quiz</button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="quiz center">
      <p className="muted">
        Question {currentQuestion + 1} / {questions.length}
      </p>
      <h2>Question {question.id}</h2>
      <p className="question">{question.question}</p>
      <div className="options">
        {question.options.map((option) => (
          <button
            key={option}
            className={selectedOption === option ? 'option selected' : 'option'}
            aria-pressed={selectedOption === option}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <button onClick={handleNextQuestion} disabled={!selectedOption}>
        {isLastQuestion ? 'Finish' : 'Next'}
      </button>
    </div>
  );
}
