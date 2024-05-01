import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://users-typescript-api-78zl.vercel.app/',
});
