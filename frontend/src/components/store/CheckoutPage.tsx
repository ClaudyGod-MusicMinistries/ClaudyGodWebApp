// CheckoutPage.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../Context/Cartcontext';
import { useNavigate } from 'react-router-dom';
import {
  Building,
  Smartphone,
  ArrowLeft,
  Truck,
  CreditCard,
  Landmark
} from 'lucide-react';
import toast from 'react-hot-toast';
import { ShippingForm } from './ShippingForm';
import { Zelle } from './paymentPlatforms/zelle';
import { NigerianBankTransfer } from '../../components/store/paymentPlatforms/NigerianAcct'; // Import the new component

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

interface PaymentInfo {
  method: 'paypal' | 'zelle' | 'nigerian-bank' | '';
  zelleConfirmation?: string;
}

export const CheckoutPage: React.FC = () => {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showZelleForm, setShowZelleForm] = useState(false);
  const [showNigerianBankForm, setShowNigerianBankForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({ method: '' });

  const validTotal = Array.isArray(items) && items.length > 0 ? items.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;
 
  const grandTotal = validTotal;

  const paymentMethods = [
    { id: 'paypal', name: 'PayPal', description: 'Pay with your PayPal account', icon: Smartphone, color: 'bg-blue-600' },
    { id: 'zelle', name: 'Zelle', description: 'Send money with Zelle', icon: Building, color: 'bg-purple-600' },
    { 
      id: 'nigerian-bank', 
      name: 'Nigerian Bank Transfer', 
      description: 'Direct bank transfer within Nigeria', 
      icon: Landmark, 
      color: 'bg-green-600' 
    }
  ];

  const finalizeOrder = (transactionId?: string) => {
    const orderId = `CL-ORDER-${Date.now()}`;
    const order = {
      orderId,
      items,
      shippingInfo,
      subtotal: validTotal,
      total: grandTotal,
      paymentMethod: paymentInfo.method,
      transactionId,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('lastOrder', JSON.stringify(order));
    clearCart();
    toast.success('Order placed successfully!');
    navigate('/payment-pending', { state: { orderId } });
  };
  
  const submitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };
 
  const submitPayment = async () => {
    setIsProcessing(true);
    try {
      await new Promise(res => setTimeout(res, 2000));
      setPaymentInfo({ ...paymentInfo, method: 'paypal' });
      finalizeOrder();
    } catch {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const PaymentForm = () => (
    <motion.div 
      className="space-y-6" 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => setStep(1)} 
          className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Shipping
        </button>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <CreditCard className="h-6 w-6 mr-2 text-indigo-600" />
          Payment Method
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {paymentMethods.map(m => (
          <motion.button
            key={m.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setPaymentInfo({ ...paymentInfo, method: m.id as any });
              setShowZelleForm(false);
              setShowNigerianBankForm(false);
            }}
            type="button"
            className={`p-6 border-2 rounded-xl text-left cursor-pointer transition-all duration-300 ease-in-out ${
              paymentInfo.method === m.id ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="flex items-center mb-4">
              <div className={`${m.color} p-3 rounded-lg text-white`}><m.icon className="h-6 w-6" /></div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">{m.name}</h3>
                <p className="text-sm text-gray-600">{m.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {paymentInfo.method === 'zelle' && !showZelleForm && (
        <motion.div 
          className="text-center space-y-4 bg-indigo-50 p-6 rounded-xl border border-indigo-100" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.3 }}
        >
          <p className="text-lg font-medium text-gray-800">Total amount to pay: <span className="text-indigo-800 font-bold">${grandTotal.toFixed(2)}</span></p>
          <button 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => setShowZelleForm(true)}
          >
            Complete Order Using Zelle
          </button>
        </motion.div>
      )}

      {paymentInfo.method === 'zelle' && showZelleForm && (
        <Zelle
          amount={grandTotal}
          onSubmit={(txId) => {
            console.log('Received from Zelle:', txId);
            const order = { 
              items, 
              shippingInfo, 
              total: grandTotal,
              paymentMethod: 'zelle',
              transactionId: txId
            };
            localStorage.setItem('lastOrder', JSON.stringify(order));
          }}
        />
      )}

      {paymentInfo.method === 'nigerian-bank' && !showNigerianBankForm && (
        <motion.div 
          className="text-center space-y-4 bg-green-50 p-6 rounded-xl border border-green-100" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.3 }}
        >
          <p className="text-lg font-medium text-gray-800">Total amount to pay: <span className="text-green-800 font-bold">${grandTotal.toFixed(2)}</span></p>
          <button 
            className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => setShowNigerianBankForm(true)}
          >
            Complete Bank Transfer
          </button>
        </motion.div>
      )}

      {paymentInfo.method === 'nigerian-bank' && showNigerianBankForm && (
        <NigerianBankTransfer
          amount={grandTotal}
          onSubmit={(txId) => {
            finalizeOrder(txId);
          }}
        />
      )}

      {paymentInfo.method === 'paypal' && (
        <motion.div 
          className="bg-blue-50 p-6 rounded-xl border border-blue-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-center mb-4">You will be redirected to PayPal</p>
          <motion.button 
            type="button" 
            disabled={isProcessing} 
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg disabled:opacity-70 flex justify-center items-center transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={submitPayment}
          >
            {isProcessing ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : `Complete Order - $${grandTotal.toFixed(2)}`}
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <motion.div 
      className="container mx-auto px-4 md:px-8 py-8 max-w-4xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-center mb-10">
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${step >= 1 ? 'bg-indigo-600' : 'bg-gray-300'}`}>
              <Truck className="h-5 w-5" />
            </div>
            <div className="mt-2 text-sm font-medium text-gray-700">Shipping</div>
          </div>
          <div className="w-16 h-1 bg-gray-300 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}>
              <CreditCard className="h-5 w-5" />
            </div>
            <div className="mt-2 text-sm font-medium text-gray-700">Payment</div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="shipping"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ShippingForm
              shippingInfo={shippingInfo}
              setShippingInfo={setShippingInfo}
              onSubmit={submitShipping}
            />
          </motion.div>
        ) : (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PaymentForm />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};