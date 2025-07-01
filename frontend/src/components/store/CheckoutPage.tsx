import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../contexts/Cartcontext';
import { useNavigate } from 'react-router-dom';
import { Truck, CreditCard, ArrowLeft, Building, Smartphone, Landmark } from 'lucide-react';
import toast from 'react-hot-toast';
import { ShippingForm } from './ShippingForm';
import { ZellePayment } from './paymentPlatforms/zelle';
import { NigerianBankTransfer } from './paymentPlatforms/NigerianAcct';

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  nearestLocation: string;
}

interface PaymentInfo {
  method: 'paypal' | 'zelle' | 'nigerian-bank' | '';
  zelleConfirmation?: string;
}

export const CheckoutPage: React.FC = () => {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showZelleForm, setShowZelleForm] = useState(false);
  const [showBankForm, setShowBankForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'United States',
    nearestLocation: ''
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({ method: '' });

  const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const total = subtotal;

  const finalizeOrder = (txId?: string) => {
    clearCart();
    toast.success('Order placed successfully!');
    if (paymentInfo.method === 'zelle') {
      navigate('/payment-pending', { 
        state: { 
          orderId: `CL-ORDER-${Date.now()}`,
          paymentMethod: paymentInfo.method 
        } 
      });
    } else {
      navigate(`/confirm-payment/${`CL-ORDER-${Date.now()}`}`, { 
        state: { 
          paymentMethod: paymentInfo.method 
        } 
      });
    }
  };

  const submitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const submitPayment = async () => {
    if (!paymentInfo.method) {
      toast.error('Please select a payment method');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      finalizeOrder();
    }, 2000);
  };

  const paymentMethods = [
    { id: 'paypal', name: 'PayPal', icon: Smartphone, color: 'bg-blue-600' },
    { id: 'zelle', name: 'Zelle', icon: Building, color: 'bg-purple-600' },
    { id: 'nigerian-bank', name: 'Nigerian Bank', icon: Landmark, color: 'bg-green-600' },
    { id: 'credit-card', name: 'Credit Card', icon: CreditCard, color: 'bg-yellow-500', disabled: true },
    { id: 'cash-delivery', name: 'Cash on Delivery', icon: Truck, color: 'bg-red-500', disabled: true }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto p-4 space-y-8"
    >
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="shipping"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ShippingForm
              shippingInfo={shippingInfo}
              setShippingInfo={setShippingInfo}
              onSubmit={submitShipping}
              cartTotal={total}
              cartItems={items}
            />
          </motion.div>
        ) : (
          <motion.div
            key="payment"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <button 
              onClick={() => setStep(1)} 
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <ArrowLeft className="inline mr-1" /> Back to Shipping
            </button>

            <h2 className="text-2xl font-bold">Select Payment Method</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {paymentMethods.map((method) => (
                <motion.button
                  key={method.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (method.disabled) {
                      toast('Coming soon!', { icon: '🛠️' });
                      return;
                    }
                    setPaymentInfo({ method: method.id as any });
                    setShowZelleForm(false);
                    setShowBankForm(false);
                  }}
                  disabled={method.disabled}
                  className={`p-4 border rounded-xl flex items-center gap-2 ${
                    paymentInfo.method === method.id 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  } ${method.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <method.icon className={`h-6 w-6 ${method.color} text-white p-1 rounded-full`} />
                  <span>{method.name}</span>
                  {method.disabled && <span className="text-xs text-gray-500 ml-auto">Soon</span>}
                </motion.button>
              ))}
            </div>

            {paymentInfo.method === 'paypal' && (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={submitPayment}
                disabled={isProcessing}
                className={`w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${
                  isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)} with PayPal`}
              </motion.button>
            )}

            {paymentInfo.method === 'zelle' && !showZelleForm && (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setShowZelleForm(true)}
                className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Send ${total.toFixed(2)} via Zelle
              </motion.button>
            )}

            {paymentInfo.method === 'zelle' && showZelleForm && (
              <ZellePayment amount={total} onSubmit={finalizeOrder} />
            )}

            {paymentInfo.method === 'nigerian-bank' && !showBankForm && (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setShowBankForm(true)}
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Transfer ${total.toFixed(2)} to our bank
              </motion.button>
            )}

            {paymentInfo.method === 'nigerian-bank' && showBankForm && (
              <NigerianBankTransfer amount={total} onSubmit={finalizeOrder} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};