// src/components/payments/PaymentPlatforms.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaPaypal, FaBuilding, FaArrowLeft, FaGlobe, FaInfoCircle, FaCheck } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

import PayPalStep from './Paypal';
import { ZellePayment } from './ZellePayment';

export interface PaymentFormData {
  email: string;
  phoneCountry?: string;
  phoneNumber?: string;
}

interface PaymentPlatformsProps {
  amount: number;
  currency: string;
  onBack: () => void;
  onComplete: () => void;
}

const countryOptions = [
  { code: 'NG', name: 'Nigeria (+234)', pattern: /^(70|80|81|90|91)\d{8}$/, flag: '🇳🇬' },
  { code: 'GH', name: 'Ghana (+233)', pattern: /^(20|24|26|27|28|30|50|54|55|57)\d{7,8}$/, flag: '🇬🇭' },
  { code: 'US', name: 'United States (+1)', pattern: /^\d{10}$/, flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom (+44)', pattern: /^7\d{9}$/, flag: '🇬🇧' },
  { code: 'CA', name: 'Canada (+1)', pattern: /^\d{10}$/, flag: '🇨🇦' },
];

const countryCallingCodes: Record<string, string> = {
  NG: '+234',
  GH: '+233',
  US: '+1',
  GB: '+44',
  CA: '+1',
};

const formatPhoneNumber = (value: string, pattern: RegExp) => {
  if (!value) return '';
  
  const digits = value.replace(/\D/g, '');
  const match = digits.match(pattern);
  
  if (!match) return digits;
  
  return digits;
};

export const PaymentPlatforms: React.FC<PaymentPlatformsProps> = ({
  amount,
  currency,
  onBack,
  onComplete,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'zelle' | null>(null);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [showInfo, setShowInfo] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    getValues,
    setValue,
    watch,
    trigger
  } = useForm<PaymentFormData>({
    mode: 'onChange'
  });

  const phoneCountry = watch('phoneCountry') || 'US';
  const phoneNumber = watch('phoneNumber') || '';
  
  // Get the current country's pattern
  const countryPattern = countryOptions.find(c => c.code === phoneCountry)?.pattern;
  
  // Format phone number as user types
  useEffect(() => {
    if (phoneNumber && countryPattern) {
      const formatted = formatPhoneNumber(phoneNumber, countryPattern);
      if (formatted !== phoneNumber) {
        setValue('phoneNumber', formatted);
      }
    }
  }, [phoneNumber, countryPattern, setValue]);

  const formatAmount = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(value);

  const submitDonorInfo = () => {
    // Re-validate all fields
    trigger().then(isValid => {
      if (!isValid) {
        toast.error('Please fix the errors in the form');
        return;
      }
      
      const email = getValues('email');
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        toast.error('Please enter a valid email address');
        return;
      }

      const phoneNumber = getValues('phoneNumber');
      if (phoneNumber) {
        const cntry = getValues('phoneCountry') || 'US';
        const pattern = countryOptions.find(c => c.code === cntry)?.pattern;
        if (pattern && !pattern.test(phoneNumber)) {
          toast.error('Please enter a valid phone number for the selected country');
          return;
        }
        const full = `${countryCallingCodes[cntry]}${phoneNumber}`;
        setValue('phoneNumber', full);
      }

      setStep(2);
    });
  };

  const DonorInfoStep: React.FC = () => {
    const countryPattern = countryOptions.find(c => c.code === phoneCountry)?.pattern;
    const countryCode = countryCallingCodes[phoneCountry];
    const countryFlag = countryOptions.find(c => c.code === phoneCountry)?.flag || '';

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FaInfoCircle className="text-purple-600" />
            Donor Information
          </h2>
          <button
            onClick={handleBack}
            className="text-purple-900 hover:text-purple-700 font-medium flex items-center gap-1 transition-colors"
          >
            <FaArrowLeft className="mr-1" /> Back
          </button>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-xl mb-6 border border-purple-200 shadow-sm">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Your Donation Amount</p>
            <p className="text-2xl font-bold text-purple-800">{formatAmount(amount)}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(submitDonorInfo)} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
                }`}
                placeholder="you@example.com"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center">
                <FaInfoCircle className="mr-1" /> {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Country */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Phone Country
            </label>
            <div className="relative">
              <select
                {...register('phoneCountry')}
                value={selectedCountry}
                onChange={e => {
                  setSelectedCountry(e.target.value);
                  setValue('phoneCountry', e.target.value);
                  setValue('phoneNumber', '');
                  trigger('phoneNumber');
                }}
                className="w-full pl-12 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
              >
                {countryOptions.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaGlobe className="text-gray-400" />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Phone Number (Optional)
            </label>
            <div className="flex">
              <span className="px-4 py-2.5 flex items-center border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-gray-500 font-medium">
                {countryCode}
              </span>
              <input
                type="tel"
                {...register('phoneNumber', {
                  validate: (value) => {
                    if (!value) return true;
                    if (countryPattern && !countryPattern.test(value)) {
                      return 'Invalid phone number format';
                    }
                    return true;
                  },
                })}
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setValue('phoneNumber', value, { shouldValidate: true });
                }}
                className={`flex-1 px-4 py-2.5 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.phoneNumber ? 'border-red-500' : ''
                }`}
                placeholder={
                  phoneCountry === 'GB' ? '7123456789'
                    : phoneCountry === 'NG' ? '8012345678'
                    : '5551234567'
                }
              />
            </div>
            {errors.phoneNumber && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center">
                <FaInfoCircle className="mr-1" /> {errors.phoneNumber.message}
              </p>
            )}
            <div className="mt-1.5 flex justify-between">
              <p className="text-xs text-gray-500">
                {phoneCountry === 'US' || phoneCountry === 'CA'
                  ? 'Format: 10 digits (e.g., 5551234567)'
                  : phoneCountry === 'GB'
                  ? 'Format: 10 digits starting with 7'
                  : phoneCountry === 'NG'
                  ? 'Format: 10 digits starting with 70,80,81,90,91'
                  : phoneCountry === 'GH'
                  ? 'Format: 9-10 digits starting with 20,24…'
                  : ''}
              </p>
              <span className="text-xs text-gray-500">
                {phoneNumber.length}/{countryPattern?.toString().includes('10') ? 10 : 9}
              </span>
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            Continue to Payment
          </motion.button>
        </form>
      </motion.div>
    );
  };

  const paymentCards = [
    { 
      id: 'paypal', 
      name: 'PayPal', 
      description: 'Secure online payments', 
      icon: FaPaypal, 
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-100'
    },
    { 
      id: 'zelle',  
      name: 'Zelle',  
      description: 'Direct bank transfer',         
      icon: FaBuilding, 
      color: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-100'
    },
  ] as const;

  const PaymentMethodStep: React.FC = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Select Payment Method
        </h2>
        <button
          onClick={handleBack}
          className="text-purple-900 hover:text-purple-700 font-medium flex items-center gap-1 transition-colors"
        >
          <FaArrowLeft className="mr-1" /> Back
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 mb-6">
        {paymentCards.map(m => (
          <motion.button
            key={m.id}
            onClick={() => {
              setPaymentMethod(m.id as 'paypal' | 'zelle');
              setStep(3);
            }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            className={`p-5 border rounded-xl text-left transition-all shadow-sm ${
              paymentMethod === m.id 
                ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-blue-50 shadow-md' 
                : 'border-gray-200 hover:border-purple-300 bg-white'
            }`}
          >
            <div className="flex items-center">
              <div className={`${m.bg} p-3 rounded-lg`}>
                <m.icon className={`h-6 w-6 ${m.id === 'paypal' ? 'text-blue-600' : 'text-purple-600'}`} />
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-gray-900 text-lg">{m.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{m.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  const handleBack = () => {
    if (step === 1) {
      onBack();
    } else {
      setStep(1);
      setPaymentMethod(null);
      reset();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Complete Your Donation
          </h1>
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow">
            {formatAmount(amount)}
          </div>
        </div>

        <div className="mt-6 flex items-center">
          {[1, 2, 3].map(n => (
            <React.Fragment key={n}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step === n
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : n < step
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {n}
                </div>
                <div className="mt-2 text-xs font-medium text-center w-20">
                  {n === 1 ? 'Your Info' : n === 2 ? 'Payment Method' : 'Complete'}
                </div>
              </div>
              {n < 3 && (
                <div className={`h-1 flex-1 mx-2 ${step > n ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {step === 1 && <DonorInfoStep />}
        {step === 2 && <PaymentMethodStep />}
        {step === 3 && paymentMethod === 'paypal' && (
          <PayPalStep 
            amount={amount} 
            currency={currency} 
            onBack={handleBack} 
            onSuccess={onComplete} 
          />
        )}
        {step === 3 && paymentMethod === 'zelle' && (
          <ZellePayment
            amount={amount}
            currency={currency}
            onBack={handleBack}
            onComplete={onComplete}
          />
        )}
      </motion.div>
    </div>
  );
};