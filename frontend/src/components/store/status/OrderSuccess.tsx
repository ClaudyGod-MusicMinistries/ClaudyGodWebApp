import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Copy, ExternalLink } from 'lucide-react';

interface OrderSuccessState {
  amount: number;
  paymentMethod: string;
  confirmationId?: string;
}

export const OrderSuccess: React.FC = () => {
  const { orderId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  const { amount, paymentMethod, confirmationId } = state as OrderSuccessState;

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          
          <div className="flex items-center justify-center mb-6">
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
              #{orderId}
            </span>
            <button
              onClick={copyOrderId}
              className="ml-2 text-gray-500 hover:text-gray-700"
              title="Copy Order ID"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Order Summary
            </h3>
            
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <div className="text-gray-500">Amount Paid:</div>
              <div className="text-right font-medium">${amount?.toFixed(2)}</div>
              
              <div className="text-gray-500">Payment Method:</div>
              <div className="text-right font-medium capitalize">{paymentMethod}</div>
              
              {confirmationId && (
                <>
                  <div className="text-gray-500">Transaction ID:</div>
                  <div className="text-right font-mono text-sm">{confirmationId}</div>
                </>
              )}
              
              <div className="text-gray-500">Status:</div>
              <div className="text-right font-medium text-green-600">Confirmed</div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6">
            We've sent a confirmation to your email. You'll receive another email when your order ships.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Continue Shopping
            </button>
            
            <button
              onClick={() => navigate('/account/orders')}
              className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center"
            >
              View Order Details
              <ExternalLink className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};