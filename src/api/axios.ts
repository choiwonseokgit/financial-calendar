import { SERVER_URL } from '@constants/url';
import axios from 'axios';

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
    if (error.code === 'ECONNABORTED') {
      // 타임아웃 오류 처리
      window.location.href = '/login';
    } else if (error.response) {
      if (error.response.status === 401) {
        // 토큰이 없는 경우
        window.location.href = '/login';
      } else if (error.response.status === 403) {
        // 토큰이 유효하지 않은 경우
        window.location.href = '/404';
      }
    } else {
      // 네트워크 오류 또는 다른 오류 처리
      console.error('An error occurred:', error);
    }
    return Promise.reject(error);
  },
);

export default Axios;
