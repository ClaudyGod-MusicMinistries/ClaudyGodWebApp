import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCookie,
  faShieldAlt,
  faChartLine,
  faUserCog,
  faDatabase,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';

import { SEO } from '../../components/util/SEO';
import { LayoutTemplate } from '../../components/util/hero';
import {
  SemiBoldText,
  LightText,
  ExtraBoldText,
  BoldText,
} from '../../components/ui/fonts/typography';
import { About2 } from '../../assets';

export const CookiePolicy: React.FC = () => {
  const { colorScheme } = useTheme();

  const cookieTypes = [
    {
      icon: faShieldAlt,
      title: 'Essential Cookies',
      description:
        'These cookies are necessary for the website to function and cannot be disabled in our systems.',
      duration: 'Session',
      necessity: 'Required',
    },
    {
      icon: faChartLine,
      title: 'Analytics Cookies',
      description:
        'Used to understand how visitors interact with our website to help us improve content and performance.',
      duration: '2 Years',
      necessity: 'Optional',
    },
    {
      icon: faUserCog,
      title: 'Preference Cookies',
      description:
        'Enable the site to remember your settings and preferences for a personalized experience.',
      duration: '1 Year',
      necessity: 'Optional',
    },
    {
      icon: faDatabase,
      title: 'Functional Cookies',
      description:
        'Support enhanced functionality and personalization across multiple sessions.',
      duration: '1 Year',
      necessity: 'Optional',
    },
  ];

  return (
    <main className="relative overflow-hidden bg-white">
      <SEO
        title="Cookie Policy - ClaudyGod Music & Ministries"
        description="Learn how ClaudyGod Music & Ministries uses cookies to enhance your browsing experience and improve our services."
        keywords="cookie policy, cookies, website cookies, claudygod cookies, data privacy, web analytics"
        canonical="https://claudygod.org/cookie-policy"
      />

      {/* Hero Section */}
      <LayoutTemplate
        backgroundImage={About2}
        overlayColor="rgba(0,0,0,0.65)"
        backgroundPosition="center center"
        className="h-[70vh] sm:h-[80vh] md:h-[90vh] min-h-[500px] pt-20 bg-cover"
        title=""
      >
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center text-center w-full h-full px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-sm">
              <FontAwesomeIcon icon={faCookie} className="text-white text-sm" />
              <LightText
                style={{ color: '#fff' }}
                fontSize="14px"
                className="uppercase tracking-widest"
                useThemeColor={false}
              >
                Cookie Policy
              </LightText>
            </div>

            <ExtraBoldText
              style={{
                color: '#fff',
                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                lineHeight: '1.1',
                textShadow: '0 4px 20px rgba(0,0,0,0.8)',
              }}
              useThemeColor={false}
            >
              Cookie Policy
            </ExtraBoldText>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-32 h-1 mx-auto my-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
            />

            <SemiBoldText
              style={{
                color: '#fff',
                fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
                textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                opacity: 0.9,
              }}
              useThemeColor={false}
            >
              Learn how we use cookies to improve your browsing experience.
            </SemiBoldText>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-white rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </LayoutTemplate>

      {/* Cookie Policy Content */}
      <article className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-white">
        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <BoldText
            style={{ color: colorScheme.primary }}
            fontSize="28px"
            className="mb-6"
          >
            Transparency in How We Use Cookies
          </BoldText>
          <LightText
            style={{ color: colorScheme.gray[700] }}
            fontSize="18px"
            className="leading-relaxed max-w-3xl mx-auto"
          >
            Cookies are small text files used to make your experience on our
            website smoother, faster, and more personalized. This page explains
            how and why we use them.
          </LightText>
        </motion.section>

        {/* Cookie Types */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12 sm:mb-16">
            <BoldText
              style={{ color: colorScheme.text }}
              fontSize="32px"
              className="mb-4"
            >
              Types of Cookies We Use
            </BoldText>
            <LightText style={{ color: colorScheme.gray[600] }} fontSize="18px">
              Each category serves a unique purpose in your browsing experience.
            </LightText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {cookieTypes.map((cookie, index) => (
              <motion.div
                key={cookie.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 sm:p-8 rounded-2xl border-2 transition-all duration-500 hover:shadow-xl hover:scale-105"
                style={{
                  borderColor: colorScheme.gray[200],
                  backgroundColor: 'white',
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.accent})`,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={cookie.icon}
                      className="text-white text-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <BoldText
                        style={{ color: colorScheme.text }}
                        fontSize="20px"
                      >
                        {cookie.title}
                      </BoldText>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          cookie.necessity === 'Required'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {cookie.necessity}
                      </span>
                    </div>
                    <LightText
                      style={{ color: colorScheme.gray[700] }}
                      fontSize="15px"
                      className="leading-relaxed mb-3"
                    >
                      {cookie.description}
                    </LightText>
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: colorScheme.gray[500] }}>
                        Duration: <strong>{cookie.duration}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Managing Preferences */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <BoldText
            style={{ color: colorScheme.primary }}
            fontSize="28px"
            className="mb-4"
          >
            Managing Your Preferences
          </BoldText>
          <LightText
            style={{ color: colorScheme.gray[700] }}
            fontSize="17px"
            className="leading-relaxed max-w-4xl mx-auto mb-8"
          >
            You can modify your browser settings to control cookies. However,
            disabling essential cookies may affect site functionality.
          </LightText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:privacy@claudygod.com"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-lg text-white transition-all duration-300 hover:scale-105 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${colorScheme.accent}, ${colorScheme.secondary})`,
              }}
            >
              <FontAwesomeIcon icon={faSyncAlt} />
              <SemiBoldText fontSize="16px">Contact Privacy Team</SemiBoldText>
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-lg border-2 transition-all duration-300 hover:scale-105"
              style={{
                borderColor: colorScheme.primary,
                color: colorScheme.primary,
                backgroundColor: 'transparent',
              }}
            >
              <FontAwesomeIcon icon={faCookie} />
              <SemiBoldText fontSize="16px">Back to Top</SemiBoldText>
            </button>
          </div>
        </motion.section>
      </article>
    </main>
  );
};
