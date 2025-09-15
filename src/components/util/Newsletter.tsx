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
} from '@fortawesome/free-solid-svg-icons';

type FormData = {
  name: string;
  email: string;
};

// 🔹 Add props type
interface NewsletterFormProps {
  className?: string;
  title?: string;
  description?: string;
}

// 🔹 Accept props
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
            {/* use the passed props */}
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

          {/* form code stays the same… */}
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
            {/* …inputs, errors, buttons */}
          </form>
        </div>
      </div>
    </motion.div>
  );
};
