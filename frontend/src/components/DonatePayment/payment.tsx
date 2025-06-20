import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { FaPaypal, FaBuilding, FaArrowLeft, FaGlobe } from 'react-icons/fa';
import { ZellePayment } from './ZellePayment'; 

export interface PaymentFormData {
  email: string;
  phoneCountry?: string;
  phoneNumber?: string;
  zelleConfirmation?: string;
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
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'zelle' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('US');
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    getValues,
    setValue,
    watch
  } = useForm<PaymentFormData>();
  
  const paymentMethods = [
    { 
      id: 'paypal', 
      name: 'PayPal', 
      description: 'Secure online payments', 
      icon: FaPaypal, 
      color: 'bg-blue-600' 
    },
    { 
      id: 'zelle', 
      name: 'Zelle', 
      description: 'Bank transfer', 
      icon: FaBuilding, 
      color: 'bg-purple-600' 
    }
  ];

  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2
    }).format(value);
  };

  const handlePaymentSelection = (method: 'paypal' | 'zelle') => {
    setPaymentMethod(method);
    if (method === 'paypal') {
      setStep(2);
    } else {
      setStep(3);
    }
  };

  const submitPayment = async (data: PaymentFormData) => {
    setIsProcessing(true);
    
    try {
      // Show loading toast
      const loadingToast = toast.loading('Processing payment...');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.dismiss(loadingToast);
      toast.success('Payment successful!', {
        icon: '✅',
        duration: 3000
      });
      
      setIsProcessing(false);
      onComplete();
    } catch (error) {
      toast.error('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      onBack();
    } else {
      setStep(1);
      setPaymentMethod(null);
      reset();
    }
  };

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
    
    // Validate phone number if provided
    const phoneNumber = getValues('phoneNumber');
    if (phoneNumber) {
      const country = getValues('phoneCountry') || 'US';
      const pattern = countryOptions.find(c => c.code === country)?.pattern;
      
      if (pattern && !pattern.test(phoneNumber)) {
        toast.error('Please enter a valid phone number for the selected country');
        return;
      }
      
      // Format full phone number
      const fullPhone = `${countryCallingCodes[country]}${phoneNumber}`;
      setValue('phoneNumber', fullPhone);
    }
    
    setStep(2);
  };

  const DonorInfoStep = () => {
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
          <h2 className="text-2xl font-bold text-gray-900 roboto-condensed">Donor Information</h2>
          <button 
            onClick={handleBack}
            className="text-purple-900 hover:text-purple-700 font-medium flex items-center gap-1"
          >
            <FaArrowLeft className="inline mr-1" /> Back
          </button>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg mb-6">
          <p className="text-center text-lg font-semibold">
            Donation Amount: <span className="text-purple-800">{formatAmount(amount)}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(submitDonorInfo)}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="phoneCountry" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Country
            </label>
            <div className="relative">
              <select
                id="phoneCountry"
                {...register('phoneCountry')}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setValue('phoneCountry', e.target.value);
                }}
                value={selectedCountry}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
              >
                {countryOptions.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaGlobe className="text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number (Optional)
            </label>
            <div className="flex">
              <div className="flex items-center justify-center px-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 text-gray-500">
                {countryCode}
              </div>
              <input
                id="phoneNumber"
                type="tel"
                {...register('phoneNumber', {
                  validate: (value) => {
                    if (!value) return true; // Optional field
                    
                    const pattern = countryPattern;
                    if (pattern && !pattern.test(value)) {
                      return 'Invalid phone number format';
                    }
                    return true;
                  }
                })}
                className={`flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.phoneNumber ? 'border-red-500' : ''
                }`}
                placeholder={phoneCountry === 'GB' ? '7xxxxxxxxx' : phoneCountry === 'NG' ? '80xxxxxxxx' : 'xxx-xxx-xxxx'}
              />
            </div>
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {phoneCountry === 'US' || phoneCountry === 'CA' 
                ? 'Format: 10 digits (e.g., 5551234567)' 
                : phoneCountry === 'GB' 
                  ? 'Format: 10 digits starting with 7 (e.g., 7123456789)' 
                  : phoneCountry === 'NG' 
                    ? 'Format: 10 digits starting with 70,80,81,90,91 (e.g., 8012345678)' 
                    : phoneCountry === 'GH' 
                      ? 'Format: 9-10 digits starting with 20,24,etc. (e.g., 201234567)' 
                      : 'Enter phone number without country code'}
            </p>
          </div>

          <div className="mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-purple-900 text-white py-3 px-4 rounded-md font-medium roboto-condensed transition duration-150 ease-in-out"
            >
              Continue to Payment
            </motion.button>
          </div>
        </form>
      </motion.div>
    );
  };

  const PaymentMethodStep = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 roboto-condensed">Select Payment Method</h2>
        <button 
          onClick={handleBack}
          className="text-purple-900 hover:text-purple-700 font-medium flex items-center gap-1"
        >
          <FaArrowLeft className="inline mr-1" /> Back
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {paymentMethods.map((method) => (
          <motion.button
            key={method.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handlePaymentSelection(method.id as 'paypal' | 'zelle')}
            className={`p-6 border-2 rounded-xl text-left cursor-pointer transition-all duration-300 ease-in-out ${
              paymentMethod === method.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center mb-4">
              <div className={`${method.color} p-3 rounded-lg text-white`}>
                <method.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">{method.name}</h3>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  const PayPalStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center p-6 bg-white rounded-lg shadow-md"
    >
      <div className="flex justify-center mb-6">
        <div className="bg-blue-100 p-4 rounded-full">
          <FaPaypal className="h-12 w-12 text-blue-600" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Payment with PayPal</h3>
      <p className="text-gray-700 mb-6">
        You'll be redirected to PayPal to securely complete your donation of {formatAmount(amount)}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleBack}
          className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setIsProcessing(true);
            const loadingToast = toast.loading('Redirecting to PayPal...');
            
            setTimeout(() => {
              toast.dismiss(loadingToast);
              toast.success('Payment processed successfully!');
              setIsProcessing(false);
              onComplete();
            }, 2000);
          }}
          disabled={isProcessing}
          className={`px-6 py-3 rounded-md font-medium text-white flex items-center justify-center gap-2 ${
            isProcessing ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isProcessing ? (
            <>
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Redirecting...
            </>
          ) : (
            'Continue to PayPal'
          )}
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 bg-white rounded-lg shadow-lg">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          },
        }}
      />
      
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 roboto-condensed">
            Complete Your Donation
          </h1>
          <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            {formatAmount(amount)}
          </div>
        </div>
        
        <div className="mt-4 flex">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === num 
                  ? 'bg-purple-900 text-white' 
                  : num < step 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
              }`}>
                {num}
              </div>
              {num < 3 && (
                <div className={`h-1 w-12 ${
                  step > num ? 'bg-green-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <motion.div
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {step === 1 && <DonorInfoStep />}
        {step === 2 && <PaymentMethodStep />}
        {step === 3 && paymentMethod === 'paypal' && <PayPalStep />}
        {step === 3 && paymentMethod === 'zelle' && (
          <ZellePayment
            amount={amount}
            currency={currency}
            onBack={handleBack}
            onSubmit={handleSubmit(submitPayment)}
            register={register}
            errors={errors}
            isProcessing={isProcessing}
          />
        )}
      </motion.div>
    </div>
  );
};