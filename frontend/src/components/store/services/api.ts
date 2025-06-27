import axios from 'axios';

// Update your api.ts file to use Vite's import.meta.env instead of process.env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:10000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth tokens if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('API Error:', error.response.data);
      return Promise.reject(error.response.data.error || error.response.data.message || 'Request failed');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Error:', error.request);
      return Promise.reject('No response from server');
    } else {
      // Something happened in setting up the request
      console.error('API Error:', error.message);
      return Promise.reject(error.message);
    }
  }
);

export const apiService = {
  // Zelle Payment
  confirmZellePayment: (data: {
    confirmationId: string;
    amount: number;
    orderId: string;
  }) => api.post('/payment/zelle/confirm', data),

  checkPaymentStatus: (orderId: string) => api.get(`/payment/zelle/status/${orderId}`),

  getPaymentDetails: (paymentId: string) => api.get(`/payment/${paymentId}`),

  // Orders
  createOrder: (data: any) => api.post('/orders', data),
  getOrder: (orderId: string) => api.get(`/orders/${orderId}`),
  confirmOrderPayment: (orderId: string, data: any) => api.post(`/orders/${orderId}/confirm-payment`, data),
};