
import axios from 'axios';
import { BookingFormData } from '../types/booking';



const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://loader-ways.onrender.com';
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
      day: data.day,
      month: data.month,
      year: data.year
    },
    address: {
      address1: data.address1,
      address2: data.address2 || '',
      country: data.country,
      state: data.state,
      city: data.city,
      zipCode: data.zipCode
    },
    agreeTerms: data.agreeTerms
  };

  return axios.post(BOOKINGS_ENDPOINT, payload, {
    headers: { 'Content-Type': 'application/json' }
  });
};