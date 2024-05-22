import actions from '../constants';
export const initialState = {
  quiz: [],
  currentQuestion: 0,
  userAnswers: [],
  quizFinished: false,
};

export const app = (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.LOAD_QUIZ: {
      const { quiz } = action;
      return {
        ...state,
        currentQuestion: 0,
        quiz,
        userAnswers: [],
        quizFinished: false,
      };
    }

    case actions.NEXT_QUESTION: {
      const answers = [...state.userAnswers];
      const currentQuestion = state.currentQuestion;
      answers[currentQuestion] = action.answer;

      const nextQuestion = currentQuestion + 1;

      return {
        ...state,
        currentQuestion: nextQuestion,
        quizFinished: nextQuestion >= state.quiz.length ? true : false,
        userAnswers: answers,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default app;
