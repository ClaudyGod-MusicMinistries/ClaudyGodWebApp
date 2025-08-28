// src/components/payments/NigerianBankTransfer.tsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaArrowLeft, FaTimes, FaFilePdf, FaCopy, FaUniversity, FaUpload, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

interface NigerianBankTransferProps {
  amount: number;
  currency: string;
  onComplete: () => void;
  onBack: () => void;
}

type FormData = {
  reference: string;
  senderName: string;
};

const TRANSACTION_NAME = "ClaudyGod - Donations";
 
// API helper function - matches your contact page pattern
const getApiBase = () => {
  if (import.meta.env.PROD) {
    return 'https://cgm-backend-5qvj.onrender.com';
  }
  return window.location.origin.includes('localhost') 
    ? 'http://localhost:10000' 
    : 'https://cgm-backend-5qvj.onrender.com';
};

const VALIDATE_ENDPOINT = `${getApiBase()}/api/nigerian-bank-transfer/validate`;


export const NigerianBankTransfer: React.FC<NigerianBankTransferProps> = ({
  amount,
  currency,
  onComplete,
  onBack,
}) => {
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'bank-details' | 'upload-slip'>('bank-details');
  const [showDialog, setShowDialog] = useState(false);
  const [dialogStatus, setDialogStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    resetField
  } = useForm<FormData>();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files?.[0]) return;
  
  const file = e.target.files[0];
  
 
  if (file.size > 5 * 1024 * 1024) {
    setErrorMessage('File size exceeds 5MB limit');
    setDialogStatus('error');
    setShowDialog(true);
    return;
  }
  
  setSlipFile(file);
};

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setSlipFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onSubmit = async (data: FormData) => {
    if (!slipFile) {
      setDialogStatus('error');
      setErrorMessage('Please upload your payment slip');
      setShowDialog(true);
      return;
    }
    
    setIsSubmitting(true);
    setDialogStatus('processing');
    setShowDialog(true);
    
    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('reference', data.reference);
      formData.append('senderName', data.senderName);
      formData.append('amount', amount.toString());
      formData.append('currency', currency);
      formData.append('slipFile', slipFile);

      // Send to backend using consistent API pattern
      const response = await fetch(VALIDATE_ENDPOINT, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          throw new Error(`Server responded with status ${response.status} but no error details`);
        }
        
        // Handle duplicate reference error specifically
        if (errorData.code === 11000 || errorData.error?.includes('duplicate key')) {
          throw new Error('DUPLICATE_REFERENCE');
        }
        
        throw new Error(errorData.error || `Validation failed: ${response.statusText}`);
      }

      // Success
      setDialogStatus('success');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Close dialog and complete
      setShowDialog(false);
      onComplete();
    } catch (error: any) {
      console.error('Validation error:', error);
      setDialogStatus('error');
      
      // Handle specific errors
      if (error.message.includes('Failed to fetch')) {
        setErrorMessage(
          `Network error: Failed to connect to API server. Please check:\n` +
          `1. Your internet connection\n` +
          `2. That the backend server is running\n` +
          `3. API URL: ${VALIDATE_ENDPOINT}`
        );
      } 
      // Handle duplicate reference error
      else if (error.message === 'DUPLICATE_REFERENCE') {
        setErrorMessage(
          `This transaction reference has already been used.\n\n` +
          `Please check and verify:\n` +
          `1. Did you already submit this transaction?\n` +
          `2. Is this a duplicate submission?\n` +
          `3. If this is a new transaction, please use a different reference number\n\n` +
          `Contact support@claudygod.org if you need assistance.`
        );
        
        // Clear the reference field for user to re-enter
        resetField('reference');
      } 
      // Handle other errors
      else {
        setErrorMessage(error.message || 'Payment validation failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 bg-white rounded-lg shadow-lg">
      {/* Validation Dialog */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md"
            >
              <div className="p-6 text-center">
                {dialogStatus === 'processing' && (
                  <>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Payment</h3>
                    <p className="text-gray-600">Validating your payment details...</p>
                  </>
                )}
                
                {dialogStatus === 'success' && (
                  <>
                    <div className="flex justify-center mb-4">
                      <FaCheckCircle className="text-green-500 text-5xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Validated!</h3>
                    <p className="text-gray-600">Thank you for your donation</p>
                  </>
                )}
                
                {dialogStatus === 'error' && (
                  <>
                    <div className="flex justify-center mb-4">
                      <FaExclamationTriangle className="text-red-500 text-5xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Validation Failed</h3>
                    <div className="text-gray-600 mb-4 whitespace-pre-line text-left bg-red-50 p-3 rounded">
                      {errorMessage}
                    </div>
                    <button
                      onClick={closeDialog}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Close
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Nigerian Bank Transfer
        </h1>
        <button
          onClick={onBack}
          className="text-purple-900 hover:text-purple-700 font-medium flex items-center gap-1"
        >
          <FaArrowLeft className="mr-1" /> Back
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`flex items-center py-3 px-6 text-sm font-medium border-b-2 -mb-px ${
            activeTab === 'bank-details'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('bank-details')}
        >
          <FaUniversity className="mr-2" /> Bank Details
        </button>
        <button
          className={`flex items-center py-3 px-6 text-sm font-medium border-b-2 -mb-px ${
            activeTab === 'upload-slip'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('upload-slip')}
        >
          <FaUpload className="mr-2" /> Upload Slip
        </button>
      </div>

      <motion.div 
        className="bg-white p-6 rounded-xl border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'bank-details' && (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Transfer Instructions</h3>
            <p className="mb-4">
              Please transfer <strong>₦{amount.toLocaleString()}</strong> to the following account:
            </p>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Bank Name:</p>
                  <p className="font-medium">Guaranty Trust Bank</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Number:</p>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">1006851226</p>
                    <button 
                      onClick={() => copyToClipboard('1006851226')}
                      className="text-gray-500 hover:text-gray-700"
                      title="Copy account number"
                    >
                      <FaCopy className="text-sm" />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Name:</p>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Claudette E George</p>
                    <button 
                      onClick={() => copyToClipboard('Claudette E George')}
                      className="text-gray-500 hover:text-gray-700"
                      title="Copy account name"
                    >
                      <FaCopy className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-700">
              <p className="font-medium">Important Notes:</p>
              <ul className="list-disc pl-5 space-y-1 mt-1">
                <li>Your donation will be processed after payment validation</li>
                <li>You <span className="font-bold">MUST</span> include the transaction name in your transfer</li>
                <li>Please upload a clear PDF of your payment slip</li>
                <li>Transaction reference must be unique and exactly 20 digits</li>
                <li>Contact support@claudygod.org for assistance</li>
              </ul>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setActiveTab('upload-slip')}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                I've Made the Transfer, Upload Slip
              </button>
            </div>
          </>
        )}

        {activeTab === 'upload-slip' && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Your Payment</h3>
              <p className="text-gray-600 mb-4">
                Please provide your payment details and upload your transaction slip
              </p>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-6">
                <p className="text-sm text-gray-700 mb-1">You're validating payment for:</p>
                <p className="font-bold text-purple-800">₦{amount.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Transaction name: <span className="font-medium">{TRANSACTION_NAME}</span>
                </p>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 mb-2">
                Your Full Name (as in bank account)
              </label>
              <input
                id="senderName"
                type="text"
                {...register('senderName', { 
                  required: 'Your name is required',
                  minLength: {
                    value: 3,
                    message: 'Name must be at least 3 characters'
                  }
                })}
                className={`w-full px-4 py-3 border ${
                  errors.senderName ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder="Enter your full name as it appears on your bank account"
                disabled={isSubmitting}
              />
              {errors.senderName && (
                <p className="mt-1 text-sm text-red-600">{errors.senderName.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Account Number
              </label>
              <input
                id="reference"
                type="text"
                {...register('reference', { 
                  required: 'Reference number is required',
                  minLength: {
                    value: 10,
                    message: 'Reference must be exactly 10 characters'
                  },
                  maxLength: {
                    value: 10,
                    message: 'Reference must be exactly 10 characters'
                  }
                })}
                className={`w-full px-4 py-3 border ${
                  errors.reference ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                placeholder="Enter your bank's Account Number here...."
                disabled={isSubmitting}
              />
              {errors.reference && (
                <p className="mt-1 text-sm text-red-600">{errors.reference.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Must be your bank account number
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Slip Upload (PDF only)
              </label>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,application/pdf"
                className="hidden"
              />
              
              {!slipFile ? (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-purple-50 transition-colors"
                  onClick={triggerFileInput}
                >
                  <div className="flex flex-col items-center">
                    <FaFilePdf className="h-10 w-10 text-red-500" />
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-medium text-purple-600">Click to upload</span> PDF file
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF only (max 5MB)
                    </p>
                  </div>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaFilePdf className="h-5 w-5 text-red-500" />
                      <span className="ml-2 text-sm font-medium text-gray-900 truncate max-w-xs">
                        {slipFile.name}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        ({(slipFile.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <button 
                      type="button"
                      onClick={removeFile}
                      className="text-red-500 hover:text-red-700"
                      disabled={isSubmitting}
                    >
                      <FaTimes className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('bank-details')}
                className="px-5 py-3 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors flex-1"
              >
                Back to Bank Details
              </button>
              
              <motion.button
                type="submit"
                className="px-5 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 flex-1 flex justify-center items-center"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Validating...
                  </>
                ) : 'Confirm Payment'}
              </motion.button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};