import axios, { AxiosError } from 'axios';
import { BookingFormData } from '../types/booking';

const API_BASE = import.meta.env.VITE_API_BASE || 
                 (import.meta.env.PROD 
                   ? 'https://cgm-backend-5qvj.onrender.com' 
                   : 'http://localhost:10000');

const BOOKINGS_ENDPOINT = `${API_BASE}/api/bookings`;

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Add request interceptor for logging
apiClient.interceptors.request.use(config => {
  console.log(`Sending ${config.method?.toUpperCase()} request to ${config.url}`);
  return config;
}, error => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(response => {
  return response;
}, (error: AxiosError) => {
  if (error.response) {
    console.error('API Error Response:', {
      status: error.response.status,
      data: error.response.data,
      headers: error.response.headers
    });
  } else if (error.request) {
    console.error('API Request Error:', error.request);
  } else {
    console.error('API Setup Error:', error.message);
  }
  
  return Promise.reject(error);
});

export const submitBooking = async (data: BookingFormData) => {
  // Prepare payload with fallbacks
  const payload = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    countryCode: data.countryCode,
    organization: data.organization,
    orgType: data.orgType,
    eventType: data.eventType,
    eventDetails: data.eventDetails,
    eventDate: {
      day: data.eventDate?.day || data.day,
      month: data.eventDate?.month || data.month,
      year: data.eventDate?.year || data.year
    },
    address: {
      address1: data.address?.address1 || data.address1,
      address2: data.address?.address2 || data.address2 || '',
      country: data.address?.country || data.country,
      state: data.address?.state || data.state,
      city: data.address?.city || data.city,
      zipCode: data.address?.zipCode || data.zipCode
    },
    agreeTerms: data.agreeTerms
  };

  try {
    const response = await apiClient.post('/api/bookings', payload);
    
    // Log successful submission
    console.log('Booking submitted successfully:', {
      status: response.status,
      data: response.data,
      bookingId: response.data.id // Assuming backend returns an ID
    });
    
    return response;
  } catch (error) {
    // Enhanced error handling
    let errorMessage = 'Failed to submit booking';
    let errorDetails = {};
    
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
      errorDetails = {
        status: error.response?.status,
        data: error.response?.data,
        endpoint: BOOKINGS_ENDPOINT
      };
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    console.error('Booking submission error:', {
      message: errorMessage,
      payload,
      ...errorDetails
    });
    
    throw new Error(errorMessage);
  }
};

// Add health check function
export const checkApiHealth = async () => {
  try {
    const response = await apiClient.get('/api/health');
    return {
      status: 'healthy',
      response: response.data
    };
  } catch (error) {
    console.error('API health check failed:', error);
    return {
      status: 'unhealthy',
      error: axios.isAxiosError(error) ? error.message : 'Unknown error'
    };
  }
};