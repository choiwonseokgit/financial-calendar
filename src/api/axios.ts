import axios from 'axios';

import { SERVER_URL } from '@constants/url';

const Axios = axios.create({
  baseURL: SERVER_URL,
  timeout: 5000,
  withCredentials: true, // 쿠키를 요청에 포함
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //인증 오류
    if (error.response.status === 401) {
      window.location.href = '/login';
    }
    //서버 오류
    if (error.response.status === 404) {
      window.location.href = '/404';
    }
    return Promise.reject(error);
  },
);

export default Axios;
