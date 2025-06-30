// src/components/payments/PaymentPlatforms.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { FaPaypal, FaBuilding, FaArrowLeft, FaGlobe } from 'react-icons/fa';

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
  { code: 'NG', name: 'Nigeria (+234)', pattern: /^(70|80|81|90|91)\d{8}$/ },
  { code: 'GH', name: 'Ghana (+233)', pattern: /^(20|24|26|27|28|30|50|54|55|57)\d{7,8}$/ },
  { code: 'US', name: 'United States (+1)', pattern: /^\d{10}$/ },
  { code: 'GB', name: 'United Kingdom (+44)', pattern: /^7\d{9}$/ },
  { code: 'CA', name: 'Canada (+1)', pattern: /^\d{10}$/ },
];

const countryCallingCodes: Record<string, string> = {
  NG: '+234',
  GH: '+233',
  US: '+1',
  GB: '+44',
  CA: '+1',
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    watch,
  } = useForm<PaymentFormData>();

  const formatAmount = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(value);

  const submitDonorInfo = () => {
    const email = getValues('email');
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
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
  };

  const DonorInfoStep: React.FC = () => {
    const phoneCountry = watch('phoneCountry') || 'US';
    const countryPattern = countryOptions.find(c => c.code === phoneCountry)?.pattern;
    const countryCode = countryCallingCodes[phoneCountry];

    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Donor Information</h2>
          <button
            onClick={handleBack}
            className="text-purple-900 hover:text-purple-700 font-medium flex items-center gap-1"
          >
            <FaArrowLeft className="mr-1" /> Back
          </button>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg mb-6 text-center text-lg font-semibold">
          Donation Amount: <span className="text-purple-800">{formatAmount(amount)}</span>
        </div>

        <form onSubmit={handleSubmit(submitDonorInfo)}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
              }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Phone Country</label>
            <div className="relative">
              <select
                {...register('phoneCountry')}
                value={selectedCountry}
                onChange={e => {
                  setSelectedCountry(e.target.value);
                  setValue('phoneCountry', e.target.value);
                }}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
              >
                {countryOptions.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaGlobe className="text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Phone Number (Optional)</label>
            <div className="flex">
              <span className="px-3 flex items-center border border-r-0 border-gray-300 rounded-l-md bg-gray-50 text-gray-500">
                {countryCode}
              </span>
              <input
                type="tel"
                {...register('phoneNumber', {
                  validate: (value) => {
                    if (!value) return true;
                    if (countryPattern && !countryPattern.test(value)) return 'Invalid phone number format';
                    return true;
                  },
                })}
                className={`flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.phoneNumber ? 'border-red-500' : ''
                }`}
                placeholder={
                  phoneCountry === 'GB' ? '7xxxxxxxxx'
                    : phoneCountry === 'NG' ? '80xxxxxxxx'
                    : 'xxx-xxx-xxxx'
                }
              />
            </div>
            {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>}
            <p className="mt-1 text-xs text-gray-500">
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
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-purple-900 text-white py-3 px-4 rounded-md font-medium transition"
          >
            Continue to Payment
          </motion.button>
        </form>
      </motion.div>
    );
  };

  const paymentCards = [
    { id: 'paypal', name: 'PayPal', description: 'Secure online payments', icon: FaPaypal, color: 'bg-blue-600' },
    { id: 'zelle',  name: 'Zelle',  description: 'Bank transfer',         icon: FaBuilding, color: 'bg-purple-600' },
  ] as const;

  const PaymentMethodStep: React.FC = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Select Payment Method</h2>
        <button
          onClick={handleBack}
          className="text-purple-900 hover:text-purple-700 font-medium flex items-center gap-1"
        >
          <FaArrowLeft className="mr-1" /> Back
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {paymentCards.map(m => (
          <motion.button
            key={m.id}
            onClick={() => {
              setPaymentMethod(m.id as 'paypal' | 'zelle');
              setStep(3);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 border-2 rounded-xl text-left transition ${
              paymentMethod === m.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center mb-4">
              <div className={`${m.color} p-3 rounded-lg text-white`}>
                <m.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">{m.name}</h3>
                <p className="text-sm text-gray-600">{m.description}</p>
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
    <div className="max-w-2xl mx-auto px-4 py-8 bg-white rounded-lg shadow-lg">
      <Toaster position="top-center" />

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Complete Your Donation
          </h1>
          <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            {formatAmount(amount)}
          </div>
        </div>

        <div className="mt-4 flex">
          {[1, 2, 3].map(n => (
            <div key={n} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === n
                    ? 'bg-purple-900 text-white'
                    : n < step
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {n}
              </div>
              {n < 3 && (
                <div className={`h-1 w-12 ${step > n ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              )}
            </div>
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