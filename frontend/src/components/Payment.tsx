// components/Payment.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faLock } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../Context/Cart';

export const Payment = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentInfo, setPaymentInfo] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add your payment processing logic here
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear cart after successful payment
      clearCart();
      navigate('/payment-success');
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          <h1 className="text-3xl font-bold text-purple-900 mb-8 text-center">
            <FontAwesomeIcon icon={faLock} className="mr-2" />
            Secure Payment
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-900 focus:border-transparent"
                value={paymentInfo.name}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <div className="relative">
                <FontAwesomeIcon 
                  icon={faCreditCard} 
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  type="text"
                  pattern="[0-9\s]{13,19}"
                  required
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-900 focus:border-transparent"
                  placeholder="0000 0000 0000 0000"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  pattern="(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})"
                  placeholder="MM/YY"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-900 focus:border-transparent"
                  value={paymentInfo.expiry}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  pattern="\d{3,4}"
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-900 focus:border-transparent"
                  placeholder="CVC"
                  value={paymentInfo.cvc}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, cvc: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-900 hover:bg-purple-800 text-white py-3 rounded-lg transition-colors font-medium flex items-center justify-center"
            >
              Pay ${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
            </button>

            <p className="text-center text-sm text-gray-500">
              Your payment is securely encrypted
            </p>
          </form>
        </div>

        <Link 
          to="/cart"
          className="mt-6 inline-flex items-center text-purple-900 hover:text-purple-800"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Return to Cart
        </Link>
      </div>
    </div>
  );
};