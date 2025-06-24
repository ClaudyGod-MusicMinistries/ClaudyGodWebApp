import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LocationState {
  orderId: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface OrderDetails {
  orderId: string;
  status: string;
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  subtotal: number;
  tax: number;
  total: number;
}

export const PaymentPending: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const locationState = state as LocationState | undefined;
  const orderId = locationState?.orderId;

  useEffect(() => {
    if (!orderId) {
      // If no orderId, redirect home
      navigate('/', { replace: true });
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `http://localhost:10000/api/payment/zelle/status/${orderId}`,
          { cache: 'no-store' }
        );

        if (res.ok) {
          const { status } = await res.json();
          if (status === 'confirmed') {
            clearInterval(interval);

            // Fetch the complete order details from the correct endpoint
            const orderRes = await fetch(
              `http://localhost:10000/api/payment/orders/${orderId}`
            );
            if (!orderRes.ok) {
              throw new Error('Failed to fetch order details');
            }
            const orderData: OrderDetails = await orderRes.json();

            // Navigate to success page with order data
            navigate('/order-success', { state: { order: orderData } });
          }
        }
      } catch (err) {
        console.error('Polling error:', err);
        // Optionally show an error toast here
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [orderId, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Processing your payment…
        </motion.h2>

        <motion.p
          className="text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Please wait while we confirm your Zelle payment.
        </motion.p>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};
