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
import { faUser, faEnvelope, faCheckCircle, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

type FormData = {
  name: string;
  email: string;
};

export const NewsletterForm: React.FC = () => {
  const { colorScheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isValid }
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
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="mt-20 mb-20 w-full max-w-4xl mx-auto px-4"
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
          borderWidth: '1px'
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
                boxShadow: `0 4px 20px ${colorScheme.accent}20`
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
              Stay Updated
            </ExtraBoldText>
            <LightText 
              fontSize="18px"
              style={{ color: colorScheme.gray[600] }}
              className="max-w-md mx-auto leading-relaxed"
            >
              Subscribe to our newsletter for the latest news and updates
            </LightText>
          </motion.div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
            <div className="space-y-5 mb-8">
              {/* Name Input */}
              <div>
                <SemiBoldText 
                  fontSize="1rem"
                  style={{ color: colorScheme.background }}
                  className="mb-2 block"
                >
                  Your Name
                </SemiBoldText>
                <div className="relative">
                  <div 
                    className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                    style={{ color: colorScheme.gray[400] }}
                  >
                    <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
                  </div>
                  <input
                    id="name"
                    className="w-full pl-12 pr-4 py-3.5 border rounded-lg focus:outline-none focus:ring-2"
                    style={{
                      borderColor: errors.name ? colorScheme.error : colorScheme.gray[300],
                      backgroundColor: colorScheme.white,
                      color: colorScheme.primary,
                      borderRadius: colorScheme.borderRadius.medium,
                      outlineColor: colorScheme.accent
                    }}
                    placeholder="John Doe"
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
                </div>
                {errors.name && (
                  <LightText
                    fontSize="9px"
                    style={{ color: colorScheme.error }}
                    className="mt-2 flex items-center pl-1"
                  >
                    <FontAwesomeIcon icon={faCircleExclamation} className="h-4 w-4 mr-2" />
                    {errors.name.message}
                  </LightText>
                )}
              </div>
              
              {/* Email Input */}
              <div>
                <SemiBoldText
                  fontSize="14px"
                  style={{ color: colorScheme.background }}
                  className="mb-2 block"
                >
                  Email Address
                </SemiBoldText>
                <div className="relative">
                  <div 
                    className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                    style={{ color: colorScheme.gray[400] }}
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className="w-full pl-12 pr-4 py-3.5 border rounded-lg focus:outline-none focus:ring-2"
                    style={{
                      borderColor: errors.email ? colorScheme.error : colorScheme.gray[300],
                      backgroundColor: colorScheme.white,
                      color: colorScheme.primary,
                      borderRadius: colorScheme.borderRadius.medium,
                      outlineColor: colorScheme.accent
                    }}
                    placeholder="your.email@example.com"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                </div>
                {errors.email && (
                  <LightText 
                    fontSize="9px"
                    style={{ color: colorScheme.error }}
                    className="mt-2 flex items-center pl-1"
                  >
                    <FontAwesomeIcon icon={faCircleExclamation} className="h-4 w-4 mr-2" />
                    {errors.email.message}
                  </LightText>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg flex items-start"
                style={{
                  backgroundColor: `${colorScheme.error}10`,
                  borderColor: `${colorScheme.error}20`,
                  color: colorScheme.error,
                  borderRadius: colorScheme.borderRadius.medium,
                  borderWidth: '1px'
                }}
              >
                <FontAwesomeIcon icon={faCircleExclamation} className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
            
            {/* Success Message */}
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg flex items-start"
                style={{
                  backgroundColor: `${colorScheme.success}10`,
                  borderColor: `${colorScheme.success}20`,
                  color: colorScheme.success,
                  borderRadius: colorScheme.borderRadius.medium,
                  borderWidth: '1px'
                }}
              >
                <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <span>Thank you for subscribing! You'll receive updates soon.</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="mt-10 text-center">
              <CustomButton
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading || !isValid}
                // icon={isLoading ? undefined : faPaperPlane}
                isLoading={isLoading}
                className="w-full max-w-xs mx-auto"
                style={{
                  backgroundColor: colorScheme.button,
                  color: colorScheme.buttonText,
                  borderRadius: colorScheme.borderRadius.large
                }}
              >
                <BoldText>{isLoading ? 'Processing...' : 'Subscribe Now'}</BoldText>
              </CustomButton>
              
              <LightText 
                fontSize="13px"
                style={{ color: colorScheme.gray[500] }}
                className="mt-5"
              >
                We respect your privacy. Unsubscribe anytime.
              </LightText>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};