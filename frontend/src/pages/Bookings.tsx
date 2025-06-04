// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/bookings';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Herosection } from '../components/Herosection';
import { VideoBanner2 } from '../assets/';
import { NewsletterForm } from '../components/Newsletter';
import { Modal } from '../components/Modal';
import axios from 'axios';



// Define country code type for type safety
type CountryCode = 'US' | 'CA' | 'UK' | 'NG';

// Country-state-city data structure with type safety
const COUNTRY_STATE_CITY_DATA: Record<CountryCode, {
  phonePattern: RegExp;
  states: Record<string, string[]>;
}> = {
  US: {
    phonePattern: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
    states: {
      California: ['San Ramon', 'Los Angeles', 'San Francisco'],
      Texas: ['Houston', 'Austin', 'Dallas'],
      'New York': ['New York City', 'Buffalo', 'Rochester']
    }
  },
  CA: {
    phonePattern: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
    states: {
      Ontario: ['Toronto', 'Ottawa'],
      Quebec: ['Montreal', 'Quebec City']
    }
  },
  UK: {
    phonePattern: /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/,
    states: {
      England: ['London', 'Manchester'],
      Scotland: ['Edinburgh', 'Glasgow']
    }
  },
  NG: {
    phonePattern: /^(\+234|0)[7-9][01]\d{8}$/,
    states: {
      Lagos: ['Lagos City', 'Ikeja'],
      Abuja: ['Abuja City', 'Garki']
    }
  }
};

// Month names
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Validation schema
const schema = yup.object().shape({
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
  eventDetails: yup.string().required('Event details are required').min(20, 'Please provide more details'),
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
  eventImage: yup
    .mixed()
    .required('Event image is required')
    .test('fileRequired', 'Event image is required', value => value && value[0])
    .test('fileSize', 'File size too large (max 5MB)', value => 
      value && value[0] ? value[0].size <= 5 * 1024 * 1024 : false
    )
    .test('fileType', 'Unsupported file format (JPEG, PNG only)', value => 
      value && value[0] ? ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type) : false
    ),
  address1: yup.string().required('Address is required'),
  address2: yup.string().optional(),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  zipCode: yup.string().required('ZIP code is required'),
  agreeTerms: yup.boolean()
    .oneOf([true], 'You must agree to the terms')
    .required()
});

