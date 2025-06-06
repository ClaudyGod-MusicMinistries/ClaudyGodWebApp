// src/components/Booking/TermsSubmit.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface FormValues {
  agreeTerms: boolean;
}

interface TermsSubmitProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  isSubmitting: boolean;
}

export const TermsSubmit: React.FC<TermsSubmitProps> = ({
  register,
  errors,
  isSubmitting,
}) => {
  return (
    <div>
      {/* Terms & Disclaimer */}
      <div className="mb-8 text-sm">
        <p className="mb-4 robotoMedium">
          By submitting this Request Form, you acknowledge that you will
          receive emails from the ClaudyGod Team. This submission is only a
          request and does not guarantee participation in the event. Request
          information is needed for processing, and a team member of ClaudyGod
          will contact you after review.
        </p>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            {...register('agreeTerms')}
            className="form-checkbox text-purple-500"
          />
          <span className="ml-2 robotoMedium">
            By proceeding, you agree to our Terms of Use and Services.
          </span>
        </label>
        <AnimatePresence>
          {errors.agreeTerms && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-xs mt-1"
            >
              {errors.agreeTerms?.message as string}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full md:w-auto roboto-condensed border-1 cursor-pointer border-white text-white font-medium py-3 px-8 rounded-md transition duration-150 ease-in-out ${
          isSubmitting
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-purple-800 hover:bg-purple-700'
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
};
