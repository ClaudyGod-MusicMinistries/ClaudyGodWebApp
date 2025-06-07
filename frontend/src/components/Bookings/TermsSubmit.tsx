// src/components/booking/TermsSection.tsx
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

export const TermsSection = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="mb-8 text-sm">
      <p className="mb-4 robotoMedium">
        By submitting this Request Form, you acknowledge that you will receive emails from the ClaudyGod Team.
        This submission is only a request and does not guarantee participation in the event. Request information
        is needed for processing, and a team member of ClaudyGod will contact you after review.
      </p>
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          {...register('agreeTerms')}
          className="form-checkbox text-purple-500"
        />
        <span className="ml-2 robotoMedium">By proceeding, you agree to our Terms of Use and Services.</span>
      </label>
      <AnimatePresence>
        {errors.agreeTerms && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-400 text-xs mt-1"
          >
            {errors.agreeTerms.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};