// ZellePayment.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaCheck } from 'react-icons/fa';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { PaymentFormData } from './payment';
import { toast } from 'react-toastify';

interface ZellePaymentProps {
  amount: number;
  currency: string;
  onBack: () => void;
  onSubmit: () => void;
  register: UseFormRegister<PaymentFormData>;
  errors: FieldErrors<PaymentFormData>;
  isProcessing: boolean;
}

export const ZellePayment: React.FC<ZellePaymentProps> = ({
  amount,
  currency,
  onBack,
  onSubmit,
  register,
  errors,
  isProcessing,
}) => {
  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (errors.zelleConfirmation) {
      toast.error(errors.zelleConfirmation.message || 'Please provide a valid confirmation number');
      return;
    }

    toast.success('Processing Zelle payment...');
    onSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <div className="flex justify-center mb-6">
        <div className="bg-purple-100 p-4 rounded-full">
          <FaBuilding className="h-12 w-12 text-purple-600" />
        </div>
      </div>

      <h3 className="text-xl  text-center roboto-condensed text-gray-900 mb-4">
        Complete Payment with Zelle
      </h3>

      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <p className="text-center font-medium work-sans">Send {formatAmount(amount)} to:</p>
        <p className="text-center text-lg work-sans text-purple-800 mt-2">info@ClaudyGod.com</p>
      </div>

      <form onSubmit={handleFormSubmit}>
        <div className="mb-6">
          <label htmlFor="zelleConfirmation" className="block text-sm font-medium text-gray-700 mb-1">
            Transaction ID <span className="text-red-500">*</span>
          </label>
          <input
            id="zelleConfirmation"
            {...register('zelleConfirmation', {
              required: 'Confirmation number is required',
              minLength: {
                value: 6,
                message: 'Confirmation number must be at least 6 characters',
              },
            })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.zelleConfirmation
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-purple-500'
            }`}
            placeholder="Enter your Zelle confirmation number"
          />
          {errors.zelleConfirmation && (
            <p className="mt-1 text-sm text-red-600">{errors.zelleConfirmation.message}</p>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-6 work-sans">
          After sending your donation through your bank's Zelle service, please enter the transaction
         ID provided for confirmation of payment.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isProcessing}
            className={`px-6 py-3 rounded-md font-medium text-white flex items-center justify-center gap-2 ${
              isProcessing ? 'bg-purple-400' : 'bg-purple-900 hover:bg-purple-800'
            }`}
          >
            {isProcessing ? (
              <>
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </>
            ) : (
              <>
                <FaCheck className="inline mr-2" />
                Confirm Donation
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};
