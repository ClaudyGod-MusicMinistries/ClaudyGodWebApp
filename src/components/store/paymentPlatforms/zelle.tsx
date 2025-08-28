// src/components/payments/ZellePayment.tsx
import React, { useState } from 'react';
import { Building, Copy, Check, Clipboard, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ZellePaymentProps {
  amount: number;
  orderId: string;
}

export const ZellePayment: React.FC<ZellePaymentProps> = ({
  amount,
  orderId,
}) => {
  const [copied, setCopied] = useState(false);
  const [confirmationId, setConfirmationId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [instructionsExpanded, setInstructionsExpanded] = useState(true);
  const navigate = useNavigate();

  const zelleEmail = 'info@claudyGod.com';

  /* ---------- helpers ---------- */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(zelleEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const cleanedText = text.replace(/\s/g, '').toUpperCase();
      setConfirmationId(cleanedText);
      setError('');
    } catch {
      setError('Failed to paste. Please paste manually.');
    }
  };

  const validateInput = () => {
    if (!confirmationId.trim()) {
      setError('Please enter your transaction ID');
      return false;
    }
    if (!/^[A-Z0-9]{9,10}$/.test(confirmationId)) {
      setError('Invalid format. Must be 9-10 alphanumeric characters');
      return false;
    }
    return true;
  };

  /* ---------- submit ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateInput()) return;

    setIsSubmitting(true);

    // Simulate a short delay while you might call a backend
    setTimeout(() => {
      // Temporary: log everything instead of hitting an API
      console.log('Zelle payment confirmed', {
        orderId,
        amount,
        confirmationId,
      });

      navigate('/order-success', {
        state: {
          orderId,
          paymentMethod: 'zelle',
          amount,
          confirmationId,
        },
      });
    }, 800);
  };

  /* ---------- UI ---------- */
  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Banner */}
      <div className="bg-blue-50 p-4 rounded-lg flex items-start border border-blue-100">
        <Building className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm text-blue-800 font-medium">
            Send ${amount.toFixed(2)} using Zelle to complete your payment
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Your order will be processed after payment confirmation
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white border p-6 rounded-lg shadow-sm">
        {/* Accordion header */}
        <button
          type="button"
          onClick={() => setInstructionsExpanded(!instructionsExpanded)}
          className="w-full flex justify-between items-center text-left mb-2"
        >
          <h3 className="text-lg font-bold flex items-center">
            <Clipboard className="h-5 w-5 mr-2 text-purple-600" />
            Zelle Payment Instructions
          </h3>
          <span className="text-gray-500">
            {instructionsExpanded ? 'Hide' : 'Show'}
          </span>
        </button>

        {/* Steps */}
        {instructionsExpanded && (
          <ol className="space-y-3 text-sm list-decimal list-inside pl-2 mb-6">
            <li>Open your banking app or website</li>
            <li>Navigate to the Zelle payment section</li>
            <li>
              Send payment to:
              <div className="mt-1 bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                <span className="font-mono text-purple-800 break-all">
                  {zelleEmail}
                </span>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  disabled={copied}
                  className={`flex items-center px-3 py-1 rounded text-sm ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  } transition-colors`}
                >
                  {copied ? (
                    <Check className="h-4 w-4 mr-1" />
                  ) : (
                    <Copy className="h-4 w-4 mr-1" />
                  )}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </li>
            <li>
              Enter the amount:{' '}
              <span className="font-bold">${amount.toFixed(2)}</span>
            </li>
            {/* <li>
              Add your order number{' '}
              <span className="font-mono bg-gray-100 px-1 rounded">
                #{orderId}
              </span>{' '}
              in the memo/notes
            </li> */}
            <li>
              Complete the transaction and paste the confirmation ID below
            </li>
          </ol>
        )}

        {/* Transaction ID input */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">Zelle Transaction ID</label>
            <span className="text-xs text-gray-500">
              9–10 alphanumeric characters
            </span>
          </div>

          <div className="relative">
            <input
              type="text"
              value={confirmationId}
              readOnly
              onPaste={e => {
                e.preventDefault();
                handlePaste();
              }}
              className={`w-full p-3 border rounded-lg pr-32 ${
                error
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200'
              } cursor-default`}
              placeholder="Paste your transaction ID here"
              disabled={isSubmitting}
            />
            <div className="absolute right-2 top-2 flex gap-1">
              {confirmationId && (
                <button
                  type="button"
                  onClick={() => {
                    setConfirmationId('');
                    setError('');
                  }}
                  disabled={isSubmitting}
                  className="bg-gray-200 text-gray-700 px-2.5 py-1 rounded hover:bg-gray-300 transition-colors disabled:opacity-50"
                  title="Clear"
                >
                  &times;
                </button>
              )}
              <button
                type="button"
                onClick={handlePaste}
                disabled={isSubmitting}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded hover:bg-purple-200 transition-colors disabled:opacity-50 text-sm"
              >
                Paste
              </button>
            </div>
          </div>

          {error && (
            <p className="mt-2 text-red-500 text-sm flex items-start">
              <AlertCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </p>
          )}
        </div>

        {/* Submit button */}
        <motion.button
          type="submit"
          disabled={isSubmitting || !confirmationId}
          className={`w-full mt-6 py-3 px-4 rounded-lg ${
            isSubmitting
              ? 'bg-gray-500'
              : 'bg-gradient-to-r from-purple-600 to-indigo-600'
          } text-white disabled:opacity-70 flex items-center justify-center transition-all`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              Processing...
            </>
          ) : (
            'Confirm Payment'
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};
