export const SERVER_URL =
  process.env.REACT_APP_NODE_ENV === 'production'
    ? process.env.REACT_APP_SERVER
    : process.env.REACT_APP_SERVER_LOCAL || 'http://localhost:4000';
