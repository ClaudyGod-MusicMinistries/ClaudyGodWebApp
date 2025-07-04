import { useFormContext, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Info, Mic, Users } from 'lucide-react';

export const EventInfoSection = ({ 
  MONTHS 
}: { 
  MONTHS: string[];
}) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
          <Users className="h-4 w-4 mr-2 text-purple-700" />
          Type Of Organization
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Church', 'Promoter', 'Non Profit', 'Others'].map((type) => (
            <label 
              key={type} 
              className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all has-[:checked]:border-purple-600 has-[:checked]:bg-purple-50 has-[:checked]:ring-2 has-[:checked]:ring-purple-200"
            >
              <Controller
                name="orgType"
                control={control}
                render={({ field }) => (
                  <input
                    type="radio"
                    value={type}
                    checked={field.value === type}
                    onChange={() => field.onChange(type)}
                    className="sr-only"
                  />
                )}
              />
              <div className="text-gray-800 font-medium">{type}</div>
            </label>
          ))}
        </div>
        <AnimatePresence>
          {errors.orgType && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-500 text-xs mt-2 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.orgType.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
          <Mic className="h-4 w-4 mr-2 text-purple-700" />
          Type Of Event/Program
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {['Worship Evening', 'Concert', 'Others'].map((type) => (
            <label 
              key={type} 
              className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all has-[:checked]:border-purple-600 has-[:checked]:bg-purple-50 has-[:checked]:ring-2 has-[:checked]:ring-purple-200"
            >
              <Controller
                name="eventType"
                control={control}
                render={({ field }) => (
                  <input
                    type="radio"
                    value={type}
                    checked={field.value === type}
                    onChange={() => field.onChange(type)}
                    className="sr-only"
                  />
                )}
              />
              <div className="text-gray-800 font-medium">{type}</div>
            </label>
          ))}
        </div>
        <AnimatePresence>
          {errors.eventType && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-500 text-xs mt-2 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.eventType.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-purple-700" />
          Date Of Event
        </label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="relative">
              <Controller
                name="eventDate.day"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">DD</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                )}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <AnimatePresence>
              {errors.eventDate?.day && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-xs mt-1.5 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.eventDate.day.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          <div>
            <div className="relative">
              <Controller
                name="eventDate.month"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Month</option>
                    {MONTHS.map((month, index) => (
                      <option key={index} value={month}>{month}</option>
                    ))}
                  </select>
                )}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <AnimatePresence>
              {errors.eventDate?.month && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-xs mt-1.5 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.eventDate.month.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          <div>
            <div className="relative">
              <Controller
                name="eventDate.year"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">YYYY</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() + i;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </select>
                )}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <AnimatePresence>
              {errors.eventDate?.year && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-xs mt-1.5 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.eventDate.year.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="eventDetails" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
          <Info className="h-4 w-4 mr-2 text-purple-700" />
          Share Event Details
        </label>
        <div className="relative">
          <Controller
            name="eventDetails"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={5}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Please describe the event, audience size, theme, and any special requirements..."
              />
            )}
          />
          <div className="absolute top-3 left-3">
            <Info className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <AnimatePresence>
          {errors.eventDetails && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-500 text-xs mt-1.5 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.eventDetails.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};