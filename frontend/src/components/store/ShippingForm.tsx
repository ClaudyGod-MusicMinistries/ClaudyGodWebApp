import React from 'react';
import { Truck, User, Mail, Phone, MapPin } from 'lucide-react';

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

interface ShippingFormProps {
  shippingInfo: ShippingInfo;
  setShippingInfo: React.Dispatch<React.SetStateAction<ShippingInfo>>;
  onSubmit: (e: React.FormEvent) => void;
}

export const ShippingForm: React.FC<ShippingFormProps> = ({ shippingInfo, setShippingInfo, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex items-center mb-6">
        <Truck className="h-6 w-6 text-purple-900 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              required
              value={shippingInfo.firstName}
              onChange={e => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
              className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              required
              value={shippingInfo.lastName}
              onChange={e => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
              className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              required
              value={shippingInfo.email}
              onChange={e => setShippingInfo({ ...shippingInfo, email: e.target.value })}
              className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" />
            <input
              type="tel"
              required
              value={shippingInfo.phone}
              onChange={e => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
              className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            required
            value={shippingInfo.address}
            onChange={e => setShippingInfo({ ...shippingInfo, address: e.target.value })}
            className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <input
          type="text"
          required
          placeholder="City"
          value={shippingInfo.city}
          onChange={e => setShippingInfo({ ...shippingInfo, city: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <input
          type="text"
          required
          placeholder="State"
          value={shippingInfo.state}
          onChange={e => setShippingInfo({ ...shippingInfo, state: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <input
          type="text"
          required
          placeholder="ZIP Code"
          value={shippingInfo.zipCode}
          onChange={e => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-900 text-white py-4 rounded-lg font-semibold hover:bg-purple-800 transition-colors duration-200"
      >
        Continue to Payment
      </button>
    </form>
  );
};
