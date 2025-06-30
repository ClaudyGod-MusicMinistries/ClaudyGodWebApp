// src/components/payments/Paypal.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPaypal, FaSpinner, FaCheckCircle, FaExternalLinkAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

export interface PayPalStepProps {
  amount: number;
  currency: string;
  onBack: () => void;
  onSuccess: () => void;
}

type PaymentStatus = 'idle' | 'processing' | 'popupOpen' | 'completed';

const PayPalStep: React.FC<PayPalStepProps> = ({
  amount,
  currency,
  onBack,
  onSuccess,
}) => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const paymentWindowRef = useRef<Window | null>(null);

  const formatAmount = (value: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(value);

  // Handle popup messaging
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
          toast('Payment canceled or incomplete', { icon: '⚠️' });
          setPaymentStatus('idle');
        }
        paymentWindowRef.current = null;
      }
    }, 500);

    return () => clearInterval(timer);
  }, [paymentCompleted]);

  const handleRedirect = async () => {
    if (paymentCompleted) {
      onSuccess();
      return;
    }
    
    // Immediately open blank popup (synchronous)
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
      // Correct API endpoint construction
      const apiUrl = `/api/paypal/generate-url?amount=${amount}&currency=${currency}&t=${Date.now()}`;
      
      console.log('Fetching PayPal URL:', apiUrl);
      
      const res = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
      
      // Handle HTML responses
      if (!res.ok) {
        const text = await res.text();
        
        // Check for HTML error pages
        if (text.startsWith('<!DOCTYPE html>') || text.startsWith('<html')) {
          console.error('Server returned HTML error page:', text.substring(0, 500));
          throw new Error('Server error occurred. Please try again later.');
        }
        
        try {
          // Attempt to parse as JSON
          const errorData = JSON.parse(text);
          throw new Error(errorData.error || `Payment failed with status ${res.status}`);
        } catch {
          throw new Error(`Payment failed: ${text.substring(0, 100)}`);
        }
      }
      
      const data = await res.json();
      if (!data.url) throw new Error('No PayPal URL returned');

      console.log('Redirecting to PayPal URL:', data.url);
      
      // Redirect popup to PayPal
      newWindow.location.href = data.url;
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

  // Reset status when amount changes
  useEffect(() => {
    if (paymentCompleted && amount) {
      setPaymentCompleted(false);
    }
  }, [amount]);

  const getStatusContent = () => {
    switch (paymentStatus) {
      case 'processing':
        return {
          title: 'Processing Payment',
          description: 'Preparing your secure PayPal checkout',
          icon: <FaSpinner className="animate-spin text-blue-500 text-3xl" />
        };
      case 'popupOpen':
        return {
          title: 'Complete Payment in Popup',
          description: 'Continue payment in the opened window',
          icon: <FaExternalLinkAlt className="text-blue-500 text-3xl" />
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
          
          {paymentStatus === 'processing' && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-center justify-center">
              <FaSpinner className="animate-spin text-blue-500 mr-3" />
              <span className="text-blue-700">Securely connecting to PayPal...</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onBack}
              disabled={paymentStatus !== 'idle'}
              className={`px-5 py-3 rounded-lg text-gray-700 border ${
                paymentStatus !== 'idle' 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-50'
              }`}
            >
              Back
            </button>
            
            <motion.button
              whileHover={{ scale: paymentStatus === 'idle' ? 1.03 : 1 }}
              whileTap={{ scale: paymentStatus === 'idle' ? 0.98 : 1 }}
              onClick={handleRedirect}
              disabled={paymentStatus !== 'idle' && !paymentCompleted}
              className={`px-5 py-3 rounded-lg text-white flex items-center justify-center gap-2 ${
                paymentCompleted 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } ${
                paymentStatus !== 'idle' && !paymentCompleted
                  ? 'opacity-70 cursor-not-allowed' 
                  : ''
              }`}
            >
              {paymentStatus === 'popupOpen' ? (
                <>
                  <FaExternalLinkAlt /> Payment in Progress
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
    </div>
  );
};

export default PayPalStep;