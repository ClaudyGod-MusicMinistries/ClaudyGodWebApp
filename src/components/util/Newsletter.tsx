import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { subscribeToNewsletter } from '../../components/api/subscriber';
import { motion } from 'framer-motion';
import {
  BoldText,
  LightText,
  ExtraBoldText,
  SemiBoldText,
} from '../ui/fonts/typography';
import { useTheme } from '../../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faCheckCircle,
  faCircleExclamation,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';

type FormData = {
  name: string;
  email: string;
};

interface NewsletterFormProps {
  className?: string;
  title?: string;
  description?: string;
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({
  className,
  title = 'Stay Updated',
  description = 'Subscribe to our newsletter for the latest news and updates',
}) => {
  const { colorScheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: 'onChange' });

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await subscribeToNewsletter(data);
      reset();
      setIsSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className={`w-full ${className ?? ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div
        className="w-full"
        style={{
          backgroundColor: colorScheme.text,
          border: `1px solid ${colorScheme.gray[200]}`,
        }}
      >
        <div className="p-6 sm:p-8 md:p-10 lg:p-12 w-full">
          {/* Header Section */}
          <motion.div
            className="text-center mb-8 md:mb-10 w-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div
              className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 md:mb-6 mx-auto"
              style={{
                backgroundColor: colorScheme.gray[100],
                boxShadow: `0 4px 20px ${colorScheme.accent}20`,
              }}
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                className="h-6 w-6 md:h-8 md:w-8"
                style={{ color: colorScheme.accent }}
              />
            </div>

            <ExtraBoldText
              fontSize="clamp(1.75rem, 4vw, 2.5rem)"
              className="mb-3 md:mb-4 leading-tight w-full"
              style={{ color: colorScheme.primary }}
            >
              {title}
            </ExtraBoldText>

            <LightText
              fontSize="clamp(0.9rem, 2vw, 1.1rem)"
              style={{ color: colorScheme.gray[600] }}
              className="w-full leading-relaxed"
            >
              {description}
            </LightText>
          </motion.div>

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-4 md:space-y-6 w-full max-w-2xl mx-auto">
              {' '}
              {/* Changed max-w-md to max-w-2xl */}
              {/* Name Input */}
              <div className="space-y-2 w-full">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="h-4 w-4 md:h-5 md:w-5"
                      style={{ color: colorScheme.gray[500] }}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full pl-10 pr-4 py-3 md:py-4 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 text-sm md:text-base"
                    style={{
                      backgroundColor: colorScheme.text,
                      borderColor: errors.name
                        ? colorScheme.error
                        : colorScheme.gray[300],
                      color: colorScheme.gray[800],
                      borderWidth: '2px',
                    }}
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters',
                      },
                    })}
                  />
                </div>
                {errors.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-xs md:text-sm w-full"
                  >
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      style={{ color: colorScheme.error }}
                      className="h-3 w-3 md:h-4 md:w-4"
                    />
                    <span style={{ color: colorScheme.error }}>
                      {errors.name.message}
                    </span>
                  </motion.div>
                )}
              </div>
              {/* Email Input */}
              <div className="space-y-2 w-full">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="h-4 w-4 md:h-5 md:w-5"
                      style={{ color: colorScheme.gray[500] }}
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    className="w-full pl-10 pr-4 py-3 md:py-4 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 text-sm md:text-base"
                    style={{
                      backgroundColor: colorScheme.text,
                      borderColor: errors.email
                        ? colorScheme.error
                        : colorScheme.gray[300],
                      color: colorScheme.gray[800],
                      borderWidth: '2px',
                    }}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-xs md:text-sm w-full"
                  >
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      style={{ color: colorScheme.error }}
                      className="h-3 w-3 md:h-4 md:w-4"
                    />
                    <span style={{ color: colorScheme.error }}>
                      {errors.email.message}
                    </span>
                  </motion.div>
                )}
              </div>
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-lg text-xs md:text-sm w-full"
                  style={{
                    backgroundColor: colorScheme.error + '15',
                    border: `1px solid ${colorScheme.error}30`,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    style={{ color: colorScheme.error }}
                    className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0"
                  />
                  <span style={{ color: colorScheme.error }} className="flex-1">
                    {error}
                  </span>
                </motion.div>
              )}
              {/* Success Message */}
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-lg text-xs md:text-sm w-full"
                  style={{
                    backgroundColor: colorScheme.success + '15',
                    border: `1px solid ${colorScheme.success}30`,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ color: colorScheme.success }}
                    className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0"
                  />
                  <span
                    style={{ color: colorScheme.success }}
                    className="flex-1"
                  >
                    Successfully subscribed to our newsletter!
                  </span>
                </motion.div>
              )}
              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: isValid && !isLoading ? 1.02 : 1 }}
                whileTap={{ scale: isValid && !isLoading ? 0.98 : 1 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <button
                  type="submit"
                  disabled={!isValid || isLoading}
                  className="w-full py-3 md:py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 md:gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                  style={{
                    backgroundColor: isValid
                      ? colorScheme.accent
                      : colorScheme.gray[400],
                    color: colorScheme.text,
                    boxShadow: isValid
                      ? `0 4px 15px ${colorScheme.accent}40`
                      : 'none',
                  }}
                >
                  {isLoading ? (
                    <>
                      <div
                        className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-current"
                        style={{ borderColor: colorScheme.text }}
                      />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="h-4 w-4 md:h-5 md:w-5"
                      />
                      <span>Subscribe Now</span>
                    </>
                  )}
                </button>
              </motion.div>
              {/* Privacy Note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center pt-2 w-full"
              >
                <LightText
                  fontSize="clamp(0.75rem, 1.5vw, 0.85rem)"
                  style={{ color: colorScheme.gray[500] }}
                  className="leading-relaxed w-full"
                >
                  We respect your privacy. Unsubscribe at any time.
                </LightText>
              </motion.div>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};
