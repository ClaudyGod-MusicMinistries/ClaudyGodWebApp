import React from 'react';
import { CartItem } from '../../Context/Cartcontext';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  tax,
  total
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
      
      {/* Items */}
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
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <span className="text-sm font-medium text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-3 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-green-600">Free</span>
        </div>
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-purple-900">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-600">
          <span>🔒 Secure checkout with SSL encryption</span>
        </div>
      </div>
    </div>
  );
};