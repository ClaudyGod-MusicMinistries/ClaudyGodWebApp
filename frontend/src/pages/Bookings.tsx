import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Herosection } from '../components/Utils/Herosection';
import { Back3 } from '../assets/';
import NewsletterForm from '../components/Utils/Newsletter';
import { Modal } from '../components/Modal';
import { submitBooking } from '../components/api/bookingApi';
import { bookingSchema } from '../components/schemas/bookingSchema';
import { CountryCode } from '../components/types/booking';
import { COUNTRY_STATE_CITY_DATA, MONTHS } from '../components/Utils/bookingConstants';
import { PersonalInfoSection } from '../components/Bookings/PersonalInfo';
import { EventInfoSection } from '../components/Bookings/EventInfo';
import { LocationSection } from '../components/Bookings/LocationInfo';
import { TermsSection } from '../components/Bookings/TermsSubmit';
import { DownloadSection } from '../components/Utils/download';
import { SEO } from '../components/Utils/SEO';

export const Bookings: React.FC = () => {
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      countryCode: 'US' as CountryCode,
      agreeTerms: false,
      address2: '',
      eventDate: {
        day: 1,
        month: 'January',
        year: new Date().getFullYear()
      }
    }
  });

  const { watch, setValue, reset, handleSubmit } = methods;
  const country = watch('country') as CountryCode;
  const state = watch('state');
  const countryCode = watch('countryCode') as CountryCode;

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
    try {
      const response = await submitBooking(data);
      if (response.status === 201) {
        toast.success(response.data.message || 'Booking submitted successfully!');
        reset();
        setShowThankYouModal(true);
      }
    } catch (error: any) {
      let errorMessage = 'Failed to submit booking';
      if (error.response) {
        if (error.response.data.errors) {
          errorMessage = error.response.data.errors.join(', ');
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      } else if (error.request) {
        errorMessage = 'No response from server';
      } else {
        errorMessage = error.message || errorMessage;
      }
      toast.error(errorMessage);
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
    <div className="bg-white min-h-screen overflow-y-auto">
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
            className="px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-700 transition"
          >
            Close
          </button>
        </div>
      </Modal>
      
      <div className="relative">
        <Herosection 
          title="ClaudyGod Music & Ministries / Bookings"
          backgroundImage={Back3}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-gray-900 mb-2 roboto-condensed text-40">ClaudyGod Music Ministry</h2>
          <div className="h-1 w-16 bg-purple-900 mb-3"></div>
          <p className="text-gray-700 mb-2 robotoMedium text-18">
            To book ClaudyGod for an event, fill out the form below.
          </p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-purple-900 p-8 rounded-lg shadow-md text-white mb-8">
            <PersonalInfoSection countryCode={countryCode} />
            <EventInfoSection states={states} cities={cities} country={country} MONTHS={MONTHS} />
            <LocationSection 
              states={states} 
              cities={cities} 
              country={country}
              COUNTRY_STATE_CITY_DATA={COUNTRY_STATE_CITY_DATA}
            />
            <TermsSection />
            
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
        </FormProvider>
      </div>
      <DownloadSection/>
      <NewsletterForm />
    </div>
  );
};