import React, { useState } from 'react';
import { Globe, CreditCard } from 'lucide-react';

interface PaystackPaymentProps {
  onNext: () => void;
}

export const PaystackPayment: React.FC<PaystackPaymentProps> = ({ onNext }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Initialize Paystack payment
    // This would typically integrate with Paystack's API
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg flex items-center">
        <Globe className="h-5 w-5 text-green-600 mr-2" />
        <span className="text-sm text-green-800">
          Secure payment processing for Nigerian customers via Paystack
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <div className="bg-green-600 text-white rounded-lg p-3 mr-4">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Paystack Payment</h3>
            <p className="text-sm text-gray-600">
              Accept Naira payments, bank transfers, USSD, and mobile money
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="your.email@example.com"
              required
            />
            <p className="text-sm text-gray-600 mt-2">
              We'll send your receipt to this email address
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Accepted Payment Methods:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Visa, Mastercard, Verve cards</li>
              <li>• Bank transfers (all Nigerian banks)</li>
              <li>• USSD (*737#, *901#, etc.)</li>
              <li>• Mobile money (MTN, Airtel, 9mobile)</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={!email.trim()}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Continue with Paystack
          </button>
        </form>
      </div>

      <div className="text-center text-sm text-gray-600">
        <p>Powered by Paystack - Nigeria's leading payment gateway</p>
      </div>
    </div>
  );
};