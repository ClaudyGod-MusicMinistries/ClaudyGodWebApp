// src/components/Bookings/TermsSubmit.tsx
import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardCheck } from 'lucide-react';

export const TermsSection = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="mb-6 text-sm">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
        <p className="text-gray-700 mb-3">
          <span className="font-medium">Important:</span> By submitting this Request Form, you acknowledge that you will receive emails from the ClaudyGod Team.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li>This submission is only a request and does not guarantee participation</li>
          <li>Request information is needed for processing</li>
          <li>A team member will contact you after review</li>
        </ul>
      </div>
      
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="agreeTerms"
            type="checkbox"
            {...register('agreeTerms')}
            className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
        </div>
        <div className="ml-3">
          <label htmlFor="agreeTerms" className="font-medium text-gray-700 flex items-center">
            <ClipboardCheck className="h-4 w-4 mr-2 text-purple-700" />
            Agreement to Terms
          </label>
          <p className="text-gray-600 mt-1">
            By proceeding, you agree to our <a href="/terms" className="text-purple-700 hover:underline">Terms of Use</a> and <a href="/privacy" className="text-purple-700 hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
      
      <AnimatePresence>
        {errors.agreeTerms && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-red-500 text-xs mt-2 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.agreeTerms.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};