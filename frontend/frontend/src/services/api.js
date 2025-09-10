// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use(
  (config) => {
    console.log('Interceptor triggered'); // <-- ADD THIS LINE
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      console.log('Token found, attaching to header:', user.token); // <-- ADD THIS LINE
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;