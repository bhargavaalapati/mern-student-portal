// src/services/api.js
import axios from 'axios';

// This uses your live Render URL when the app is in production
const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://student-portal-api-kmpp.onrender.com/api' // Your live Render URL
    : '/api'; // The local proxy for development

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;