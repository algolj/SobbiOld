import axios from 'axios';
import { API_URL } from './http';

const $userApi = axios.create({
  baseURL: API_URL,
});

$userApi.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default $userApi;
