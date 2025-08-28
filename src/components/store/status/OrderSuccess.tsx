// src/pages/OrderSuccess.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const state = location.state as {
    orderId: string;
    amount: number;
    confirmationId: string;
    paymentMethod: string;
  } || null;

  // Fallback values if state is missing
  const orderId = state?.orderId || 'N/A';
  const amount = state?.amount || 0;
  const confirmationId = state?.confirmationId || 'N/A';

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mt-4">Payment Successful!</h1>
        <p className="mt-2 text-gray-600">
          Your order <span className="font-semibold">#{orderId}</span> has been processed.
        </p>

        <div className="mt-6 bg-gray-50 rounded-lg p-4 text-left max-w-md mx-auto">
          <h2 className="text-lg font-semibold">Transaction Details</h2>
          <div className="mt-4 space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Amount:</span> ${amount.toFixed(2)}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Payment Method:</span> Zelle
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Transaction ID:</span> {confirmationId}
            </p>
          </div>
        </div>

        <button 
          onClick={() => window.location.href = '/'}
          className="mt-6 bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;