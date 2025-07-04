import * as yup from 'yup';

export const bookingSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  countryCode: yup.string().required('Country code is required'),
  organization: yup.string().required('Organization is required'),
  orgType: yup.string().required('Organization type is required'),
  eventType: yup.string().required('Event type is required'),
  eventDetails: yup.string().required('Event details are required').min(20, 'Please provide more details'),
  
  eventDate: yup.object({
    day: yup.number()
      .required('Day is required')
      .min(1, 'Invalid day (1-31)')
      .max(31, 'Invalid day (1-31)'),
    month: yup.string().required('Month is required'),
    year: yup.number()
      .required('Year is required')
      .min(2023, 'Invalid year (2023-2030)')
      .max(2030, 'Invalid year (2023-2030)')
  }).required('Event date is required'),
  
  address: yup.object({
    address1: yup.string().required('Address is required'),
    address2: yup.string(),
    country: yup.string().required('Country is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
    zipCode: yup.string().required('ZIP code is required')
  }).required(),
  
  agreeTerms: yup.boolean()
    .oneOf([true], 'You must agree to the terms')
    .required('You must agree to the terms')
});