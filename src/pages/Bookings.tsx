/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faClock,
  faUserCheck,
} from '@fortawesome/free-solid-svg-icons';

import CustomButton from '../components/ui/fonts/buttons/CustomButton';
import {
  BoldText,
  SemiBoldText,
  RegularText,
  LightText,
  ExtraBoldText,
} from '../components/ui/fonts/typography';

import { submitBooking } from '../components/api/bookingApi';
import { LayoutTemplate } from '../components/util/hero';
import { Back3 } from '../assets/';
import { NewsletterForm } from '../components/util/Newsletter';
import { Modal } from '../components/Modal';
import {
  COUNTRY_STATE_CITY_DATA,
  MONTHS,
} from '../components/util/bookingConstants';
import { PersonalInfoSection } from '../components/Bookings/PersonalInfo';
import { EventInfoSection } from '../components/Bookings/EventInfo';
import { LocationSection } from '../components/Bookings/LocationInfo';
import { TermsSection } from '../components/Bookings/TermsSubmit';
import { DownloadSection } from '../components/util/Download';
import { SEO } from '../components/util/SEO';
import { CountryCode } from '@/components/types/booking';

export const Bookings: React.FC = () => {
  const { colorScheme } = useTheme();
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
      address: {
        address1: '',
        address2: '',
        country: '',
        state: '',
        city: '',
        zipCode: '',
      },
      agreeTerms: false,
    },
  });

  const { watch, setValue, reset, handleSubmit } = methods;
  const country = watch('address.country');
  const state = watch('address.state');

  useEffect(() => {
    if (country && COUNTRY_STATE_CITY_DATA[country as CountryCode]) {
      const keys = Object.keys(
        COUNTRY_STATE_CITY_DATA[country as CountryCode].states
      );
      setStates(keys);
      setValue('address.state', '');
      setValue('address.city', '');
    } else {
      setStates([]);
      setCities([]);
    }
  }, [country, setValue]);

  useEffect(() => {
    if (country && state && COUNTRY_STATE_CITY_DATA[country as CountryCode]) {
      const list =
        COUNTRY_STATE_CITY_DATA[country as CountryCode].states[state] || [];
      setCities(list);
      setValue('address.city', '');
    } else {
      setCities([]);
    }
  }, [country, state, setValue]);

  const isBlank = (value: unknown) =>
    typeof value === 'string' ? !value.trim() : value == null;

  const onSubmit = async (data: any) => {
    const requiredTop = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'eventType',
    ];
    const requiredAddr = ['country', 'state', 'city', 'address1'];

    const missing = [
      ...requiredTop.filter(k => isBlank(data[k])),
      ...requiredAddr.filter(k => isBlank(data.address[k])),
    ];

    if (missing.length) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      await submitBooking(data);
      toast.success(`'Booking submitted! We'll be in touch shortly.'`);
      reset();
      setShowThankYouModal(true);
    } catch (error: any) {
      toast.error(error?.message || 'Failed to submit booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto">
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
          availableChannel: {
            '@type': 'ServiceChannel',
            serviceUrl: 'https://claudygod.org/bookings',
          },
        }}
      />

      <Modal
        isOpen={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
        title="Thank You!"
      >
        <RegularText className="mb-4">
          Thank you for contacting us! We will review your request and get in
          touch shortly.
        </RegularText>
        <div className="flex justify-end">
          <CustomButton
            onClick={() => setShowThankYouModal(false)}
            variant="primary"
            size="md"
          >
            Close
          </CustomButton>
        </div>
      </Modal>

      {/* Hero Section */}
      <LayoutTemplate
        backgroundImage={Back3}
        overlayColor="rgba(0,0,0,0.55)"
        backgroundPosition="center center"
        className="h-[100vh] md:h-[100vh]"
        title={''}
      >
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-6"
          >
            <ExtraBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: '1.1',
                textShadow: '0 4px 8px rgba(0,0,0,0.6)',
                marginBottom: '1rem',
              }}
              useThemeColor={false}
            >
              Book ClaudyGod
            </ExtraBoldText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mb-8 mx-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-3xl"
          >
            <SemiBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                lineHeight: '1.4',
              }}
              useThemeColor={false}
            >
              Fill out the form below to request a booking for your worship
              event, concert, or church service
            </SemiBoldText>
          </motion.div>
        </motion.div>
      </LayoutTemplate>

      {/* Booking Content */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Section Header */}
        <header className="mb-12 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-opacity-10 mb-6"
            style={{ backgroundColor: `${colorScheme.primary}20` }}
          >
            <FontAwesomeIcon
              icon={faCalendarAlt}
              style={{ color: colorScheme.primary }}
            />
            <LightText
              style={{
                color: colorScheme.primary,
                fontSize: '0.875rem',
                letterSpacing: '0.05em',
              }}
              useThemeColor={false}
            >
              EVENT BOOKING
            </LightText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ExtraBoldText
              style={{
                color: colorScheme.primary,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: '1.2',
                marginBottom: '1rem',
              }}
              useThemeColor={false}
            >
              Booking Request Form
            </ExtraBoldText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <SemiBoldText
              style={{
                color: colorScheme.accent,
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                lineHeight: '1.6',
              }}
              useThemeColor={false}
            >
              Please fill out all required fields below. Our team will review
              your request within 48 hours.
            </SemiBoldText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-24 h-1 mx-auto mt-6 rounded-full"
            style={{ backgroundColor: colorScheme.accent }}
          />
        </header>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl shadow-xl overflow-hidden border"
          style={{
            borderColor: colorScheme.borderLight,
          }}
        >
          <div
            className="py-4 px-8"
            style={{ background: colorScheme.primary }}
          >
            <SemiBoldText
              as="h2"
              className="text-white"
              style={{ background: colorScheme.primary }}
            >
              Event Information
            </SemiBoldText>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="p-8">
              <div className="grid grid-cols-1 gap-8">
                <div>
                  <SemiBoldText
                    as="h3"
                    className="text-lg mb-4 pb-2 border-b"
                    style={{
                      borderColor: colorScheme.background,
                      color: colorScheme.background,
                    }}
                  >
                    Contact Information
                  </SemiBoldText>
                  <PersonalInfoSection countryCode={watch('countryCode')} />
                </div>

                <div>
                  <SemiBoldText
                    as="h3"
                    className="text-lg mb-4 pb-2 border-b"
                    style={{
                      borderColor: colorScheme.background,
                      color: colorScheme.background,
                    }}
                  >
                    Event Details
                  </SemiBoldText>
                  <EventInfoSection MONTHS={MONTHS} />
                </div>

                <div>
                  <SemiBoldText
                    as="h3"
                    className="text-lg mb-4 pb-2 border-b"
                    style={{
                      borderColor: colorScheme.background,
                      color: colorScheme.background,
                    }}
                  >
                    Event Location
                  </SemiBoldText>
                  <LocationSection
                    states={states}
                    cities={cities}
                    country={country as CountryCode}
                    COUNTRY_STATE_CITY_DATA={COUNTRY_STATE_CITY_DATA}
                  />
                </div>

                <TermsSection />
              </div>

              <div className="mt-8 flex justify-center">
                <CustomButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth={false}
                  isLoading={loading}
                  className="px-8 py-3 rounded-full"
                >
                  Submit Booking Request
                </CustomButton>
              </div>
            </form>
          </FormProvider>
        </motion.div>
      </article>

      {/* Process Section */}
      <section
        className="py-12 md:py-16"
        style={{ background: colorScheme.gray[50] }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <ExtraBoldText
              style={{
                color: colorScheme.primary,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: '1.2',
                marginBottom: '1rem',
              }}
              useThemeColor={false}
            >
              What to Expect After Submitting
            </ExtraBoldText>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-24 h-1 mx-auto mt-4 rounded-full"
              style={{ backgroundColor: colorScheme.accent }}
            />
          </motion.header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              {
                step: '1',
                icon: faClock,
                title: 'Confirmation Email',
                desc: "You'll receive an immediate confirmation that we've received your request",
              },
              {
                step: '2',
                icon: faCalendarAlt,
                title: 'Review Process',
                desc: 'Our team will review your request within 48 business hours',
              },
              {
                step: '3',
                icon: faUserCheck,
                title: 'Personal Contact',
                desc: 'A team member will contact you to discuss details and availability',
              },
            ].map(({ step, icon, title, desc }) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: step * 0.1 }}
                className="p-6 rounded-xl shadow-md border text-center"
                style={{
                  backgroundColor: colorScheme.surface,
                  borderColor: colorScheme.border,
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: colorScheme.secondary }}
                >
                  <FontAwesomeIcon
                    icon={icon}
                    className="text-xl"
                    style={{ color: colorScheme.white }}
                  />
                </div>
                <SemiBoldText as="h3" className="text-lg mb-2">
                  {title}
                </SemiBoldText>
                <RegularText style={{ color: colorScheme.textSecondary }}>
                  {desc}
                </RegularText>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <DownloadSection />

      {/* Newsletter Section */}
      <section
        className="py-12 md:py-16"
        style={{
          background: `linear-gradient(135deg, ${colorScheme.gray[50]}, ${colorScheme.gray[100]})`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
};
