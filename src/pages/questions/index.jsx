import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import actions from '../../store/constants';
import { useDispatch, useSelector } from 'react-redux';
import { decode } from 'html-entities';

const Questions = () => {
  const navigate = useNavigate();
  const dispatchEvent = useDispatch();
  const currentQuestion = useSelector((state) => state.currentQuestion);
  const quiz = useSelector((state) => state.quiz);
  const quizFinished = useSelector((state) => state.quizFinished);

  const [question, setQuestion] = useState({
    question: '',
    category: '',
  });

  useEffect(() => {
    if (typeof quiz != 'undefined' && quiz.length > 0 && typeof currentQuestion != 'undefined') {
      if (currentQuestion < quiz.length) setQuestion(quiz[currentQuestion]);
    }
  }, [quiz, currentQuestion]);

  useEffect(() => {
    if (quizFinished) {
      navigate('/results');
    }
  }, [navigate, quizFinished]);

  const answerQuestion = (answer) => {
    dispatchEvent({
      type: actions.NEXT_QUESTION,
      answer: answer,
    });
  };

  return (
    <div className="h-lvh flex flex-col">
      <div className="flex-1 flex justify-center items-center flex-col">
        <div className="text-xl text-center my-2">{decode(question.category)}</div>

        <div className="max-w-md w-full self-center">
          <div className="flex flex-col bg-blue-200 rounded p-6 m-2">
            <div className="text-2xl font-bold self-center mb-6">
              <div className="font-semibold text-center">#{parseInt(currentQuestion) + 1}</div>
              {decode(question.question)}
            </div>
            <div className="flex justify-around">
              <button className="bg-green-600 text-white px-12 py-4 rounded" onClick={() => answerQuestion(true)}>
                True
              </button>
              <button className="bg-red-600 text-white px-12 py-4 rounded" onClick={() => answerQuestion(false)}>
                False
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
