// src/api/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://tasknest-backend-py22.onrender.com/api',
});

// Add Authorization header if token exists
instance.interceptors.request.use((config) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = user?.token;

  // console.log('🔐 Token from sessionStorage:', token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
