import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

//const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryDelay: 5000,
      retry: 5,
    },
  },
});

export { queryClient, axiosClient };
