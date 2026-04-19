import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://goat-ready-mutton.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const predictWeight = async (data) => {
  const response = await api.post('/predict-weight', data);
  return response.data;
};

export const predictMeasurements = async (data) => {
  const response = await api.post('/predict-measurements', data);
  return response.data;
};

export const predictImage = async (formData) => {
  const response = await api.post('/predict-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getHistory = async () => {
  const response = await api.get('/history');
  return response.data;
};

export const clearHistory = async () => {
  const response = await api.delete('/history');
  return response.data;
};

export const deleteHistoryItem = async (id) => {
  const response = await api.delete(`/history/${id}`);
  return response.data;
};

export default api;
