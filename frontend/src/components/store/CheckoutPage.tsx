import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '../../Context/Cartcontext';
import { useNavigate } from 'react-router-dom';
import {
  Building,
  Smartphone,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { ShippingForm } from './ShippingForm';
import { Zelle } from './paymentPlatforms/zelle';

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
  method: 'paypal' | 'zelle' | '';
  zelleConfirmation?: string;
}

export const CheckoutPage: React.FC = () => {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showZelleForm, setShowZelleForm] = useState(false);
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
  const tax = validTotal * 0.08;
  const grandTotal = validTotal + tax;

  const paymentMethods = [
    { id: 'paypal', name: 'PayPal', description: 'Pay with your PayPal account', icon: Smartphone, color: 'bg-blue-600' },
    { id: 'zelle', name: 'Zelle', description: 'Send money with Zelle', icon: Building, color: 'bg-purple-600' }
  ];

  const submitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const submitPayment = async () => {
    setIsProcessing(true);
    try {
      await new Promise(res => setTimeout(res, 2000));
      const orderId = `CL-ORDER-${Date.now()}`;
      const order = { items, shippingInfo, paymentInfo, subtotal: validTotal, tax, total: grandTotal, orderId };
      localStorage.setItem('lastOrder', JSON.stringify(order));
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/order-success');
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
        <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
        <button onClick={() => setStep(1)} type="button" className="text-purple-900 hover:text-purple-700 font-medium">Edit Shipping</button>
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
            }}
            type="button"
            className={`p-6 border-2 rounded-xl text-left cursor-pointer transition-all duration-300 ease-in-out ${
              paymentInfo.method === m.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
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
          className="text-center space-y-4" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.3 }}
        >
          <p className="text-lg font-medium text-gray-800">Total amount to pay: <span className="text-purple-800 font-bold">NGN {grandTotal.toFixed(2)}</span></p>
          <button 
            className="bg-purple-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-800 transition-colors duration-200"
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
            // Save order details to localStorage
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

      {paymentInfo.method === 'paypal' && (
        <motion.div 
          className="bg-blue-50 p-4 rounded-lg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p>You will be redirected to PayPal</p>
          <motion.button 
            type="button" 
            disabled={isProcessing} 
            className="w-full mt-4 bg-purple-900 text-white py-4 rounded-lg font-semibold hover:bg-purple-800 disabled:opacity-50 flex justify-center items-center"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={submitPayment}
          >
            {isProcessing ? <span>Processing...</span> : `Complete Order - NGN${grandTotal.toFixed(2)}`}
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
      {step === 1 ? (
        <ShippingForm
          shippingInfo={shippingInfo}
          setShippingInfo={setShippingInfo}
          onSubmit={submitShipping}
        />
      ) : (
        <PaymentForm />
      )}
    </motion.div>
  );
};