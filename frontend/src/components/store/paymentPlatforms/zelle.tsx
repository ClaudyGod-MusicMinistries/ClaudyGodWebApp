// Zelle.tsx
import React, { useState } from 'react';
import { Building, Copy, Check, Clipboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ZelleProps {
  amount: number;
  onSubmit?: (transactionId: string) => void;
}

export const Zelle: React.FC<ZelleProps> = ({ amount, onSubmit }) => {
  const [copied, setCopied] = useState(false);
  const [confirmationId, setConfirmationId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const zelleEmail = 'info@ClaudyGod.com';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(zelleEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      // Clean the pasted text: remove spaces and convert to uppercase
      const cleanedText = text.replace(/\s/g, '').toUpperCase();
      setConfirmationId(cleanedText);
      setError('');
    } catch (err) {
      setError('Failed to paste. Please paste manually.');
    }
  };

  const handleClear = () => {
    setConfirmationId('');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Use the already cleaned value from state
    const formattedId = confirmationId;
    if (!formattedId) {
      setError('Please enter your transaction ID');
      setIsSubmitting(false);
      return;
    }

    if (!/^[A-Z0-9]{9,10}$/.test(formattedId)) {
      setError('Invalid format. Must be 9–10 alphanumeric characters');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:10000/api/payment/zelle/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmationId: formattedId })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      const orderId = data.orderId;

      navigate('/paymentPending', {
        state: {
          orderId,
          transactionId: formattedId,
          amount
        }
      });

      if (onSubmit) onSubmit(formattedId);

    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-indigo-50 p-4 rounded-lg flex items-center border border-indigo-100">
        <Building className="h-5 w-5 text-indigo-600 mr-2" />
        <span className="text-sm text-indigo-800">
          Send ${amount.toFixed(2)} using Zelle and provide the confirmation ID
        </span>
      </div>

      <div className="bg-white border p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <Clipboard className="h-5 w-5 mr-2 text-indigo-600" />
          Zelle Payment Instructions
        </h3>

        <ol className="space-y-3 text-sm list-decimal list-inside pl-2">
          <li className="pb-1">Open your banking app</li>
          <li className="pb-1">Choose "Send Money with Zelle"</li>
          <li className="pb-1">
            Send to: 
            <div className="mt-1 bg-gray-50 p-3 rounded-lg flex justify-between items-center">
              <span className="font-mono text-indigo-800">{zelleEmail}</span>
              <button
                type="button"
                onClick={copyToClipboard}
                disabled={copied}
                className={`flex items-center px-3 py-1 rounded ${
                  copied ? 'bg-green-500 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                } transition-colors`}
              >
                {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </li>
          <li className="pb-1">Send ${amount.toFixed(2)}</li>
          <li className="pb-1">Paste the Transaction ID below</li>
        </ol>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">Zelle Transaction ID</label>
            <span className="text-xs text-gray-500">9–10 alphanumeric characters</span>
          </div>

          <div className="relative">
            <input
              type="text"
              readOnly
              value={confirmationId}
              className={`w-full p-3 border rounded-lg pr-32 ${
                error ? 'border-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
              } cursor-default bg-gray-50`}
              placeholder="Paste using the button →"
              disabled={isSubmitting}
            />
            <div className="absolute right-2 top-2 flex gap-1">
              {confirmationId && (
                <button
                  type="button"
                  onClick={handleClear}
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
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded hover:bg-indigo-200 transition-colors disabled:opacity-50"
              >
                Paste
              </button>
            </div>
          </div>

          {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
          <p className="mt-2 text-xs text-gray-500">
            Paste your Zelle transaction ID using the Paste button above
          </p>
        </div>

        <div className="flex gap-3 mt-8">
          <motion.button
            type="submit"
            disabled={isSubmitting || !confirmationId}
            className={`flex-1 py-3 px-4 rounded-lg ${
              isSubmitting ? 'bg-gray-500' : 'bg-gradient-to-r from-indigo-600 to-purple-600'
            } text-white disabled:opacity-70 flex items-center justify-center transition-all hover:scale-[1.02] active:scale-[0.98]`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isSubmitting ? 'Processing...' : 'Confirm Payment'}
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
};