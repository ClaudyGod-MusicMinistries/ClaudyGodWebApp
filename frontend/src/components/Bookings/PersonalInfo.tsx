// src/components/Booking/PersonalInfo.tsx
import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  organization: string;
}

interface PersonalInfoProps {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  watchPhoneCountry: string;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({
  register,
  errors,
  watchPhoneCountry,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* First Name */}
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm robotoMedium mb-1"
          >
            First Name
          </label>
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
                {errors.firstName?.message?.toString()}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm robotoMedium mb-1"
          >
            Last Name
          </label>
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
                {errors.lastName?.message?.toString()}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Email */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm robotoMedium mb-1">
          Email Address
        </label>
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
              {errors.email?.message?.toString()}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Phone + Country Code */}
      <div className="mb-6">
        <label htmlFor="phone" className="block text-sm robotoMedium mb-1">
          Contact Number
        </label>
        <div className="flex">
          <select
            {...register('countryCode')}
            className="px-3 py-2 border border-purple-700 rounded-l-md bg-purple-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="US">US (+1)</option>
            <option value="CA">CA (+1)</option>
            <option value="UK">UK (+44)</option>
            <option value="NG">NG (+234)</option>
          </select>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className="flex-1 px-3 py-2 border border-purple-700 border-l-0 rounded-r-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder={
              watchPhoneCountry === 'US' || watchPhoneCountry === 'CA'
                ? 'e.g. 555-123-4567'
                : watchPhoneCountry === 'UK'
                ? 'e.g. 07123456789'
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
              {errors.phone?.message?.toString()}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Organization */}
      <div className="mb-6">
        <label
          htmlFor="organization"
          className="block text-sm robotoMedium mb-1"
        >
          Organization
        </label>
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
              {errors.organization?.message?.toString()}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
