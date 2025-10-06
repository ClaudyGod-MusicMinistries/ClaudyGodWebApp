// src/pages/Donate.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle,
  faGlobe,
  faCreditCard,
  faHandHoldingUsd,
  faShieldAlt,
  faHeart,
  faPrayingHands,
  faDonate,
} from '@fortawesome/free-solid-svg-icons';
import { Donate1, Donate2 } from '../assets/';
import { useNavContext } from '../contexts/NavContext';
import { useTheme } from '../contexts/ThemeContext';
import { SEO } from '../components/util/SEO';
import { PaymentPlatforms } from '../components/donate/payment';
import { NigerianBankTransfer } from '../components/donate/NigeriaAcct';
import { LayoutTemplate } from '../components/util/hero';
import { DonationCallToAction } from '../components/util/DonationSupport';
import { NewsletterForm } from '../components/util/Newsletter';
import {
  SemiBoldText,
  BoldText,
  LightText,
  ExtraBoldText,
  ExtraLightText,
  RegularText,
} from '../components/ui/fonts/typography';
import CustomButton from '../components/ui/fonts/buttons/CustomButton';

// Currency selector component
const CurrencySelector = ({
  currency,
  setCurrency,
}: {
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { colorScheme } = useTheme();
  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'NGN', symbol: '₦', name: 'Naira' },
  ];

  return (
    <div className="relative flex-shrink-0 w-full sm:w-auto">
      <select
        value={currency}
        onChange={e => setCurrency(e.target.value)}
        style={{
          backgroundColor: colorScheme.gray[100],
          borderColor: colorScheme.gray[300],
          borderRadius: colorScheme.borderRadius.medium,
          color: colorScheme.primary,
        }}
        className="appearance-none w-full h-full px-3 py-2 text-sm bg-gray-100 border border-r-0 rounded-l-md focus:outline-none focus:ring-2 cursor-pointer shadow-sm"
      >
        {currencies.map(curr => (
          <option key={curr.code} value={curr.code}>
            {curr.symbol} {curr.code} - {curr.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

const DonationGuide = () => {
  const { colorScheme } = useTheme();

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: colorScheme.gray[50],
        borderLeftColor: colorScheme.accent,
        borderRadius: colorScheme.borderRadius.large,
      }}
      className="border-l-4 rounded-lg p-4 sm:p-5 mb-6 sm:mb-8 md:mb-10 shadow-sm"
    >
      <div className="flex items-start">
        <FontAwesomeIcon
          icon={faInfoCircle}
          style={{ color: colorScheme.accent }}
          className="text-lg sm:text-xl mt-0.5 sm:mt-1 mr-3 flex-shrink-0"
        />
        <div>
          <SemiBoldText
            style={{ color: colorScheme.primary }}
            fontSize="clamp(1rem, 2vw, 1.125rem)"
            className="mb-2"
          >
            How to Donate
          </SemiBoldText>
          <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-xs sm:text-sm md:text-base">
            <li>
              <LightText style={{ color: colorScheme.primary }}>
                <span
                  style={{ color: colorScheme.accent }}
                  className="font-medium"
                >
                  Select your currency
                </span>{' '}
                - Choose from USD, EUR, GBP or NGN using the dropdown menu
              </LightText>
            </li>
            <li>
              <LightText style={{ color: colorScheme.primary }}>
                <span
                  style={{ color: colorScheme.accent }}
                  className="font-medium"
                >
                  Enter your details
                </span>{' '}
                - Provide your name and donation amount
              </LightText>
            </li>
            <li>
              <LightText style={{ color: colorScheme.primary }}>
                <span
                  style={{ color: colorScheme.accent }}
                  className="font-medium"
                >
                  Choose payment method
                </span>{' '}
                - After clicking "Donate", select your preferred payment option
              </LightText>
            </li>
            <li>
              <LightText style={{ color: colorScheme.primary }}>
                <span
                  style={{ color: colorScheme.accent }}
                  className="font-medium"
                >
                  Complete transaction
                </span>{' '}
                - Follow the secure payment process
              </LightText>
            </li>
          </ul>
        </div>
      </div>
    </motion.aside>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => {
  const { colorScheme } = useTheme();

  return (
    <motion.article
      whileHover={{ y: -4 }}
      style={{
        backgroundColor: colorScheme.white,
        borderRadius: colorScheme.borderRadius.large,
        borderColor: colorScheme.gray[100],
      }}
      className="p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-sm border hover:shadow-md transition-shadow h-full flex flex-col"
    >
      <div
        style={{ backgroundColor: colorScheme.gray[100] }}
        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-3 sm:mb-4"
      >
        <FontAwesomeIcon
          icon={icon}
          style={{ color: colorScheme.accent }}
          className="text-base sm:text-lg md:text-xl"
        />
      </div>
      <SemiBoldText
        style={{ color: colorScheme.background }}
        fontSize="clamp(0.9rem, 2vw, 1.125rem)"
        className="mb-2"
      >
        {title}
      </SemiBoldText>
      <LightText
        style={{ color: colorScheme.background }}
        fontSize="clamp(0.75rem, 1.5vw, 0.875rem)"
        className="flex-grow"
      >
        {description}
      </LightText>
    </motion.article>
  );
};

export const DonateData: React.FC = () => {
  const { isNavOpen } = useNavContext();
  const { colorScheme } = useTheme();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [isCheckout, setIsCheckout] = useState(false);

  // Reset amount when currency changes
  useEffect(() => {
    setAmount('');
  }, [currency]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    setIsCheckout(true);
  };

  const handlePaymentComplete = () => {
    alert(
      'Thank you for your donation! Your support helps spread the gospel through music.'
    );
    setAmount('');
    setName('');
    setIsCheckout(false);
  };

  const handlePaymentBack = () => {
    setIsCheckout(false);
  };

  // Suggested donation amounts based on currency
  const getSuggestedAmounts = () => {
    switch (currency) {
      case 'USD':
        return [10, 25, 50, 100, 250];
      case 'EUR':
        return [10, 20, 50, 100, 200];
      case 'GBP':
        return [10, 20, 40, 75, 150];
      case 'NGN':
        return [5000, 10000, 20000, 50000, 100000];
      default:
        return [10, 25, 50, 100, 250];
    }
  };

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      case 'NGN':
        return '₦';
      default:
        return '$';
    }
  };

  const suggestedAmounts = getSuggestedAmounts();
  const currencySymbol = getCurrencySymbol();

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: colorScheme.background }}
    >
      <SEO
        title="Support Gospel Music Ministry | Donate to ClaudyGod"
        description="Partner with ClaudyGod Ministries to spread the gospel through music. Your donations support worship events, albums, and global outreach."
        keywords="donate to gospel ministry, support christian artist, music ministry donation, kingdom investment"
        canonical="https://claudygod.org/donate"
        image="https://claudygod.org/images/donate-og.jpg"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'DonateAction',
          name: 'Support Gospel Music Ministry',
          description: 'Donation page for ClaudyGod Ministries',
          url: 'https://claudygod.org/donate',
          recipient: {
            '@type': 'Organization',
            name: 'ClaudyGod Ministries',
            url: 'https://claudygod.org',
          },
        }}
      />

      {/* Hero Section - Enhanced Responsiveness */}
      <LayoutTemplate
        backgroundImage={Donate1}
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
              Support Our Ministry
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
              Partner with us to spread the gospel through music
            </SemiBoldText>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-5 h-8 border-2 border-white rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-2 bg-white rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </LayoutTemplate>

      {isCheckout ? (
        <section
          className={`max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-12 ${isNavOpen ? 'filter blur-sm opacity-75' : ''}`}
        >
          {currency === 'NGN' ? (
            <div className="max-w-2xl mx-auto">
              <NigerianBankTransfer
                amount={parseFloat(amount)}
                currency={currency}
                onComplete={handlePaymentComplete}
                onBack={handlePaymentBack}
              />
            </div>
          ) : (
            <PaymentPlatforms
              amount={parseFloat(amount)}
              currency={currency}
              onBack={handlePaymentBack}
              onComplete={handlePaymentComplete}
            />
          )}
        </section>
      ) : (
        /* Donation Content */
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
                icon={faDonate}
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
                SUPPORT MINISTRY
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
                Support Our Ministry
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
                "Each of you should give what you have decided in your heart to
                give, not reluctantly or under compulsion, for God loves a
                cheerful giver." (2 Corinthians 9:7)
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

          {/* Scripture Quote */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="relative my-8 sm:my-12 md:my-16 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl text-center"
            style={{
              background: `linear-gradient(135deg, ${colorScheme.gray[900]}, ${colorScheme.gray[800]})`,
              border: `1px solid ${colorScheme.gray[700]}`,
            }}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <FontAwesomeIcon
                  icon={faPrayingHands}
                  className="mr-2 sm:mr-3 text-base sm:text-lg"
                  style={{ color: colorScheme.accent }}
                />
                <LightText
                  style={{
                    color: 'white',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.375rem)',
                    lineHeight: '1.6',
                    fontStyle: 'italic',
                  }}
                  useThemeColor={false}
                >
                  "And my God will meet all your needs according to the riches
                  of His glory in Christ Jesus." (Philippians 4:19)
                </LightText>
              </div>
              <RegularText
                style={{
                  color: colorScheme.primary,
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                }}
                useThemeColor={false}
              >
                We appreciate your support and donations towards the ministry.
                You partner with us to advance the gospel through music.
              </RegularText>
            </div>
          </motion.blockquote>

          {/* Feature Cards */}
          <section className="mb-8 sm:mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
            >
              <FeatureCard
                icon={faGlobe}
                title="Global Support"
                description="Your donation helps us reach audiences worldwide with gospel music and messages of hope."
              />
              <FeatureCard
                icon={faCreditCard}
                title="Secure Payments"
                description="All transactions are encrypted and processed through trusted payment gateways for your security."
              />
              <FeatureCard
                icon={faShieldAlt}
                title="Trusted Ministry"
                description="We are accountable for every donation and provide regular ministry updates to our supporters."
              />
            </motion.div>
          </section>

          {/* Donation Form */}
          <section className="mb-12 sm:mb-16 md:mb-20">
            <motion.article
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              style={{
                backgroundColor: colorScheme.white,
                borderRadius: colorScheme.borderRadius.xlarge,
              }}
              className="max-w-4xl mx-auto px-4 py-4 sm:py-6 md:py-8 rounded-lg sm:rounded-xl shadow-sm"
            >
              <header className="text-center mb-6 sm:mb-8 md:mb-10">
                <ExtraBoldText
                  style={{ color: colorScheme.primary }}
                  fontSize="clamp(1.5rem, 4vw, 1.75rem)"
                  className="mb-2 sm:mb-3 md:mb-4"
                >
                  Make a Donation
                </ExtraBoldText>
                <LightText
                  style={{ color: colorScheme.primary }}
                  fontSize="clamp(0.75rem, 2vw, 0.875rem)"
                  className="max-w-xl mx-auto"
                >
                  Select your currency and amount to support our gospel music
                  ministry
                </LightText>
              </header>

              <DonationGuide />

              <form
                onSubmit={handleSubmit}
                style={{
                  backgroundColor: colorScheme.gray[50],
                  borderRadius: colorScheme.borderRadius.large,
                }}
                className="p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg"
              >
                <div className="mb-3 sm:mb-4 md:mb-6">
                  <SemiBoldText
                    style={{ color: colorScheme.primary }}
                    fontSize="clamp(0.875rem, 2vw, 1rem)"
                    className="mb-2"
                  >
                    Your Name
                  </SemiBoldText>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{
                      borderColor: colorScheme.gray[300],
                      borderRadius: colorScheme.borderRadius.medium,
                      color: colorScheme.primary,
                      backgroundColor: colorScheme.white,
                    }}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border focus:outline-none focus:ring-2 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-4 sm:mb-6 md:mb-8">
                  <SemiBoldText
                    style={{ color: colorScheme.primary }}
                    fontSize="clamp(0.875rem, 2vw, 1rem)"
                    className="mb-2"
                  >
                    Select Amount ({currency})
                  </SemiBoldText>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 mb-3 sm:mb-4">
                    {suggestedAmounts.map(amt => (
                      <motion.button
                        key={amt}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setAmount(amt.toString())}
                        style={{
                          borderRadius: colorScheme.borderRadius.medium,
                          borderColor:
                            amount === amt.toString()
                              ? colorScheme.accent
                              : colorScheme.gray[300],
                          backgroundColor:
                            amount === amt.toString()
                              ? colorScheme.accent
                              : colorScheme.white,
                          color:
                            amount === amt.toString()
                              ? colorScheme.white
                              : colorScheme.primary,
                        }}
                        className="py-2 sm:py-3 px-2 rounded-lg border transition-all text-xs sm:text-sm md:text-base"
                      >
                        {currencySymbol}
                        {amt}
                      </motion.button>
                    ))}
                  </div>

                  <div className="mb-3 sm:mb-4 md:mb-6">
                    <LightText
                      style={{ color: colorScheme.primary }}
                      fontSize="clamp(0.75rem, 1.5vw, 0.875rem)"
                      className="mb-2"
                    >
                      Or enter a custom amount
                    </LightText>
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-auto mb-2 sm:mb-0">
                        <CurrencySelector
                          currency={currency}
                          setCurrency={setCurrency}
                        />
                      </div>
                      <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        style={{
                          borderColor: colorScheme.gray[300],
                          borderRadius: colorScheme.borderRadius.medium,
                          color: colorScheme.primary,
                          backgroundColor: colorScheme.white,
                        }}
                        className="flex-1 w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-r-lg focus:outline-none focus:ring-2 focus:border-transparent text-sm sm:text-base"
                        placeholder="Enter amount"
                        min="1"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                </div>

                <CustomButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={<FontAwesomeIcon icon={faHandHoldingUsd} />}
                  className="w-full shadow-md hover:shadow-lg text-sm sm:text-base"
                >
                  <BoldText>Donate Now</BoldText>
                </CustomButton>
              </form>

              <footer className="mt-4 sm:mt-6 md:mt-8 text-center">
                <ExtraLightText
                  style={{ color: colorScheme.gray[500] }}
                  fontSize="clamp(0.625rem, 1.5vw, 0.75rem)"
                >
                  Your donation is securely processed. All major cards and
                  payment methods accepted.
                </ExtraLightText>
              </footer>
            </motion.article>

            <motion.footer
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="mt-8 sm:mt-12 md:mt-16 text-center"
            >
              <SemiBoldText
                style={{ color: colorScheme.primary }}
                fontSize="clamp(0.9rem, 2vw, 1.125rem)"
                className="mb-2 sm:mb-3 md:mb-4"
              >
                Have questions about donating?
              </SemiBoldText>
              <LightText
                style={{ color: colorScheme.primary }}
                fontSize="clamp(0.75rem, 1.5vw, 0.875rem)"
                className="max-w-2xl mx-auto"
              >
                Contact us at{' '}
                <span style={{ color: colorScheme.accent }}>
                  info@ClaudyGod.com
                </span>{' '}
                or call
                <span style={{ color: colorScheme.accent }}>
                  {' '}
                  +1 (385) 219‑6632
                </span>{' '}
                for assistance with your donation.
              </LightText>
            </motion.footer>
          </section>
        </article>
      )}

      {/* Newsletter Section */}
      <section
        className="py-8 sm:py-12 md:py-16"
        style={{
          background: `linear-gradient(135deg, ${colorScheme.gray[50]}, ${colorScheme.gray[100]})`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
};
