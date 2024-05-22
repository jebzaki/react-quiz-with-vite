import Axios from 'axios';

export default Axios.create({
  baseURL: 'https://opentdb.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});
