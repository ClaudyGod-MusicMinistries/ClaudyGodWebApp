/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { submitVolunteerForm, VolunteerFormData } from '../api/volunteer';
import { useTheme } from '../../contexts/ThemeContext';
import { ExtraBoldText, RegularText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faSpinner, 
  faUser, 
  faEnvelope, 
  faTasks, 
  faComment 
} from '@fortawesome/free-solid-svg-icons';

export const VolunteerForm = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { colorScheme } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<VolunteerFormData>();

  const onSubmit = async (data: VolunteerFormData) => {
    try {
      await submitVolunteerForm(data);
      toast.success('Volunteer application submitted successfully!');
      setShowSuccessModal(true);
  
      setTimeout(() => {
        reset();
        setShowSuccessModal(false);
      }, 3000);
    } catch (err: any) {
      console.error('Error when submitting volunteer form:', err);
      toast.error(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl relative"
        style={{
          backgroundColor: colorScheme.surface,
          border: `1px solid ${colorScheme.outline}`
        }}
      >
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        
        <ExtraBoldText 
          fontSize="1.75rem"
          mdFontSize="2.25rem"
          lgFontSize="2.5rem"
          className="mb-4 md:mb-6 text-center"
          style={{ color: colorScheme.text }}
        >
          Volunteer to be part of our Music Tour
        </ExtraBoldText>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            <div className="relative">
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm md:text-base"
                style={{ color: colorScheme.textSecondary }}
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                First Name
              </label>
              <input
                id="firstName"
                className={`w-full pl-10 pr-3 py-2 md:px-4 md:py-3 rounded-lg focus:outline-none focus:ring-2 text-sm md:text-base ${
                  errors.firstName ? 'border-red-500' : 'border-purple-800'
                }`}
                style={{
                  backgroundColor: colorScheme.surfaceVariant,
                  border: `1px solid ${errors.firstName ? '#ef4444' : colorScheme.outline}`,
                  color: colorScheme.text
                }}
                {...register('firstName', { required: 'First name is required' })}
              />
              {/* <div className="absolute left-3 top-9 transform -translate-y-1/2 text-gray-400">
                <FontAwesomeIcon icon={faUser} />
              </div> */}
              {errors.firstName && (
                <RegularText 
                  className="mt-1 text-xs"
                  style={{ color: '#ef4444' }}
                >
                  {errors.firstName.message}
                </RegularText>
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm md:text-base"
                style={{ color: colorScheme.textSecondary }}
              >
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Last Name
              </label>
              <input
                id="lastName"
                className={`w-full pl-10 pr-3 py-2 md:px-4 md:py-3 rounded-lg focus:outline-none focus:ring-2 text-sm md:text-base ${
                  errors.lastName ? 'border-red-500' : 'border-purple-800'
                }`}
                style={{
                  backgroundColor: colorScheme.surfaceVariant,
                  border: `1px solid ${errors.lastName ? '#ef4444' : colorScheme.outline}`,
                  color: colorScheme.text
                }}
                {...register('lastName', { required: 'Last name is required' })}
              />
              {/* <div className="absolute left-3 top-9 transform -translate-y-1/2 text-gray-400">
                <FontAwesomeIcon icon={faUser} />
              </div> */}
              {errors.lastName && (
                <RegularText 
                  className="mt-1 text-xs"
                  style={{ color: '#ef4444' }}
                >
                  {errors.lastName.message}
                </RegularText>
              )}
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="email"
              className="block mb-2 text-sm md:text-base"
              style={{ color: colorScheme.textSecondary }}
            >
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className={`w-full pl-10 pr-3 py-2 md:px-4 md:py-3 rounded-lg focus:outline-none focus:ring-2 text-sm md:text-base ${
                errors.email ? 'border-red-500' : 'border-purple-800'
              }`}
              style={{
                backgroundColor: colorScheme.surfaceVariant,
                border: `1px solid ${errors.email ? '#ef4444' : colorScheme.outline}`,
                color: colorScheme.text
              }}
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
            {/* <div className="absolute left-3 top-9 transform -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faEnvelope} />
            </div> */}
            {errors.email && (
              <RegularText 
                className="mt-1 text-xs"
                style={{ color: '#ef4444' }}
              >
                {errors.email.message}
              </RegularText>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="role"
              className="block mb-2 text-sm md:text-base"
              style={{ color: colorScheme.textSecondary }}
            >
              <FontAwesomeIcon icon={faTasks} className="mr-2" />
              Volunteering as
            </label>
            <select
              id="role"
              className={`w-full pl-10 pr-3 py-2 md:px-4 md:py-3 rounded-lg focus:outline-none focus:ring-2 text-sm md:text-base appearance-none ${
                errors.role ? 'border-red-500' : 'border-purple-800'
              }`}
              style={{
                backgroundColor: colorScheme.surfaceVariant,
                border: `1px solid ${errors.role ? '#ef4444' : colorScheme.outline}`,
                color: colorScheme.text
              }}
              {...register('role', { required: 'Please select a role' })}
            >
              <option value="">Select a role</option>
              <option value="backup-singer">Backup Singer</option>
              <option value="protocol">Protocol</option>
              <option value="media">Media</option>
              <option value="security">Security</option>
              <option value="other">Other</option>
            </select>
            {/* <div className="absolute left-3 top-9 transform -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faTasks} />
            </div> */}
            {errors.role && (
              <RegularText 
                className="mt-1 text-xs"
                style={{ color: '#ef4444' }}
              >
                {errors.role.message}
              </RegularText>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="reason"
              className="block mb-2 text-sm md:text-base"
              style={{ color: colorScheme.textSecondary }}
            >
              <FontAwesomeIcon icon={faComment} className="mr-2" />
              Reason for Volunteering
            </label>
            <textarea
              id="reason"
              rows={4}
              className={`w-full pl-10 pr-3 py-2 md:px-4 md:py-3 rounded-lg focus:outline-none focus:ring-2 text-sm md:text-base ${
                errors.reason ? 'border-red-500' : 'border-purple-800'
              }`}
              style={{
                backgroundColor: colorScheme.surfaceVariant,
                border: `1px solid ${errors.reason ? '#ef4444' : colorScheme.outline}`,
                color: colorScheme.text
              }}
              {...register('reason', { 
                required: 'Reason is required',
                minLength: {
                  value: 20,
                  message: 'Reason should be at least 20 characters'
                }
              })}
            ></textarea>
            {/* <div className="absolute left-3 top-9 transform -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faComment} />
            </div> */}
            {errors.reason && (
              <RegularText 
                className="mt-1 text-xs"
                style={{ color: '#ef4444' }}
              >
                {errors.reason.message}
              </RegularText>
            )}
          </div>

          <CustomButton
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            size="lg"
            className="w-full"
            style={{
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <FontAwesomeIcon 
                  icon={faSpinner} 
                  className="animate-spin mr-3" 
                />
                Submitting...
              </span>
            ) : (
              'Submit Volunteer Application'
            )}
          </CustomButton>
        </form>
      </motion.div>
      
      {showSuccessModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="rounded-2xl p-6 md:p-8 max-w-md w-full mx-4 shadow-xl"
            style={{
              backgroundColor: colorScheme.surface,
              border: `1px solid ${colorScheme.primary}`
            }}
          >
            <div className="text-center">
              <FontAwesomeIcon 
                icon={faCheckCircle} 
                className="text-5xl mb-4"
                style={{ color: colorScheme.success || '#10B981' }}
              />
              <ExtraBoldText 
                fontSize="1.5rem"
                mdFontSize="1.75rem"
                className="mb-2"
                style={{ color: colorScheme.text }}
              >
                Thank You!
              </ExtraBoldText>
              <RegularText 
                className="mb-6"
                style={{ color: colorScheme.textSecondary }}
              >
                Your volunteer application has been submitted successfully. We'll contact you soon with more details.
              </RegularText>
              <CustomButton
                onClick={() => {
                  reset();
                  setShowSuccessModal(false);
                }}
                variant="primary"
                className="w-full"
              >
                Close
              </CustomButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};