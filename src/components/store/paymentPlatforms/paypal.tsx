import React, { useState } from 'react';
import { Smartphone, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useOrderStore } from '../store/orderStore';

interface PayPalPaymentProps {
  amount: number;
  onNext: () => void;
}

export const PayPalPayment: React.FC<PayPalPaymentProps> = ({
  amount,
  onNext,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { currentOrder, confirmPayment } = useOrderStore();

  const handlePayPalLogin = async () => {
    setIsProcessing(true);

    try {
      // Simulate PayPal authentication and payment
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate mock PayPal transaction ID
      const mockTxnId = `PAY-${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

      // Update order with payment info
      if (currentOrder) {
        await confirmPayment(currentOrder.orderId, {
          method: 'paypal',
          paypalTxnId: mockTxnId,
        });
      }

      onNext();
    } catch (error) {
      console.error('PayPal payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-blue-50 p-4 rounded-lg flex items-center">
        <Smartphone className="h-5 w-5 text-blue-600 mr-2" />
        <span className="text-sm text-blue-800">
          You'll be redirected to PayPal to complete your payment securely
        </span>
      </div>

      <div className="text-center py-8">
        <div className="bg-blue-600 text-white rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-2">PayPal Payment</h3>
          <p className="text-blue-100 mb-4">Amount: ${amount.toFixed(2)}</p>
          <p className="text-blue-100">
            Click below to log in to your PayPal account and complete the
            payment
          </p>
        </div>

        <motion.button
          onClick={handlePayPalLogin}
          disabled={isProcessing}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center mx-auto"
          whileHover={{ scale: isProcessing ? 1 : 1.02 }}
          whileTap={{ scale: isProcessing ? 1 : 0.98 }}
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <ExternalLink className="h-5 w-5 mr-2" />
              Login to PayPal
            </>
          )}
        </motion.button>
      </div>

      <div className="text-center text-sm text-gray-600">
        <p>Don't have a PayPal account?</p>
        <a
          href="https://www.paypal.com/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          Create one now - it's free
        </a>
      </div>
    </motion.div>
  );
};
