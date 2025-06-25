// OrderSuccess.tsx
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
  phone: string;
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
    const navOrder = (location.state as any)?.order as Order | undefined;
    if (navOrder) {
      setOrder(navOrder);
    } else {
      const stored = localStorage.getItem('lastOrder');
      if (stored) {
        setOrder(JSON.parse(stored));
      }
    }

    if (!order && !navOrder) {
      navigate('/', { replace: true });
      return;
    }

    clearCart();
    setShowConfetti(true);
    localStorage.removeItem('lastOrder');

    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, [clearCart, location.state, navigate, order]);

  if (!order) return null;

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
        {showConfetti && <Confetti 
          recycle={false} 
          numberOfPieces={400} 
          colors={['#8B5CF6', '#6366F1', '#EC4899', '#F43F5E', '#10B981']}
          gravity={0.15}
        />}
      </AnimatePresence>

      <motion.div
        className="container mx-auto px-4 py-16 text-center relative z-10 max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50"
          variants={itemVariants}
        >
          <motion.div 
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              y: [0, -10, 0],
            }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.2,
              y: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
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

    

          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={itemVariants}
          >
            <motion.button
              onClick={() => navigate('/store')}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              whileHover={{ 
                background: "linear-gradient(to right, #7c3aed, #8b5cf6)",
                boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)"
              }}
            >
              Continue Shopping
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/account/orders')}
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-full border-2 border-indigo-100 shadow-sm hover:shadow-md transition-shadow duration-200 hover:scale-[1.03] active:scale-[0.98]"
              whileHover={{ backgroundColor: "#f5f3ff", borderColor: "#c7d2fe" }}
            >
              View Order History
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <div className="absolute inset-0 overflow-hidden z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-200 opacity-20"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 40 - 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
};
