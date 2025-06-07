import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { subscribeToNewsletter, FormData } from '../components/api/subscriber'; // Add this import

const NewsletterForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the API service instead of direct fetch
      await subscribeToNewsletter(data);

      reset();
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="md:text-3xl lg:text-5xl xl:text-5xl text-gray-900 mb-4 roboto-condensed">
            Stay Up To Date
          </h3>
          <div className="h-1 w-12 sm:w-16 md:w-20 lg:w-24 bg-purple-900 mx-auto mb-6"></div>
          <p className="md:text-base lg:text-5xl xl:text-base mx-auto raleway-light">
            Sign up for the newsletter and get the latest updates delivered right to your inbox.
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm roboto-condensed text-gray-700 mb-2">
                Name
              </label>
              <input
                id="name"
                className="w-full px-4 py-3 border work-sans border-gray-300 rounded-lg focus:outline-none focus:ring-2 slider-font text-15 focus:ring-purple-500"
                placeholder="Your Name"
                {...register('name', { 
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters'
                  },
                  maxLength: {
                    value: 50,
                    message: 'Name cannot exceed 50 characters'
                  }
                })}
              />
              {errors.name && (
                <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm roboto-condensed text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                className="w-full px-4 py-3 border work-sans text-15 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="your.email@example.com"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Status messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}
          {isSuccess && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-center">
              Thank you for subscribing! Check your email for confirmation.
            </div>
          )}

          <div className="text-center">
            <button 
              type="submit" 
              disabled={isLoading}
              className={`bg-purple-900 hover:bg-purple-800 cursor-pointer roboto-condensed text-15 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 transform hover:scale-105 ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Subscribe Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsletterForm;