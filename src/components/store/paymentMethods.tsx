import React, { useState } from 'react';
import { color, motion } from 'framer-motion';
import {
  CreditCard,
  Smartphone,
  Building,
  ArrowLeft,
  Globe,
  Landmark,
} from 'lucide-react';
import { StripePayment } from './paymentPlatforms/stripe';
import { PayPalPayment } from './paymentPlatforms/paypal';
import { ZellePayment } from './paymentPlatforms/zelle';
import { PaystackPayment } from './paymentPlatforms/paystack';
import { NigerianBankTransfer } from './paymentPlatforms/NigerianAcct';
import { useTheme } from '../../contexts/ThemeContext';

import { BoldText, SemiBoldText, RegularText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
  orderTotal,
}) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { colorScheme } = useTheme();

  const paymentOptions = [
    {
      id: 'stripe',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: CreditCard,
      color: colorScheme.info,
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: Smartphone,
      color: colorScheme.primary,
    },
    {
      id: 'zelle',
      name: 'Zelle',
      description: 'Send money with Zelle',
      icon: Building,
      color: colorScheme.primary,
    },
    {
      id: 'paystack',
      name: 'Paystack',
      description: 'Nigerian payment gateway',
      icon: Globe,
      color: colorScheme.success,
    },
    {
      id: 'nigerian-bank',
      name: 'Nigerian Bank Transfer',
      description: 'Direct bank transfer to Nigerian account',
      icon: Landmark,
      color: colorScheme.secondary,
    },
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
          <BoldText as="h2" fontSize="1.5rem" color={colorScheme.text}>
            Payment Details
          </BoldText>
          <CustomButton
            variant="text"
            size="sm"
            icon="arrow-left"
            onClick={() => setShowPaymentForm(false)}
            className="text-purple-600 hover:text-purple-700"
          >
            Change Method
          </CustomButton>
        </div>
        {renderPaymentForm()}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <BoldText as="h2" fontSize="1.5rem" color={colorScheme.text}>
          Payment Method
        </BoldText>
        <CustomButton
          variant="text"
          size="sm"
          icon={<FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />}
          onClick={onBack}
          className="text-purple-600 hover:text-purple-700"
        >
          Back
        </CustomButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {paymentOptions.map(option => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CustomButton
              variant="outline"
              fullWidth
              className={`p-6 rounded-xl text-left h-full ${
                paymentMethod === option.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'hover:border-purple-300'
              }`}
              onClick={() => handleMethodSelect(option.id)}
            >
              <div className="flex items-center w-full">
                <div
                  className="p-3 rounded-lg mr-4 text-white"
                  style={{ backgroundColor: colorScheme.accent }}
                >
                  <option.icon className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <SemiBoldText style={{ color: colorScheme.accent }}>
                    {option.name}
                  </SemiBoldText>
                  <RegularText
                    fontSize="0.875rem"
                    color={colorScheme.textSecondary}
                  >
                    {option.description}
                  </RegularText>
                </div>
              </div>
            </CustomButton>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
