import axios from '../axios';

const getQuiz = async (amount = '10', difficulty = 'hard', type = 'boolean') => {
  return axios
    .get(`/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
};

export default getQuiz;
