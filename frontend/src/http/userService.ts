import axios from 'axios';
import { API_URL } from './http';

const $roomApi = axios.create({
  baseURL: API_URL,
});

$roomApi.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('roomToken')}`;
  return config;
});

export default $roomApi;
