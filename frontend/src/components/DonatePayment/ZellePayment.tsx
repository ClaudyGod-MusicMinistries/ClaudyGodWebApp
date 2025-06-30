// ZellePayment.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaCheck, FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import { UseFormRegister, FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface ZellePaymentProps {
  amount: number;
  currency: string;
  onBack: () => void;
  onComplete: () => void;
}

interface ZelleFormData {
  zelleSenderEmail: string;
  zelleConfirmation: string;
}

export const ZellePayment: React.FC<ZellePaymentProps> = ({
  amount,
  currency,
  onBack,
  onComplete,
}) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<ZelleFormData>();

  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(value);
  };

  const getApiBase = () => {
    if (import.meta.env.PROD) {
      return 'https://claudygodwebapp-1.onrender.com';
    }
    return window.location.origin.includes('localhost') 
      ? 'http://localhost:10000' 
      : 'https://claudygodwebapp-1.onrender.com';
  };

  const VALIDATE_ENDPOINT = `${getApiBase()}/api/zelle-payment/validate`;

  const onSubmit = async (data: ZelleFormData) => {
    try {
      const response = await fetch(VALIDATE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          amount,
          currency
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment validation failed');
      }

      // Success
      toast.success('Payment validated successfully!');
      onComplete();
    } catch (error: any) {
      toast.error(`Validation failed: ${error.message}`);
      console.error('Zelle validation error:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="text-purple-700 flex items-center gap-1"
        >
          <FaArrowLeft className="mr-1" /> Back
        </button>
        <div className="flex items-center gap-2">
          <FaBuilding className="text-blue-600 text-xl" />
          <h2 className="text-xl font-bold text-gray-800">Zelle Payment</h2>
        </div>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg mb-6 border border-purple-200">
        <p className="text-center font-medium text-gray-700 mb-1">
          Send {formatAmount(amount)} to:
        </p>
        <p className="text-center text-lg font-bold text-purple-800">
          info@ClaudyGod.com
        </p>
        <p className="text-center text-sm text-gray-600 mt-2">
          Please use your registered Zelle email
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Sender Email Field */}
        <div className="mb-4">
          <label htmlFor="zelleSenderEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Your Zelle Email <span className="text-red-500">*</span>
          </label>
          <input
            id="zelleSenderEmail"
            type="email"
            {...register('zelleSenderEmail', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.zelleSenderEmail
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-purple-500'
            }`}
            placeholder="your.email@example.com"
          />
          {errors.zelleSenderEmail && (
            <p className="mt-1 text-sm text-red-600">{errors.zelleSenderEmail.message}</p>
          )}
        </div>

        {/* Transaction ID Field */}
        <div className="mb-6">
          <label htmlFor="zelleConfirmation" className="block text-sm font-medium text-gray-700 mb-1">
            Transaction ID <span className="text-red-500">*</span>
          </label>
          <input
            id="zelleConfirmation"
            {...register('zelleConfirmation', {
              required: 'Transaction ID is required',
              minLength: {
                value: 9,
                message: 'ID must be exactly 9 characters',
              },
              maxLength: {
                value: 9,
                message: 'ID must be exactly 9 characters',
              },
              pattern: {
                value: /^[A-Z0-9]{9}$/,
                message: 'Must be 9 alphanumeric characters (uppercase only)'
              }
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.zelleConfirmation
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-purple-500'
            }`}
            placeholder="Enter 9-character transaction ID"
          />
          {errors.zelleConfirmation && (
            <p className="mt-1 text-sm text-red-600">{errors.zelleConfirmation.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            You can find this in your Zelle payment confirmation
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 px-4 py-2 rounded-md text-white font-medium flex items-center justify-center ${
              isSubmitting 
                ? 'bg-purple-400 cursor-not-allowed' 
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Validating...
              </>
            ) : (
              <>
                <FaPaperPlane className="mr-2" /> Submit Payment
              </>
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-700">
        <p className="font-medium mb-2">Important Notes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Make sure you've sent the exact amount to info@ClaudyGod.com</li>
          <li>Transaction ID must be exactly 9 characters (letters and numbers)</li>
          <li>Use the same email you used for your Zelle transaction</li>
          <li>Processing may take 1-2 business days</li>
        </ul>
      </div>
    </motion.div>
  );
};