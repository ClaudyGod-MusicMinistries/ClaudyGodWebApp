import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldAlt,
  faUserShield,
  faChartBar,
  faCog,
  faSyncAlt,
  faDatabase,
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

export const PrivacyPolicy: React.FC = () => {
  const { colorScheme } = useTheme();

  const privacySections = [
    {
      icon: faDatabase,
      title: 'Information We Collect',
      description:
        'We collect personal information you provide voluntarily, including name, email, and payment details when making purchases or signing up for our newsletter.',
      details:
        'We also automatically collect usage data like IP address, browser type, and pages visited to improve your experience.',
    },
    {
      icon: faChartBar,
      title: 'How We Use Your Information',
      description:
        'Your information helps us provide and maintain services, process transactions, and communicate ministry updates.',
      features: [
        'Provide and maintain our services',
        'Process transactions and orders',
        'Send newsletters and updates',
        'Improve website and user experience',
        'Communicate about ministry events',
        'Comply with legal obligations',
      ],
    },
    {
      icon: faUserShield,
      title: 'Data Sharing & Protection',
      description:
        'We do not sell, trade, or rent your personal information to third parties.',
      details:
        'We may share information with trusted service providers who assist in operating our website, under strict confidentiality agreements.',
    },
    {
      icon: faCog,
      title: 'Your Rights & Control',
      description:
        'You have full control over your personal information and can manage your preferences at any time.',
      features: [
        'Access your personal data',
        'Correct inaccurate information',
        'Delete your personal data',
        'Opt-out of marketing communications',
        'Manage cookie preferences',
      ],
    },
  ];

  return (
    <main className="relative overflow-hidden bg-white">
      <SEO
        title="Privacy Policy - ClaudyGod Music & Ministries"
        description="Learn how ClaudyGod Music & Ministries collects, uses, and protects your personal information. Your privacy is important to us."
        keywords="privacy policy, data protection, personal information, claudygod privacy"
        canonical="https://claudygod.org/privacy-policy"
      />

      {/* Hero Section */}
      <LayoutTemplate
        backgroundImage={About2}
        overlayColor="rgba(0,0,0,0.65)"
        backgroundPosition="center center"
        className="h-[70vh] sm:h-[80vh] md:h-[90vh] min-h-[600px] pt-20 bg-cover"
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
                icon={faShieldAlt}
                className="text-white text-sm"
              />
              <LightText
                style={{ color: '#fff' }}
                fontSize="14px"
                className="uppercase tracking-widest"
                useThemeColor={false}
              >
                Privacy Policy
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
              Privacy Policy
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
              Your privacy and data security are our top priorities.
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

      {/* Privacy Policy Content */}
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
            Commitment to Your Privacy
          </BoldText>
          <LightText
            style={{ color: colorScheme.gray[700] }}
            fontSize="18px"
            className="leading-relaxed max-w-3xl mx-auto"
          >
            At ClaudyGod Music & Ministries, we are committed to protecting your
            privacy and ensuring the security of your personal information. This
            policy explains how we collect, use, and safeguard your data.
          </LightText>
        </motion.section>

        {/* Privacy Sections */}
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
              Our Privacy Practices
            </BoldText>
            <LightText style={{ color: colorScheme.gray[600] }} fontSize="18px">
              Transparent data handling practices you can trust.
            </LightText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {privacySections.map((section, index) => (
              <motion.div
                key={section.title}
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
                  <ul className="mt-4 space-y-2">
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
            Questions About Your Privacy?
          </BoldText>
          <LightText
            style={{ color: colorScheme.gray[700] }}
            fontSize="17px"
            className="leading-relaxed max-w-4xl mx-auto mb-8"
          >
            We're here to help you understand how we protect your information
            and address any privacy concerns you may have.
          </LightText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:privacy@claudygod.com"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-lg text-white transition-all duration-300 hover:scale-105 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${colorScheme.accent}, ${colorScheme.secondary})`,
              }}
            >
              <FontAwesomeIcon icon={faShieldAlt} />
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
              <FontAwesomeIcon icon={faSyncAlt} />
              <SemiBoldText fontSize="16px">Back to Top</SemiBoldText>
            </button>
          </div>
        </motion.section>
      </article>
    </main>
  );
};
