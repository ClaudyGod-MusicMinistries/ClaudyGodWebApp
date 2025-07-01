import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Building, ArrowLeft, Globe, Landmark } from 'lucide-react';
import { StripePayment } from './paymentPlatforms/stripe';
import { PayPalPayment } from './paymentPlatforms/paypal';
import { ZellePayment } from './paymentPlatforms/zelle';
import { PaystackPayment } from './paymentPlatforms/paystack';
import { NigerianBankTransfer } from './paymentPlatforms/NigerianAcct';

interface PaymentMethodsProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  onNext: () => void;
  onBack: () => void;
  orderTotal: number;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  paymentMethod,
  setPaymentMethod,
  onNext,
  onBack,
  orderTotal
}) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const paymentOptions = [
    {
      id: 'stripe',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: CreditCard,
      color: 'bg-blue-600'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: Smartphone,
      color: 'bg-blue-500'
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
    },
    {
      id: 'nigerian-bank',
      name: 'Nigerian Bank Transfer',
      description: 'Direct bank transfer to Nigerian account',
      icon: Landmark,
      color: 'bg-green-700'
    }
  ];

  const handleMethodSelect = (methodId: string) => {
    setPaymentMethod(methodId);
    setShowPaymentForm(true);
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'stripe':
        return <StripePayment amount={orderTotal} onNext={onNext} />;
      case 'paypal':
        return <PayPalPayment amount={orderTotal} onNext={onNext} />;
      case 'zelle':
        return <ZellePayment amount={orderTotal} onNext={onNext} />;
      case 'paystack':
        return <PaystackPayment amount={orderTotal} onNext={onNext} />;
      case 'nigerian-bank':
        return <NigerianBankTransfer amount={orderTotal} onNext={onNext} />;
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
            className="flex items-center text-purple-600 hover:text-purple-700 font-medium"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Change Method
          </button>
        </div>
        {renderPaymentForm()}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
        <button
          onClick={onBack}
          className="flex items-center text-purple-600 hover:text-purple-700 font-medium"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </button>
      </div>
      
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
              <div className={`${option.color} p-3 rounded-lg text-white mr-4`}>
                <option.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{option.name}</h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};