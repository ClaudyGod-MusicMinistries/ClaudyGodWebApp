/* eslint-disable @typescript-eslint/no-unused-vars */
import { useFormContext, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Info, Mic, Users } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { BoldText, RegularText, SemiBoldText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';

export const EventInfoSection = ({ 
  MONTHS 
}: { 
  MONTHS: string[];
}) => {
  const { control, formState: { errors } } = useFormContext();
  const { colorScheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-3 flex items-center">
          <Users className="h-4 w-4 mr-2" style={{ color: colorScheme.primary }} />
          <SemiBoldText fontSize="0.875rem"
          style={{ borderColor: colorScheme.background, 
            color:colorScheme.background }}>Type Of Organization</SemiBoldText>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Church', 'Promoter', 'Non Profit', 'Others'].map((type) => (
            // <label 
            //   key={type} 
            //   className="flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition-all has-[:checked]:ring-2"
            //   style={{
            //     // borderColor: colorScheme.border,
            //     backgroundColor: colorScheme.surface,
            //     '&:hover': {
            //       borderColor: colorScheme.primaryLight,
            //       backgroundColor: `${colorScheme.primary}10`
            //     },
            //     '&:has(:checked)': {
            //       borderColor: colorScheme.surface,
            //       backgroundColor: `${colorScheme.gray[100]}10`,
            //       ringColor: `${colorScheme.gray[100]}20`
            //     }
            //   }}
            // >
                          <label
  key={type}
  className={`
    flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition-all
    hover:border-[${colorScheme.gray[500]}] hover:bg-[${colorScheme.primary}10]
    has-[:checked]:ring-2 has-[:checked]:border-[${colorScheme.primary}]
    has-[:checked]:bg-[${colorScheme.gray[100]}10]
  `}
  style={{
    borderColor: colorScheme.backgroundSecondary,
    backgroundColor: colorScheme.primary
  }}
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
              <RegularText>{type}</RegularText>
            </label>
          ))}
        </div>
        <AnimatePresence>
          {errors.orgType && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center mt-2"
            >
              <CustomButton
                variant="error"
                size="xs"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                }
                className="!px-2 !py-1"
              >
                <RegularText fontSize="0.75rem">{errors.orgType.message}</RegularText>
              </CustomButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <label className="block mb-3 flex items-center">
          <Mic className="h-4 w-4 mr-2" style={{ color: colorScheme.primary }} />
          <SemiBoldText fontSize="0.875rem"
            style={{ borderColor: colorScheme.background, 
            color:colorScheme.background }}>Type Of Event/Program</SemiBoldText>
        </label>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
  {['Worship Evening', 'Concert', 'Others'].map((type) => (
    // <label
    //   key={type}
    //   className={`
    //     flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition-all
    //     hover:border-[${colorScheme.primary}] hover:bg-[${colorScheme.primary}10]
    //     has-[:checked]:ring-2 has-[:checked]:border-[${colorScheme.primary}]
    //     has-[:checked]:bg-[${colorScheme.primary}10]
    //   `}
    //   style={{
    //     // borderColor: colorScheme.primary,
    //     backgroundColor: colorScheme.border
    //   }}
    // >
                              <label
  key={type}
  className={`
    flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition-all
    hover:border-[${colorScheme.gray[500]}] hover:bg-[${colorScheme.primary}10]
    has-[:checked]:ring-2 has-[:checked]:border-[${colorScheme.primary}]
    has-[:checked]:bg-[${colorScheme.gray[100]}10]
  `}
  style={{
    borderColor: colorScheme.backgroundSecondary,
    backgroundColor: colorScheme.primary
  }}
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
      <RegularText>{type}</RegularText>
    </label>
  ))}
