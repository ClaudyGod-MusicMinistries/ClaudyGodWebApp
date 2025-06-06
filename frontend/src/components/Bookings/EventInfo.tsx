// src/components/Booking/EventInfo.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface EventInfoProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  months: string[];
}

export const EventInfo: React.FC<EventInfoProps> = ({
  register,
  errors,
  months,
}) => {
  return (
    <div>
      {/* Event Image */}
      <div className="mb-6">
        <label
          htmlFor="eventImage"
          className="block text-sm robotoMedium mb-1"
        >
          Event Image (Max 5MB, JPEG/PNG)
        </label>
        <input
          id="eventImage"
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          {...register('eventImage')}
          className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <AnimatePresence>
          {errors.eventImage && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-xs mt-1"
            >
              {errors.eventImage?.message as string}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Organization Type */}
      <div className="mb-6">
        <label className="block text-sm robotoMedium mb-1">
          Type Of Organization
        </label>
        <div className="flex flex-wrap gap-4">
          {['Church', 'Promoter', 'Non Profit', 'Others'].map((type) => (
            <label key={type} className="inline-flex items-center raleway-slider">
              <input
                type="radio"
                value={type}
                {...register('orgType')}
                className="form-radio text-purple-500"
              />
              <span className="ml-2">{type}</span>
            </label>
          ))}
        </div>
        <AnimatePresence>
          {errors.orgType && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-xs mt-1"
            >
              {errors.orgType?.message as string}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Event Type */}
      <div className="mb-6">
        <label className="block text-sm robotoMedium mb-1">
          Type Of Event/Program
        </label>
        <div className="flex flex-wrap gap-4">
          {['Worship Evening', 'Concert', 'Others'].map((type) => (
            <label key={type} className="inline-flex items-center raleway-slider">
              <input
                type="radio"
                value={type}
                {...register('eventType')}
                className="form-radio text-purple-500"
              />
              <span className="ml-2">{type}</span>
            </label>
          ))}
        </div>
        <AnimatePresence>
          {errors.eventType && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-xs mt-1"
            >
              {errors.eventType?.message as string}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Date of Event */}
      <div className="mb-6">
        <label className="block text-sm robotoMedium mb-1">
          Date Of Event
        </label>
        <div className="grid grid-cols-3 gap-2">
          {/* Day */}
          <div>
            <select
              {...register('day')}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">DD</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <AnimatePresence>
              {errors.day && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.day?.message as string}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Month */}
          <div>
            <select
              {...register('month')}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Month</option>
              {months.map((month, idx) => (
                <option key={idx} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <AnimatePresence>
              {errors.month && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.month?.message as string}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Year */}
          <div>
            <select
              {...register('year')}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">YYYY</option>
              {Array.from({ length: 10 }, (_, i) => {
                const y = new Date().getFullYear() + i;
                return (
                  <option key={y} value={y}>
                    {y}
                  </option>
                );
              })}
            </select>
            <AnimatePresence>
              {errors.year && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {errors.year?.message as string}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="mb-6">
        <label
          htmlFor="eventDetails"
          className="block text-sm robotoMedium mb-1"
        >
          Share Event Details
        </label>
        <textarea
          id="eventDetails"
          {...register('eventDetails')}
          rows={5}
          className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Please describe the event, audience size, theme, and any special requirements..."
        />
        <AnimatePresence>
          {errors.eventDetails && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-xs mt-1"
            >
              {errors.eventDetails.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
