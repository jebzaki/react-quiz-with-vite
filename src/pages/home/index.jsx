import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import getQuiz from '../../apis/quiz';
import actions from '../../store/constants';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';

const Home = () => {
  const navigate = useNavigate();
  const dispatchEvent = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [difficulty, setDifficulty] = useState('Easy');
  const [quizLength, setQuizLength] = useState(10);

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const quizLengths = [10, 20, 30];

  useEffect(() => {}, []);

  const loadQuiz = async () => {
    setIsLoading(true);
    try {
      await getQuiz(quizLength, difficulty.toLowerCase()).then((data) => {
        if (data) {
          dispatchEvent({ type: actions.LOAD_QUIZ, quiz: data.results });
          navigate('/questions');
        } else {
          alert('An api error has occurred');
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleQuizLengthChange = (event) => {
    setQuizLength(event.target.value);
  };

  return (
    <div className="h-lvh flex flex-col">
      <div className="flex-1 flex justify-center items-center flex-col">
        <div className="flex justify-center items-center p-4 ">
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo h-32 p-2" alt="Vite logo" />
          </a>
          <div className="text-3xl">+</div>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react h-32 p-2" alt="React logo" />
          </a>
        </div>

        <div className="max-w-96 w-full mt-2 px-4 flex flex-col">
          <label htmlFor="difficulty">Difficulty</label>
          <select value={difficulty} onChange={handleDifficultyChange} name="difficulty" className="p-4 rounded">
            {difficulties.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        <div className="max-w-96 w-full mt-2 px-4 flex flex-col">
          <label htmlFor="quizLength">Quiz Length</label>
          <select value={quizLength} onChange={handleQuizLengthChange} name="quizLength" className="p-4 rounded">
            {quizLengths.map((item) => {
              return (
                <option value={item} key={item}>
                  {item} questions
                </option>
              );
            })}
          </select>
        </div>

        <div className="max-w-96 w-full mt-2 px-4 flex flex-col">
          <button disabled={isLoading} onClick={loadQuiz} className="rounded capitalize p-4 mt-4 w-full bg-green-600 text-white text-2xl transition-opacity disabled:opacity-40">
            start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
