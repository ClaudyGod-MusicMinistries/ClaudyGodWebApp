// src/components/payments/ZellePayment.tsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBuilding, 
  FaArrowLeft, 
  FaPaperPlane, 
  FaCopy, 
  FaPaste,
  FaCheck,
  FaTimes,
  FaExclamationTriangle
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';

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
    formState: { errors, isSubmitting },
    setValue
  } = useForm<ZelleFormData>();
  
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const transactionIdRef = useRef<HTMLInputElement | null>(null);
  const zelleEmail = "info@claudygod.com";
  
  // Dialog state
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'success' | 'error' | 'processing'>('processing');
  const [dialogMessage, setDialogMessage] = useState('');

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

  // Copy Zelle email to clipboard
  const copyZelleEmail = async () => {
    try {
      await navigator.clipboard.writeText(zelleEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  // Copy transaction ID to clipboard
  const copyTransactionId = async () => {
    try {
      await navigator.clipboard.writeText(transactionIdRef.current?.value || '');
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  // Paste transaction ID from clipboard
  const pasteTransactionId = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const uppercaseText = text.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 9);
      setValue('zelleConfirmation', uppercaseText);
    } catch (err) {
      console.error('Paste failed:', err);
    }
  };

  // Handle paste event to convert to uppercase
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const uppercaseText = pastedText.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 9);
    
    if (transactionIdRef.current) {
      transactionIdRef.current.value = uppercaseText;
      setValue('zelleConfirmation', uppercaseText);
    }
  };

  const onSubmit = async (data: ZelleFormData) => {
    try {
      // Show processing dialog
      setDialogType('processing');
      setDialogMessage('Validating your payment details...');
      setShowDialog(true);

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

      // Show success dialog
      setDialogType('success');
      setDialogMessage('Payment validated successfully!');
      
      // Close dialog and complete after delay
      setTimeout(() => {
        setShowDialog(false);
        onComplete();
      }, 2000);
    } catch (error: any) {
      // Show error dialog
      setDialogType('error');
      setDialogMessage(`Validation failed: ${error.message}`);
      setShowDialog(true);
      console.error('Zelle validation error:', error);
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className="relative">
      {/* Dialog Overlay */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={dialogType !== 'processing' ? closeDialog : undefined}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 text-center">
                {dialogType === 'processing' && (
                  <>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Payment</h3>
                    <p className="text-gray-600">{dialogMessage}</p>
                  </>
                )}
                
                {dialogType === 'success' && (
                  <>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <FaCheck className="text-green-500 text-3xl" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Success!</h3>
                    <p className="text-gray-600 mb-4">{dialogMessage}</p>
                    <div className="mt-4">
                      <div className="w-12 h-1 bg-green-500 rounded-full mx-auto animate-pulse"></div>
                    </div>
                  </>
                )}
                
                {dialogType === 'error' && (
                  <>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <FaExclamationTriangle className="text-red-500 text-3xl" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Validation Failed</h3>
                    <div className="text-gray-600 mb-4 whitespace-pre-line text-left bg-red-50 p-3 rounded">
                      {dialogMessage}
                    </div>
                    <button
                      onClick={closeDialog}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Try Again
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto border border-purple-100"
      >
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="text-purple-700 hover:text-purple-900 font-medium flex items-center gap-1 transition-colors"
          >
            <FaArrowLeft className="mr-1" /> Back
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FaBuilding className="text-blue-600 text-xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Zelle Payment</h2>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-xl mb-6 border border-purple-200 shadow-sm">
          <p className="text-center font-medium text-gray-700 mb-1">
            Send {formatAmount(amount)} to:
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="bg-white px-4 py-2 rounded-lg border border-purple-300 flex items-center justify-between w-full max-w-xs">
              <span className="font-mono text-purple-800 truncate">{zelleEmail}</span>
              <button
                onClick={copyZelleEmail}
                className={`ml-2 p-1 rounded ${
                  copiedEmail 
                    ? 'text-green-600 bg-green-100' 
                    : 'text-purple-600 hover:bg-purple-100'
                }`}
                aria-label="Copy email"
              >
                {copiedEmail ? <FaCheck /> : <FaCopy />}
              </button>
            </div>
          </div>
          
          <p className="text-center text-sm text-gray-600 mt-3">
            Please use your registered Zelle email
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Sender Email Field */}
          <div>
            <label htmlFor="zelleSenderEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Your Zelle Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
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
                className={`w-full pl-3 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.zelleSenderEmail
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-purple-500 focus:border-transparent'
                }`}
                placeholder="your.email@example.com"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            {errors.zelleSenderEmail && (
              <p className="mt-1.5 text-sm text-red-600">{errors.zelleSenderEmail.message}</p>
            )}
          </div>

          {/* Transaction ID Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="zelleConfirmation" className="block text-sm font-medium text-gray-700">
                Transaction ID <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={pasteTransactionId}
                  className="text-xs flex items-center gap-1 text-purple-700 hover:text-purple-900 px-2 py-1 rounded hover:bg-purple-50"
                >
                  <FaPaste className="text-sm" /> Paste
                </button>
                <button
                  type="button"
                  onClick={copyTransactionId}
                  className={`text-xs flex items-center gap-1 px-2 py-1 rounded ${
                    copiedId 
                      ? 'text-green-700 bg-green-50' 
                      : 'text-purple-700 hover:text-purple-900 hover:bg-purple-50'
                  }`}
                >
                  {copiedId ? <FaCheck /> : <FaCopy />} Copy
                </button>
              </div>
            </div>
            
            <div className="relative">
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
                ref={(e) => {
                  register('zelleConfirmation').ref(e);
                  transactionIdRef.current = e;
                }}
                onPaste={handlePaste}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                  e.target.value = value;
                  setValue('zelleConfirmation', value);
                }}
                className={`w-full pl-3 pr-24 py-2.5 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.zelleConfirmation
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-purple-500 focus:border-transparent'
                }`}
                placeholder="Enter 9-character ID"
                maxLength={9}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                  {transactionIdRef.current?.value?.length || 0}/9
                </span>
              </div>
            </div>
            
            {errors.zelleConfirmation && (
              <p className="mt-1.5 text-sm text-red-600">{errors.zelleConfirmation.message}</p>
            )}
            <p className="mt-1.5 text-xs text-gray-500">
              You can find this in your Zelle payment confirmation
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center font-medium"
              >
                <FaArrowLeft className="mr-2" /> Back
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-4 py-3 rounded-lg text-white font-medium flex items-center justify-center shadow-md ${
                  isSubmitting 
                    ? 'bg-purple-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
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
          </div>
        </form>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-700">
          <p className="font-medium mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Important Notes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Make sure you've sent the exact amount to <span className="font-semibold">{zelleEmail}</span></li>
            <li>Transaction ID must be exactly 9 alphanumeric characters</li>
            <li>Use the same email you registered with Zelle</li>
            <li>Processing may take 1-2 business days</li>
            <li>Contact support@claudygod.org for assistance</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};