</div>

        <AnimatePresence>
          {errors.eventType && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center mt-2"
            >
              <CustomButton
                variant="error"
                size="xs"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                }
                className="!px-2 !py-1"
              >
                <RegularText fontSize="0.75rem"
                >{errors.eventType.message}</RegularText>
              </CustomButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <label className="block mb-3 flex items-center">
          <Calendar className="h-4 w-4 mr-2" style={{ color: colorScheme.primary }} />
          <SemiBoldText fontSize="0.875rem"
          style={{ borderColor: colorScheme.background, 
            color:colorScheme.background }}>Date Of Event</SemiBoldText>
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
                    className="w-full pl-3 pr-10 py-2.5 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{
                    backgroundColor: colorScheme.gray[100],
                  borderColor: colorScheme.primaryDark,
                  color: colorScheme.primaryDark,
                  focusRing: colorScheme.focusRing
                    }}
                  >
                    <option value="">DD</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                )}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <AnimatePresence>
              {errors.eventDate?.day && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center mt-1.5"
                >
                  <CustomButton
                    variant="error"
                    size="xs"
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    }
                    className="!px-2 !py-1"
                  >
                    <RegularText fontSize="0.75rem">{errors.eventDate.day.message}</RegularText>
                  </CustomButton>
                </motion.div>
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
                    className="w-full pl-3 pr-10 py-2.5 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{
                     backgroundColor: colorScheme.gray[100],
                  borderColor: colorScheme.primaryDark,
                  color: colorScheme.primaryDark,
                  focusRing: colorScheme.focusRing
                    }}
                  >
                    <option value="">Month</option>
                    {MONTHS.map((month, index) => (
                      <option key={index} value={month}>{month}</option>
                    ))}
                  </select>
                )}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <AnimatePresence>
              {errors.eventDate?.month && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center mt-1.5"
                >
                  <CustomButton
                    variant="error"
                    size="xs"
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    }
                    className="!px-2 !py-1"
                  >
                    <RegularText fontSize="0.75rem">{errors.eventDate.month.message}</RegularText>
                  </CustomButton>
                </motion.div>
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
                    className="w-full pl-3 pr-10 py-2.5 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{
                      // backgroundColor: colorScheme.surface,
                      // borderColor: colorScheme.border,
                      // color: colorScheme.text,
                      // focusRing: colorScheme.focusRing
                       backgroundColor: colorScheme.gray[100],
                  borderColor: colorScheme.primaryDark,
                  color: colorScheme.primaryDark,
                  focusRing: colorScheme.focusRing
                    }}
                  >
                    <option value="">YYYY</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() + i;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </select>
                )}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <AnimatePresence>
              {errors.eventDate?.year && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center mt-1.5"
                >
                  <CustomButton
                    variant="error"
                    size="xs"
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    }
                    className="!px-2 !py-1"
                  >
                    <RegularText fontSize="0.75rem">{errors.eventDate.year.message}</RegularText>
                  </CustomButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="eventDetails" className="block mb-3 flex items-center">
          <Info className="h-4 w-4 mr-2" style={{ color: colorScheme.primary }} />
          <SemiBoldText fontSize="0.875rem"style={{ borderColor: colorScheme.background, 
            color:colorScheme.background }}>Share Event Details</SemiBoldText>
        </label>
        <div className="relative">
          <Controller
            name="eventDetails"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={5}
                className="w-full pl-10 pr-3 py-2.5 border rounded-lg 
                focus:outline-none 
                focus:ring-2 focus:border-transparent transition-all"
                style={{
                  backgroundColor: colorScheme.gray[100],
                  borderColor: colorScheme.primaryDark,
                  color: colorScheme.primaryDark,
                  focusRing: colorScheme.focusRing
                }}
                placeholder="Please describe the event, audience size, theme, and any special requirements..."
              />
            )}
          />
          <div className="absolute top-3 left-3">
            <Info className="h-5 w-5" style={{ color: colorScheme.textTertiary }} />
          </div>
        </div>
        <AnimatePresence>
          {errors.eventDetails && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center mt-1.5"
            >
              <CustomButton
                variant="error"
                size="xs"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                }
                className="!px-2 !py-1"
              >
                <RegularText fontSize="0.75rem">{errors.eventDetails.message}</RegularText>
              </CustomButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};