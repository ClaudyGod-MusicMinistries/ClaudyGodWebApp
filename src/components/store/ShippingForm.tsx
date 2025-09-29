import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { SemiBoldText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { COUNTRY_STATES } from '../data/shippingData';

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

// add a type for your cart items so TS stops complaining
interface CartItem {
  id: string | number;
  name: string;
  quantity: number;
  price: number;
  // add any other fields you really use here
}

interface ShippingFormProps {
  shippingInfo: ShippingInfo;
  setShippingInfo: (info: ShippingInfo) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  cartTotal: number;
  cartItems: CartItem[];
}

export const ShippingForm: React.FC<ShippingFormProps> = ({
  shippingInfo,
  setShippingInfo,
  onSubmit,
  isLoading = false,
}) => {
  const { colorScheme } = useTheme();
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
      setShippingInfo({
        ...shippingInfo,
        [field]: value,
        state: '',
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
          <SemiBoldText
            as="label"
            fontSize="0.875rem"
            className="block mb-2"
            color={colorScheme.background}
          >
            First Name *
          </SemiBoldText>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User
                className="h-5 w-5"
                style={{ color: colorScheme.background }}
              />
            </div>
            <input
              type="text"
              required
              value={shippingInfo.firstName}
              onChange={e => handleChange('firstName', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                backgroundColor: colorScheme.gray[100],
                borderColor: colorScheme.gray[200],
                color: colorScheme.primary,
                boxShadow: `0 0 0 3px ${colorScheme.focusRing}`,
              }}
              placeholder="Enter first name"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <SemiBoldText
            as="label"
            fontSize="0.875rem"
            className="block mb-2"
            color={colorScheme.background}
          >
            Last Name *
          </SemiBoldText>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User
                className="h-5 w-5"
                style={{ color: colorScheme.textTertiary }}
              />
            </div>
            <input
              type="text"
              required
              value={shippingInfo.lastName}
              onChange={e => handleChange('lastName', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                backgroundColor: colorScheme.gray[100],
                borderColor: colorScheme.gray[200],
                color: colorScheme.primary,
                boxShadow: `0 0 0 3px ${colorScheme.focusRing}`,
              }}
              placeholder="Enter last name"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Contact Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <SemiBoldText
            as="label"
            fontSize="0.875rem"
            className="block mb-2"
            color={colorScheme.background}
          >
            Email *
          </SemiBoldText>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail
                className="h-5 w-5"
                style={{ color: colorScheme.textTertiary }}
              />
            </div>
            <input
              type="email"
              required
              value={shippingInfo.email}
              onChange={e => handleChange('email', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                backgroundColor: colorScheme.gray[100],
                borderColor: colorScheme.gray[200],
                color: colorScheme.primary,
                boxShadow: `0 0 0 3px ${colorScheme.focusRing}`,
              }}
              placeholder="Enter email address"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <SemiBoldText
            as="label"
            fontSize="0.875rem"
            className="block mb-2"
            color={colorScheme.background}
          >
            Phone *
          </SemiBoldText>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone
                className="h-5 w-5"
                style={{ color: colorScheme.textTertiary }}
              />
            </div>
            <input
              type="tel"
              required
              value={shippingInfo.phone}
              onChange={handlePhoneChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                phoneError ? 'border-red-500' : ''
              }`}
              style={{
                backgroundColor: colorScheme.gray[100],
                borderColor: colorScheme.gray[200],
                color: colorScheme.primary,
                boxShadow: `0 0 0 3px ${colorScheme.focusRing}`,
              }}
              placeholder={
                selectedCountry === 'Nigeria'
                  ? 'e.g. 08086392101'
                  : selectedCountry === 'Ghana'
                    ? 'e.g. 0241234567'
                    : selectedCountry === 'United States'
                      ? 'e.g. 5551234567'
                      : 'Enter phone number'
              }
              disabled={isLoading}
            />

            {phoneError && (
              <SemiBoldText
                as="label"
                fontSize="0.875rem"
                className="block mb-2"
                color={colorScheme.background}
              >
                {phoneError}
              </SemiBoldText>
            )}
          </div>
        </div>
      </div>

      {/* Address Field */}
      <div>
        <SemiBoldText
          as="label"
          fontSize="0.875rem"
          className="block mb-2"
          color={colorScheme.background}
        >
          Address *
        </SemiBoldText>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin
              className="h-5 w-5"
              style={{ color: colorScheme.textTertiary }}
            />
          </div>
          <input
            type="text"
            required
            value={shippingInfo.address}
            onChange={e => handleChange('address', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
            style={{
              backgroundColor: colorScheme.gray[100],
              borderColor: colorScheme.gray[200],
              color: colorScheme.primary,
              boxShadow: `0 0 0 3px ${colorScheme.focusRing}`,
            }}
            placeholder="Enter street address"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Location Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <SemiBoldText
            as="label"
            fontSize="0.875rem"
            className="block mb-2"
            color={colorScheme.background}
          >
            Select Country *
          </SemiBoldText>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe
                className="h-5 w-5"
                style={{ color: colorScheme.textTertiary }}
              />
            </div>
            <select
              required
              value={shippingInfo.country}
              onChange={e => handleChange('country', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 appearance-none"
              style={{
                backgroundColor: colorScheme.gray[100],
                borderColor: colorScheme.gray[200],
                color: colorScheme.primary,
                boxShadow: `0 0 0 3px ${colorScheme.focusRing}`,
              }}
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
          <SemiBoldText
            as="label"
            fontSize="0.875rem"
            className="block mb-2"
            color={colorScheme.background}
          >
            State *
          </SemiBoldText>
          {availableStates.length > 0 ? (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin
                  className="h-5 w-5"
                  style={{ color: colorScheme.textTertiary }}
                />
              </div>
              <select
                required
                value={shippingInfo.state}
                onChange={e => handleChange('state', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 appearance-none"
                style={{
                  backgroundColor: colorScheme.gray[100],
                  borderColor: colorScheme.gray[200],
                  color: colorScheme.primary,
                  boxShadow: `0 0 0 3px ${colorScheme.focusRing}`,
                }}
                disabled={isLoading}
              >
                <option value="">Select state</option>
                {availableStates.map(state => (
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
              onChange={e => handleChange('state', e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                backgroundColor: colorScheme.gray[100],
                borderColor: colorScheme.gray[200],
                color: colorScheme.primary,
                boxShadow: `0 0 0 3px ${colorScheme.focusRing}`,
              }}
              placeholder="Enter state"
              disabled={isLoading}
            />
          )}
        </div>

        <div className="lg:col-span-2">
          <SemiBoldText
            as="label"
            fontSize="0.875rem"
            className="block mb-2"
            color={colorScheme.background}
          >
            Nearest Location *
          </SemiBoldText>
          <input
            type="text"
            required
            value={shippingInfo.nearestLocation}
            onChange={e => handleChange('nearestLocation', e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
            style={{
              backgroundColor: colorScheme.gray[100],
              borderColor: colorScheme.gray[200],
              color: colorScheme.primary,
              boxShadow: `0 0 0 3px ${colorScheme.focusRing}`,
            }}
            placeholder="e.g., bus stop, landmark"
            disabled={isLoading}
          />
        </div>
      </div>

      <motion.div
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
      >
        <CustomButton
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isLoading || !!phoneError}
          isLoading={isLoading}
        >
          Continue to Payment
        </CustomButton>
      </motion.div>
    </form>
  );
};
