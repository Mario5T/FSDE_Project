import axios from 'axios';

export const normalizeApiBaseUrl = (value) => {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return '/api';
  }

  return trimmedValue.endsWith('/') ? trimmedValue.slice(0, -1) : trimmedValue;
};

export const api = axios.create({
  baseURL: normalizeApiBaseUrl(import.meta.env.VITE_API_URL)
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});