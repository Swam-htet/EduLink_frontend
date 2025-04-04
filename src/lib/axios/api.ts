import { store } from '@/store/store';
import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// get tenant id from browser url
const tenantId = window.location.hostname.split('.')[0];

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Tenant': tenantId
  }
});

// get token from store
const getTokenFromStore = (): string | null => {
  console.log(window.location.pathname);
  if (window.location.pathname.includes('admin')) {
    return store.getState().adminAuth.token;
  } else {
    return store.getState().studentAuth.token;
  }
};

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = getTokenFromStore();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // Response interceptor
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       store.dispatch(logout());
//     }
//     return Promise.reject(error);
//   }
// );
