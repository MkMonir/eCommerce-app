import axios from 'axios';

const BASE_URL = 'http://localhost:7000/api/v1/';
const { token } = JSON.parse(localStorage.getItem('user'));

export const publicRequest = axios.create({ baseURL: BASE_URL });

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    token,
  },
});
