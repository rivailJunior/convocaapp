import Constants from 'expo-constants';
import axios from 'axios';

const API_URL = Constants.expoConfig?.extra?.apiUrl ?? 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL as string,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token interceptor will be configured after Firebase Auth setup
// api.interceptors.request.use(async (config) => {
//   const token = await auth.currentUser?.getIdToken();
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export { api };
