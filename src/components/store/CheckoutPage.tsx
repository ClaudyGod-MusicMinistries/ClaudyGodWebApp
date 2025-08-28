/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/checkout/CheckoutPage.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../contexts/Cartcontext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { BoldText, SemiBoldText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { ShippingForm } from './ShippingForm';
import { ZellePayment } from './paymentPlatforms/zelle';
import { NigerianBankTransfer } from './paymentPlatforms/NigerianAcct';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faBuilding,
  faLandmark,
  faMobileAlt,
} from '@fortawesome/free-solid-svg-icons';

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  nearestLocation: string;
}

interface PaymentInfo {
  method: 'paypal' | 'zelle' | 'nigerian-bank' | '';
  zelleConfirmation?: string;
}

export const CheckoutPage: React.FC = () => {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const { colorScheme } = useTheme();
  const [step, setStep] = useState(1);
  const [showZelleForm, setShowZelleForm] = useState(false);
  const [showBankForm, setShowBankForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'United States',
    nearestLocation: '',
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({ method: '' });

  const subtotal = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const total = subtotal;

  const finalizeOrder = (txId?: string) => {
    clearCart();
    if (paymentInfo.method === 'zelle') {
      navigate('/payment-pending', {
        state: {
          orderId: `CL-ORDER-${Date.now()}`,
          paymentMethod: paymentInfo.method,
        },
      });
    } else {
      navigate(`/confirm-payment/${`CL-ORDER-${Date.now()}`}`, {
        state: {
          paymentMethod: paymentInfo.method,
        },
      });
    }
  };

  const submitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const submitPayment = async () => {
    if (!paymentInfo.method) {
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      finalizeOrder();
    }, 2000);
  };

  const paymentMethods = [
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'smartphone',
      color: colorScheme.info,
    },
    {
      id: 'zelle',
      name: 'Zelle',
      icon: 'building',
      color: colorScheme.primary,
    },
    {
      id: 'nigerian-bank',
      name: 'Nigerian Bank',
      icon: 'landmark',
      color: colorScheme.success,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto p-4 space-y-8"
    >
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="shipping"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ShippingForm
              shippingInfo={shippingInfo}
              setShippingInfo={setShippingInfo}
              onSubmit={submitShipping}
              cartTotal={total}
              cartItems={items}
            />
          </motion.div>
        ) : (
          <motion.div
            key="payment"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <CustomButton
              variant="text"
              size="sm"
              icon={<FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />}
              onClick={() => setStep(1)}
              className="text-purple-600 hover:text-purple-700"
            >
              Back to Shipping
            </CustomButton>

            <BoldText as="h2" fontSize="1.5rem" color={colorScheme.background}>
              Select Payment Method
            </BoldText>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {paymentMethods.map(method => (
                <motion.div
                  key={method.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CustomButton
                    variant="primary"
                    fullWidth
                    className={`p-4 rounded-xl flex items-center gap-3 ${
                      paymentInfo.method === method.id
                        ? 'border-purple-500 bg-red-500'
                        : 'hover:bg-red-500'
                    }`}
                    onClick={() => {
                      setPaymentInfo({ method: method.id as any });
                      setShowZelleForm(false);
                      setShowBankForm(false);
                    }}
                  >
                    {/* Icon with dynamic background color */}
                    <div
                      className="flex items-center justify-center rounded-full p-2"
                      style={{ backgroundColor: method.color }}
                    >
                      {method.icon === 'smartphone' && (
                        <FontAwesomeIcon
                          icon={faMobileAlt}
                          className="text-white h-4 w-4"
                        />
                      )}
                      {method.icon === 'building' && (
                        <FontAwesomeIcon
                          icon={faBuilding}
                          className="text-white h-4 w-4"
                        />
                      )}
                      {method.icon === 'landmark' && (
                        <FontAwesomeIcon
                          icon={faLandmark}
                          className="text-white h-4 w-4"
                        />
                      )}
                    </div>

                    {/* Text */}
                    <SemiBoldText className="text-white">
                      {method.name}
                    </SemiBoldText>
                  </CustomButton>
                </motion.div>
              ))}
            </div>

            {paymentInfo.method === 'paypal' && (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <CustomButton
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isProcessing}
                  onClick={submitPayment}
                >
                  Pay ${total.toFixed(2)} with PayPal
                </CustomButton>
              </motion.div>
            )}

            {paymentInfo.method === 'zelle' && !showZelleForm && (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <CustomButton
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => setShowZelleForm(true)}
                >
                  Send ${total.toFixed(2)} via Zelle
                </CustomButton>
              </motion.div>
            )}

            {paymentInfo.method === 'zelle' && showZelleForm && (
              <ZellePayment amount={total} onSubmit={finalizeOrder} />
            )}

            {paymentInfo.method === 'nigerian-bank' && !showBankForm && (
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <CustomButton
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => setShowBankForm(true)}
                >
                  Transfer ${total.toFixed(2)} to our bank
                </CustomButton>
              </motion.div>
            )}

            {paymentInfo.method === 'nigerian-bank' && showBankForm && (
              <NigerianBankTransfer amount={total} onSubmit={finalizeOrder} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
