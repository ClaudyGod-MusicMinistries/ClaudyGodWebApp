import { useCart } from '../Context/Cartcontext';
import { Link } from 'react-router-dom';

export const Payment = () => {
  const { cartTotal, clearCart } = useCart();

  const handlePayment = () => {
    // Implement actual payment processing here
    console.log('Processing payment for amount:', cartTotal);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Payment Summary</h2>
        <div className="mb-6">
          <p className="text-xl font-semibold">
            Total Amount: ${cartTotal.toFixed(2)}
          </p>
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-purple-900 hover:bg-purple-800 text-white py-3 rounded-lg transition-colors"
        >
          Complete Payment
        </button>
        <Link
          to="/cart"
          className="mt-4 inline-block text-purple-900 hover:text-purple-800"
        >
          ← Return to Cart
        </Link>
      </div>
    </div>
  );
};