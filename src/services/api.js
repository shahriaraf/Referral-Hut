import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
    baseURL: 'https://nexonext-server.vercel.app/api',
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}, error => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.msg || error.message || 'An unknown error occurred';
    if (message !== 'No token, authorization denied' && message !== 'Token is not valid') {
      toast.error(message);
    }
    if (error.response?.status === 401) {
        localStorage.removeItem('token');
        // টোকেন অবৈধ হলে লগইন পেজে রিডাইরেক্ট করা হয়
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
    }
    return Promise.reject(error);
  }
);

export default api;