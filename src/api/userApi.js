// src/api/userApi.js
import axios from './axiosConfig';

export const getCurrentUser = async () => {
  const response = await axios.get('/user/me');
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await axios.put('/user/profile', data);
  return response.data;
};

export const updatePassword = async (data) => {
  const response = await axios.put('/user/password', data);
  return response.data;
};
