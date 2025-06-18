// src/api/authApi.js
import axios from './axiosConfig';

export const registerUser = async (formData) => {
  const response = await axios.post('/user/register', formData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post('/user/login', credentials);
  return response.data;
};
