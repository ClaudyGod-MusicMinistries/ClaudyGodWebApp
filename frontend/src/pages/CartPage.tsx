import React from 'react';
import { useCartStore } from '../Context/Cartcontext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

export const CartPage = () => {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="pt-24">
        <div className="container mx-auto px-4 md:px-8 py-16 text-center">
          <div className="max-w-md mx-auto">
              <FontAwesomeIcon icon={faShoppingBag} className="mx-auto text-gray-400 mb-4" /> Shopping Cart
            
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link
              to="/store"
              className="bg-purple-900 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition-colors inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <div className="bg-purple-900 text-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shopping Cart</h1>
          <div className="w-20 h-1 bg-accent-gold mb-6"></div>
          <p className="text-xl">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-6 bg-white p-6 rounded-lg shadow-sm">
                  <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-md" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-medium">{item.name}</h3>
                        <p className="text-purple-900 text-2xl font-bold mt-2">${item.price}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                     <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                       <FontAwesomeIcon icon={faMinus} className="h-4 w-4" />
                      </button>
                      <span className="text-xl font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                    <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-purple-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Link
                to="/checkout"
                className="w-full bg-purple-900 text-white py-4 px-6 rounded-md text-center font-semibold hover:bg-purple-800 transition-colors mt-8 block"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/store"
                className="w-full border border-purple-900 text-purple-900 py-4 px-6 rounded-md text-center font-semibold hover:bg-purple-50 transition-colors mt-4 block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
