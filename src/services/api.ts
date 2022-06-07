import axios from 'axios';

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'http prod'
      : 'http://localhost:8080',
});

export const API_ROUTES = {
  parkingLots: '/parkingLots',
};
