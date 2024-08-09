import axios from 'axios';

const OPEN_API_KEY = process.env.REACT_APP_OPEN_API_KEY;

const AXIOS_OPEN = axios.create({
  baseURL: `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${OPEN_API_KEY}`,
});

export { AXIOS_OPEN };
