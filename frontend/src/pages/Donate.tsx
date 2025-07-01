import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWallet, 
  faArrowDown, 
  faInfoCircle,
  faGlobe,
  faCreditCard,
  faHandHoldingUsd,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import { Herosection } from '../components/Utils/Herosection';    
import { Donate1, Donate2 } from '../assets/';
import { useNavContext } from '../contexts/NavContext';
import { SEO } from '../components/Utils/SEO';
import { PaymentPlatforms } from '../components/DonatePayment/payment';
import { NigerianBankTransfer } from '../components/DonatePayment/NigeriaAcct';

// Currency selector component
const CurrencySelector = ({ currency, setCurrency }: { currency: string, setCurrency: React.Dispatch<React.SetStateAction<string>> }) => {
  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'NGN', symbol: '₦', name: 'Naira' },
  ];

  return (
    <div className="relative flex-shrink-0">
      <select 
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="appearance-none h-full px-3 py-2 text-sm text-gray-900 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer shadow-sm"
      >
        {currencies.map((curr) => (
          <option key={curr.code} value={curr.code}>
            {curr.symbol} {curr.code} - {curr.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [images.length, shouldAnimate, isNavOpen]);

  return (
    <div className={`relative w-full ${isNavOpen ? 'filter blur-sm opacity-75 transition-all duration-300' : ''}`}>
      {/* Mobile Version */}
      <div className="md:hidden relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-black">
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
                className="h-[400px] w-[400px] object-cover rounded-lg shadow-xl border-4 border-white"
              />
            </div>
            
            {/* <div className="absolute inset-0 bg-black/60 z-60 flex flex-col items-center justify-center">
              <h1 className="text-white text-2xl font-bold mb-4 roboto-condensed text-center">
                Support Gospel Music Ministry
              </h1>
              <p className="text-white text-base mb-6 text-center px-4 max-w-md">
                Your generosity helps spread the gospel through music worldwide
              </p>
              <button className="bg-purple-700 hover:bg-purple-800 cursor-pointer text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
                <FontAwesomeIcon icon={faWallet} className="h-5 w-5" />
                Donate Now
              </button>
            </div> */}
          </div>
        ))}
      </div>

      {/* Desktop Version */}
      <div className="hidden md:block relative h-[60vh] min-h-[400px] w-full overflow-hidden">
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
        {/* <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 roboto-condensed max-w-3xl">
            Support Gospel Music Ministry
          </h1>
          <p className="text-white text-xl mb-8 max-w-2xl">
            Your generosity helps spread the gospel through music worldwide
          </p>
          <button className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
            <FontAwesomeIcon icon={faWallet} className="h-5 w-5" />
            Donate Now
          </button>
        </div> */}
      </div>
    </div>
  );
};

