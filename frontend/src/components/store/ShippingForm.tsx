import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Globe } from 'lucide-react';

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

interface ShippingFormProps {
  shippingInfo: ShippingInfo;
  setShippingInfo: (info: ShippingInfo) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

// Country-state mapping
const COUNTRY_STATES: Record<string, string[]> = {
  'Nigeria': ['Lagos', 'Abuja', 'Kano', 'Ogun', 'Rivers', 'Delta', 'Enugu', 'Anambra', 'Kaduna', 'Oyo', 'Imo', 'Katsina'],
  'Ghana': ['Greater Accra', 'Ashanti', 'Western', 'Central', 'Eastern', 'Volta', 'Northern', 'Upper East', 'Upper West'],
  'United States': [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ],
  'Canada': [
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 
    'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'
  ],
  'United Kingdom': [
    'England', 'Scotland', 'Wales', 'Northern Ireland'
  ]
};

export const ShippingForm: React.FC<ShippingFormProps> = ({
  shippingInfo,
  setShippingInfo,
  onSubmit,
  isLoading = false
}) => {
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState(shippingInfo.country);
  const [availableStates, setAvailableStates] = useState<string[]>([]);

  useEffect(() => {
    setSelectedCountry(shippingInfo.country);
    setAvailableStates(COUNTRY_STATES[shippingInfo.country] || []);
  }, [shippingInfo.country]);

  const handleChange = (field: keyof ShippingInfo, value: string) => {
    if (field === 'country') {
      setSelectedCountry(value);
      // Reset state when country changes
      setShippingInfo({ 
        ...shippingInfo, 
        [field]: value,
        state: '' 
      });
      setAvailableStates(COUNTRY_STATES[value] || []);
    } else {
      setShippingInfo({ ...shippingInfo, [field]: value });
    }
  };

  const validatePhoneNumber = (phone: string, country: string): boolean => {
    const cleanedPhone = phone.replace(/\D/g, '');
    switch (country) {
      case 'Nigeria':
        return /^(0|7|8|9)\d{9,10}$/.test(cleanedPhone);
      case 'Ghana':
        return /^0\d{9}$/.test(cleanedPhone);
      case 'United States':
      case 'Canada':
        return /^\d{10}$/.test(cleanedPhone);
      case 'United Kingdom':
        return /^\d{10,11}$/.test(cleanedPhone);
      default:
        return cleanedPhone.length >= 8 && cleanedPhone.length <= 15;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setShippingInfo({ ...shippingInfo, phone: value });
    
    if (!value) {
      setPhoneError('Phone number is required');
    } else if (!validatePhoneNumber(value, selectedCountry)) {
      setPhoneError(`Invalid phone number format for ${selectedCountry}`);
    } else {
      setPhoneError(null);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhoneNumber(shippingInfo.phone, selectedCountry)) {
      setPhoneError(`Invalid phone number format for ${selectedCountry}`);
      return;
    }

    onSubmit(e);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              required
              value={shippingInfo.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter first name"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              required
              value={shippingInfo.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter last name"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Contact Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              required
              value={shippingInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter email address"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              required
              value={shippingInfo.phone}
              onChange={handlePhoneChange}
              className={`w-full pl-10 pr-4 py-3 border ${
                phoneError ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              placeholder={
                selectedCountry === 'Nigeria' ? 'e.g. 08086392101' : 
                selectedCountry === 'Ghana' ? 'e.g. 0241234567' :
                selectedCountry === 'United States' ? 'e.g. 5551234567' :
                'Enter phone number'
              }
              disabled={isLoading}
            />
            {phoneError && (
              <p className="mt-1 text-sm text-red-600">{phoneError}</p>
            )}
          </div>
        </div>
      </div>

      {/* Address Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            required
            value={shippingInfo.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter street address"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Location Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-gray-400" />
            </div>
            <select
              required
              value={shippingInfo.country}
              onChange={(e) => handleChange('country', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
              disabled={isLoading}
            >
              <option value="">Select country</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          {availableStates.length > 0 ? (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <select
                required
                value={shippingInfo.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                disabled={isLoading}
              >
                <option value="">Select state</option>
                {availableStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <input
              type="text"
              required
              value={shippingInfo.state}
              onChange={(e) => handleChange('state', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter state"
              disabled={isLoading}
            />
          )}
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nearest Location *
          </label>
          <input
            type="text"
            required
            value={shippingInfo.nearestLocation}
            onChange={(e) => handleChange('nearestLocation', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="e.g., bus stop, landmark"
            disabled={isLoading}
          />
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={isLoading || !!phoneError}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating Order...
          </>
        ) : (
          'Continue to Payment'
        )}
      </motion.button>
    </form>
  );
};
