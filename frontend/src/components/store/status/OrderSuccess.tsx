import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../../Context/Cartcontext';

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

interface Order {
  orderId: string;
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  transactionId?: string;
  createdAt: string;
}

export const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const [order, setOrder] = useState<Order | null>(null);
  const { clearCart } = useCartStore();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // First check if order data is passed via location state
    if (location.state?.order) {
      setOrder(location.state.order);
      clearCart();
      setShowConfetti(true);
      localStorage.removeItem('lastOrder');
    } else {
      // Fallback to localStorage
      const stored = localStorage.getItem('lastOrder');
      if (!stored) {
        navigate('/');
        return;
      }
      
      const parsed = JSON.parse(stored);
      setOrder(parsed);
      clearCart();
      setShowConfetti(true);
      localStorage.removeItem('lastOrder');
    }

    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, [clearCart, navigate, location.state]);

  if (!order) return null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: 0.2,
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
      <AnimatePresence>
        {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}
      </AnimatePresence>

      <motion.div
        className="container mx-auto px-4 py-16 text-center relative z-10 max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-white/50 backdrop-blur-sm"
          variants={itemVariants}
        >
          {/* Success icon */}
          <motion.div 
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.2
            }}
          >
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text mb-4"
            variants={itemVariants}
          >
            Payment Confirmed!
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Your order was successfully processed. A confirmation has been sent to your email.
          </motion.p>

          {/* Order details */}
          <motion.div
            className="bg-white border rounded-2xl p-6 mb-10 text-left grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={itemVariants}
          >
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Order Details</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">Order ID</p>
                  <p className="text-lg font-medium text-gray-800">{order.orderId}</p>
                </div>
                
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">Total Paid</p>
                  <p className="text-xl font-bold text-gray-800">${order.total.toFixed(2)}</p>
                </div>
                
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">Payment Method</p>
                  <p className="text-lg font-medium text-gray-800 capitalize">
                    {order.paymentMethod}
                  </p>
                </div>
                
                {order.transactionId && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">Transaction ID</p>
                    <p className="text-lg font-medium text-gray-800">{order.transactionId}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 p-2 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Shipping Information</h3>
              </div>
              
              <div className="text-gray-700 space-y-3">
                <div className="flex">
                  <span className="font-medium text-gray-900 w-32">Name:</span>
                  <span>{order.shippingInfo.firstName} {order.shippingInfo.lastName}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-900 w-32">Email:</span>
                  <span>{order.shippingInfo.email}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-900 w-32">Address:</span>
                  <span>{order.shippingInfo.address}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-900 w-32">City:</span>
                  <span>{order.shippingInfo.city}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-900 w-32">State:</span>
                  <span>{order.shippingInfo.state}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-900 w-32">ZIP:</span>
                  <span>{order.shippingInfo.zipCode}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-900 w-32">Country:</span>
                  <span>{order.shippingInfo.country}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => navigate('/store')}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue Shopping
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/account/orders')}
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-full border-2 border-indigo-100 shadow-sm hover:shadow-md transition-shadow duration-200"
              whileHover={{ backgroundColor: "#f5f3ff", borderColor: "#c7d2fe" }}
              whileTap={{ scale: 0.98 }}
            >
              View Order History
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};