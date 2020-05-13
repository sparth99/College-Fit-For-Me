import axios from 'axios';

export const gitlab = axios.create({
  baseURL: 'https://gitlab.com/api/v4/',
});

export const api = axios.create({
  baseURL: 'https://api.collegefitfor.me/',
});
