import axios from 'axios';
import { BookingFormData } from '../types/booking';
const getApiBase = () => {
  if (import.meta.env.PROD) {
    return 'https://claudygodwebapp-1.onrender.com';
  }
  return window.location.origin.includes('localhost') 
    ? 'http://localhost:10000' 
    : 'https://claudygodwebapp-1.onrender.com';
};

const API_BASE = getApiBase();
const BOOKINGS_ENDPOINT = `${API_BASE}/api/bookings`;


export const submitBooking = async (data: BookingFormData) => {
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

  return axios.post(BOOKINGS_ENDPOINT, payload, {
    headers: { 'Content-Type': 'application/json' }
  });
};