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
import CustomButton from '../ui/fonts/buttons/CustomButton';
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
      className={`mt-20 mb-20 w-full max-w-4xl mx-auto px-4 ${className ?? ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div
        className="rounded-xl shadow-lg overflow-hidden"
        style={{
          backgroundColor: colorScheme.text,
          borderColor: colorScheme.gray[200],
          borderRadius: colorScheme.borderRadius.xlarge,
          borderWidth: '1px',
        }}
      >
        <div className="p-8 sm:p-10 md:p-12">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 mx-auto"
              style={{
                backgroundColor: colorScheme.gray[200],
                boxShadow: `0 4px 20px ${colorScheme.accent}20`,
              }}
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                className="h-9 w-9"
                style={{ color: colorScheme.accent }}
                fontSize="25px"
              />
            </div>
            <ExtraBoldText
              fontSize="42px"
              className="mb-4"
              style={{ color: colorScheme.primary }}
            >
              {title}
            </ExtraBoldText>
            <LightText
              fontSize="18px"
              style={{ color: colorScheme.gray[600] }}
              className="max-w-md mx-auto leading-relaxed"
            >
              {description}
            </LightText>
          </motion.div>

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
            <div className="space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="h-5 w-5"
                      style={{ color: colorScheme.gray[500] }}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1"
                    style={{
                      backgroundColor: colorScheme.text,
                      borderColor: errors.name
                        ? colorScheme.error
                        : colorScheme.gray[300],
                      color: colorScheme.gray[800], // Always dark text for readability
                      borderWidth: '2px',
                      fontSize: '16px',
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
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      style={{ color: colorScheme.error }}
                      className="h-4 w-4"
                    />
                    <span style={{ color: colorScheme.error }}>
                      {errors.name.message}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="h-5 w-5"
                      style={{ color: colorScheme.gray[500] }}
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1"
                    style={{
                      backgroundColor: colorScheme.text,
                      borderColor: errors.email
                        ? colorScheme.error
                        : colorScheme.gray[300],
                      color: colorScheme.gray[800], // Always dark text for readability
                      borderWidth: '2px',
                      fontSize: '16px',
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
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      style={{ color: colorScheme.error }}
                      className="h-4 w-4"
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
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-lg text-sm"
                  style={{
                    backgroundColor: colorScheme.error + '15',
                    border: `1px solid ${colorScheme.error}30`,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    style={{ color: colorScheme.error }}
                    className="h-4 w-4"
                  />
                  <span style={{ color: colorScheme.error }}>{error}</span>
                </motion.div>
              )}

              {/* Success Message */}
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-lg text-sm"
                  style={{
                    backgroundColor: colorScheme.success + '15',
                    border: `1px solid ${colorScheme.success}30`,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ color: colorScheme.success }}
                    className="h-4 w-4"
                  />
                  <span style={{ color: colorScheme.success }}>
                    Successfully subscribed to our newsletter!
                  </span>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  type="submit"
                  disabled={!isValid || isLoading}
                  className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:scale-100"
                  style={{
                    backgroundColor: isValid
                      ? colorScheme.accent
                      : colorScheme.gray[900],
                    color: colorScheme.text,
                    boxShadow: isValid
                      ? `0 4px 15px ${colorScheme.accent}40`
                      : `0 2px 8px ${colorScheme.gray[400]}40`,
                  }}
                >
                  {isLoading ? (
                    <>
                      <div
                        className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"
                        style={{ borderColor: colorScheme.text }}
                      ></div>
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="h-5 w-5"
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
                transition={{ delay: 0.4 }}
                className="text-center pt-2"
              >
                <LightText
                  fontSize="14px"
                  style={{ color: colorScheme.gray[500] }}
                  className="leading-relaxed"
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
