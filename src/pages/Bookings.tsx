import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const { colorScheme } = useTheme();

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
    <main
      className="relative overflow-hidden"
      style={{
        backgroundColor: colorScheme.text,
      }}
    >
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

      <ToastContainer position="top-right" autoClose={5000} />

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
        className="h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-[100vh] min-h-[500px]"
        title={''}
      >
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center text-center w-full h-full px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            <ExtraBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2rem, 8vw, 4.5rem)',
                lineHeight: '1.1',
                textShadow: '0 4px 12px rgba(0,0,0,0.8)',
                marginBottom: '0.5rem',
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
            className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mb-4 sm:mb-6 md:mb-8 mx-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <SemiBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.125rem, 4vw, 1.75rem)',
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
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
      <article className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Section Header */}
        <header className="mb-8 sm:mb-12 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-opacity-10 mb-4 sm:mb-6"
            style={{ backgroundColor: `${colorScheme.primary}20` }}
          >
            <FontAwesomeIcon
              icon={faCalendarAlt}
              style={{ color: colorScheme.primary }}
              className="text-sm sm:text-base"
            />
            <LightText
              style={{
                color: colorScheme.primary,
                fontSize: 'clamp(0.75rem, 3vw, 0.875rem)',
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
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ExtraBoldText
              style={{
                color: colorScheme.primary,
                fontSize: 'clamp(1.75rem, 6vw, 3rem)',
                lineHeight: '1.1',
                marginBottom: '0.75rem',
              }}
              useThemeColor={false}
            >
              Booking Request Form
            </ExtraBoldText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <SemiBoldText
              style={{
                color: colorScheme.accent,
                fontSize: 'clamp(1rem, 3vw, 1.375rem)',
                lineHeight: '1.5',
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
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-16 sm:w-20 md:w-24 h-1 mx-auto mt-4 sm:mt-6 rounded-full"
            style={{ backgroundColor: colorScheme.accent }}
          />
        </header>

        {/* Booking Form */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl shadow-xl overflow-hidden border"
            style={{
              borderColor: colorScheme.borderLight,
            }}
          >
            <div
              className="py-4 px-6 sm:px-8"
              style={{ background: colorScheme.primary }}
            >
              <SemiBoldText as="h2" className="text-white text-lg sm:text-xl">
                Event Information
              </SemiBoldText>
            </div>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8">
                <div className="grid grid-cols-1 gap-6 sm:gap-8">
                  <motion.article
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <SemiBoldText
                      as="h3"
                      className="text-base sm:text-lg mb-4 pb-2 border-b"
                      style={{
                        borderColor: colorScheme.background,
                        color: colorScheme.background,
                      }}
                    >
                      Contact Information
                    </SemiBoldText>
                    <PersonalInfoSection countryCode={watch('countryCode')} />
                  </motion.article>

                  <motion.article
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <SemiBoldText
                      as="h3"
                      className="text-base sm:text-lg mb-4 pb-2 border-b"
                      style={{
                        borderColor: colorScheme.background,
                        color: colorScheme.background,
                      }}
                    >
                      Event Details
                    </SemiBoldText>
                    <EventInfoSection MONTHS={MONTHS} />
                  </motion.article>

                  <motion.article
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <SemiBoldText
                      as="h3"
                      className="text-base sm:text-lg mb-4 pb-2 border-b"
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
                  </motion.article>

                  <motion.article
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <TermsSection />
                  </motion.article>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-8 flex justify-center"
                >
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
                </motion.div>
              </form>
            </FormProvider>
          </motion.div>
        </motion.section>

        {/* Process Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <ExtraBoldText
              style={{
                color: colorScheme.primary,
                fontSize: 'clamp(1.75rem, 6vw, 3rem)',
                lineHeight: '1.1',
                marginBottom: '0.75rem',
              }}
              useThemeColor={false}
            >
              What to Expect After Submitting
            </ExtraBoldText>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-16 sm:w-20 md:w-24 h-1 mx-auto mt-4 sm:mt-6 rounded-full"
              style={{ backgroundColor: colorScheme.accent }}
            />
          </motion.header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: 1, // Changed from '1' to 1 (number instead of string)
                icon: faClock,
                title: 'Confirmation Email',
                desc: "You'll receive an immediate confirmation that we've received your request",
              },
              {
                step: 2, // Changed from '2' to 2 (number instead of string)
                icon: faCalendarAlt,
                title: 'Review Process',
                desc: 'Our team will review your request within 48 business hours',
              },
              {
                step: 3, // Changed from '3' to 3 (number instead of string)
                icon: faUserCheck,
                title: 'Personal Contact',
                desc: 'A team member will contact you to discuss details and availability',
              },
            ].map(({ step, icon, title, desc }) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: step * 0.1 }}
                className="p-6 rounded-xl shadow-md border text-center"
                style={{
                  backgroundColor: colorScheme.surface,
                  borderColor: colorScheme.border,
                }}
              >
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: colorScheme.secondary }}
                >
                  <FontAwesomeIcon
                    icon={icon}
                    className="text-lg sm:text-xl"
                    style={{ color: colorScheme.white }}
                  />
                </div>
                <SemiBoldText as="h3" className="text-base sm:text-lg mb-2">
                  {title}
                </SemiBoldText>
                <RegularText
                  style={{ color: colorScheme.textSecondary }}
                  className="text-sm sm:text-base"
                >
                  {desc}
                </RegularText>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Download Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <DownloadSection />
        </motion.section>

        {/* Newsletter Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            borderRadius: colorScheme.borderRadius.xlarge,
            background: `linear-gradient(135deg, ${colorScheme.gray[50]}, ${colorScheme.gray[100]})`,
          }}
          className="p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl shadow-sm max-w-4xl mx-auto"
        >
          <NewsletterForm />
        </motion.section>
      </article>
    </main>
  );
};
