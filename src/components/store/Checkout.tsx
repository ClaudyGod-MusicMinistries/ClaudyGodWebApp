// src/components/checkout/Checkout.tsx
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useCartStore, selectCartItems } from '../../contexts/Cartcontext';
import { CheckoutPage } from './CheckoutPage';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { BoldText, SemiBoldText, RegularText } from '../ui/fonts/typography/';
import { OrderSummary } from './OrderSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle,
  faPhoneAlt,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

export const Checkout: React.FC = () => {
  const items = useCartStore(selectCartItems);
  const navigate = useNavigate();
  const { colorScheme } = useTheme();

  // Redirect if cart empty
  useEffect(() => {
    if (items.length === 0) navigate('/cart');
  }, [items, navigate]);

  if (items.length === 0) return null;

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const finalTotal = subtotal;

  return (
    <>
      <Helmet>
        <title>Checkout - ClaudyGod Store</title>
        <meta
          name="description"
          content="Complete your purchase securely at ClaudyGod Gospel Store"
        />
      </Helmet>

      <motion.div
        className="min-h-screen"
        style={{ backgroundColor: colorScheme.text }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <header
          className="py-4 shadow-sm"
          style={{ backgroundColor: colorScheme.gray[100] }}
        >
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl"
                style={{ background: colorScheme.primaryGradient }}
              >
                CG
              </div>
              <BoldText className="ml-3 text-xl" color={colorScheme.primary}>
                ClaudyGod Store
              </BoldText>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colorScheme.primaryLight }}
                >
                  <RegularText fontSize="0.75rem" color={colorScheme.text}>
                    1
                  </RegularText>
                </div>
                <RegularText
                  className="ml-2"
                  fontSize="0.875rem"
                  color={colorScheme.primary}
                >
                  Cart
                </RegularText>
              </div>

              <div className="flex items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: colorScheme.primaryGradient }}
                >
                  <RegularText fontSize="0.75rem" color={colorScheme.text}>
                    2
                  </RegularText>
                </div>
                <RegularText
                  className="ml-2"
                  fontSize="0.875rem"
                  color={colorScheme.primary}
                >
                  Checkout
                </RegularText>
              </div>

              <div className="hidden md:flex items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: colorScheme.primaryLight }}
                >
                  <RegularText fontSize="0.75rem" color={colorScheme.text}>
                    3
                  </RegularText>
                </div>
                <RegularText
                  className="ml-2"
                  fontSize="0.875rem"
                  color={colorScheme.primary}
                >
                  Confirmation
                </RegularText>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: colorScheme.text,
                border: '1px solid',
                color: colorScheme.primary,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div
                className="p-6"
                style={{ background: colorScheme.primaryGradient }}
              >
                <BoldText as="h2" fontSize="1.5rem" color={colorScheme.text}>
                  Secure Checkout
                </BoldText>
                <RegularText className="mt-1" color={colorScheme.text}>
                  Complete your purchase with confidence
                </RegularText>
              </div>

              <div className="p-6 md:p-8">
                <CheckoutPage />
              </div>
            </motion.div>

            <motion.div
              className="rounded-2xl mt-8 p-6"
              style={{
                backgroundColor: colorScheme.text,
                borderColor: colorScheme.borderLight,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: `${colorScheme.primary}10`,
                  borderColor: colorScheme.primaryLight,
                }}
              >
                <div className="flex items-start">
                  <div
                    className="flex-shrink-0 mt-1"
                    style={{ color: colorScheme.primary }}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <RegularText color={colorScheme.primary}>
                      Your payment information is encrypted and securely
                      processed. We don't store your payment details.
                    </RegularText>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              tax={0}
              total={finalTotal}
            />

            <motion.div
              className="rounded-2xl mt-8 p-6"
              style={{ backgroundColor: colorScheme.surface }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <BoldText
                as="h3"
                fontSize="1.125rem"
                className="mb-3"
                color={colorScheme.text}
              >
                Need Help?
              </BoldText>
              <RegularText className="mb-4" color={colorScheme.textSecondary}>
                Our support team is available 24/7 to assist you with any
                questions about your order.
              </RegularText>
              <div
                className="flex items-center"
                style={{ color: colorScheme.primary }}
              >
                <FontAwesomeIcon icon={faPhoneAlt} className="h-5 w-5 mr-2" />
                <SemiBoldText>+1 (385) 219-6632</SemiBoldText>
              </div>
              <div
                className="flex items-center mt-2"
                style={{ color: colorScheme.primary }}
              >
                <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5 mr-2" />
                <SemiBoldText>support@claudygod.org</SemiBoldText>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
