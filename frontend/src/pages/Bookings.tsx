import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Herosection } from '../components/Herosection';
import { VideoBanner2 } from '../assets/'
import { NewsletterForm } from '../components/Newsletter';
import { Modal } from '../components/Modal';

const API_URL = 'http://localhost:5000/api/bookings';

// Country-state-city data structure
const COUNTRY_STATE_CITY_DATA = {
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
      const countryCode = this.parent.countryCode;
      return COUNTRY_STATE_CITY_DATA[countryCode]?.phonePattern.test(value);
    }),
  countryCode: yup.string().required(),
  organization: yup.string().required('Organization is required'),
  orgType: yup.string().required('Organization type is required'),
  eventType: yup.string().required('Event type is required'),
  day: yup.number()
    .required('Day is required')
    .min(1, 'Invalid day')
    .max(31, 'Invalid day'),
  month: yup.string().required('Month is required'),
  year: yup.number()
    .required('Year is required')
    .min(new Date().getFullYear(), 'Year must be current or future'),
  eventDetails: yup.string().required('Event details are required'),
  address1: yup.string().required('Address is required'),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  zipCode: yup.string().required('ZIP code is required'),
  agreeTerms: yup.boolean()
    .oneOf([true], 'You must agree to the terms')
    .required()
});

export const Booking: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const { 
    register, 
    handleSubmit, 
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      countryCode: 'US',
      agreeTerms: false
    }
  });

  const country = watch('country');
  const state = watch('state');
  const countryCode = watch('countryCode');

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
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          eventDate: {
            day: data.day,
            month: data.month,
            year: data.year
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed');
      }
      
      const result = await response.json();
      setModalTitle('Success!');
      setModalContent(result.message);
      setIsModalOpen(true);
      reset();
    } catch (error: any) {
      setModalTitle('Error');
      setModalContent(error.message || 'Failed to submit booking. Please try again.');
      setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-white min-h-screen overflow-y-auto">
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
      >
        <div className="text-gray-700 mb-4">{modalContent}</div>
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
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
              {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm robotoMedium mb-1">Last Name</label>
              <input
                id="lastName"
                {...register('lastName')}
                className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
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
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
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
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          {/* Event Information */}
          <h3 className="text-xl font-bold mt-8 mb-4 roboto-condensed uppercase">Event Information</h3>

          <div className="mb-6">
            <label htmlFor="organization" className="block text-sm robotoMedium mb-1">Organization Name/Host</label>
            <input
              id="organization"
              {...register('organization')}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter Name of Organization or Host Here"
            />
            {errors.organization && <p className="text-red-400 text-xs mt-1">{errors.organization.message}</p>}
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
            {errors.orgType && <p className="text-red-400 text-xs mt-1">{errors.orgType.message}</p>}
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
            {errors.eventType && <p className="text-red-400 text-xs mt-1">{errors.eventType.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm robotoMedium mb-1">Date Of Event</label>
            <div className="grid grid-cols-3 gap-2">
              <select
                {...register('day')}
                className="px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">DD</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select
                {...register('month')}
                className="px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Month</option>
                {MONTHS.map((month, index) => (
                  <option key={index} value={month}>{month}</option>
                ))}
              </select>
              <select
                {...register('year')}
                className="px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">YYYY</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() + i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>
            {errors.day && <p className="text-red-400 text-xs mt-1">{errors.day.message}</p>}
            {errors.month && <p className="text-red-400 text-xs mt-1">{errors.month.message}</p>}
            {errors.year && <p className="text-red-400 text-xs mt-1">{errors.year.message}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="eventDetails" className="block text-sm robotoMedium mb-1">Share Event Details</label>
            <textarea
              id="eventDetails"
              {...register('eventDetails')}
              rows={5}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
            {errors.eventDetails && <p className="text-red-400 text-xs mt-1">{errors.eventDetails.message}</p>}
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
              {errors.address1 && <p className="text-red-400 text-xs mt-1">{errors.address1.message}</p>}
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
              <select
                {...register('country')}
                className="px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Country</option>
                {Object.keys(COUNTRY_STATE_CITY_DATA).map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <select
                {...register('state')}
                className="px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={!country}
              >
                <option value="">State</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <select
                {...register('city')}
                className="px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={!state}
              >
                <option value="">City</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country.message}</p>}
            {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state.message}</p>}
            {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="zipCode" className="block text-sm font-medium mb-1">ZIP Code</label>
            <input
              id="zipCode"
              {...register('zipCode')}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.zipCode && <p className="text-red-400 text-xs mt-1">{errors.zipCode.message}</p>}
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
            {errors.agreeTerms && <p className="text-red-400 text-xs mt-1">{errors.agreeTerms.message}</p>}
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