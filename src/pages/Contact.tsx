import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { LayoutTemplate } from '../components/util/hero';
import { About1, bgresize, Log, Tour2 } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import SuccessModal from '../components/contact/SuccessModal';
import { NewsletterForm } from '../components/util/Newsletter';
import { DonationCallToAction } from '../components/util/DonationSupport';
import { motion } from 'framer-motion';
import {
  // faFacebookF,
  // faXTwitter,
  // faInstagram,
  // faYoutube,
  faEnvelope,
  faPhone,
  faComments,
} from '@fortawesome/free-solid-svg-icons';
import {
  SemiBoldText,
  BoldText,
  LightText,
  ExtraBoldText,
  RegularText,
} from '../components/ui/fonts/typography';
import { SEO } from '../components/util/SEO';
import {
  faFacebookF,
  faXTwitter,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';

export const ContactData: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { colorScheme } = useTheme();

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/health`);
        const data = await res.json();
        console.log('Backend status:', data.status);
        console.log('Environment:', data.environment);
      } catch (error) {
        console.error('Backend connection failed:', error);
      }
    };
    checkBackendHealth();
  }, []);

  return (
    <main
      className="relative overflow-hidden"
      style={{
        backgroundColor: colorScheme.background,
      }}
    >
      <SEO
        title="Contact ClaudyGod Ministries - Prayer Requests & Testimonies"
        description="Get in touch with ClaudyGod Ministries. Share your prayer requests, testimonies, or comments. We're here to support your spiritual journey."
        keywords="contact claudygod, prayer requests, gospel ministry contact, christian support, testimony sharing"
        canonical="https://claudygod.org/contact"
        image="https://claudygod.org/images/contact-og.jpg"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact ClaudyGod Ministries',
          description:
            'Contact page for prayer requests and ministry inquiries',
          url: 'https://claudygod.org/contact',
          publisher: {
            '@type': 'Organization',
            name: 'ClaudyGod Ministries',
          },
        }}
      />

      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Hero Section */}
      <LayoutTemplate
        backgroundImage={Tour2}
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
              Contact Us
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
              We're here for you. Leave a prayer request, testimony, or comment.
            </SemiBoldText>
          </motion.div>
        </motion.div>
      </LayoutTemplate>

      {/* Contact Content */}
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
              icon={faComments}
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
              GET IN TOUCH
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
              We Are Here For You
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
              Please leave a prayer request, testimony or a comment. We're here
              to support your spiritual journey and connect with you.
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

        {/* Contact Form & Info Grid */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* Contact Form */}
            <motion.article
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
              style={{
                borderRadius: colorScheme.borderRadius.large,
              }}
            >
              <div className="mb-6">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                  style={{ backgroundColor: `${colorScheme.primary}10` }}
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ color: colorScheme.primary }}
                  />
                  <LightText
                    style={{
                      color: colorScheme.primary,
                      fontSize: '0.875rem',
                    }}
                    useThemeColor={false}
                  >
                    SEND US A MESSAGE
                  </LightText>
                </div>
                <SemiBoldText
                  style={{ color: colorScheme.text }}
                  fontSize="1.5rem"
                >
                  Contact Form
                </SemiBoldText>
              </div>
              <ContactForm onSuccess={() => setIsModalOpen(true)} />
            </motion.article>

            {/* Contact Info */}
            <motion.article
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl shadow-xl p-6 md:p-8"
              style={{
                borderRadius: colorScheme.borderRadius.large,
                background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
              }}
            >
              <div className="mb-6">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                  style={{ backgroundColor: `${colorScheme.white}20` }}
                >
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{ color: colorScheme.white }}
                  />
                  <LightText
                    style={{
                      color: colorScheme.white,
                      fontSize: '0.875rem',
                    }}
                    useThemeColor={false}
                  >
                    CONTACT INFORMATION
                  </LightText>
                </div>
                <SemiBoldText
                  style={{ color: colorScheme.white }}
                  fontSize="1.5rem"
                >
                  Get In Touch
                </SemiBoldText>
              </div>
              <ContactInfo />
            </motion.article>
          </motion.div>
        </section>

        {/* Donation Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <DonationCallToAction
            title="Partner with Our Ministry"
            subtitle="Your Support Makes a Difference"
            description="Join us in spreading the gospel through music. Your generous donations help fund worship events, album productions, and global outreach efforts. Every contribution directly impacts lives and advances God's kingdom."
            goFundMeUrl="https://www.gofundme.com/charity/claudygod-music-ministries/donate"
            donateUrl="/donate"
          />
        </motion.section>

        {/* Newsletter Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-2xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto"
          style={{
            borderRadius: colorScheme.borderRadius.large,
            background: `linear-gradient(135deg, ${colorScheme.gray[50]}, ${colorScheme.gray[100]})`,
          }}
        >
          <NewsletterForm />
        </motion.section>
      </article>

      {/* Footer */}
      <footer
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})`,
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl"
            style={{ backgroundColor: colorScheme.accent }}
          ></div>
          <div
            className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl"
            style={{ backgroundColor: colorScheme.secondary }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <BoldText
                className="text-3xl md:text-4xl mb-6"
                style={{ color: colorScheme.white }}
              >
                ClaudyGod Music & Ministries
              </BoldText>
            </motion.div>

            <motion.div
              className="w-24 h-1 rounded-full mx-auto my-6"
              style={{
                background: `linear-gradient(to right, ${colorScheme.accent}, ${colorScheme.highlight})`,
              }}
              initial={{ width: 0 }}
              whileInView={{ width: '6rem' }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <LightText
                className="text-lg mb-8 max-w-2xl mx-auto"
                style={{ color: colorScheme.white }}
              >
                Connect With Us On Various Social Platforms
              </LightText>
            </motion.div>

            <motion.nav
              className="flex justify-center space-x-4 sm:space-x-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, staggerChildren: 0.1 }}
            >
              {[
                {
                  icon: faFacebookF,
                  url: 'https://www.facebook.com/yourpage',
                  label: 'Facebook',
                },
                {
                  icon: faXTwitter,
                  url: 'https://x.com/yourhandle',
                  label: 'X (Twitter)',
                },
                {
                  icon: faInstagram,
                  url: 'https://www.instagram.com/yourprofile',
                  label: 'Instagram',
                },
                {
                  icon: faYoutube,
                  url: 'https://www.youtube.com/yourchannel',
                  label: 'YouTube',
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border"
                  style={{
                    backgroundColor: `${colorScheme.white}10`,
                    backdropFilter: 'blur(10px)',
                    borderColor: `${colorScheme.white}20`,
                  }}
                  aria-label={`Follow us on ${social.label}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <FontAwesomeIcon
                    icon={social.icon}
                    className="text-xl"
                    style={{ color: colorScheme.white }}
                  />
                </motion.a>
              ))}
            </motion.nav>
          </div>
        </div>
      </footer>
    </main>
  );
};
