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
  // const shipping = subtotal > 50 ? 0 : 9.99;
  // const tax = subtotal * 0.08;
  const finalTotal = subtotal;

  return (
    <>
      <Helmet>
        <title>Checkout - ClaudyGod Store</title>
        <meta name="description" content="Complete your purchase securely at ClaudyGod Gospel Store" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Raleway:wght@700;800&display=swap" rel="stylesheet" />
      </Helmet>

      <motion.div 
        className="min-h-screen bg-gradient-to-b from-purple-50 to-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <header className="bg-white shadow-sm py-4">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-purple-700 to-purple-900 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl">
                CG
              </div>
              <h1 className="ml-3 text-xl font-bold text-purple-900 font-raleway">ClaudyGod Store</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                  <span className="text-sm font-bold">1</span>
                </div>
                <div className="ml-2 text-sm font-medium text-gray-600">Cart</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-700 to-purple-900 flex items-center justify-center text-white">
                  <span className="text-sm font-bold">2</span>
                </div>
                <div className="ml-2 text-sm font-medium text-gray-900">Checkout</div>
              </div>
              
              <div className="hidden md:flex items-center">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                  <span className="text-sm font-bold">3</span>
                </div>
                <div className="ml-2 text-sm font-medium text-gray-600">Confirmation</div>
              </div>
            </div>
          </div>
        </header>
        
        <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="bg-gradient-to-r from-purple-900 to-purple-700 p-6">
                <h2 className="text-2xl font-bold text-white font-raleway">Secure Checkout</h2>
                <p className="text-purple-200 mt-1">Complete your purchase with confidence</p>
              </div>
              
              <div className="p-6 md:p-8">
                <CheckoutPage />
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl shadow-xl mt-8 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              
              
              <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-purple-700">
                      Your payment information is encrypted and securely processed. We don't store your payment details.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-gradient-to-r from-purple-900 to-purple-700 p-6">
                <h2 className="text-xl font-bold text-white font-raleway">Order Summary</h2>
              </div>
              
              <div className="p-6">
                <motion.div 
                  className="space-y-4 mb-6 max-h-72 overflow-y-auto pr-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {items.map((item) => (
                    <motion.div 
                      key={item.id} 
                      className="flex items-center space-x-4 py-3 border-b border-gray-100"
                      variants={itemVariants}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                    >
                      <div className="relative">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <div className="absolute -top-2 -right-2 bg-purple-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {item.category}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div 
                  className="space-y-3 pt-4 border-t border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                     Free
                    </span>
                  </div>
                  
                
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-purple-900">
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                </motion.div>

                <motion.div 
                  className="mt-6 pt-6 border-t border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
              
                  
                  <div className="mt-6 flex items-center gap-2 bg-purple-50 rounded-lg p-3">
                    <div className="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-sm text-purple-700">
                      Secure SSL Encryption
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl shadow-xl mt-8 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Our support team is available 24/7 to assist you with any questions about your order.
              </p>
              <div className="flex items-center text-purple-700 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +1 (385) 219-6632
              </div>
              <div className="flex items-center text-purple-700 font-medium mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                support@claudygod.org
              </div>
            </motion.div>
          </div>
        </div>
        
    
      </motion.div>
    </>
  );
};