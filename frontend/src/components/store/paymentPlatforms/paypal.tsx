import React from 'react';
import { Smartphone, ExternalLink } from 'lucide-react';

interface PayPalPaymentProps {
  onNext: () => void;
}

export const PayPalPayment: React.FC<PayPalPaymentProps> = ({ onNext }) => {
  const handlePayPalLogin = () => {
    // Simulate PayPal authentication
    setTimeout(() => {
      onNext();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg flex items-center">
        <Smartphone className="h-5 w-5 text-blue-600 mr-2" />
        <span className="text-sm text-blue-800">
          You'll be redirected to PayPal to complete your payment securely
        </span>
      </div>

      <div className="text-center py-8">
        <div className="bg-blue-600 text-white rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-2">PayPal Payment</h3>
          <p className="text-blue-100">
            Click below to log in to your PayPal account and complete the payment
          </p>
        </div>

        <button
          onClick={handlePayPalLogin}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center mx-auto"
        >
          <ExternalLink className="h-5 w-5 mr-2" />
          Login to PayPal
        </button>
      </div>

      <div className="text-center text-sm text-gray-600">
        <p>Don't have a PayPal account?</p>
        <a href="#" className="text-blue-600 hover:text-blue-800">
          Create one now - it's free
        </a>
      </div>
    </div>
  );
};