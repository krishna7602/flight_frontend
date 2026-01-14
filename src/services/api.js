import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const getWallet = () => api.get('/auth/wallet');

// Flight APIs
export const getFlights = (params) => api.get('/flights', { params });
export const getFlight = (id) => api.get(`/flights/${id}`);
export const recordAttempt = (id) => api.post(`/flights/${id}/attempt`);

// Booking APIs
export const createBooking = (bookingData) => api.post('/bookings', bookingData);
export const getBookings = () => api.get('/bookings');
export const getBooking = (id) => api.get(`/bookings/${id}`);
export const downloadTicket = (id) => {
  return api.get(`/bookings/${id}/pdf`, {
    responseType: 'blob',
  });
};

export default api;