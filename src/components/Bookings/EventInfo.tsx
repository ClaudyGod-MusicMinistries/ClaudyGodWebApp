import { useFormContext, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Info,
  Mic,
  Users,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { RegularText, SemiBoldText } from '../ui/fonts/typography';
import { useState } from 'react';

export const EventInfoSection = ({ MONTHS }: { MONTHS: string[] }) => {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const { colorScheme } = useTheme();

  const [showOtherOrgType, setShowOtherOrgType] = useState(false);
  const [showOtherEventType, setShowOtherEventType] = useState(false);

  const orgType = watch('orgType');
  const eventType = watch('eventType');

  // Error Message Component
  const ErrorMessage = ({ message }: { message: string }) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center mt-2 p-3 rounded-lg"
      style={{
        backgroundColor: `${colorScheme.error}15`,
        border: `1px solid ${colorScheme.error}30`,
      }}
    >
      <AlertCircle
        className="h-4 w-4 mr-2 flex-shrink-0"
        style={{ color: colorScheme.error }}
      />
      <RegularText
        fontSize="0.75rem"
        style={{ color: colorScheme.error }}
        className="leading-tight"
      >
        {message}
      </RegularText>
    </motion.div>
  );

  // Radio Option Component
  const RadioOption = ({
    value,
    label,
    name,
    isSelected,
  }: {
    value: string;
    label: string;
    name: string;
    isSelected: boolean;
  }) => (
    <label
      className={`
        flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all
        hover:shadow-md hover:scale-[1.02]
        ${
          isSelected
            ? 'border-blue-500 bg-blue-50 shadow-sm'
            : 'border-gray-200 bg-white hover:border-gray-300'
        }
      `}
    >
      <div className="flex items-center space-x-3">
        <div
          className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center
          ${
            isSelected
              ? 'border-blue-500 bg-blue-500'
              : 'border-gray-300 bg-white'
          }
        `}
        >
          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
        <RegularText
          className={isSelected ? 'text-blue-600 font-medium' : 'text-gray-700'}
        >
          {label}
        </RegularText>
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            type="radio"
            value={value}
            checked={field.value === value}
            onChange={e => {
              field.onChange(e.target.value);
              if (name === 'orgType' && value === 'Others') {
                setShowOtherOrgType(true);
                setValue('otherOrgType', '');
              } else if (name === 'orgType') {
                setShowOtherOrgType(false);
              }
              if (name === 'eventType' && value === 'Others') {
                setShowOtherEventType(true);
                setValue('otherEventType', '');
              } else if (name === 'eventType') {
                setShowOtherEventType(false);
              }
            }}
            className="sr-only"
          />
        )}
      />
    </label>
  );

  return (
    <div className="space-y-8">
      {/* Organization Type Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <label className="block mb-4 flex items-center">
          <Users
            className="h-5 w-5 mr-3"
            style={{ color: colorScheme.primary }}
          />
          <SemiBoldText
            fontSize="1rem"
            style={{ color: colorScheme.backgroundSecondary }}
          >
            Type Of Organization
          </SemiBoldText>
          <span className="ml-2 text-red-500">*</span>
        </label>

        <div className="space-y-3">
          {['Church', 'Promoter', 'Non Profit', 'Others'].map(type => (
            <RadioOption
              key={type}
              value={type}
              label={type}
              name="orgType"
              isSelected={orgType === type}
            />
          ))}
        </div>

        {/* Other Organization Type Input */}
        <AnimatePresence>
          {showOtherOrgType && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <Controller
                name="otherOrgType"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900"
                    placeholder="Please specify your organization type..."
                    style={{
                      backgroundColor: colorScheme.gray[50],
                    }}
                  />
                )}
              />
              {errors.otherOrgType && (
                <ErrorMessage message={errors.otherOrgType.message as string} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {errors.orgType && (
            <ErrorMessage message={errors.orgType.message as string} />
          )}
        </AnimatePresence>
      </div>

      {/* Event Type Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <label className="block mb-4 flex items-center">
          <Mic
            className="h-5 w-5 mr-3"
            style={{ color: colorScheme.primary }}
          />
          <SemiBoldText
            fontSize="1rem"
            style={{ color: colorScheme.backgroundSecondary }}
          >
            Type Of Event/Program
          </SemiBoldText>
          <span className="ml-2 text-red-500">*</span>
        </label>

        <div className="space-y-3">
          {['Worship Evening', 'Concert', 'Others'].map(type => (
            <RadioOption
              key={type}
              value={type}
              label={type}
              name="eventType"
              isSelected={eventType === type}
            />
          ))}
        </div>

        {/* Other Event Type Input */}
        <AnimatePresence>
          {showOtherEventType && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <Controller
                name="otherEventType"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900"
                    placeholder="Please specify your event type..."
                    style={{
                      backgroundColor: colorScheme.gray[50],
                    }}
                  />
                )}
              />
              {errors.otherEventType && (
                <ErrorMessage
                  message={errors.otherEventType.message as string}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {errors.eventType && (
            <ErrorMessage message={errors.eventType.message as string} />
          )}
        </AnimatePresence>
      </div>

      {/* Date Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <label className="block mb-4 flex items-center">
          <Calendar
            className="h-5 w-5 mr-3"
            style={{ color: colorScheme.primary }}
          />
          <SemiBoldText
            fontSize="1rem"
            style={{ color: colorScheme.backgroundSecondary }}
          >
            Date Of Event
          </SemiBoldText>
          <span className="ml-2 text-red-500">*</span>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['day', 'month', 'year'].map(fieldType => (
            <div key={fieldType}>
              <div className="relative">
                <Controller
                  name={`eventDate.${fieldType}`}
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl appearance-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white text-gray-900"
                    >
                      <option value="" className="text-gray-500">
                        {fieldType === 'day'
                          ? 'DD'
                          : fieldType === 'month'
                            ? 'Month'
                            : 'YYYY'}
                      </option>
                      {fieldType === 'day' &&
                        Array.from({ length: 31 }, (_, i) => (
                          <option
                            key={i + 1}
                            value={i + 1}
                            className="text-gray-900 bg-white"
                          >
                            {i + 1}
                          </option>
                        ))}
                      {fieldType === 'month' &&
                        MONTHS.map((month, index) => (
                          <option
                            key={index}
                            value={month}
                            className="text-gray-900 bg-white"
                          >
                            {month}
                          </option>
                        ))}
                      {fieldType === 'year' &&
                        Array.from({ length: 10 }, (_, i) => {
                          const year = new Date().getFullYear() + i;
                          return (
                            <option
                              key={year}
                              value={year}
                              className="text-gray-900 bg-white"
                            >
                              {year}
                            </option>
                          );
                        })}
                    </select>
                  )}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </div>
              </div>
              <AnimatePresence>
                {errors.eventDate?.[
                  fieldType as keyof typeof errors.eventDate
                ] && (
                  <ErrorMessage
                    message={
                      (
                        errors.eventDate[
                          fieldType as keyof typeof errors.eventDate
                        ] as any
                      )?.message
                    }
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <label htmlFor="eventDetails" className="block mb-4 flex items-center">
          <Info
            className="h-5 w-5 mr-3"
            style={{ color: colorScheme.primary }}
          />
          <SemiBoldText
            fontSize="1rem"
            style={{ color: colorScheme.backgroundSecondary }}
          >
            Share Event Details
          </SemiBoldText>
          <span className="ml-2 text-red-500">*</span>
        </label>

        <div className="relative">
          <Controller
            name="eventDetails"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={5}
                className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl 
                focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
                transition-all resize-none bg-white text-gray-900"
                placeholder="Please describe the event, audience size, theme, and any special requirements..."
              />
            )}
          />
          <div className="absolute top-3 left-4">
            <Info
              className="h-5 w-5"
              style={{ color: colorScheme.textTertiary }}
            />
          </div>
        </div>

        <AnimatePresence>
          {errors.eventDetails && (
            <ErrorMessage message={errors.eventDetails.message as string} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
