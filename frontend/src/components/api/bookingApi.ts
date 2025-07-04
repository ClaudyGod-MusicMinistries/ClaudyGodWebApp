import axios from 'axios';
import { BookingFormData } from '../types/booking';

const MONTHS = [
  'January', 'February', 'March', 'April', 
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

const API_BASE = import.meta.env.VITE_API_BASE_URL || 
                 (import.meta.env.PROD 
                   ? 'https://cgm-backend-5qvj.onrender.com' 
                   : 'http://localhost:10000');

const BOOKINGS_ENDPOINT = `${API_BASE}/api/bookings`;

export const submitBooking = async (data: BookingFormData) => {
  const eventDate = `${data.eventDate.year}-${MONTHS.indexOf(data.eventDate.month) + 1}-${data.eventDate.day}`;
  
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
    eventDate,
    address: {
      address1: data.address.address1,
      address2: data.address.address2 || '',
      country: data.address.country,
      state: data.address.state,
      city: data.address.city,
      zipCode: data.address.zipCode
    },
    agreeTerms: data.agreeTerms
  };

  try {
    const response = await axios.post(BOOKINGS_ENDPOINT, payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 20000
    });
    
    return response.data;
  } catch (error: any) {
    let errorMessage = 'Failed to submit booking';
    let errorDetails: any = {};
    
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { status, data } = error.response;
        errorMessage = data.message || `Request failed with status ${status}`;
        errorDetails = data.errors || {};
      } else if (error.request) {
        errorMessage = 'No response received from server';
      } else {
        errorMessage = error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    throw { 
      message: errorMessage,
      ...errorDetails
    };
  }
};

export const checkApiHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/health`, { timeout: 5000 });
    return {
      status: 'healthy',
      response: response.data
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: axios.isAxiosError(error) ? error.message : 'Unknown error'
    };
  }
};