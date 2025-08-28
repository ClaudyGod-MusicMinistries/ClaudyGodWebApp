import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ContactFormInputs, ApiError } from '../types/contact';
import { submitContactForm } from '../api/ContactApi';
import { SemiBoldText, BoldText, ExtraLightText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';

type ContactFormProps = {
  onSuccess: () => void;
};

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<ContactFormInputs>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { colorScheme } = useTheme();

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
            message,
          });
        });
      } else {
        console.error('Submission error:', apiError.message);
        setError('root', {
          type: 'manual',
          message:
            apiError.message ||
            'Failed to send message. Please try again later.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <SemiBoldText
          style={{ color: colorScheme.primary }}
          fontSize="14px"
          className="mb-1"
        >
          Full Name
        </SemiBoldText>
        <input
          id="name"
          type="text"
          style={{
            borderColor: errors.name
              ? colorScheme.error
              : colorScheme.gray[300],
            borderRadius: colorScheme.borderRadius.medium,
            backgroundColor: colorScheme.white,
            color: colorScheme.primary,
          }}
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:outline-none"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && (
          <ExtraLightText
            style={{ color: colorScheme.error }}
            fontSize="12px"
            className="mt-1"
          >
            {errors.name.message}
          </ExtraLightText>
        )}
      </div>

      <div>
        <SemiBoldText
          style={{ color: colorScheme.primary }}
          fontSize="14px"
          className="mb-1"
        >
          Email Address
        </SemiBoldText>
        <input
          id="email"
          type="email"
          style={{
            borderColor: errors.email
              ? colorScheme.error
              : colorScheme.gray[300],
            borderRadius: colorScheme.borderRadius.medium,
            backgroundColor: colorScheme.white,
            color: colorScheme.primary,
          }}
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:outline-none"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && (
          <ExtraLightText
            style={{ color: colorScheme.error }}
            fontSize="12px"
            className="mt-1"
          >
            {errors.email.message}
          </ExtraLightText>
        )}
      </div>

      <div>
        <SemiBoldText
          style={{ color: colorScheme.primary }}
          fontSize="14px"
          className="mb-1"
        >
          Your Message
        </SemiBoldText>
        <textarea
          id="message"
          rows={4}
          style={{
            borderColor: errors.message
              ? colorScheme.error
              : colorScheme.gray[300],
            borderRadius: colorScheme.borderRadius.medium,
            backgroundColor: colorScheme.white,
            color: colorScheme.primary,
          }}
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:outline-none"
          {...register('message', {
            required: 'Message is required',
            minLength: {
              value: 10,
              message: 'Message should be at least 10 characters',
            },
          })}
        ></textarea>
        {errors.message && (
          <ExtraLightText
            style={{ color: colorScheme.error }}
            fontSize="12px"
            className="mt-1"
          >
            {errors.message.message}
          </ExtraLightText>
        )}
      </div>

      {errors.root && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: colorScheme.error }}
          className="text-sm p-3 rounded-md"
        >
          <ExtraLightText fontSize="14px">{errors.root.message}</ExtraLightText>
        </motion.div>
      )}

      <div>
        <CustomButton
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          icon={
            isSubmitting ? (
              <FontAwesomeIcon icon={faSpinner} spin className="h-4 w-4" />
            ) : (
              <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4" />
            )
          }
          className="w-full"
        >
          <BoldText>{isSubmitting ? 'Sending...' : 'Send Message'}</BoldText>
        </CustomButton>
      </div>
    </motion.form>
  );
};

export default ContactForm;
