import React, { useState } from 'react';
import { Building, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const zelleEmail = 'cokorie77@gmail.com';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(zelleEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formattedId = confirmationId.trim().toUpperCase();
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

      // Navigate to payment pending page with real order details
      navigate('/paymentPending', {
        state: {
          orderId,
          transactionId: formattedId,
          amount
        }
      });

      // Trigger parent callback if provided
      if (onSubmit) onSubmit(formattedId);

    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg flex items-center">
        <Building className="h-5 w-5 text-purple-600 mr-2" />
        <span className="text-sm text-purple-800">
          Send ${amount.toFixed(2)} using Zelle and provide the confirmation ID
        </span>
      </div>

      <div className="bg-white border p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Zelle Payment Instructions</h3>

        <ol className="space-y-2 text-sm list-decimal list-inside">
          <li>Open your banking app</li>
          <li>Choose "Send Money with Zelle"</li>
          <li>Enter: <span className="font-mono">{zelleEmail}</span></li>
          <li>Send ${amount.toFixed(2)}</li>
          <li>Copy and paste the Transaction ID below</li>
        </ol>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">Zelle Transaction ID</label>
            <span className="text-xs text-gray-500">9–10 alphanumeric characters</span>
          </div>

          <input
            type="text"
            value={confirmationId}
            onChange={(e) => {
              setConfirmationId(e.target.value);
              setError('');
            }}
            className={`w-full p-3 border rounded-lg ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your transaction ID"
            disabled={isSubmitting}
          />

          {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={copyToClipboard}
            disabled={isSubmitting}
            className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center ${
              copied ? 'bg-green-600' : 'bg-purple-600'
            } text-white disabled:opacity-50`}
          >
            {copied ? '✓ Copied' : 'Copy Email'}
          </button>

          <button
            type="submit"
            disabled={isSubmitting || !confirmationId}
            className={`flex-1 py-3 px-4 rounded-lg ${
              isSubmitting ? 'bg-gray-500' : 'bg-green-600'
            } text-white disabled:opacity-50`}
          >
            {isSubmitting ? 'Processing...' : 'Confirm Payment'}
          </button>
        </div>
      </div>
    </form>
  );
};