const DonationGuide = () => (
  <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-5 mb-10 shadow-sm">
    <div className="flex items-start">
      <FontAwesomeIcon 
        icon={faInfoCircle} 
        className="text-purple-600 text-xl mt-1 mr-3 flex-shrink-0" 
      />
      <div>
        <h3 className="text-lg font-semibold text-purple-900 mb-2">How to Donate</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>
            <span className="font-medium">Select your currency</span> - Choose from USD, EUR, GBP or NGN using 
            the dropdown menu
          </li>
          <li>
            <span className="font-medium">Enter your details</span> - Provide your name and donation amount
          </li>
          <li>
            <span className="font-medium">Choose payment method</span> - After clicking "Donate", select your 
            preferred payment option
          </li>
          <li>
            <span className="font-medium">Complete transaction</span> - Follow the secure payment process
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description }: { 
  icon: any, 
  title: string, 
  description: string 
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
      <FontAwesomeIcon icon={icon} className="text-purple-700 text-xl" />
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export const DonateData: React.FC = () => {
  const { isNavOpen } = useNavContext();
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [isCheckout, setIsCheckout] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }
    
    setIsCheckout(true);
  };

  const handlePaymentComplete = () => {
    alert('Thank you for your donation! Your support helps spread the gospel through music.');
    setAmount('');
    setName('');
    setIsCheckout(false);
  };
  
  const handlePaymentBack = () => {
    setIsCheckout(false);
  };

  // Suggested donation amounts based on currency
  const getSuggestedAmounts = () => {
    switch(currency) {
      case 'USD': return [10, 25, 50, 100, 250];
      case 'EUR': return [10, 20, 50, 100, 200];
      case 'GBP': return [10, 20, 40, 75, 150];
      case 'NGN': return [5000, 10000, 20000, 50000, 100000];
      default: return [10, 25, 50, 100, 250];
    }
  };

  const getCurrencySymbol = () => {
    switch(currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'NGN': return '₦';
      default: return '$';
    }
  };

  const suggestedAmounts = getSuggestedAmounts();
  const currencySymbol = getCurrencySymbol();

  return (
    <div className={`min-h-screen ${isNavOpen ? 'overflow-hidden max-h-screen' : ''}`}>
      <SEO
        title="Support Gospel Music Ministry | Donate to ClaudyGod"
        description="Partner with ClaudyGod Ministries to spread the gospel through music. Your donations support worship events, albums, and global outreach."
        keywords="donate to gospel ministry, support christian artist, music ministry donation, kingdom investment"
        canonical="https://claudygod.org/donate"
        image="https://claudygod.org/images/donate-og.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "DonateAction",
          "name": "Support Gospel Music Ministry",
          "description": "Donation page for ClaudyGod Ministries",
          "url": "https://claudygod.org/donate",
          "recipient": {
            "@type": "Organization",
            "name": "ClaudyGod Ministries",
            "url": "https://claudygod.org"
          }
        }}
      />
      <DonateHeroSlider />
      
      {isCheckout ? (
        <div className={`max-w-7xl mx-auto px-4 py-8 md:py-12 ${isNavOpen ? 'filter blur-sm opacity-75' : ''}`}>
          {/* <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 roboto-condensed">
              Complete Your Donation
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Thank you for supporting our ministry. Please select your preferred payment method below.
            </p>
          </div> */}
          
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
        </div>
      ) : (
        <div className={`max-w-7xl mx-auto px-4 py-8 md:py-12 ${isNavOpen ? 'filter blur-sm opacity-75 transition-all duration-300' : ''}`}>
          <div className="text-center mb-16">
            <h2 className="roboto-condensed text-3xl md:text-4xl font-bold text-gray-900">
              Support Our Ministry
            </h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto mt-4 mb-8"></div>
            <p className="md:text-lg max-md:text-base text-gray-700 work-sans max-w-3xl mx-auto leading-relaxed">
              "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." (2 Corinthians 9:7)
              <br /><br />
              We appreciate your support and donations towards the ministry. You partner with us to advance the gospel through music. 
              "And my God will meet all your needs according to the riches of His glory in Christ Jesus." (Philippians 4:19)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
          </div>

          <div className="flex justify-center my-10">
            <div className="bg-purple-700 h-1 w-16 rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 py-8 bg-white rounded-xl shadow-sm">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 roboto-condensed">
                Make a Donation
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Select your currency and amount to support our gospel music ministry
              </p>
            </div>

            <DonationGuide />

            <form onSubmit={handleSubmit} className="bg-purple-50 p-6 md:p-8 rounded-lg">
              <div className="mb-6">
                <label htmlFor="name" className="block text-base font-medium text-gray-800 mb-2 roboto-condensed">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div className="mb-8">
                <label className="block text-base font-medium text-gray-800 mb-2 roboto-condensed">
                  Select Amount ({currency})
                </label>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                  {suggestedAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setAmount(amt.toString())}
                      className={`py-3 px-2 rounded-lg border transition-all ${
                        amount === amt.toString() 
                          ? 'bg-purple-600 text-white border-purple-600' 
                          : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400'
                      }`}
                    >
                      {currencySymbol}{amt}
                    </button>
                  ))}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="amount" className="block text-sm text-gray-700 mb-2">
                    Or enter a custom amount
                  </label>
                  <div className="flex">
                    <CurrencySelector currency={currency} setCurrency={setCurrency} />
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Enter amount"
                      min="1"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
              >
                <FontAwesomeIcon icon={faHandHoldingUsd} className="h-5 w-5" />
                Donate Now
              </button>
            </form>
            
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Your donation is securely processed. All major cards and payment methods accepted.</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Have questions about donating?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Contact us at <span className="text-purple-700">info@ClaudyGod.com</span> or call 
              <span className="text-purple-700"> +1 (385) 219‑6632</span> for assistance with your donation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};