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
};

export const DonationCallToAction: React.FC<DonationCTAProps> = ({
  title,
  subtitle,
  description,
  goFundMeUrl,
  donateUrl,
  isExternalDonateUrl = false,
}) => {
  const { colorScheme } = useTheme();

  return (
    <div
      className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl my-6 sm:my-8 md:my-12 lg:my-16 mx-3 xs:mx-4 sm:mx-5 md:mx-6 lg:mx-auto lg:max-w-6xl"
      style={{
        background: `linear-gradient(135deg, ${colorScheme.background} 0%, ${colorScheme.background} 100%)`,
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute -top-8 xs:-top-10 sm:-top-12 md:-top-16 -left-8 xs:-left-10 sm:-left-12 md:-left-16 w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full blur-lg xs:blur-xl sm:blur-2xl md:blur-3xl"
          style={{ backgroundColor: colorScheme.primary }}
        ></div>
        <div
          className="absolute -bottom-8 xs:-bottom-10 sm:-bottom-12 md:-bottom-16 -right-8 xs:-right-10 sm:-right-12 md:-right-16 w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full blur-lg xs:blur-xl sm:blur-2xl md:blur-3xl"
          style={{ backgroundColor: colorScheme.accent }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 py-6 sm:py-8 md:py-10 lg:px-8 lg:py-12">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:flex-row lg:gap-12 lg:items-center">
          {/* Text Content */}
          <div className="lg:flex-1 lg:max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ExtraBoldText
                fontSize="1.5rem"
                xsFontSize="1.75rem"
                smFontSize="2rem"
                mdFontSize="2.25rem"
                lgFontSize="2.5rem"
                className="text-white mb-3 xs:mb-4 leading-tight"
              >
                {title}
              </ExtraBoldText>
            </motion.div>

            <motion.div
              className="w-10 xs:w-12 sm:w-14 md:w-16 h-0.5 xs:h-1 bg-gradient-to-r from-amber-400 to-orange-500 my-3 xs:my-4 sm:my-5 md:my-6 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '2.5rem' }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <BoldText
                fontSize="1rem"
                xsFontSize="1.125rem"
                smFontSize="1.25rem"
                mdFontSize="1.5rem"
                className="text-purple-100 mb-2 xs:mb-3"
              >
                {subtitle}
              </BoldText>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <RegularText
                fontSize="0.875rem"
                xsFontSize="1rem"
                smFontSize="1.125rem"
                className="text-purple-100 opacity-90 leading-relaxed"
              >
                {description}
              </RegularText>
            </motion.div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 xs:gap-4 sm:gap-5 lg:flex-col lg:gap-4 lg:w-auto lg:flex-shrink-0">
            <CustomButton
              href={goFundMeUrl}
              variant="secondary"
              size="md"
              mdSize="lg"
              fullWidth
              icon={
                <FontAwesomeIcon
                  icon={faHandHoldingHeart}
                  className="w-3 h-3 xs:w-4 xs:h-4"
                />
              }
              className="text-sm xs:text-base py-2 xs:py-3"
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
              size="md"
              mdSize="lg"
              fullWidth
              icon={
                <FontAwesomeIcon
                  icon={faDonate}
                  className="w-3 h-3 xs:w-4 xs:h-4"
                />
              }
              className="text-sm xs:text-base py-2 xs:py-3 font-bold hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${colorScheme.accent} 0%, ${colorScheme.primary} 100%)`,
                color: colorScheme.buttonText,
              }}
            >
              Donate Now
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};
