import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faPlus, 
  faMinus, 
  faTimes,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import {
  useCartStore,
  selectCartItems,
  selectCartTotal,
  selectCartCount
} from '../../contexts/Cartcontext';

import { Back3 } from '../../assets';
interface CartProps {
  isOpen?: boolean;
  onClose?: () => void;
  isModal?: boolean;
}

export const Cart: React.FC<CartProps> = ({ isOpen = true, onClose, isModal = false }) => {
  // Consume store via selectors with fallbacks
  const items = useCartStore(selectCartItems) || [];
  const subtotal = useCartStore(selectCartTotal) || 0;
  const itemCount = useCartStore(selectCartCount) || 0;
  const removeItem = useCartStore(state => state.removeItem);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const clearCart = useCartStore(state => state.clearCart);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModal && isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
    };
  }, [isModal, isOpen]);

  // const tax = subtotal * 0.08;
  const orderTotal = subtotal;

  const renderEmptyCart = () => (
    <div className="text-center py-8 px-4">
      <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
        <FontAwesomeIcon icon={faShoppingCart} className="h-12 w-12 text-gray-400" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        Your {isModal ? 'Cart' : 'Shopping Cart'} is Empty
      </h1>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Looks like you haven't added any items yet. Start shopping to fill it up!
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onClose}
          className="bg-purple-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-800 transition-colors duration-200 inline-flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5 mr-2" />
          Continue Shopping
        </button>
        <Link
          to="/store"
          className="border border-purple-900 text-purple-900 px-6 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors duration-200 inline-flex items-center justify-center"
        >
          Browse Store
        </Link>
      </div>
    </div>
  );

  const renderCartItems = () => (
    <div className="space-y-4">
      {items.map((item) => {
        // Add null checks for item properties
        const itemPrice = item?.price || 0;
        const itemQuantity = item?.quantity || 1;
        const itemTotal = itemPrice * itemQuantity;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-start gap-4 pb-4 border-b"
          >
            <div className="flex-shrink-0">
              <img
                src={item.image || ''}
                alt={item.name || 'Product'}
                className="w-20 h-20 md:w-24 md-h-24 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between gap-2">
                <div>
                  <h3 className="font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                  <p className="text-sm text-gray-500 capitalize mt-1">{item.category}</p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 mt-1"
                  aria-label="Remove item"
                >
                  <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-wrap justify-between items-center mt-4 gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, itemQuantity - 1))}
                    className="p-2 hover:bg-gray-50 transition-colors duration-200"
                    disabled={itemQuantity <= 1}
                  >
                    <FontAwesomeIcon icon={faMinus} className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 text-center min-w-[2rem] font-medium">{itemQuantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, itemQuantity + 1)}
                    className="p-2 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-900">${itemTotal.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">${itemPrice.toFixed(2)} each</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  const renderOrderSummary = () => (
    <div className="border-t border-gray-200 pt-6 mt-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Subtotal ({itemCount} items)</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-green-600">Free</span>
        </div>
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Tax</span>
           <span className="font-medium text-green-600">Free</span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-purple-900">${orderTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <Link
          to="/checkout"
          className={`w-full bg-purple-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-800 transition-colors duration-200 text-center block ${
            items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={onClose}
          style={{ pointerEvents: items.length === 0 ? 'none' : 'auto' }}
        >
          Proceed to Checkout
        </Link>
        <div className="flex gap-3">
          <button
            onClick={clearCart}
            className="flex-1 text-red-600 border border-red-200 py-3 px-6 rounded-lg font-medium hover:bg-red-50 transition-colors duration-200"
            disabled={items.length === 0}
          >
            Clear Cart
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-600">
        <p className="flex items-center">
          <FontAwesomeIcon icon={faShoppingCart} className="h-4 w-4 mr-2" />
          Free shipping on all orders
        </p>
      </div>
    </div>
  );



   if (isModal) {
    return (
    <AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end"
      style={{
        background: `
          linear-gradient(135deg, rgba(106, 0, 168, 0.8) 0%, rgba(58, 0, 92, 0.9) 100%),
          url(${Back3})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Floating Music Note Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-purple-300 opacity-30"
            style={{
              fontSize: `${Math.random() * 24 + 16}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ♫
          </motion.div>
        ))}
      </div>
      
      {/* Centered Brand Text with Glowing Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center px-4"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-roboto-condensed text-white uppercase tracking-wider mb-3"
            animate={{ 
              textShadow: [
                "0 0 5px rgba(255,255,255,0.3)",
                "0 0 20px rgba(192, 132, 252, 0.8)",
                "0 0 5px rgba(255,255,255,0.3)"
              ]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity 
            }}
          >
            ClaudyGod Music & Ministries
          </motion.h1>
          <motion.div 
            className="w-32 h-1 bg-purple-300 mx-auto mb-5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ delay: 0.4, duration: 0.8 }}
          ></motion.div>
          <motion.p 
            className="text-2xl md:text-3xl font-semibold text-purple-200 italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Music Store
          </motion.p>
        </motion.div>
      </div>

      {/* Cart Panel with Enhanced Animations */}
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: 1,
          transition: { 
            type: 'spring', 
            damping: 25, 
            stiffness: 200,
            delay: 0.2
          }
        }}
        exit={{ 
          x: '100%', 
          opacity: 0,
          transition: { 
            duration: 0.4, 
            ease: 'easeIn' 
          }
        }}
        className="relative h-full w-full max-w-md bg-gradient-to-b from-white to-purple-50 shadow-[0_0_40px_10px_rgba(106,0,168,0.3)] flex flex-col border-l-4 border-purple-600"
      >
        <div className="p-4 flex justify-between items-center border-b border-purple-200 sticky top-0 bg-white/90 backdrop-blur-sm z-10">
          <h2 className="text-xl font-bold flex items-center text-purple-900">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ 
                duration: 0.5,
                repeat: itemCount > 0 ? Infinity : 0,
                repeatDelay: 2
              }}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="mr-3 text-purple-700" />
            </motion.span>
            Shopping Cart ({itemCount})
          </h2>
          <motion.button 
            onClick={onClose}
            className="text-gray-500 hover:text-purple-700 p-2 transition-colors duration-200 rounded-full hover:bg-purple-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
          </motion.button>
        </div>
        
        {/* Cart Content with Enhanced Scroll Area */}
        <motion.div 
          className="flex-1 overflow-y-auto p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {items.length === 0 ? renderEmptyCart() : renderCartItems()}
        </motion.div>
        
        {items.length > 0 && (
          <motion.div 
            className="p-4 border-t border-purple-200 bg-white/80 backdrop-blur-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {renderOrderSummary()}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    );
  }


  return (
    <>
      <Helmet>
        <title>
          {items.length > 0 
            ? `Shopping Cart (${itemCount} items) - ClaudyGod Store` 
            : 'Shopping Cart - ClaudyGod Store'}
        </title>
        <meta 
          name="description" 
          content={items.length > 0 
            ? `Review your ${itemCount} selected faith-inspired products before checkout. Total: $${orderTotal.toFixed(2)}` 
            : "Your shopping cart is empty. Browse our collection of faith-inspired products and Christian merchandise."} 
        />
      </Helmet>
      {/* Full Page View */}
      <div className="pt-16 min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-purple-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Shopping Cart</h1>
              <div className="w-20 h-1 bg-yellow-400 mb-4"></div>
              <p className="text-xl text-purple-100">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </motion.div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8"
            >
              {renderEmptyCart()}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Order Items</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <AnimatePresence>
                      {renderCartItems()}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-xl shadow-sm p-6 sticky top-24"
                >
                  {renderOrderSummary()}
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};