import React, { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';

interface StripePaymentProps {
  onNext: () => void;
}

export const StripePayment: React.FC<StripePaymentProps> = ({ onNext }) => {
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle Stripe payment processing
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg flex items-center">
        <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
        <span className="text-sm text-blue-800">
          Your payment is secured by Stripe's industry-leading encryption
        </span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cardholder Name
        </label>
        <input
          type="text"
          value={cardData.name}
          onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="John Doe"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Number
        </label>
        <input
          type="text"
          value={cardData.number}
          onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="1234 5678 9012 3456"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date
          </label>
          <input
            type="text"
            value={cardData.expiry}
            onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CVC
          </label>
          <input
            type="text"
            value={cardData.cvc}
            onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="123"
            required
          />
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-600">
        <Lock className="h-4 w-4 mr-2" />
        <span>Your payment information is encrypted and secure</span>
      </div>

      <button
        type="submit"
        className="w-full bg-purple-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-800 transition-colors duration-200"
      >
        Continue to Review
      </button>
    </form>
  );
};