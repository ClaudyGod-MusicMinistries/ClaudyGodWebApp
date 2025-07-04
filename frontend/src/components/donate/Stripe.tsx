import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  FaCreditCard,
  FaSpinner,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaTimesCircle,
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Dialog } from '@headlessui/react';

export interface StripeStepProps {
  amount: number;
  currency: string;
  onBack: () => void;
  onSuccess: () => void;
  donorInfo: {
    email: string;
    name?: string;
    phone?: string;
  };
}

type PaymentStatus = 'idle' | 'popupOpen' | 'completed' | 'canceled';

export const StripePayment: React.FC<StripeStepProps> = ({
  amount,
  currency,
  onBack,
  onSuccess,
  donorInfo,
}) => {
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

  // Generate the Stripe payment link with prefilled values and amount
  const generateStripeUrl = (): string => {
    const baseUrl = 'https://donate.stripe.com/test_eVq6oJdfKfC1fT98TIdfG01';
    
    const params = new URLSearchParams({
      amount: (amount * 100).toString(), // Stripe uses cents
      currency: currency.toLowerCase(),
    });

    // Add donor information to prefill the Stripe form
    if (donorInfo.email) {
      params.append('prefilled_email', donorInfo.email);
    }
    
    if (donorInfo.name) {
      params.append('prefilled_name', donorInfo.name);
    }
    
    if (donorInfo.phone) {
      params.append('prefilled_phone', donorInfo.phone);
    }

    // Add amount as a query parameter
    params.append('amount', (amount * 100).toString());
    
    return `${baseUrl}?${params.toString()}`;
  };

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data === 'stripePaymentCompleted') handleComplete();
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
    
    const popup = window.open('', 'stripe', 'width=800,height=600,scrollbars=yes');
    if (!popup) {
      toast.error('Enable pop‑ups to continue with Stripe');
      return;
    }

    paymentWindowRef.current = popup;
    setPaymentStatus('popupOpen');

    try {
      popup.location.href = generateStripeUrl();
    } catch (err: any) {
      toast.error(err.message ?? 'Failed to start Stripe payment');
      popup.close();
      paymentWindowRef.current = null;
      setPaymentStatus('idle');
    }
  };

  const handleComplete = () => {
    toast.success('Payment completed - thank you!');
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
        description: 'Finish your payment in the Stripe window',
        icon: <FaExternalLinkAlt className="text-blue-500 text-3xl" />,
      };
    if (paymentStatus === 'canceled')
      return {
        title: 'Payment Canceled',
        description: 'You can retry or choose another method',
        icon: <FaTimesCircle className="text-red-500 text-3xl" />,
      };
    if (paymentCompleted)
      return {
        title: 'Payment Completed!',
        description: 'Thank you for your payment',
        icon: <FaCheckCircle className="text-green-500 text-3xl" />,
      };
    return {
      title: 'Pay with Card',
      description: `You're about to pay ${formatAmount(amount)}`,
      icon: <FaCreditCard className="text-purple-600 text-3xl" />,
    };
  })();

  return (
    <div className="relative max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
      >
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-5">
          <div className="flex justify-center">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <FaCreditCard className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="mb-4">{statusContent.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {statusContent.title}
            </h3>
            <p className="text-gray-600">{statusContent.description}</p>
          </div>
          
          {paymentStatus === 'idle' && !paymentCompleted && (
            <div className="bg-purple-50 rounded-lg p-4 mb-6 border border-purple-100">
              <div className="flex justify-between">
                <span className="text-gray-700">Payment Amount:</span>
                <span className="font-bold text-purple-700">
                  {formatAmount(amount)}
                </span>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onBack}
              disabled={paymentStatus !== 'idle' && paymentStatus !== 'canceled'}
              className={`px-5 py-3 rounded-lg text-gray-700 border ${
                paymentStatus !== 'idle' && paymentStatus !== 'canceled'
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-50'
              }`}
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
                  ? 'bg-green-600 hover:bg-green-700'
                  : paymentStatus === 'canceled'
                  ? 'bg-yellow-600 hover:bg-yellow-700'
                  : 'bg-purple-600 hover:bg-purple-700'
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
                  <FaCreditCard /> Try Again
                </>
              ) : paymentCompleted ? (
                <>
                  <FaCheckCircle /> Continue
                </>
              ) : (
                <>
                  <FaCreditCard /> Pay {formatAmount(amount)}
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
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl rounded-2xl">
            <div className="flex items-center mb-4">
              <FaTimesCircle className="text-red-500 text-3xl mr-3" />
              <Dialog.Title className="text-lg font-medium text-gray-900">
                Payment Not Completed
              </Dialog.Title>
            </div>
            <p className="text-sm text-gray-500">
              You closed the payment window before finishing. Want to try again?
            </p>
            <div className="mt-6 flex space-x-3">
              <button
                className="flex-1 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => setShowCancelDialog(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-2 text-sm text-white bg-purple-600 rounded-md hover:bg-purple-700"
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