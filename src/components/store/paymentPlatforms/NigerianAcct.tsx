import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface NigerianBankTransferProps {
  amount: number;
  /** Called after validation with the entered reference */
  onSubmit: (txId?: string) => void;
}

export const NigerianBankTransfer: React.FC<NigerianBankTransferProps> = ({
  amount,
  onSubmit,
}) => {
  const [reference, setReference] = useState('');
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'uploading' | 'success' | 'error'
  >('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const triggerFileInput = () => fileInputRef.current?.click();

  const removeFile = () => {
    setSlipFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
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

      // Call parent callback with tx reference
      onSubmit(reference);
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

      {/* Bank details here */}
      <div className="bg-white p-4 rounded-lg border border-green-300 mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Bank Name:</span>
            <p className="text-gray-900">First Bank of Nigeria</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Account Name:</span>
            <p className="text-gray-900">Your Company Name Ltd</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Account Number:</span>
            <p className="text-gray-900 font-mono">3123456789</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Amount:</span>
            <p className="text-gray-900 font-bold">
              ₦{(amount * 1592).toLocaleString()}
            </p>
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
        ) : (
          <div className="border border-green-200 rounded-lg bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900 truncate max-w-xs">
                {slipFile.name}
              </span>
              <button
                type="button"
                onClick={removeFile}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
            {uploadStatus === 'uploading' && (
              <p className="text-xs text-gray-500 mt-1">Uploading...</p>
            )}
            {uploadStatus === 'success' && (
              <p className="text-xs text-green-600 mt-1">
                Payment slip validated successfully
              </p>
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
        {isSubmitting
          ? 'Validating Payment...'
          : 'Validate and Confirm Payment'}
      </motion.button>
    </motion.div>
  );
};
