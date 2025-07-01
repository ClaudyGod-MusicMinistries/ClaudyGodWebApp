// src/components/checkout/Checkout.tsx
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

import { useCartStore, selectCartItems } from '../../contexts/Cartcontext';
import { CheckoutPage } from './CheckoutPage';
import { useNavigate } from 'react-router-dom';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      duration: 0.5
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 120 
    }
  }
};

export const Checkout: React.FC = () => {
  const items    = useCartStore(selectCartItems);
  const navigate = useNavigate();

  // Redirect if cart empty
  useEffect(() => {
    if (items.length === 0) navigate('/cart');
  }, [items, navigate]);

  if (items.length === 0) return null;

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
 
  const finalTotal = subtotal;

  return (
    <>
      <Helmet>
        <title>Checkout - ClaudyGod Store</title>
        <meta name="description" content="Complete your purchase securely…" />
      </Helmet>

      <motion.div 
        className="pt-16 min-h-screen bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <CheckoutPage />
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.h2 
                className="text-xl font-semibold text-gray-900 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Order Summary
              </motion.h2>

              <motion.div 
                className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
               
                {items.map((item, _index) => (
                  <motion.div 
                    key={item.id} 
                    className="flex items-center space-x-4 py-2 border-b border-gray-100"
                    variants={itemVariants}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg border"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                className="space-y-3 border-t border-gray-200 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-sm">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-sm text-green-600">
                    Free
                  </span>
                </div>
        
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-purple-900 text-base">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="mt-6 pt-6 border-t border-gray-200 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="bg-green-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Secure SSL Encryption</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};