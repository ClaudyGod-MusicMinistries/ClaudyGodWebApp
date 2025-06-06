import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Herosection } from '../components/Herosection';
import { Log } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewsletterForm from '../components/Newsletter';
import {
  faMapPin,
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

// Add these brand‐icon imports:
import {
  faFacebookF,
  faXTwitter,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ContactFormInputs = {
  name: string;
  email: string;
  message: string;
};

export const ContactData: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
    trigger,
  } = useForm<ContactFormInputs>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormInputs) => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In production, replace with your actual POST request:
      
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
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setIsModalOpen(true);
      reset();
    } catch (err) {
      console.error('Form submit error:', err);
      toast.error('Failed to send message. Please try again.', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const validateField = async (field: keyof ContactFormInputs) => {
    await trigger(field);
  };

  return (
    <div className="bg-white relative">
      {/* Toast Container */}
      <ToastContainer />

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 text-center shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Thank You!</h2>
            <p className="text-gray-700 mb-6">
              Thank You for contacting us, our team will get back to you as soon as possible.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-purple-900 hover:bg-purple-800 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Herosection
          title="ClaudyGod Music & Ministries / Contact"
          backgroundImage={Log}
          className="relative z-0"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl roboto-condensed text-purple-900 mb-6 inline-block px-4 md:px-16 py-2 md:py-4 border-b-2 border-purple-900">
            We Are Here For You
          </h2>
          <p className="text-gray-700 robotoMedium mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Please leave a prayer request, testimony or a comment...
          </p>
        </div>

        <h3 className="text-gray-900 mb-6 roboto-condensed text-2xl md:text-3xl lg:text-4xl">
          Get In Touch With Us
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
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
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    },
                    maxLength: {
                      value: 50,
                      message: 'Name cannot exceed 50 characters',
                    },
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
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
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Enter a valid email address',
                    },
                    maxLength: {
                      value: 100,
                      message: 'Email cannot exceed 100 characters',
                    },
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
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
                    minLength: {
                      value: 10,
                      message: 'Message must be at least 10 characters',
                    },
                    maxLength: {
                      value: 2000,
                      message: 'Message cannot exceed 2000 characters',
                    },
                  })}
                  onBlur={() => validateField('message')}
                  className={`w-full px-3 py-2 border ${
                    errors.message ? 'border-red-500' : 'border-gray-300 focus:border-purple-500'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition-colors`}
                  placeholder="Write Your Message Here. Max 2000 Characters"
                  aria-invalid={errors.message ? 'true' : 'false'}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !isValid || !isDirty}
                className={`w-full md:w-auto bg-purple-900 hover:bg-purple-800 robotoMedium text-white font-medium py-3 px-8 rounded-md transition-all duration-300 ease-in-out flex items-center justify-center ${
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
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Submit Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl md:text-2xl roboto-condensed text-gray-900 mb-6">
              Management & General Inquiries
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <FontAwesomeIcon icon={faMapPin} className="text-purple-900 mt-1 mr-3 text-lg" />
                <div>
                  <p className="font-medium">ClaudyGod Music & Ministries</p>
                  <p>San Ramon, California</p>
                </div>
              </div>

              <div className="flex items-center">
                <FontAwesomeIcon icon={faPhone} className="text-purple-900 mr-3 text-lg" />
                <a href="tel:+13852196632" className="hover:text-purple-800 transition-colors">
                  +1 (385) 219-6632
                </a>
              </div>

              <div className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-purple-900 mr-3 text-lg" />
                <a href="mailto:info@ClaudyGod.com" className="hover:text-purple-800 transition-colors">
                  info@ClaudyGod.com
                </a>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Connect With Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label="Follow us on Facebook"
                >
                  <FontAwesomeIcon icon={faFacebookF} className="text-purple-900" />
                </a>

                <a
                  href="https://x.com/yourhandle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label="Follow us on X"
                >
                  <FontAwesomeIcon icon={faXTwitter} className="text-purple-900" />
                </a>

                <a
                  href="https://www.instagram.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label="Follow us on Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} className="text-purple-900" />
                </a>

                <a
                  href="https://www.youtube.com/yourchannel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label="Follow us on YouTube"
                >
                  <FontAwesomeIcon icon={faYoutube} className="text-purple-900" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-purple-900" />

        {/* Newsletter Form */}
        <NewsletterForm />
      </div>

      <div className="bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">ClaudyGod Music & Ministries</h2>
          <p className="text-lg mb-6">Connect With Us On Various Social Platforms</p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-800 hover:bg-purple-700 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Follow us on Facebook"
            >
              <FontAwesomeIcon icon={faFacebookF} className="text-white" />
            </a>

            <a
              href="https://x.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-800 hover:bg-purple-700 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Follow us on X"
            >
              <FontAwesomeIcon icon={faXTwitter} className="text-white" />
            </a>

            <a
              href="https://www.instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-800 hover:bg-purple-700 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Follow us on Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} className="text-white" />
            </a>

            <a
              href="https://www.youtube.com/yourchannel"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-800 hover:bg-purple-700 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
              aria-label="Follow us on YouTube"
            >
              <FontAwesomeIcon icon={faYoutube} className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
