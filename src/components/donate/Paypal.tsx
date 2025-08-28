/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaPaypal,
  FaSpinner,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaTimesCircle,
} from 'react-icons/fa';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { BoldText, ExtraBoldText, RegularText } from '../ui/fonts/typography';
import { useTheme } from '../../contexts/ThemeContext';

export interface PayPalStepProps {
  amount: number;
  currency: string;
  onBack: () => void;
  onSuccess: () => void;
}

type PaymentStatus = 'idle' | 'popupOpen' | 'completed' | 'canceled';

const PayPalStep: React.FC<PayPalStepProps> = ({
  amount,
  currency,
  onBack,
  onSuccess,
}) => {
  const { colorScheme } = useTheme();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const paymentWindowRef = useRef<Window | null>(null);

  const formatAmount = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(value);

  const generatePayPalUrl = (): string => {
    const business = import.meta.env.VITE_PAYPAL_BUSINESS_EMAIL;
    if (!business) {
      toast.error('Missing PayPal business email in env');
      throw new Error('VITE_PAYPAL_BUSINESS_EMAIL is not set');
    }

    const params = new URLSearchParams({
      business,
      cmd: '_donations',
      currency_code: currency || 'USD',
      item_name: import.meta.env.VITE_PAYPAL_ITEM_NAME ?? 'Donation',
      amount: amount.toFixed(2),
      return: `${window.location.origin}${
        import.meta.env.VITE_PAYPAL_RETURN_PATH ?? '/'
      }`,
    });
    return `https://www.paypal.com/donate/?${params.toString()}`;
  };

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data === 'paymentCompleted') handleComplete();
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    if (!paymentWindowRef.current) return;
    const timer = setInterval(() => {
      if (paymentWindowRef.current?.closed) {
        clearInterval(timer);
        if (!paymentCompleted) {
          setPaymentStatus('canceled');
          setShowCancelDialog(true);
          paymentWindowRef.current = null;
        }
      }
    }, 500);
    return () => clearInterval(timer);
  }, [paymentCompleted]);

  const handleRedirect = () => {
    if (paymentCompleted) return onSuccess();
    if (paymentStatus === 'canceled') {
      setPaymentStatus('idle');
      setShowCancelDialog(false);
    }
    const popup = window.open(
      '',
      'paypal',
      'width=800,height=600,scrollbars=yes'
    );
    if (!popup) {
      toast.error('Enable pop‑ups to continue with PayPal');
      return;
    }

    paymentWindowRef.current = popup;
    setPaymentStatus('popupOpen');

    try {
      popup.location.href = generatePayPalUrl();
    } catch (err: any) {
      toast.error(err.message ?? 'Failed to start PayPal');
      popup.close();
      paymentWindowRef.current = null;
      setPaymentStatus('idle');
    }
  };

  const handleComplete = () => {
    toast.success('Payment completed – thank you!');
    setPaymentCompleted(true);
    setPaymentStatus('idle');
    paymentWindowRef.current?.close();
    setTimeout(onSuccess, 2000);
  };

  const handleCancelRetry = () => {
    setShowCancelDialog(false);
    setPaymentStatus('idle');
  };

  const statusContent = (() => {
    if (paymentStatus === 'popupOpen')
      return {
        title: 'Complete Payment in Popup',
        description: 'Finish your donation in the PayPal window',
        icon: (
          <FaExternalLinkAlt
            className={`text-3xl`}
            style={{ color: colorScheme.primary }}
          />
        ),
      };
    if (paymentStatus === 'canceled')
      return {
        title: 'Payment Canceled',
        description: 'You can retry or choose another method',
        icon: (
          <FaTimesCircle
            className="text-3xl"
            style={{ color: colorScheme.error }}
          />
        ),
      };
    if (paymentCompleted)
      return {
        title: 'Payment Completed!',
        description: 'Thank you for your donation',
        icon: (
          <FaCheckCircle
            className="text-3xl"
            style={{ color: colorScheme.success }}
          />
        ),
      };
    return {
      title: 'Donate with PayPal',
      description: `You're about to donate ${formatAmount(amount)}`,
      icon: (
        <FaPaypal className="text-3xl" style={{ color: colorScheme.primary }} />
      ),
    };
  })();

  return (
    <div className="relative max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl shadow-lg overflow-hidden border ${colorScheme.border}`}
        style={{ background: colorScheme.background }}
      >
        <div className={`p-5 bg-gradient-to-r ${colorScheme.primaryGradient}`}>
          <div className="flex justify-center">
            <div
              className="p-3 rounded-full shadow-lg"
              style={{ background: colorScheme.background }}
            >
              <FaPaypal
                className="h-8 w-8"
                style={{ color: colorScheme.primary }}
              />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="mb-4">{statusContent.icon}</div>
            <ExtraBoldText
              fontSize="20px"
              style={{ color: colorScheme.text }}
              className="mb-2"
            >
              {statusContent.title}
            </ExtraBoldText>
            <RegularText style={{ color: colorScheme.textSecondary }}>
              {statusContent.description}
            </RegularText>
          </div>

          {paymentStatus === 'idle' && !paymentCompleted && (
            <div
              className={`rounded-lg p-4 mb-6 border ${colorScheme.border}`}
              style={{ background: colorScheme.card }}
            >
              <div className="flex justify-between">
                <RegularText style={{ color: colorScheme.textSecondary }}>
                  Donation Amount:
                </RegularText>
                <BoldText style={{ color: colorScheme.primary }}>
                  {formatAmount(amount)}
                </BoldText>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onBack}
              disabled={
                paymentStatus !== 'idle' && paymentStatus !== 'canceled'
              }
              className={`px-5 py-3 rounded-lg border ${
                paymentStatus !== 'idle' && paymentStatus !== 'canceled'
                  ? 'opacity-50 cursor-not-allowed'
                  : `hover:${colorScheme.buttonHover}`
              } ${colorScheme.border}`}
              style={{
                color: colorScheme.text,
                background: colorScheme.background,
              }}
            >
              Back
            </button>

            <motion.button
              whileHover={{
                scale:
                  paymentStatus === 'idle' || paymentStatus === 'canceled'
                    ? 1.03
                    : 1,
              }}
              whileTap={{
                scale:
                  paymentStatus === 'idle' || paymentStatus === 'canceled'
                    ? 0.98
                    : 1,
              }}
              onClick={handleRedirect}
              disabled={
                paymentStatus === 'popupOpen' ||
                (paymentStatus === 'idle' && paymentCompleted)
              }
              className={`px-5 py-3 rounded-lg text-white flex items-center justify-center gap-2 ${
                paymentCompleted
                  ? `${colorScheme.success} hover:${colorScheme.success}`
                  : paymentStatus === 'canceled'
                    ? `${colorScheme.warning} hover:${colorScheme.warning}`
                    : `${colorScheme.button} hover:${colorScheme.buttonHover}`
              } ${
                paymentStatus === 'popupOpen' ||
                (paymentStatus === 'idle' && paymentCompleted)
                  ? 'opacity-70 cursor-not-allowed'
                  : ''
              }`}
            >
              {paymentStatus === 'popupOpen' ? (
                <>
                  <FaSpinner className="animate-spin" /> Payment in Progress
                </>
              ) : paymentStatus === 'canceled' ? (
                <>
                  <FaPaypal /> Try Again
                </>
              ) : paymentCompleted ? (
                <>
                  <FaCheckCircle /> Continue
                </>
              ) : (
                <>
                  <FaPaypal /> Donate with PayPal
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Cancel Dialog */}
      <Dialog
        open={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle shadow-xl rounded-2xl"
            style={{
              background: colorScheme.background,
              border: `1px solid ${colorScheme.border}`,
            }}
          >
            <div className="flex items-center mb-4">
              <FaTimesCircle
                className="text-3xl mr-3"
                style={{ color: colorScheme.error }}
              />
              <Dialog.Title
                className="text-lg font-medium"
                style={{ color: colorScheme.text }}
              >
                Payment Not Completed
              </Dialog.Title>
            </div>
            <RegularText style={{ color: colorScheme.textSecondary }}>
              You closed PayPal before finishing. Want to try again?
            </RegularText>
            <div className="mt-6 flex space-x-3">
              <button
                className="flex-1 px-4 py-2 text-sm rounded-md"
                style={{
                  color: colorScheme.text,
                  background: colorScheme.background,
                  border: `1px solid ${colorScheme.border}`,
                }}
                onClick={() => setShowCancelDialog(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-2 text-sm text-white rounded-md"
                style={{ background: colorScheme.primary }}
                onClick={handleCancelRetry}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PayPalStep;
