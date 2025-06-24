// src/components/checkout/ShippingForm.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, User, Mail, Phone, MapPin, Navigation, ChevronDown } from 'lucide-react';

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  nearestLocation: string;
  country: string;
}

interface ShippingFormProps {
  shippingInfo: ShippingInfo;
  setShippingInfo: React.Dispatch<React.SetStateAction<ShippingInfo>>;
  onSubmit: (e: React.FormEvent) => void;
}

const countryData = {
  Nigeria: [
    "Lagos", "Abuja", "Kano", "Rivers", "Oyo", "Delta", "Enugu", "Kaduna", 
    "Ogun", "Osun", "Plateau", "Sokoto", "Anambra", "Bauchi", "Bayelsa"
  ],
  Canada: [
    "Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba",
    "Saskatchewan", "Nova Scotia", "New Brunswick", "Newfoundland", 
    "Prince Edward Island"
  ],
  "United States": [
    "California", "Texas", "Florida", "New York", "Illinois",
    "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"
  ],
  "United Kingdom": [
    "England", "Scotland", "Wales", "Northern Ireland"
  ],
  Ghana: [
    "Greater Accra", "Ashanti", "Western", "Eastern", "Central",
    "Volta", "Brong Ahafo", "Northern", "Upper East", "Upper West"
  ]
};