export const Booking: React.FC = () => {
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { 
    register, 
    handleSubmit, 
    watch,
    setValue,
    reset,
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      countryCode: 'US' as CountryCode,
      agreeTerms: false,
      address2: ''
    }
  });

  const country = watch('country') as CountryCode;
  const state = watch('state');
  const countryCode = watch('countryCode') as CountryCode;

  // Update states when country changes
  useEffect(() => {
    if (country && COUNTRY_STATE_CITY_DATA[country]) {
      const countryStates = Object.keys(COUNTRY_STATE_CITY_DATA[country].states);
      setStates(countryStates);
      setValue('state', '');
      setValue('city', '');
    } else {
      setStates([]);
      setCities([]);
    }
  }, [country, setValue]);

  // Update cities when state changes
  useEffect(() => {
    if (country && state && COUNTRY_STATE_CITY_DATA[country]) {
      const stateCities = COUNTRY_STATE_CITY_DATA[country].states[state] || [];
      setCities(stateCities);
      setValue('city', '');
    } else {
      setCities([]);
    }
  }, [country, state, setValue]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    const formData = new FormData();
    
    // Append all fields with proper data types
    Object.keys(data).forEach(key => {
      if (key === 'eventImage') {
        formData.append(key, data[key][0]);
      } else if (key === 'agreeTerms') {
        formData.append(key, data[key] ? 'true' : 'false');
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        toast.success('Booking submitted successfully!');
        reset();
        setShowThankYouModal(true);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error || 
                           'Failed to submit booking';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen overflow-y-auto">
      <ToastContainer position="top-right" autoClose={5000} />
      
      <Modal 
        isOpen={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
        title="Thank You!"
      >
        <div className="text-gray-700 mb-4">
          <p>Thank you for contacting us!</p>
          <p>We will review your request and our team will get in touch with you shortly.</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setShowThankYouModal(false)}
            className="px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-700 transition"
          >
            Close
          </button>
        </div>
      </Modal>
      
      <div className="relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Herosection 
          title="ClaudyGod Music & Ministries / Bookings"
          backgroundImage={VideoBanner2}
          className="relative z-0"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-gray-900 mb-2 roboto-condensed text-40">ClaudyGod Music Ministry</h2>
          <div className="h-1 w-16 bg-purple-900 mb-3"></div>
          <p className="text-gray-700 mb-2 robotoMedium text-18">
            To book ClaudyGod for an event, fill out the form below. The ClaudyGod Team will review your information.
          </p>
          <p className="text-gray-700 robotoMedium text-18">
            Thank you in advance for your gracious invitation to be a part of your event.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-purple-900 p-8 rounded-lg shadow-md text-white mb-8">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="firstName" className="block text-sm robotoMedium mb-1">First Name</label>
              <input
                id="firstName"
                {...register('firstName')}
                className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <AnimatePresence>
                {errors.firstName && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-xs mt-1"
                  >
                    {errors.firstName.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm robotoMedium mb-1">Last Name</label>
              <input
                id="lastName"
                {...register('lastName')}
                className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <AnimatePresence>
                {errors.lastName && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-xs mt-1"
                  >
                    {errors.lastName.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm robotoMedium mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                  >
                  {errors.email.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm robotoMedium mb-1">Contact Number</label>
            <div className="flex">
              <select
                {...register('countryCode')}
                className="px-3 py-2 border border-purple-700 rounded-l-md bg-purple-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="US">US</option>
                <option value="CA">CA</option>
                <option value="UK">UK</option>
                <option value="NG">NG</option>
              </select>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                className="flex-1 px-3 py-2 border border-purple-700 border-l-0 rounded-r-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder={
                  countryCode === 'US' || countryCode === 'CA' ? 'e.g. 555-123-4567' :
                  countryCode === 'UK' ? 'e.g. 07123 456789' : 
                  'e.g. 08012345678'
                }
              />
            </div>
            <AnimatePresence>
              {errors.phone && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.phone.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="mb-6">
            <label htmlFor="organization" className="block text-sm robotoMedium mb-1">Organization</label>
            <input
              id="organization"
              {...register('organization')}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <AnimatePresence>
              {errors.organization && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.organization.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Event Information */}
          <h3 className="text-xl font-bold mt-8 mb-4 roboto-condensed uppercase">Event Information</h3>

          <div className="mb-6">
            <label htmlFor="eventImage" className="block text-sm robotoMedium mb-1">
              Event Image (Max 5MB, JPEG/PNG)
            </label>
            <input
              id="eventImage"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              {...register('eventImage')}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <AnimatePresence>
              {errors.eventImage && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.eventImage.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="mb-6">
            <label className="block text-sm robotoMedium mb-1">Type Of Organization</label>
            <div className="flex flex-wrap gap-4">
              {['Church', 'Promoter', 'Non Profit', 'Others'].map((type) => (
                <label key={type} className="inline-flex items-center raleway-slider">
                  <input
                    type="radio"
                    value={type}
                    {...register('orgType')}
                    className="form-radio text-purple-500"
                  />
                  <span className="ml-2">{type}</span>
                </label>
              ))}
            </div>
            <AnimatePresence>
              {errors.orgType && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.orgType.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="mb-6">
            <label className="block text-sm robotoMedium mb-1">Type Of Event/Program</label>
            <div className="flex flex-wrap gap-4">
              {['Worship Evening', 'Concert', 'Others'].map((type) => (
                <label key={type} className="inline-flex items-center raleway-slider">
                  <input
                    type="radio"
                    value={type}
                    {...register('eventType')}
                    className="form-radio text-purple-500"
                  />
                  <span className="ml-2">{type}</span>
                </label>
              ))}
            </div>
            <AnimatePresence>
              {errors.eventType && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.eventType.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="mb-6">
            <label className="block text-sm robotoMedium mb-1">Date Of Event</label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <select
                  {...register('day')}
                  className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">DD</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <AnimatePresence>
                  {errors.day && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-xs mt-1"
                    >
                      {errors.day.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              
              <div>
                <select
                  {...register('month')}
                  className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Month</option>
                  {MONTHS.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>
                <AnimatePresence>
                  {errors.month && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-xs mt-1"
                    >
                      {errors.month.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              
              <div>
                <select
                  {...register('year')}
                  className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">YYYY</option>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </select>
                <AnimatePresence>
                  {errors.year && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-xs mt-1"
                    >
                      {errors.year.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="eventDetails" className="block text-sm robotoMedium mb-1">Share Event Details</label>
            <textarea
              id="eventDetails"
              {...register('eventDetails')}
              rows={5}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Please describe the event, audience size, theme, and any special requirements..."
            ></textarea>
            <AnimatePresence>
              {errors.eventDetails && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.eventDetails.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Event Location */}
          <h3 className="text-xl robotoMedium mt-8 mb-4 uppercase">Event Location</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="address1" className="block text-sm font-medium mb-1">Address 1</label>
              <input
                id="address1"
                {...register('address1')}
                className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <AnimatePresence>
                {errors.address1 && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-xs mt-1"
                  >
                    {errors.address1.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div>
              <label htmlFor="address2" className="block text-sm robotoMedium mb-1">Address 2</label>
              <input
                id="address2"
                {...register('address2')}
                className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm robotoMedium mb-1">Location</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <select
                  {...register('country')}
                  className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Country</option>
                  {Object.keys(COUNTRY_STATE_CITY_DATA).map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                <AnimatePresence>
                  {errors.country && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-xs mt-1"
                    >
                      {errors.country.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              
              <div>
                <select
                  {...register('state')}
                  className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={!country}
                >
                  <option value="">State</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <AnimatePresence>
                  {errors.state && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-xs mt-1"
                    >
                      {errors.state.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              
              <div>
                <select
                  {...register('city')}
                  className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={!state}
                >
                  <option value="">City</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <AnimatePresence>
                  {errors.city && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-xs mt-1"
                    >
                      {errors.city.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="zipCode" className="block text-sm font-medium mb-1">ZIP Code</label>
            <input
              id="zipCode"
              {...register('zipCode')}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <AnimatePresence>
              {errors.zipCode && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.zipCode.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="mb-8 text-sm">
            <p className="mb-4 robotoMedium">
              By submitting this Request Form, you acknowledge that you will receive emails from the ClaudyGod Team.
              This submission is only a request and does not guarantee participation in the event. Request information
              is needed for processing, and a team member of ClaudyGod will contact you after review.
            </p>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                {...register('agreeTerms')}
                className="form-checkbox text-purple-500"
              />
              <span className="ml-2 robotoMedium">By proceeding, you agree to our Terms of Use and Services.</span>
            </label>
            <AnimatePresence>
              {errors.agreeTerms && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.agreeTerms.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full md:w-auto roboto-condensed border-1 cursor-pointer border-white text-white font-medium py-3 px-8 rounded-md transition duration-150 ease-in-out ${
              isSubmitting 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-purple-800 hover:bg-purple-700'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
      <hr className="my-8 border-purple-900" />
      <NewsletterForm />
    </div>
  );
};