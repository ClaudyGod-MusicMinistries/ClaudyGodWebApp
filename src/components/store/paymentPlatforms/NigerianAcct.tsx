import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
// import { useOrderStore } from '../store/orderStore';

interface NigerianBankTransferProps {
  amount: number;
  onNext: () => void;
}

export const NigerianBankTransfer: React.FC<NigerianBankTransferProps> = ({
  amount,
  onNext,
}) => {
  const [reference, setReference] = useState('');
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'uploading' | 'success' | 'error'
  >('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const { currentOrder, confirmPayment } = useOrderStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file.type.match('image.*') && !file.type.includes('pdf')) {
        alert('Please upload an image or PDF file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('File size too large (max 5MB)');
        return;
      }

      setSlipFile(file);
      setUploadStatus('idle');
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = () => {
    setSlipFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validatePayment = async () => {
    if (!reference.trim()) {
      alert('Please enter your transaction reference number');
      return;
    }

    if (!slipFile) {
      alert('Please upload your payment slip');
      return;
    }

    setIsSubmitting(true);
    setUploadStatus('uploading');

    try {
      // Simulate API call to backend
      await new Promise(resolve => setTimeout(resolve, 1500));

      setUploadStatus('success');
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update order with payment info
      if (currentOrder) {
        await confirmPayment(currentOrder.orderId, {
          method: 'nigerian-bank',
          bankTransferReference: reference,
        });
      }

      onNext();
    } catch (error) {
      setUploadStatus('error');
      alert('Payment validation failed. Please try again.');
      console.error('Validation error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="bg-green-50 p-6 rounded-xl border border-green-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Nigerian Bank Transfer
      </h3>
      <p className="mb-4">
        Please transfer <strong>₦{(amount * 1592).toLocaleString()}</strong> ($
        {amount.toFixed(2)}) to the following account:
      </p>

      <div className="bg-white p-4 rounded-lg border border-green-300 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Bank Name:</p>
            <p className="font-medium">Guaranty Trust Bank</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Account Number:</p>
            <p className="font-medium">1006851226</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Account Name:</p>
            <p className="font-medium">Claudette E George</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Transaction Reference Number
        </label>
        <input
          type="text"
          value={reference}
          onChange={e => setReference(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Enter your bank transfer reference"
          disabled={isSubmitting}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Slip Upload
        </label>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,.pdf"
          className="hidden"
        />

        {!slipFile ? (
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-green-50 transition-colors"
            onClick={triggerFileInput}
          >
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-medium text-green-600">
                  Click to upload
                </span>{' '}
                or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, PDF up to 5MB
              </p>
            </div>
          </div>
        ) : (
          <div className="border border-green-200 rounded-lg bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium text-gray-900 truncate max-w-xs">
                  {slipFile.name}
                </span>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {uploadStatus === 'uploading' && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full w-3/4 animate-pulse"></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Uploading and validating...
                </p>
              </div>
            )}

            {uploadStatus === 'success' && (
              <div className="mt-3 flex items-center text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-xs">
                  Payment slip validated successfully
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <motion.button
        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 flex justify-center items-center"
        onClick={validatePayment}
        disabled={isSubmitting}
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Validating Payment...
          </>
        ) : (
          'Validate and Confirm Payment'
        )}
      </motion.button>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-700">
        <p className="font-medium">Note:</p>
        <p>• Your order will be processed after payment validation</p>
        <p>• Validation typically takes 1-2 business days</p>
        <p>• Please upload a clear image of your payment slip</p>
      </div>
    </motion.div>
  );
};
