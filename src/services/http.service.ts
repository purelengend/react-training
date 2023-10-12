import { BASE_URL, RESOURCE } from '@constants/api';
import axios from 'axios';

const http = axios.create({
  baseURL: `${BASE_URL}${RESOURCE.food}`,
  timeout: 0,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
});

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const res = error.response;
    console.error('Looks like there was a problem. Status Code: ' + res.status);
    return Promise.reject(error);
  }
);

export default http;
