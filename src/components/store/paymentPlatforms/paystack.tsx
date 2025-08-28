import React, { useState } from 'react';
import { Globe, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

import { useOrderStore } from '../store/orderStore';

interface PaystackPaymentProps {
  amount: number;
  onNext: () => void;
}

export const PaystackPayment: React.FC<PaystackPaymentProps> = ({ amount, onNext }) => {
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { currentOrder, confirmPayment } = useOrderStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Simulate Paystack payment initialization
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock Paystack reference
      const mockReference = `ps_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Update order with payment info
      if (currentOrder) {
        await confirmPayment(currentOrder.orderId, {
          method: 'paystack',
          paystackReference: mockReference
        });
      }

      onNext();
    } catch (error) {
      console.error('Paystack payment failed:', error);
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
      <div className="bg-green-50 p-4 rounded-lg flex items-center">
        <Globe className="h-5 w-5 text-green-600 mr-2" />
        <span className="text-sm text-green-800">
          Secure payment processing for Nigerian customers via Paystack
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <div className="bg-green-600 text-white rounded-lg p-3 mr-4">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Paystack Payment</h3>
            <p className="text-sm text-gray-600">
              Amount: ₦{(amount * 1500).toLocaleString()} (${amount.toFixed(2)})
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="your.email@example.com"
              required
              disabled={isProcessing}
            />
            <p className="text-sm text-gray-600 mt-2">
              We'll send your receipt to this email address
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Accepted Payment Methods:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Visa, Mastercard, Verve cards</li>
              <li>• Bank transfers (all Nigerian banks)</li>
              <li>• USSD (*737#, *901#, etc.)</li>
              <li>• Mobile money (MTN, Airtel, 9mobile)</li>
            </ul>
          </div>

          <motion.button
            type="submit"
            disabled={!email.trim() || isProcessing}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            whileHover={{ scale: !email.trim() || isProcessing ? 1 : 1.02 }}
            whileTap={{ scale: !email.trim() || isProcessing ? 1 : 0.98 }}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Continue with Paystack'
            )}
          </motion.button>
        </form>
      </div>

      <div className="text-center text-sm text-gray-600">
        <p>Powered by Paystack - Nigeria's leading payment gateway</p>
      </div>
    </motion.div>
  );
};