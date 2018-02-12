import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-5d288.firebaseio.com/',
});

export default instance;
