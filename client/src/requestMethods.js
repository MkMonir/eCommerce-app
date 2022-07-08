import axios from 'axios';

const BASE_URL = 'http://localhost:7000/api/v1/';

export const publicRequest = axios.create({ baseURL: BASE_URL });

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzQ4NTk0ZWRmMzE2YzU1MzZkZmJiZSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NTcwNDY0OTgsImV4cCI6MTY1NzgyNDA5OH0.dLr07Y2bsxavRRuOXtBfxN8oqo4HMshCu0fBQXs0xvc',
  },
});
