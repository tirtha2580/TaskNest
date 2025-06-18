import axios from './axiosConfig';

const authHeader = () => {
  const token = sessionStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllTasks = async () => {
  const res = await axios.get('/task/gp', authHeader());
  return res.data; // or return res.data.tasks if backend returns { tasks: [...] }
};

export const createTask = async (taskData) => {
  const res = await axios.post('/task/gp', taskData, authHeader());
  return res.data;
};

export const getTaskById = async (id) => {
  const res = await axios.get(`/task/${id}/gp`, authHeader());
  return res.data;
};

export const updateTask = async (id, updatedData) => {
  const res = await axios.put(`/task/${id}/gp`, updatedData, authHeader());
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await axios.delete(`/task/${id}/gp`, authHeader());
  return res.data;
};

export const updateTaskStatus = async (id, updatedData) => {
  const res = await axios.put(`/task/${id}/gp`, updatedData, authHeader());
  return res.data;
};

