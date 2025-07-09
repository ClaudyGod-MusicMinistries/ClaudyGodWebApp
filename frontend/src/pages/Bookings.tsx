import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { submitBooking } from '../components/api/bookingApi';
import { Herosection } from '../components/util/Herosection';
import { Back3 } from '../assets/';
import { NewsletterForm } from '../components/util/Newsletter';
import { Modal } from '../components/Modal';
import { COUNTRY_STATE_CITY_DATA, MONTHS } from '../components/util/bookingConstants';
import { PersonalInfoSection } from '../components/Bookings/PersonalInfo';
import { EventInfoSection } from '../components/Bookings/EventInfo';
import { LocationSection } from '../components/Bookings/LocationInfo';
import { TermsSection } from '../components/Bookings/TermsSubmit';
import { DownloadSection } from '../components/util/Download';
import { SEO } from '../components/util/SEO';

export const Bookings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const methods = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      countryCode: 'US',
      organization: '',
      orgType: '',
      eventType: '',
      eventDetails: '',
      eventDate: { day: 1, month: 'January', year: new Date().getFullYear() },
      address: { address1: '', address2: '', country: '', state: '', city: '', zipCode: '' },
      agreeTerms: false,
    },
  });

  const { watch, setValue, reset, handleSubmit } = methods;
  const country = watch('address.country');
  const state = watch('address.state');

  useEffect(() => {
    if (country && COUNTRY_STATE_CITY_DATA[country]) {
      const keys = Object.keys(COUNTRY_STATE_CITY_DATA[country].states);
      setStates(keys);
      setValue('address.state', '');
      setValue('address.city', '');
    } else {
      setStates([]);
      setCities([]);
    }
  }, [country, setValue]);

  useEffect(() => {
    if (country && state && COUNTRY_STATE_CITY_DATA[country]) {
      const list = COUNTRY_STATE_CITY_DATA[country].states[state] || [];
      setCities(list);
      setValue('address.city', '');
    } else {
      setCities([]);
    }
  }, [country, state, setValue]);

  const isBlank = (value: unknown) => typeof value === 'string' ? !value.trim() : value == null;

  const onSubmit = async (data: any) => {
    console.log('Form submission data:', data);
    const requiredTop = ['firstName', 'lastName', 'email', 'phone', 'eventType'];
    const requiredAddr = ['country', 'state', 'city', 'address1'];

    const missing = [
      ...requiredTop.filter((k) => isBlank(data[k])),
      ...requiredAddr.filter((k) => isBlank(data.address[k])),
    ];

    if (missing.length) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      const response = await submitBooking(data);
      console.log('Server response:', response);
      toast.success('Booking submitted! We’ll be in touch shortly.');
      reset();
      setShowThankYouModal(true);
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error(error?.message || 'Failed to submit booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen overflow-y-auto">
      <ToastContainer position="top-right" autoClose={5000} />

      <SEO
        title="Book ClaudyGod for Events | Gospel Artist Booking"
        description="Book ClaudyGod for worship events, concerts, and church services."
        keywords="book gospel artist, christian event booking, worship leader hire"
        canonical="https://claudygod.org/bookings"
        image="https://claudygod.org/images/booking-og.jpg"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Event Booking',
          provider: { '@type': 'Person', name: 'ClaudyGod' },
          areaServed: ['US', 'Nigeria', 'Worldwide'],
          availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://claudygod.org/bookings' },
        }}
      />

      <Modal isOpen={showThankYouModal} onClose={() => setShowThankYouModal(false)} title="Thank You!">
        <div className="text-gray-700 mb-4">
          <p>Thank you for contacting us!</p>
          <p>We will review your request and get in touch shortly.</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setShowThankYouModal(false)}
            className="px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-800 text-white rounded-md hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-md"
          >
            Close
          </button>
        </div>
      </Modal>

      <Herosection
        title="Book ClaudyGod for Your Event"
        subtitle="Fill out the form below to request a booking"
        backgroundImage={Back3}
        overlay="rgba(0,0,0,0.5)"
      />

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Booking Request Form</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-700 mx-auto rounded-full mb-4" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Please fill out all required fields below. Our team will review your request and contact you within 48 hours.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-purple-800 to-indigo-900 py-4 px-8">
            <h2 className="text-xl font-bold text-white">Event Information</h2>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="p-8">
              <div className="grid grid-cols-1 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Contact Information</h3>
                  <PersonalInfoSection countryCode={watch('countryCode')} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Event Details</h3>
                  <EventInfoSection MONTHS={MONTHS} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Event Location</h3>
                  <LocationSection states={states} cities={cities} country={country} COUNTRY_STATE_CITY_DATA={COUNTRY_STATE_CITY_DATA} />
                </div>

                <TermsSection />
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={`relative px-8 py-3 rounded-full font-medium text-white transition-all duration-300
                    ${loading ? 'cursor-not-allowed opacity-60' : 'hover:scale-105'}
                    bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700`}
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                  ) : (
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Submit Booking Request
                    </span>
                  )}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">What to Expect After Submitting</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              {
                step: '1',
                title: 'Confirmation Email',
                desc: "You'll receive an immediate confirmation that we've received your request",
              },
              {
                step: '2',
                title: 'Review Process',
                desc: 'Our team will review your request within 48 business hours',
              },
              {
                step: '3',
                title: 'Personal Contact',
                desc: 'A team member will contact you to discuss details and availability',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white p-6 rounded-xl shadow-md border border-purple-100 text-center">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-700 font-bold text-xl">{step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DownloadSection />
      <NewsletterForm />
    </div>
  );
};