export const ShippingForm: React.FC<ShippingFormProps> = ({ 
  shippingInfo, 
  setShippingInfo, 
  onSubmit 
}) => {
  const [states, setStates] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [countryError, setCountryError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120
      }
    }
  };

  useEffect(() => {
    if (shippingInfo.country && countryData[shippingInfo.country as keyof typeof countryData]) {
      setStates(countryData[shippingInfo.country as keyof typeof countryData]);
    } else {
      setStates([]);
    }
  }, [shippingInfo.country]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountrySelect = (country: string) => {
    setShippingInfo({
      ...shippingInfo,
      country,
      state: ""
    });
    setCountryError(null);
    setPhoneError(null);
    setIsOpen(false);
  };

  // Format phone number based on country
  const formatPhoneNumber = (input: string, country?: string): string => {
    const cleaned = input.replace(/\D/g, '');
    
    if (!country) return cleaned;
    
    switch (country) {
      case 'Nigeria':
        return cleaned.length > 4 
          ? `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 11)}`
          : cleaned;
        
      case 'Ghana':
        return cleaned.length > 3 
          ? `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`
          : cleaned;
          
      case 'United States':
      case 'Canada':
        return cleaned.length > 6 
          ? `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
          : cleaned.length > 3
            ? `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
            : cleaned;
            
      case 'United Kingdom':
        return cleaned.length > 5 
          ? `${cleaned.slice(0, 5)} ${cleaned.slice(5, 11)}`
          : cleaned;
          
      default:
        return cleaned;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const formatted = shippingInfo.country 
      ? formatPhoneNumber(rawValue, shippingInfo.country)
      : rawValue;
    
    setShippingInfo({ ...shippingInfo, phone: rawValue });
    setPhoneError(null);
  };

  const getPhoneFormatError = (phone: string, country: string): string | null => {
    const cleaned = phone.replace(/\D/g, '');
    
    switch (country) {
      case 'Nigeria':
        if (!/^0[7-9]/.test(cleaned)) 
          return "Nigerian numbers must start with 07, 08, or 09";
        if (cleaned.length !== 11) 
          return "Nigerian numbers must be 11 digits (e.g. 080 1234 5678)";
        return null;
      
      case 'Ghana':
        if (!/^0[256]/.test(cleaned)) 
          return "Ghanaian numbers must start with 02, 05, or 06";
        if (cleaned.length !== 10) 
          return "Ghanaian numbers must be 10 digits (e.g. 020 123 4567)";
        return null;
      
      case 'United States':
        if (cleaned.length !== 10) 
          return "US numbers must be 10 digits (e.g. (212) 555-1234)";
        if (/^0|^1/.test(cleaned)) 
          return "Cannot start with 0 or 1";
        return null;
      
      case 'United Kingdom':
        if (!/^0/.test(cleaned)) 
          return "UK numbers must start with 0";
        if (cleaned.length !== 11) 
          return "UK numbers must be 11 digits (e.g. 07123 456789)";
        return null;
      
      case 'Canada':
        if (cleaned.length !== 10) 
          return "Canadian numbers must be 10 digits (e.g. (416) 555-1234)";
        if (/^0|^1/.test(cleaned)) 
          return "Cannot start with 0 or 1";
        return null;
      
      default:
        return "Please enter a valid phone number for the selected country";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingInfo.country) {
      setCountryError("Please select a country");
      return;
    }

    const phoneErrorMsg = getPhoneFormatError(shippingInfo.phone, shippingInfo.country);
    if (phoneErrorMsg) {
      setPhoneError(phoneErrorMsg);
      return;
    }

    setCountryError(null);
    setPhoneError(null);
    onSubmit(e);
  };

  // Get formatted phone display value
  const formattedPhone = shippingInfo.country 
    ? formatPhoneNumber(shippingInfo.phone, shippingInfo.country)
    : shippingInfo.phone;

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex items-center mb-6"
        variants={itemVariants}
      >
        <div className="bg-purple-100 p-2 rounded-full mr-3">
          <Truck className="h-6 w-6 text-purple-900" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-400 bg-gray-100 p-1.5 rounded-full">
              <User className="h-4 w-4" />
            </div>
            <input
              type="text"
              required
              value={shippingInfo.firstName}
              onChange={e => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
              className="w-full pl-12 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all"
            />
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-400 bg-gray-100 p-1.5 rounded-full">
              <User className="h-4 w-4" />
            </div>
            <input
              type="text"
              required
              value={shippingInfo.lastName}
              onChange={e => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
              className="w-full pl-12 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all"
            />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-400 bg-gray-100 p-1.5 rounded-full">
              <Mail className="h-4 w-4" />
            </div>
            <input
              type="email"
              required
              value={shippingInfo.email}
              onChange={e => setShippingInfo({ ...shippingInfo, email: e.target.value })}
              className="w-full pl-12 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all"
            />
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-400 bg-gray-100 p-1.5 rounded-full">
              <Phone className="h-4 w-4" />
            </div>
            <input
              type="tel"
              required
              value={formattedPhone}
              onChange={handlePhoneChange}
              className={`w-full pl-12 px-4 py-3 border ${
                phoneError ? 'border-red-500' : 'border-gray-200'
              } rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all`}
              placeholder={shippingInfo.country ? "Enter phone number" : "Select country first"}
            />
          </div>
          {phoneError && (
            <p className="text-red-500 text-sm mt-1">{phoneError}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {shippingInfo.country ? `Format for ${shippingInfo.country}: ` : ''}
            {shippingInfo.country === 'Nigeria' && '11 digits (080 1234 5678)'}
            {shippingInfo.country === 'Ghana' && '10 digits (020 123 4567)'}
            {shippingInfo.country === 'United States' && '10 digits (2125551234)'}
            {shippingInfo.country === 'United Kingdom' && '11 digits (07123 456789)'}
            {shippingInfo.country === 'Canada' && '10 digits (4165551234)'}
          </p>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
        <div className="relative">
          <div className="absolute left-3 top-3 text-gray-400 bg-gray-100 p-1.5 rounded-full">
            <MapPin className="h-4 w-4" />
          </div>
          <input
            type="text"
            required
            value={shippingInfo.address}
            onChange={e => setShippingInfo({ ...shippingInfo, address: e.target.value })}
            className="w-full pl-12 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Country Dropdown */}
        <motion.div 
          variants={itemVariants} 
          className="relative"
          ref={countryDropdownRef}
        >
          <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
          <div 
            className={`w-full px-4 py-3 border ${
              countryError ? 'border-red-500' : 'border-gray-200'
            } rounded-xl cursor-pointer flex items-center justify-between`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={shippingInfo.country ? "" : "text-gray-400"}>
              {shippingInfo.country || "Select Country"}
            </span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </motion.div>
          </div>
          
          {countryError && (
            <p className="text-red-500 text-sm mt-1">{countryError}</p>
          )}
          
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
              >
                {Object.keys(countryData).map((country) => (
                  <div
                    key={country}
                    className={`px-4 py-3 hover:bg-purple-50 cursor-pointer ${
                      shippingInfo.country === country ? "bg-purple-50 text-purple-700 font-medium" : ""
                    }`}
                    onClick={() => handleCountrySelect(country)}
                  >
                    {country}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* State/Province Dropdown */}
        <motion.div variants={itemVariants} className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">State/Province *</label>
          <select
            required
            value={shippingInfo.state}
            onChange={e => setShippingInfo({ ...shippingInfo, state: e.target.value })}
            disabled={!shippingInfo.country}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all appearance-none cursor-pointer"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2">
            <ChevronDown className="h-5 w-5 text-gray-500" />
          </div>
        </motion.div>
        
        {/* Nearest Location Field */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nearest Location *</label>
          <div className="relative">
            <div className="absolute left-3 top-3 text-gray-400 bg-gray-100 p-1.5 rounded-full">
              <Navigation className="h-4 w-4" />
            </div>
            <input
              type="text"
              required
              placeholder="Enter your nearest location (e.g. bus stop)"
              value={shippingInfo.nearestLocation}
              onChange={e => setShippingInfo({ ...shippingInfo, nearestLocation: e.target.value })}
              className="w-full pl-12 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all"
            />
          </div>
        </motion.div>
      </div>

      <motion.button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-700 to-purple-900 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        variants={itemVariants}
      >
        Continue to Payment
      </motion.button>
    </motion.form>
  );
};