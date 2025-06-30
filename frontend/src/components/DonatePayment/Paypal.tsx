// src/components/payments/Paypal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPaypal, FaSpinner, FaCheckCircle, FaExternalLinkAlt, FaTimesCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Dialog } from '@headlessui/react';

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

  // Handle payment completion messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'paymentCompleted') {
        handleComplete();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Monitor popup window
  useEffect(() => {
    if (!paymentWindowRef.current) return;

    const timer = setInterval(() => {
      if (paymentWindowRef.current?.closed) {
        clearInterval(timer);
        
        if (!paymentCompleted) {
          // Only show canceled status if window closed without completion
          setPaymentStatus('canceled');
          setShowCancelDialog(true);
          paymentWindowRef.current = null;
        }
      }
    }, 500);

    return () => clearInterval(timer);
  }, [paymentCompleted]);

  const generatePayPalUrl = (): string => {
    // Format amount to 2 decimal places
    const formattedAmount = amount.toFixed(2);
    
    // Get current origin for the donation-complete route
    const baseUrl = window.location.origin;
    const returnUrl = `${baseUrl}/donation-complete`;
    
    // Construct PayPal URL with your specific parameters
    return `https://www.paypal.com/donate/?business=cokorie77%40gmail.com&cmd=_donations&currency_code=${currency}&item_name=Donation+to+ClaudyGod&amount=${formattedAmount}&return=${encodeURIComponent(returnUrl)}`;
  };

  const handleRedirect = () => {
    if (paymentCompleted) {
      onSuccess();
      return;
    }
    
    if (paymentStatus === 'canceled') {
      // Reset status if retrying after cancel
      setPaymentStatus('idle');
      setShowCancelDialog(false);
    }
    
    // Open popup window
    const newWindow = window.open(
      '', 
      'paypal', 
      'width=800,height=600,scrollbars=yes'
    );
    
    if (!newWindow) {
      toast.error('Please allow popups for PayPal payments');
      return;
    }

    paymentWindowRef.current = newWindow;
    setPaymentStatus('popupOpen');
    
    try {
      // Generate PayPal URL directly
      const paypalUrl = generatePayPalUrl();
      
      console.log('Redirecting to PayPal URL:', paypalUrl);
      
      // Redirect popup to PayPal
      newWindow.location.href = paypalUrl;
    } catch (err: any) {
      console.error('PayPal error:', err);
      toast.error(err.message || 'Failed to start PayPal payment');
      
      // Close popup on error
      if (newWindow && !newWindow.closed) {
        newWindow.close();
      }
      paymentWindowRef.current = null;
      setPaymentStatus('idle');
    }
  };

  const handleComplete = () => {
    toast.success('Payment completed successfully!');
    setPaymentCompleted(true);
    setPaymentStatus('idle');
    
    // Close popup if still open
    if (paymentWindowRef.current && !paymentWindowRef.current.closed) {
      paymentWindowRef.current.close();
    }
    
    // Proceed to success
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  const handleCancelRetry = () => {
    setShowCancelDialog(false);
    setPaymentStatus('idle');
  };

  // Reset status when amount changes
  useEffect(() => {
    if (paymentCompleted && amount) {
      setPaymentCompleted(false);
    }
  }, [amount]);

  const getStatusContent = () => {
    switch (paymentStatus) {
      case 'popupOpen':
        return {
          title: 'Complete Payment in Popup',
          description: 'Continue payment in the opened window',
          icon: <FaExternalLinkAlt className="text-blue-500 text-3xl" />
        };
      case 'canceled':
        return {
          title: 'Payment Canceled',
          description: 'You can try again or choose another method',
          icon: <FaTimesCircle className="text-red-500 text-3xl" />
        };
      default:
        return paymentCompleted 
          ? {
              title: 'Payment Completed!',
              description: 'Thank you for your donation',
              icon: <FaCheckCircle className="text-green-500 text-3xl" />
            }
          : {
              title: 'Complete Payment with PayPal',
              description: `You're about to donate ${formatAmount(amount)} through PayPal`,
              icon: <FaPaypal className="text-blue-600 text-3xl" />
            };
    }
  };

  const statusContent = getStatusContent();

  return (
    <div className="relative max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
      >
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5">
          <div className="flex justify-center">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <FaPaypal className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="mb-4">
              {statusContent.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {statusContent.title}
            </h3>
            <p className="text-gray-600">
              {statusContent.description}
            </p>
          </div>
          
          {paymentStatus === 'idle' && !paymentCompleted && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Donation Amount:</span>
                <span className="font-bold text-blue-700">{formatAmount(amount)}</span>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onBack}
              disabled={paymentStatus !== 'idle' && paymentStatus !== 'canceled'}
              className={`px-5 py-3 rounded-lg text-gray-700 border ${
                (paymentStatus !== 'idle' && paymentStatus !== 'canceled') 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-50'
              }`}
            >
              Back
            </button>
            
            <motion.button
              whileHover={{ 
                scale: (paymentStatus === 'idle' || paymentStatus === 'canceled') ? 1.03 : 1 
              }}
              whileTap={{ 
                scale: (paymentStatus === 'idle' || paymentStatus === 'canceled') ? 0.98 : 1 
              }}
              onClick={handleRedirect}
              disabled={paymentStatus === 'popupOpen' || (paymentStatus === 'idle' && paymentCompleted)}
              className={`px-5 py-3 rounded-lg text-white flex items-center justify-center gap-2 ${
                paymentCompleted 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : paymentStatus === 'canceled'
                    ? 'bg-yellow-600 hover:bg-yellow-700'
                    : 'bg-blue-600 hover:bg-blue-700'
              } ${
                paymentStatus === 'popupOpen' || (paymentStatus === 'idle' && paymentCompleted)
                  ? 'opacity-70 cursor-not-allowed' 
                  : ''
              }`}
            >
              {paymentStatus === 'popupOpen' ? (
                <>
                  <FaExternalLinkAlt /> Payment in Progress
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

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <div className="flex items-center mb-4">
              <FaTimesCircle className="text-red-500 text-3xl mr-3" />
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Payment Not Completed
              </Dialog.Title>
            </div>
            
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                It looks like you closed the PayPal window before completing your donation.
                Would you like to try again?
              </p>
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                type="button"
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
                onClick={() => setShowCancelDialog(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none"
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