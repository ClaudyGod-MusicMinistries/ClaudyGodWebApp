import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiService } from '../services/api';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

interface PaymentPendingState {
  orderId: string;
  amount: number;
  paymentMethod: string;
  confirmationId?: string;
}

export const PaymentPending: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'pending' | 'confirmed' | 'failed'>('pending');
  const [error, setError] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  const { orderId, amount, paymentMethod, confirmationId } = state as PaymentPendingState;

  useEffect(() => {
    if (!orderId) {
      navigate('/', { replace: true });
      return;
    }

    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    const pollPaymentStatus = async () => {
      try {
        const response = await apiService.checkPaymentStatus(orderId);
        
        if (response.status === 'confirmed') {
          setStatus('confirmed');
          setTimeout(() => {
            navigate(`/order-success/${orderId}`, {
              state: { amount, paymentMethod, confirmationId }
            });
          }, 2000);
        } else if (response.error) {
          setStatus('failed');
          setError(response.error);
        }
      } catch (err: any) {
        console.error('Polling error:', err);
        setStatus('failed');
        setError(err.message || 'Failed to verify payment');
      }
    };

    // Initial check
    pollPaymentStatus();
    
    // Then poll every 3 seconds
    interval = setInterval(() => {
      setTimeElapsed(prev => prev + 3);
      pollPaymentStatus();
    }, 3000);
    
    // Stop polling after 5 minutes (300 seconds)
    timeout = setTimeout(() => {
      clearInterval(interval);
      if (status === 'pending') {
        setStatus('failed');
        setError('Payment verification timeout. Please contact support.');
      }
    }, 300000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [orderId, navigate, status]);

  const StatusIcon = {
    pending: Clock,
    confirmed: CheckCircle,
    failed: XCircle
  }[status];

  const statusColors = {
    pending: 'text-blue-600 bg-blue-100',
    confirmed: 'text-green-600 bg-green-100',
    failed: 'text-red-600 bg-red-100'
  };

  const statusMessages = {
    pending: 'Processing your payment...',
    confirmed: 'Payment Confirmed!',
    failed: 'Payment Verification Failed'
  };

  const statusDescriptions = {
    pending: `We're verifying your ${paymentMethod} payment of $${amount?.toFixed(2)}.`,
    confirmed: 'Your payment has been verified. Redirecting...',
    failed: error || 'There was an issue verifying your payment.'
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-200 opacity-20"
            style={{
              width: Math.random() * 80 + 30,
              height: Math.random() * 80 + 30,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, Math.random() * 30 - 15, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <motion.div
        className="text-center relative z-10 bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/80 max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`w-20 h-20 ${statusColors[status]} rounded-full flex items-center justify-center mx-auto mb-6`}>
          <StatusIcon className="h-10 w-10" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {statusMessages[status]}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {statusDescriptions[status]}
        </p>

        {status === 'pending' && (
          <>
            <div className="flex justify-center mb-6">
              <div className="animate-pulse flex space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Order #{orderId} • {timeElapsed}s elapsed
            </p>
          </>
        )}

        {status === 'failed' && (
          <div className="mt-4">
            <div className="bg-red-50 border border-red-100 text-red-700 p-3 rounded-lg text-sm mb-4 flex items-start">
              <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => navigate('/contact')}
              className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Contact Support
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full mt-2 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};