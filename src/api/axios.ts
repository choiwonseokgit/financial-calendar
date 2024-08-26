import axios from 'axios';

// 'https://financial-calendar-server.onrender.com'

const Axios = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 5000,
  withCredentials: true, // 쿠키를 요청에 포함시킵니다.
});

Axios.interceptors.response.use(
  (response) => {
    //console.log('실행');
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // 토큰이 없는 경우
      window.location.href = '/login';
    } else if (error.response.status === 403) {
      // 토큰이 유효하지 않은 경우
      window.location.href = '/404';
    }
    return Promise.reject(error);
  },
);

export default Axios;
