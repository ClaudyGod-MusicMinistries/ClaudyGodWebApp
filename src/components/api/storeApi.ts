// import axios from 'axios';

// // Create axios instance with base URL
// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE || 'http://localhost:10000',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add request interceptor for auth tokens if needed
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     if (error.response) {
//       console.error('API Error:', error.response.data);
//       return Promise.reject(error.response.data.error || error.response.data.message || 'Request failed');
//     } else if (error.request) {
//       console.error('API Error:', error.request);
//       return Promise.reject('No response from server');
//     } else {
//       console.error('API Error:', error.message);
//       return Promise.reject(error.message);
//     }
//   }
// );

// export const apiService = {
//   // Zelle Payment Endpoints
//   confirmZellePayment: (data: {
//     confirmationId: string;
//     amount: number;
//     orderId: string;
//   }) => api.post('/api/payment/zelle/confirm', data),

//   checkPaymentStatus: (orderId: string) => api.get(`/api/payment/zelle/status/${orderId}`),
// };
