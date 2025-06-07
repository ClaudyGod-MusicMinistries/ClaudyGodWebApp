// src/components/booking/LocationSection.tsx
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { CountryCode } from '@/components/types/booking';

export const LocationSection = ({ 
  states, 
  cities, 
  country,
  COUNTRY_STATE_CITY_DATA
}: { 
  states: string[]; 
  cities: string[]; 
  country: CountryCode;
  COUNTRY_STATE_CITY_DATA: any;
}) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="address1" className="block text-sm font-medium mb-1">Address 1</label>
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
                {errors.address1.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div>
          <label htmlFor="address2" className="block text-sm robotoMedium mb-1">Address 2</label>
          <input
            id="address2"
            {...register('address2')}
            className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm robotoMedium mb-1">Location</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div>
            <select
              {...register('country')}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Country</option>
              {Object.keys(COUNTRY_STATE_CITY_DATA).map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <AnimatePresence>
              {errors.country && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.country.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          <div>
            <select
              {...register('state')}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={!country}
            >
              <option value="">State</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
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
                  {errors.state.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          <div>
            <select
              {...register('city')}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={!states.length}
            >
              <option value="">City</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
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
                  {errors.city.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="zipCode" className="block text-sm font-medium mb-1">ZIP Code</label>
        <input
          id="zipCode"
          {...register('zipCode')}
          placeholder={
            country === 'US' ? 'e.g. 12345 or 12345-6789' :
            country === 'CA' ? 'e.g. A1B 2C3' :
            country === 'UK' ? 'e.g. SW1A 1AA' :
            'e.g. 123456'
          }
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
              {errors.zipCode.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};