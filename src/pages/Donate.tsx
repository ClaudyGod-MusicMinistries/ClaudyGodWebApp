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
} from '@fortawesome/free-solid-svg-icons';
import { Donate1, Donate2 } from '../assets/';
import { useNavContext } from '../contexts/NavContext';
import { useTheme } from '../contexts/ThemeContext';
import { SEO } from '../components/util/SEO';
import { PaymentPlatforms } from '../components/donate/payment';
import { NigerianBankTransfer } from '../components/donate/NigeriaAcct';
import { Herosection } from '../components/util/Herosection';
import { DonationCallToAction } from '../components/util/DonationSupport';
import {
  SemiBoldText,
  BoldText,
  LightText,
  ExtraBoldText,
  ExtraLightText,
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

const DonateHeroSlider: React.FC = () => {
  const { isNavOpen } = useNavContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const images = [Donate1, Donate2];

  useEffect(() => {
    if (isNavOpen) {
      setShouldAnimate(false);
      return;
    }

    setShouldAnimate(true);
    let interval: NodeJS.Timeout | null = null;

    if (shouldAnimate) {
      interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % images.length);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [images.length, shouldAnimate, isNavOpen]);

  return (
    <section
      className={`relative w-full ${isNavOpen ? 'filter blur-sm opacity-75 transition-all duration-300' : ''}`}
    >
      {/* Mobile Version */}
      <div className="md:hidden relative h-[50vh] min-h-[300px] w-full overflow-hidden bg-black">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src={img}
                alt="Donation slide"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Version */}
      <div className="hidden md:block relative h-[90vh] min-h-100px w-full overflow-hidden">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Herosection
              title="Partner with Us to Spread the Gospel"
              subtitle="Your donation makes a difference in our music ministry"
              backgroundImage={img}
              className="absolute inset-0 z-0"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-purple-900/30 z-10" />
      </div>
    </section>
  );
};

const DonationGuide = () => {
  const { colorScheme } = useTheme();

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: colorScheme.gray[50],
        borderLeftColor: colorScheme.accent,
        borderRadius: colorScheme.borderRadius.large,
      }}
      className="border-l-4 rounded-lg p-4 sm:p-5 mb-8 sm:mb-10 shadow-sm"
    >
      <div className="flex items-start">
        <FontAwesomeIcon
          icon={faInfoCircle}
          style={{ color: colorScheme.accent }}
          className="text-xl mt-1 mr-3 flex-shrink-0"
        />
        <div>
          <SemiBoldText
            style={{ color: colorScheme.primary }}
            fontSize="18px"
            className="mb-2"
          >
            How to Donate
          </SemiBoldText>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
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
      whileHover={{ y: -5 }}
      style={{
        backgroundColor: colorScheme.white,
        borderRadius: colorScheme.borderRadius.large,
        borderColor: colorScheme.gray[100],
      }}
      className="p-4 sm:p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow h-full flex flex-col"
    >
      <div
        style={{ backgroundColor: colorScheme.gray[100] }}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 sm:mb-4"
      >
        <FontAwesomeIcon
          icon={icon}
          style={{ color: colorScheme.accent }}
          className="text-lg sm:text-xl"
        />
      </div>
      <SemiBoldText
        style={{ color: colorScheme.background }}
        fontSize="18px"
        className="mb-2"
      >
        {title}
      </SemiBoldText>
      <LightText
        style={{ color: colorScheme.background }}
        fontSize="14px"
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
    <main className="min-h-screen">
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

      <DonateHeroSlider />

      {isCheckout ? (
        <section
          className={`max-w-7xl mx-auto px-4 py-8 md:py-12 ${isNavOpen ? 'filter blur-sm opacity-75' : ''}`}
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
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`max-w-7xl mx-auto px-4 py-8 md:py-12 ${isNavOpen ? 'filter blur-sm opacity-75 transition-all duration-300' : ''}`}
        >
          <header className="text-center mb-12 md:mb-16">
            <ExtraBoldText
              style={{ color: colorScheme.primary }}
              fontSize="32px"
              className="mb-4"
            >
              Support Our Ministry
            </ExtraBoldText>
            <div
              style={{ backgroundColor: colorScheme.accent }}
              className="w-24 h-1 mx-auto mt-4 mb-6 md:mb-8"
            ></div>
            <LightText
              style={{ color: colorScheme.background }}
              fontSize="16px"
              className="max-w-3xl mx-auto leading-relaxed"
            >
              "Each of you should give what you have decided in your heart to
              give, not reluctantly or under compulsion, for God loves a
              cheerful giver." (2 Corinthians 9:7)
              <br />
              <br />
              We appreciate your support and donations towards the ministry. You
              partner with us to advance the gospel through music. "And my God
              will meet all your needs according to the riches of His glory in
              Christ Jesus." (Philippians 4:19)
            </LightText>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
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
          </section>

          <div className="flex justify-center my-8 md:my-10">
            <div
              style={{ backgroundColor: colorScheme.accent }}
              className="h-1 w-16 rounded-full"
            ></div>
          </div>

          <motion.article
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundColor: colorScheme.white,
              borderRadius: colorScheme.borderRadius.xlarge,
            }}
            className="max-w-4xl mx-auto px-4 py-6 sm:py-8 rounded-xl shadow-sm"
          >
            <header className="text-center mb-8 md:mb-10">
              <ExtraBoldText
                style={{ color: colorScheme.primary }}
                fontSize="28px"
                className="mb-3 md:mb-4"
              >
                Make a Donation
              </ExtraBoldText>
              <LightText
                style={{ color: colorScheme.primary }}
                fontSize="14px"
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
              className="p-4 sm:p-6 md:p-8 rounded-lg"
            >
              <div className="mb-4 sm:mb-6">
                <SemiBoldText
                  style={{ color: colorScheme.primary }}
                  fontSize="16px"
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
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border focus:outline-none focus:ring-2 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-6 sm:mb-8">
                <SemiBoldText
                  style={{ color: colorScheme.primary }}
                  fontSize="16px"
                  className="mb-2"
                >
                  Select Amount ({currency})
                </SemiBoldText>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 mb-4">
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
                      className="py-2 sm:py-3 px-2 rounded-lg border transition-all text-sm sm:text-base"
                    >
                      {currencySymbol}
                      {amt}
                    </motion.button>
                  ))}
                </div>

                <div className="mb-4 sm:mb-6">
                  <LightText
                    style={{ color: colorScheme.primary }}
                    fontSize="14px"
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
                      className="flex-1 w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-r-lg focus:outline-none focus:ring-2 focus:border-transparent"
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
                className="w-full shadow-md hover:shadow-lg"
              >
                <BoldText>Donate Now</BoldText>
              </CustomButton>
            </form>

            <footer className="mt-6 sm:mt-8 text-center">
              <ExtraLightText
                style={{ color: colorScheme.gray[500] }}
                fontSize="12px"
              >
                Your donation is securely processed. All major cards and payment
                methods accepted.
              </ExtraLightText>
            </footer>
          </motion.article>

          <footer className="mt-12 sm:mt-16 text-center">
            <SemiBoldText
              style={{ color: colorScheme.primary }}
              fontSize="18px"
              className="mb-3 sm:mb-4"
            >
              Have questions about donating?
            </SemiBoldText>
            <LightText
              style={{ color: colorScheme.primary }}
              fontSize="14px"
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
          </footer>
        </motion.section>
      )}

      <DonationCallToAction
        title="Partner with Our Ministry"
        subtitle="Your Support Makes a Difference"
        description="Join us in spreading the gospel through music. Your generous donations help fund worship events,
         album productions, and global outreach efforts. Every contribution directly impacts lives and advances God's kingdom."
        goFundMeUrl="https://www.gofundme.com/charity/claudygod-music-ministries/donate"
        donateUrl="/donate"
      />
    </main>
  );
};
