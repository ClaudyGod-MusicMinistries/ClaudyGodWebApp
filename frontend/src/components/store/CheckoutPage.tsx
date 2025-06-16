import  { useState } from 'react';
import { useCartStore } from '../../Context/Cartcontext';
import { useNavigate } from 'react-router-dom';

export const CheckoutPage = () => {
  const { items, total, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle payment processing
    alert('Order placed successfully!');
    clearCart();
    navigate('/store');
  };

  if (items.length === 0) {
    return (
      <div className="pt-24">
        <div className="container mx-auto px-4 md:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/store')}
            className="bg-purple-900 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition-colors"
          >
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="max-w-lg mx-auto bg-white border border-gray-300 rounded-lg shadow-sm p-8">
  <h2 className="text-2xl font-bold mb-6">Checkout Information</h2>
  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Name fields */}
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </div>
    </div>

    {/* Email */}
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-purple-500"
      />
    </div>

    {/* Address */}
    <div>
      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
        Address
      </label>
      <input
        type="text"
        id="address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
        className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-purple-500"
      />
    </div>

    {/* City & ZIP */}
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </div>
      <div>
        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
          ZIP Code
        </label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </div>
    </div>

    {/* Country */}
    <div>
      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
        Country
      </label>
      <input
        type="text"
        id="country"
        name="country"
        value={formData.country}
        onChange={handleChange}
        required
        className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm focus:border-purple-500 focus:ring-purple-500"
      />
    </div>

    {/* Submit */}
    <button
      type="submit"
      className="w-full bg-purple-900 text-white py-3 rounded-md font-semibold hover:bg-purple-800 transition-colors"
    >
      Place Order (${total.toFixed(2)})
    </button>
  </form>
</div>

          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 mb-4 pb-4 border-b last:border-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-purple-900 font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-purple-900">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

