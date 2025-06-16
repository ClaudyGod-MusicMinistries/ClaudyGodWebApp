import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ContactFormInputs, ApiError } from '../types/contact';
import { submitContactForm } from '../api/ContactApi';

type ContactFormProps = {
  onSuccess: () => void;
};

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    setError 
  } = useForm<ContactFormInputs>();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ContactFormInputs) => {
    setIsSubmitting(true);
    try {
      await submitContactForm(data);
      onSuccess();
      reset();
    } catch (error) {
      const apiError = error as ApiError;
      
      if (apiError.name === 'ValidationError' && apiError.errors) {
        Object.entries(apiError.errors).forEach(([field, message]) => {
          setError(field as keyof ContactFormInputs, {
            type: 'manual',
            message
          });
        });
      } else {
        console.error('Submission error:', apiError.message);
        setError('root', {
          type: 'manual',
          message: apiError.message || 'Failed to send message. Please try again later.'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          className={`mt-1 block w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-purple-900 focus:border-purple-900`}
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          className={`mt-1 block w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-purple-900 focus:border-purple-900`}
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Your Message
        </label>
        <textarea
          id="message"
          rows={4}
          className={`mt-1 block w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-purple-900 focus:border-purple-900`}
          {...register('message', { 
            required: 'Message is required',
            minLength: {
              value: 10,
              message: 'Message should be at least 10 characters'
            }
          })}
        ></textarea>
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {errors.root && (
        <div className="text-red-600 text-sm">
          {errors.root.message}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-900 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-900 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : 'Send Message'}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;