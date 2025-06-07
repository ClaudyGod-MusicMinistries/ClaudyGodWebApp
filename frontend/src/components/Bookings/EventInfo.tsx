// src/components/booking/EventInfoSection.tsx
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

export const EventInfoSection = ({ 
  states, 
  cities, 
  country,
  MONTHS 
}: { 
  states: string[]; 
  cities: string[]; 
  country: string;
  MONTHS: string[];
}) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <>
      <div className="mb-6">
        <label className="block text-sm robotoMedium mb-1">Type Of Organization</label>
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
              {errors.orgType.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="mb-6">
        <label className="block text-sm robotoMedium mb-1">Type Of Event/Program</label>
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
              {errors.eventType.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="mb-6">
        <label className="block text-sm robotoMedium mb-1">Date Of Event</label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <select
              {...register('day')}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">DD</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
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
                  {errors.day.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          <div>
            <select
              {...register('month')}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Month</option>
              {MONTHS.map((month, index) => (
                <option key={index} value={month}>{month}</option>
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
                  {errors.month.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          <div>
            <select
              {...register('year')}
              className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">YYYY</option>
              {Array.from({ length: 10 }, (_, i) => {
                const year = new Date().getFullYear() + i;
                return <option key={year} value={year}>{year}</option>;
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
                  {errors.year.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="eventDetails" className="block text-sm robotoMedium mb-1">Share Event Details</label>
        <textarea
          id="eventDetails"
          {...register('eventDetails')}
          rows={5}
          className="w-full px-3 py-2 border border-purple-700 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Please describe the event, audience size, theme, and any special requirements..."
        ></textarea>
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
    </>
  );
};