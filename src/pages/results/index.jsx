import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { decode } from 'html-entities';

const Results = () => {
  const navigate = useNavigate();
  const quiz = useSelector((state) => {
    return state.quiz;
  });
  const userAnswers = useSelector((state) => state.userAnswers);

  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (typeof userAnswers != 'undefined' && userAnswers.length > 0 && typeof quiz != 'undefined' && quiz.length > 0) {
      var count = 0;
      var countResults = [];
      quiz.forEach((element, i) => {
        var booleanAnswer = element.correct_answer === 'True';
        var match = userAnswers[i] === booleanAnswer;

        countResults.push(match);

        if (match) {
          count++;
        }
      });

      setScore(count);
      setResults(countResults);
    }
  }, [quiz, userAnswers]);

  const restartQuiz = () => {
    navigate('/');
  };

  return (
    <div className="h-lvh flex flex-col">
      <div className="flex justify-center items-center m-6">
        <button onClick={restartQuiz} className="rounded capitalize p-4 w-full max-w-96 bg-green-600 text-white text-2xl ">
          play again?
        </button>
      </div>

      <div className="text-center text-3xl">
        <div>Score</div>
        <div>
          {score}/{quiz.length}
        </div>
      </div>

      <div className="mx-4 my-6">
        {results.length > 0 && (
          <div>
            {quiz.map((element, i) => {
              return (
                <div key={i}>
                  #{i + 1}, {decode(element.question)} <span className="font-semibold">{results[i] ? 'Correct' : 'Incorrect'}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
