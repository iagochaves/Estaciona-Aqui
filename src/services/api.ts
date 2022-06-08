import axios from 'axios';

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://estaciona-aqui-app.herokuapp.com'
      : 'http://localhost:8080',
});

export const API_ROUTES = {
  parkingLots: '/parkingLots',
  schedules: '/schedules',
};
