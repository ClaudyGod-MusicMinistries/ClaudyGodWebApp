// src/pages/payments/PaymentPending.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

type PaymentStatus = 'pending' | 'confirmed' | 'failed';

export const PaymentPending: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as {
    state?: { orderId?: string; amount?: number };
  };

  const [status, setStatus] = useState<PaymentStatus>('pending');
  const { orderId, amount } = state || {};

  /* ---------------------------------
     Redirect if we lack context
  ---------------------------------- */
  useEffect(() => {
    if (!orderId) {
      navigate('/checkout', { replace: true });
    }
  }, [orderId, navigate]);

  /* ---------------------------------
     Simulate polling a backend
  ---------------------------------- */
  useEffect(() => {
    if (!orderId) return;

    // Pretend we receive a “confirmed” response after 5 s
    const confirmTimer = setTimeout(() => {
      setStatus('confirmed');
    }, 5000);

    // If nothing happens after 30 s mark as failed
    const failTimer = setTimeout(() => {
      setStatus(prev => (prev === 'pending' ? 'failed' : prev));
    }, 30000);

    return () => {
      clearTimeout(confirmTimer);
      clearTimeout(failTimer);
    };
  }, [orderId]);

  /* ---------------------------------
     When confirmed, go to success page
  ---------------------------------- */
  useEffect(() => {
    if (status === 'confirmed' && orderId) {
      const redirectTimer = setTimeout(() => {
        navigate(`/order-success/${orderId}`, { state });
      }, 2000);

      return () => clearTimeout(redirectTimer);
    }
  }, [status, orderId, navigate, state]);

  /* -------- UI -------- */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        {status === 'pending' && (
          <>
            <Clock className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Processing Payment</h2>
            <p className="text-gray-600 mb-6">
              We&rsquo;re verifying your payment of ${amount?.toFixed(2)}. This
              may take a moment.
            </p>
            <div className="animate-pulse">
              <div className="h-2 bg-blue-100 rounded-full mb-2"></div>
              <div className="h-2 bg-blue-100 rounded-full mb-2"></div>
              <div className="h-2 bg-blue-100 rounded-full"></div>
            </div>
          </>
        )}

        {status === 'confirmed' && (
          <>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Payment Confirmed!</h2>
            <p className="text-gray-600">
              Redirecting to order confirmation&hellip;
            </p>
          </>
        )}

        {status === 'failed' && (
          <>
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              Payment Verification Failed
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn&rsquo;t verify your payment. Please contact support.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Contact Support
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};
