import axios from 'axios';
import { Platform } from 'react-native';

// Base URL API - Gunakan IP yang berbeda untuk Android
export const BASE_URL = Platform.select({
  // android: 'http://192.168.1.6:8080', // Gunakan IP lokal untuk Android
  android: 'http://10.0.2.2:8082',
  ios: 'http://localhost:8082',
  default: 'http://localhost:8082',
});


console.log('API Base URL:', BASE_URL);
console.log('Platform:', Platform.OS);

// Create axios instance dengan konfigurasi default
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // Tambah timeout untuk koneksi lambat
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Request URL:', config.url);
    console.log('Request Method:', config.method);
    console.log('Request Headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);
    return response; // Kembalikan response lengkap, bukan hanya data
  },
  (error) => {
    if (error.response) {
      console.error('API Error Response:', error.response.data);
      console.error('API Error Status:', error.response.status);
      console.error('API Error Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Network Error - No Response:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  },
);

export default api;
