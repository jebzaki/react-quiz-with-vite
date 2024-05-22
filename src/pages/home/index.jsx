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

  const loadQuiz = async () => {
    setIsLoading(true);
    try {
      await getQuiz().then((data) => {
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

  useEffect(() => {}, []);

  const startQuiz = () => {
    loadQuiz();
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
        <button disabled={isLoading} onClick={startQuiz} className="rounded uppercase p-4 bg-green-600 text-white text-2xl ">
          start
        </button>
      </div>
    </div>
  );
};

export default Home;
