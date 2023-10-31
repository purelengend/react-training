import { RESOURCE } from '@constants/api';
import axios, { AxiosError, AxiosResponse } from 'axios';

const http = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_DOMAIN}${RESOURCE.food}`,
  timeout: 0,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
});

export const onFulfilled = (response: AxiosResponse) => {
  return response;
};
export const onRejected = (error: AxiosError) => {
  const res = error.response;

  if (res) {
    console.error('Looks like there was a problem. Status Code: ' + res.status);
  }

  return Promise.reject(error);
};

http.interceptors.response.use(onFulfilled, onRejected);

export default http;
