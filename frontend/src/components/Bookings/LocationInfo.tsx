// src/components/Booking/LocationInfo.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface LocationFormData {
  address1: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
}

interface LocationInfoProps {
  register: UseFormRegister<LocationFormData>;
  errors: FieldErrors<LocationFormData>;
  states: string[];
  cities: string[];
  selectedCountry: string;
  selectedState: string;
}

export const LocationInfo: React.FC<LocationInfoProps> = ({
  register,
  errors,
  states,
  cities,
  selectedCountry,
  selectedState,
}) => {
  return (
    <div>
      {/* Address 1 & 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label
            htmlFor="address1"
            className="block text-sm font-medium mb-1"
          >
            Address 1
          </label>
          <input
            id="address1"
            {...register('address1')}
            className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <AnimatePresence>
            {errors.address1 && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-xs mt-1"
              >
                {errors.address1.message?.toString()}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div>
          <label
            htmlFor="address2"
            className="block text-sm robotoMedium mb-1"
          >
            Address 2
          </label>
          <input
            id="address2"
            {...register('address2')}
            className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Country → State → City */}
      <div className="mb-6">
        <label className="block text-sm robotoMedium mb-1">Location</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* Country */}
          <div>
            <select
              {...register('country')}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Country</option>
              <option value="US">US</option>
              <option value="CA">CA</option>
              <option value="UK">UK</option>
              <option value="NG">NG</option>
            </select>
            <AnimatePresence>
              {errors.country && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.country.message?.toString()}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* State */}
          <div>
            <select
              {...register('state')}
              disabled={!selectedCountry}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-purple-100 disabled:cursor-not-allowed"
            >
              <option value="">State</option>
              {states.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
            <AnimatePresence>
              {errors.state && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.state.message?.toString()}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* City */}
          <div>
            <select
              {...register('city')}
              disabled={!selectedState}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-purple-100 disabled:cursor-not-allowed"
            >
              <option value="">City</option>
              {cities.map((ct) => (
                <option key={ct} value={ct}>
                  {ct}
                </option>
              ))}
            </select>
            <AnimatePresence>
              {errors.city && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.city.message?.toString()}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ZIP Code */}
      <div className="mb-6">
        <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
          ZIP Code
        </label>
        <input
          id="zipCode"
          {...register('zipCode')}
          className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <AnimatePresence>
          {errors.zipCode && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-xs mt-1"
            >
              {errors.zipCode?.message?.toString()}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
