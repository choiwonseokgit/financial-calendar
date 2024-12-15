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
  async (error) => {
    //토큰 갱신이 필요할 경우(401)
    if (error.response.status === 401) {
      try {
        const refreshResponse = await axios.get(`${SERVER_URL}/refresh-token`, {
          withCredentials: true,
        });

        if (refreshResponse.status === 200) {
          const newAccessToken = refreshResponse.data.accessToken;

          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return axios(error.config);
        }
      } catch (err) {
        // if (err instanceof AxiosError && err.response?.status === 401) {
        //   // refreshToken 갱신 실패
        //   if (window.location.pathname !== '/login') {
        //     window.location.href = '/login';
        //   }
        // }

        throw new Error('세션이 만료되었습니다. 다시 로그인해주세요.');
      }
    }
    //토큰이 이상할 때(403)
    if (error.response.status === 403) {
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
