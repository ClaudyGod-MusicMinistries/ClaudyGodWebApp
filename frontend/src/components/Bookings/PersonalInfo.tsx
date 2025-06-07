// src/components/booking/PersonalInfoSection.tsx
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

export const PersonalInfoSection = ({ countryCode }: { countryCode: string }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="firstName" className="block text-sm robotoMedium mb-1">First Name</label>
          <input
            id="firstName"
            {...register('firstName')}
            className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <AnimatePresence>
            {errors.firstName && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-xs mt-1"
              >
                {errors.firstName.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm robotoMedium mb-1">Last Name</label>
          <input
            id="lastName"
            {...register('lastName')}
            className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <AnimatePresence>
            {errors.lastName && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-xs mt-1"
              >
                {errors.lastName.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-sm robotoMedium mb-1">Email Address</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <AnimatePresence>
          {errors.email && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-xs mt-1"
            >
              {errors.email.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="mb-6">
        <label htmlFor="phone" className="block text-sm robotoMedium mb-1">Contact Number</label>
        <div className="flex">
          <select
            {...register('countryCode')}
            className="px-3 py-2 border border-purple-700 rounded-l-md bg-purple-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="US">US</option>
            <option value="CA">CA</option>
            <option value="UK">UK</option>
            <option value="NG">NG</option>
          </select>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className="flex-1 px-3 py-2 border border-purple-700 border-l-0 rounded-r-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder={
              countryCode === 'US' || countryCode === 'CA'
                ? 'e.g. 555-123-4567'
                : countryCode === 'UK'
                  ? 'e.g. 07123 456789'
                  : 'e.g. 08012345678'
            }
          />
        </div>
        <AnimatePresence>
          {errors.phone && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-xs mt-1"
            >
              {errors.phone.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="mb-6">
        <label htmlFor="organization" className="block text-sm robotoMedium mb-1">Organization</label>
        <input
          id="organization"
          {...register('organization')}
          className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <AnimatePresence>
          {errors.organization && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-xs mt-1"
            >
              {errors.organization.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};