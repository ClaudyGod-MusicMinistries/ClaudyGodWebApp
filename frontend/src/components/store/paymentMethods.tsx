import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Building, Globe } from 'lucide-react';
import { StripePayment } from '../store/paymentPlatforms/stripe';
import { PayPalPayment } from '../store/paymentPlatforms/paypal';
import { ZellePayment } from '../store/paymentPlatforms/zelle';
import { PaystackPayment } from '../store/paymentPlatforms/paystack';

interface PaymentMethodsProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  paymentMethod,
  setPaymentMethod,
  onNext,
  onBack
}) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const paymentOptions = [
    {
      id: 'stripe',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: CreditCard,
      color: 'bg-blue-500'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: Smartphone,
      color: 'bg-blue-600'
    },
    {
      id: 'zelle',
      name: 'Zelle',
      description: 'Send money with Zelle',
      icon: Building,
      color: 'bg-purple-600'
    },
    {
      id: 'paystack',
      name: 'Paystack',
      description: 'Nigerian payment gateway',
      icon: Globe,
      color: 'bg-green-600'
    }
  ];

  const handleMethodSelect = (methodId: string) => {
    setPaymentMethod(methodId);
    setShowPaymentForm(true);
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'stripe':
        return <StripePayment onNext={onNext} />;
      case 'paypal':
        return <PayPalPayment onNext={onNext} />;
      case 'zelle':
        return <ZellePayment onNext={onNext} />;
      case 'paystack':
        return <PaystackPayment onNext={onNext} />;
      default:
        return null;
    }
  };

  if (showPaymentForm) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
          <button
            onClick={() => setShowPaymentForm(false)}
            className="text-purple-900 hover:text-purple-700 font-medium"
          >
            Change Method
          </button>
        </div>
        {renderPaymentForm()}
        <div className="flex justify-between mt-8">
          <button
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Payment Method</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {paymentOptions.map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleMethodSelect(option.id)}
            className={`p-6 border-2 rounded-xl text-left transition-all duration-200 ${
              paymentMethod === option.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center mb-4">
              <div className={`${option.color} p-3 rounded-lg text-white`}>
                <option.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">{option.name}</h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={() => paymentMethod && setShowPaymentForm(true)}
          disabled={!paymentMethod}
          className="px-6 py-3 bg-purple-900 text-white rounded-lg hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};