import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  useCartStore,
  selectCartItems,
  selectCartTotal
} from '../../Context/Cartcontext';
import { CheckoutPage } from '../store/CheckoutPage';
import { useNavigate } from 'react-router-dom';

export const Checkout: React.FC = () => {
  const items    = useCartStore(selectCartItems);
  const subtotal = useCartStore(selectCartTotal);
  const navigate = useNavigate();

  // Redirect if cart empty
  useEffect(() => {
    if (items.length === 0) navigate('/cart');
  }, [items, navigate]);

  if (items.length === 0) return null;

  const taxAmount  = subtotal * 0.08;
  const finalTotal = subtotal + taxAmount;

  return (
    <>
      <Helmet>
        <title>Checkout - ClaudyGod Store</title>
        <meta name="description" content="Complete your purchase securely…" />
      </Helmet>

      <div className="pt-16 min-h-screen bg-gray-50">
        {/* ... header ... */}

        <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div className="bg-white rounded-xl shadow-sm p-8">
              <CheckoutPage />
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 roboto-condensed">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
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
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-base">
                  <span className="text-gray-600 work-sans">Subtotal</span>
                  <span className="work-sans text-sm">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-600 work-sans">Shipping</span>
                  <span className="font-medium work-sans text-sm text-green-600">
                    Free
                  </span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-600 work-sans">Tax</span>
                  <span className="font-medium work-sans text-sm">
                    ${taxAmount.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className='roboto-condensed'>Total</span>
                    <span className="text-purple-900 work-sans text-base">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <span>🔒 Your Transaction is Secured</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};
