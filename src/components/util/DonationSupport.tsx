import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandHoldingHeart,
  faDonate,
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { ExtraBoldText, RegularText, BoldText } from '../ui/fonts/typography';
import { useTheme } from '../../contexts/ThemeContext';

type DonationCTAProps = {
  title: string;
  subtitle: string;
  description: string;
  goFundMeUrl: string;
  donateUrl: string;
  isExternalDonateUrl?: boolean;
  className?: string;
};

export const DonationCallToAction: React.FC<DonationCTAProps> = ({
  title,
  subtitle,
  description,
  goFundMeUrl,
  donateUrl,
  isExternalDonateUrl = false,
  className,
}) => {
  const { colorScheme } = useTheme();

  return (
    <motion.div
      className={`w-full py-12 md:py-16 lg:py-20 ${className || ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div
        className="relative overflow-hidden w-full"
        style={{
          background: `linear-gradient(135deg, ${colorScheme.background} 0%, ${colorScheme.background} 100%)`,
          border: `1px solid ${colorScheme.gray[200]}`,
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute -top-12 -left-12 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full blur-xl md:blur-2xl"
            style={{ backgroundColor: colorScheme.primary }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          />
          <motion.div
            className="absolute -bottom-12 -right-12 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full blur-xl md:blur-2xl"
            style={{ backgroundColor: colorScheme.accent }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 w-full">
          <div className="flex flex-col gap-8 md:gap-10 lg:flex-row lg:items-center lg:justify-between w-full">
            {/* Text Content */}
            <div className="lg:flex-1 lg:max-w-2xl w-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ExtraBoldText
                  fontSize="clamp(1.5rem, 4vw, 2.25rem)"
                  className="text-white mb-4 leading-tight"
                >
                  {title}
                </ExtraBoldText>
              </motion.div>

              <motion.div
                className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 my-4 md:my-5 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '4rem' }}
                transition={{ delay: 0.1, duration: 0.5 }}
              />

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <BoldText
                  fontSize="clamp(1rem, 2.5vw, 1.5rem)"
                  className="text-purple-100 mb-3 md:mb-4"
                >
                  {subtitle}
                </BoldText>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <RegularText
                  fontSize="clamp(0.9rem, 2vw, 1.1rem)"
                  className="text-purple-100 opacity-90 leading-relaxed"
                >
                  {description}
                </RegularText>
              </motion.div>
            </div>

            {/* Buttons */}
            <motion.div
              className="flex flex-col gap-4 sm:gap-5 lg:w-auto lg:flex-shrink-0 w-full lg:w-auto"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <CustomButton
                href={goFundMeUrl}
                variant="secondary"
                size="lg"
                fullWidth
                icon={
                  <FontAwesomeIcon
                    icon={faHandHoldingHeart}
                    className="w-4 h-4"
                  />
                }
                className="text-base py-3"
                style={{
                  backgroundColor: colorScheme.button,
                  color: colorScheme.buttonText,
                }}
              >
                Support on GoFundMe
              </CustomButton>

              <CustomButton
                href={isExternalDonateUrl ? donateUrl : undefined}
                to={!isExternalDonateUrl ? donateUrl : undefined}
                variant="primary"
                size="lg"
                fullWidth
                icon={<FontAwesomeIcon icon={faDonate} className="w-4 h-4" />}
                className="text-base py-3 font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${colorScheme.accent} 0%, ${colorScheme.primary} 100%)`,
                  color: colorScheme.buttonText,
                }}
              >
                Donate Now
              </CustomButton>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
