// src/components/Contact/ContactForm.tsx
import React from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ContactFormInputs = {
  name: string;
  email: string;
  message: string;
};

interface ContactFormProps {
  onSuccess: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
    trigger,
  } = useForm<ContactFormInputs>({
    mode: 'onChange',
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = async (data: ContactFormInputs) => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Replace with real endpoint in production
      const response = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Submission failed');

      toast.success('Your message was sent successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });

      onSuccess();
      reset();
    } catch (err) {
      console.error('Form submit error:', err);
      toast.error('Failed to send message. Please try again.', {
        position: 'bottom-right',
        autoClose: 5000,
      });
    }
  };

  const onError = (fieldErrors: FieldErrors<ContactFormInputs>) => {
    toast.warn('Please fill in all required fields.', {
      position: 'top-right',
      autoClose: 3000,
    });
    const firstKey = Object.keys(fieldErrors)[0] as keyof ContactFormInputs;
    trigger(firstKey);
  };

  const validateField = async (field: keyof ContactFormInputs) => {
    await trigger(field);
  };

  return (
    <div>
      {/* Toast Container for this form */}
      <ToastContainer />

      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6" noValidate>
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm robotoMedium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
              maxLength: { value: 50, message: 'Name cannot exceed 50 characters' },
            })}
            onBlur={() => validateField('name')}
            className={`w-full px-3 py-2 border ${
              errors.name ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition-colors`}
            placeholder="Enter Name Here"
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm robotoMedium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
              maxLength: { value: 100, message: 'Email cannot exceed 100 characters' },
            })}
            onBlur={() => validateField('email')}
            className={`w-full px-3 py-2 border ${
              errors.email ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition-colors`}
            placeholder="Enter Email Address"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm robotoMedium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows={6}
            {...register('message', {
              required: 'Message is required',
              minLength: { value: 10, message: 'Message must be at least 10 characters' },
              maxLength: { value: 2000, message: 'Message cannot exceed 2000 characters' },
            })}
            onBlur={() => validateField('message')}
            className={`w-full px-3 py-2 border ${
              errors.message ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition-colors`}
            placeholder="Write Your Message Here. Max 2000 Characters"
            aria-invalid={errors.message ? 'true' : 'false'}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !isValid || !isDirty}
          className={`w-full md:w-auto bg-purple-900 cursor-pointer hover:bg-purple-800 robotoMedium text-white font-medium py-3 px-8 rounded-md transition-all duration-300 ease-in-out flex items-center justify-center ${
            isSubmitting || !isValid || !isDirty
              ? 'opacity-70 cursor-not-allowed'
              : 'hover:scale-[1.02] transform shadow-lg hover:shadow-xl'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </>
          ) : (
            'Submit Message'
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
