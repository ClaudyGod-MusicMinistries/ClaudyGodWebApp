
import * as yup from 'yup';
import { CountryCode } from '../types/booking';
import { COUNTRY_STATE_CITY_DATA, ZIP_CODE_PATTERNS } from '../util/bookingConstants';
export const bookingSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string()
    .required('Phone is required')
    .test('phone-format', 'Invalid phone format', function(value) {
      const countryCode = this.parent.countryCode as CountryCode;
      const pattern = COUNTRY_STATE_CITY_DATA[countryCode]?.phonePattern;
      return pattern ? pattern.test(value) : false;
    }),
  countryCode: yup.string().required().oneOf(['US', 'CA', 'UK', 'NG']),
  organization: yup.string().required('Organization is required'),
  orgType: yup.string().required('Organization type is required'),
  eventType: yup.string().required('Event type is required'),
  eventDetails: yup.string()
    .required('Event details are required')
    .min(20, 'Please provide more details'),
  day: yup.number()
    .required('Day is required')
    .min(1, 'Invalid day')
    .max(31, 'Invalid day')
    .typeError('Day must be a number'),
  month: yup.string().required('Month is required'),
  year: yup.number()
    .required('Year is required')
    .min(new Date().getFullYear(), 'Year must be current or future')
    .typeError('Year must be a number'),
  address1: yup.string().required('Address is required'),
  address2: yup.string().optional(),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  zipCode: yup.string()
    .required('ZIP code is required')
    .test('zip-format', 'Invalid ZIP code format', function(value) {
      const countryCode = this.parent.country as CountryCode;
      const pattern = ZIP_CODE_PATTERNS[countryCode];
      return pattern ? pattern.test(value) : true;
    }),
  agreeTerms: yup.boolean()
    .oneOf([true], 'You must agree to the terms')
    .required()
});