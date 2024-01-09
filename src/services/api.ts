import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://glistening-ants-production.up.railway.app/',
});
