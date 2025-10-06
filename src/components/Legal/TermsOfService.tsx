import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileContract,
  faCopyright,
  faUserCircle,
  faCreditCard,
  faBan,
  faUserSlash,
  faEnvelope,
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

export const TermsOfService: React.FC = () => {
  const { colorScheme } = useTheme();

  const termsSections = [
    {
      icon: faFileContract,
      title: 'Agreement to Terms',
      description:
        'By accessing and using our website and services, you accept and agree to be bound by these Terms of Service.',
      details:
        'If you disagree with any part of these terms, you may not access our services.',
    },
    {
      icon: faCopyright,
      title: 'Intellectual Property',
      description:
        'All content on this website is the property of ClaudyGod Music & Ministries.',
      features: [
        'Text, graphics, and logos',
        'Images and audio clips',
        'Digital downloads and software',
        'Protected by international copyright laws',
      ],
    },
    {
      icon: faUserCircle,
      title: 'User Accounts',
      description:
        'Maintain accurate account information and protect your credentials.',
      features: [
        'Provide accurate and complete information',
        'Maintain account confidentiality',
        'Responsible for all account activities',
        'Secure your password and credentials',
      ],
    },
    {
      icon: faCreditCard,
      title: 'Purchases & Payments',
      description:
        'All purchases are subject to availability and our policies.',
      features: [
        'Orders subject to availability',
        'Right to refuse or cancel orders',
        'Prices subject to change',
        'No notice required for price changes',
      ],
    },
    {
      icon: faBan,
      title: 'Prohibited Uses',
      description: 'Activities that are strictly prohibited on our platform.',
      features: [
        'Violating laws or regulations',
        'Infringing intellectual property rights',
        'Harassing or harming others',
        'Uploading viruses or malicious code',
        "Collecting others' personal information",
        'Interfering with website security',
      ],
    },
    {
      icon: faUserSlash,
      title: 'Termination',
      description: 'We reserve the right to terminate access to our services.',
      details:
        'We may terminate or suspend your account immediately, without prior notice or liability, for any reason including breach of Terms.',
    },
  ];

  return (
    <main className="relative overflow-hidden bg-white">
      <SEO
        title="Terms of Service - ClaudyGod Music & Ministries"
        description="Read our Terms of Service to understand the rules and guidelines for using our website and services."
        keywords="terms of service, user agreement, website terms, claudygod terms"
        canonical="https://claudygod.org/terms-of-service"
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
              <FontAwesomeIcon
                icon={faFileContract}
                className="text-white text-sm"
              />
              <LightText
                style={{ color: '#fff' }}
                fontSize="14px"
                className="uppercase tracking-widest"
                useThemeColor={false}
              >
                Terms of Service
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
              Terms of Service
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
              Understand the rules and guidelines for using our services.
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

      {/* Terms of Service Content */}
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
            Our Service Agreement
          </BoldText>
          <LightText
            style={{ color: colorScheme.gray[700] }}
            fontSize="18px"
            className="leading-relaxed max-w-3xl mx-auto"
          >
            These Terms of Service govern your use of ClaudyGod Music &
            Ministries' website and services. Please read them carefully before
            accessing or using our platform.
          </LightText>
        </motion.section>

        {/* Terms Sections */}
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
              Key Terms & Conditions
            </BoldText>
            <LightText style={{ color: colorScheme.gray[600] }} fontSize="18px">
              Important guidelines for using our website and services.
            </LightText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {termsSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 sm:p-8 rounded-2xl border-2 transition-all duration-500 hover:shadow-xl hover:scale-105 h-full flex flex-col"
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
                      icon={section.icon}
                      className="text-white text-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <BoldText
                      style={{ color: colorScheme.text }}
                      fontSize="20px"
                      className="mb-2"
                    >
                      {section.title}
                    </BoldText>
                    <LightText
                      style={{ color: colorScheme.gray[700] }}
                      fontSize="15px"
                      className="leading-relaxed"
                    >
                      {section.description}
                    </LightText>
                  </div>
                </div>

                {section.details && (
                  <LightText
                    style={{ color: colorScheme.gray[600] }}
                    fontSize="14px"
                    className="leading-relaxed mt-3"
                  >
                    {section.details}
                  </LightText>
                )}

                {section.features && (
                  <ul className="mt-4 space-y-2 flex-grow">
                    {section.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: colorScheme.primary }}
                        />
                        <LightText
                          style={{ color: colorScheme.gray[700] }}
                          fontSize="14px"
                          className="leading-relaxed"
                        >
                          {feature}
                        </LightText>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
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
            Questions About Our Terms?
          </BoldText>
          <LightText
            style={{ color: colorScheme.gray[700] }}
            fontSize="17px"
            className="leading-relaxed max-w-4xl mx-auto mb-8"
          >
            If you have any questions about these Terms of Service, please don't
            hesitate to reach out to our legal team.
          </LightText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:legal@claudygod.com"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-lg text-white transition-all duration-300 hover:scale-105 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${colorScheme.accent}, ${colorScheme.secondary})`,
              }}
            >
              <FontAwesomeIcon icon={faEnvelope} />
              <SemiBoldText fontSize="16px">Contact Legal Team</SemiBoldText>
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
              <FontAwesomeIcon icon={faSyncAlt} />
              <SemiBoldText fontSize="16px">Back to Top</SemiBoldText>
            </button>
          </div>
        </motion.section>
      </article>
    </main>
  );
};
