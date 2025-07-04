import { useState, useEffect } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Herosection } from '../components/util/Herosection';
import { Back3 } from '../assets/';
import { NewsletterForm } from '../components/util/Newsletter';
import { Modal } from '../components/Modal';
import { submitBooking } from '../components/api/bookingApi';
import { bookingSchema } from '../components/schemas/bookingSchema';
import { CountryCode } from '../components/types/booking';
import { COUNTRY_STATE_CITY_DATA, MONTHS } from '../components/util/bookingConstants';
import { PersonalInfoSection } from '../components/Bookings/PersonalInfo';
import { EventInfoSection } from '../components/Bookings/EventInfo';
import { LocationSection } from '../components/Bookings/LocationInfo';
import { TermsSection } from '../components/Bookings/TermsSubmit';
import { DownloadSection } from '../components/util/Download';
import { SEO } from '../components/util/SEO';

export const Bookings: React.FC = () => {
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      countryCode: 'US' as CountryCode,
      organization: '',
      orgType: '',
      eventType: '',
      eventDetails: '',
      eventDate: {
        day: 1,
        month: 'January',
        year: new Date().getFullYear()
      },
      address: {
        address1: '',
        address2: '',
        country: '',
        state: '',
        city: '',
        zipCode: ''
      },
      agreeTerms: false
    }
  });

  const { watch, setValue, reset, handleSubmit } = methods;
  const country = watch('address.country') as CountryCode;
  const state = watch('address.state');
  const countryCode = watch('countryCode') as CountryCode;

  useEffect(() => {
    if (country && COUNTRY_STATE_CITY_DATA[country]) {
      const countryStates = Object.keys(COUNTRY_STATE_CITY_DATA[country].states);
      setStates(countryStates);
      setValue('address.state', '');
      setValue('address.city', '');
    } else {
      setStates([]);
      setCities([]);
    }
  }, [country, setValue]);

  useEffect(() => {
    if (country && state && COUNTRY_STATE_CITY_DATA[country]) {
      const stateCities = COUNTRY_STATE_CITY_DATA[country].states[state] || [];
      setCities(stateCities);
      setValue('address.city', '');
    } else {
      setCities([]);
    }
  }, [country, state, setValue]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    console.log('Submitting booking data:', data);
    
    try {
      const response = await submitBooking(data);
      console.log('Booking response:', response);
      toast.success('Booking submitted successfully!');
      reset();
      setShowThankYouModal(true);
    } catch (error: any) {
      console.error('Booking error:', error);
      
      if (error.errors) {
        Object.entries(error.errors).forEach(([field, message]) => {
          methods.setError(field, {
            type: 'manual',
            message: message as string
          });
        });
        toast.error('Please fix the validation errors');
      } else {
        toast.error(error.message || 'Failed to submit booking');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/health`);
        const data = await res.json();
        console.log("Backend status:", data.status);
      } catch (error) {
        console.error("Backend connection failed:", error);
      }
    };
    checkBackendHealth();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen overflow-y-auto">
      <SEO
        title="Book ClaudyGod for Events | Gospel Artist Booking"
        description="Book ClaudyGod for worship events, concerts, and church services. International gospel artist available for bookings worldwide."
        keywords="book gospel artist, christian event booking, worship leader hire, church concert booking"
        canonical="https://claudygod.org/bookings"
        image="https://claudygod.org/images/booking-og.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Event Booking",
          "provider": {
            "@type": "Person",
            "name": "ClaudyGod"
          },
          "areaServed": ["US", "Nigeria", "Worldwide"],
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": "https://claudygod.org/bookings"
          }
        }}
      />
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
            className="px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-800 text-white rounded-md hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-md"
          >
            Close
          </button>
        </div>
      </Modal>
      
      <div className="relative">
        <Herosection 
          title="Book ClaudyGod for Your Event"
          subtitle="Fill out the form below to request a booking"
          backgroundImage={Back3}
          overlay="rgba(0,0,0,0.5)"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Booking Request Form
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-700 mx-auto rounded-full mb-4"></div>
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Contact Information
                  </h3>
                  <PersonalInfoSection countryCode={countryCode} />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Event Details
                  </h3>
                  <EventInfoSection MONTHS={MONTHS} />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Event Location
                  </h3>
                  <LocationSection 
                    states={states} 
                    cities={cities} 
                    country={country}
                    COUNTRY_STATE_CITY_DATA={COUNTRY_STATE_CITY_DATA}
                  />
                </div>
                
                <TermsSection />
              </div>
              
              <div className="mt-8 flex justify-center">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`relative px-8 py-3 rounded-full font-medium text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700 shadow-lg
                    ${isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700'}`
                  }
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
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
            <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100 text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-700 font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirmation Email</h3>
              <p className="text-gray-600">You'll receive an immediate confirmation that we've received your request</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100 text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-700 font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Process</h3>
              <p className="text-gray-600">Our team will review your request within 48 business hours</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100 text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-700 font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Contact</h3>
              <p className="text-gray-600">A team member will contact you to discuss details and availability</p>
            </div>
          </div>
        </div>
      </div>
      
      <DownloadSection/>
      <NewsletterForm/>
    </div>
  );
};