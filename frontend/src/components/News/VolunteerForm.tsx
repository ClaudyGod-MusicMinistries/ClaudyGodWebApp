import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { submitVolunteerForm, VolunteerFormData } from '../api/volunteer'; // Add this import

export const VolunteerForm = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
        className="bg-[#1a0a2e] rounded-2xl p-6 md:p-8 shadow-xl relative"
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
        
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-roboto-condensed lg:text-6xl text-white mb-6 text-center">
          Volunteer to be part of our Music Tour
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-purple-200 font-work-sans
 mb-2 text-sm md:text-base"
              >
                First Name
              </label>
              <input
                id="firstName"
                className={`w-full px-3 py-2 md:px-4 md:py-3 bg-[#0a061a] border ${
                  errors.firstName ? 'border-red-500' : 'border-purple-800'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base`}
                {...register('firstName', { required: 'First name is required' })}
              />
              {errors.firstName && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-purple-200 mb-2 font-work-sans
 text-sm md:text-base"
              >
                Last Name
              </label>
              <input
                id="lastName"
                className={`w-full px-3 py-2 md:px-4 md:py-3 bg-[#0a061a] border ${
                  errors.lastName ? 'border-red-500' : 'border-purple-800'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base`}
                {...register('lastName', { required: 'Last name is required' })}
              />
              {errors.lastName && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-purple-200 mb-2 font-work-sans
 text-sm md:text-base"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-3 py-2 md:px-4 md:py-3 bg-[#0a061a] border ${
                errors.email ? 'border-red-500' : 'border-purple-800'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base`}
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-xs">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-purple-200 mb-2  font-work-sans
 text-sm md:text-base"
            >
              Volunteering as
            </label>
            <select
              id="role"
              className={`w-full px-3 py-2 font-work-sans
 md:px-4 md:py-3 bg-[#0a061a] border ${
                errors.role ? 'border-red-500' : 'border-purple-800'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base appearance-none`}
              {...register('role', { required: 'Please select a role' })}
            >
              <option value="">Select a role</option>
              <option value="backup-singer">Backup Singer</option>
              <option value="protocol">Protocol</option>
              <option value="media">Media</option>
              <option value="security">Security</option>
              <option value="other">Other</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-red-500 text-xs">
                {errors.role.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="reason"
              className="block text-purple-200 font-work-sans
  mb-2 text-sm md:text-base"
            >
              Reason for Volunteering
            </label>
            <textarea
              id="reason"
              rows={4}
              className={`w-full px-3 py-2 md:px-4 md:py-3 bg-[#0a061a] border ${
                errors.reason ? 'border-red-500' : 'border-purple-800'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base`}
              {...register('reason', { 
                required: 'Reason is required',
                minLength: {
                  value: 20,
                  message: 'Reason should be at least 20 characters'
                }
              })}
            ></textarea>
            {errors.reason && (
              <p className="mt-1 text-red-500 text-xs">
                {errors.reason.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2.5 md:py-3.5 bg-gradient-to-r from-purple-800 to-purple-600 cursor-pointer text-white rounded-lg shadow-lg transition-all font-medium text-sm md:text-base ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Volunteer Application'
            )}
          </button>
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
            className="bg-[#1a0a2e] rounded-2xl p-8 max-w-md w-full mx-4 border border-purple-600 shadow-xl"
          >
            <div className="text-center">
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h3 className="text-2xl text-white mb-2 font-bold">Thank You!</h3>
              <p className="text-purple-200 mb-6">
                Your volunteer application has been submitted successfully. We'll contact you soon with more details.
              </p>
              <button
                onClick={() => {
                  reset();
                  setShowSuccessModal(false);
                }}
                className="w-full py-3 bg-gradient-to-r from-purple-700 to-purple-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};