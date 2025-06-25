// PaymentPending.tsx
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
  phone: string;
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
            const orderRes = await fetch(
              `http://localhost:10000/api/payment/orders/${orderId}`
            );
            if (!orderRes.ok) {
              throw new Error('Failed to fetch order details');
            }
            const orderData: OrderDetails = await orderRes.json();
            navigate('/order-success', { state: { order: orderData } });
          }
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [orderId, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 relative overflow-hidden">
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
        className="text-center relative z-10 bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-white/50 max-w-md w-full mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <svg
            className="w-12 h-12 text-indigo-600"
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
        </motion.div>

        <motion.h2
          className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Processing your payment…
        </motion.h2>

        <motion.p
          className="text-gray-600 mb-8 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Please wait while we confirm your Zelle payment.
        </motion.p>

        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-t-4 border-b-4 border-indigo-500 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-indigo-500 animate-ping"></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-gray-500 text-sm">
            This may take a few moments...
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};