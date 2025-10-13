import { useState } from 'react';
import { motion } from 'framer-motion';
import { newsBanner } from '../../assets/';
import { TourDetailsModal } from '../news/TourDetailsModal';
import { ExtraBoldText, RegularText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line no-empty-pattern
export const TourSection = ({}: { onCitySelect: (city: string) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { colorScheme } = useTheme();

  return (
    <div
      className="py-10 sm:py-12 md:py-16 lg:py-20"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-center mb-10 sm:mb-12 md:mb-16 lg:mb-20 px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative h-full rounded-lg xs:rounded-xl sm:rounded-2xl
           overflow-hidden shadow-md sm:shadow-lg md:shadow-xl"
        >
          <img
            src={newsBanner}
            alt="Nigeria Tour"
            className="w-full h-full object-cover min-h-[220px]
             xs:min-h-[250px] sm:min-h-[300px] md:min-h-[350px]
              lg:min-h-[400px]"
            loading="lazy"
          />
          {/* Gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-70"></div>

          {/* Badge for mobile visibility */}
          <div
            className="absolute top-3 right-3 text-white px-2 py-1 rounded-md text-xs xs:text-sm font-medium lg:hidden"
            style={{ backgroundColor: colorScheme.primary }}
          >
            Tour Announcement
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="text-center lg:text-left px-1 xs:px-2 sm:px-0"
        >
          <ExtraBoldText
            fontSize="2.5rem"
            smFontSize="3rem"
            // smFontSize="3.5rem"
            mdFontSize="4rem"
            lgFontSize="4.5rem"
            xlFontSize="5rem"
            className="mb-3 xs:mb-4 sm:mb-5"
            style={{ color: colorScheme.accent }}
          >
            Exciting News!
          </ExtraBoldText>

          <RegularText
            fontSize="0.9rem"
            smFontSize="1rem"
            // smFontSize="1.1rem"
            mdFontSize="1.2rem"
            className="mb-4 xs:mb-5 sm:mb-6 md:mb-7 leading-relaxed"
            style={{ color: colorScheme.textSecondary }}
          >
            Min. ClaudyGod is coming to Nigeria for an inspiring music tour,
            evangelism, and outreach. Stay tuned for upcoming dates, our curated
            list of gospel concerts, worship nights, and join us for a
            transformative experience!
          </RegularText>

          {/* Read More Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex justify-center lg:justify-start"
          >
            <CustomButton
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              size="md"
              mdSize="lg"
              className="mx-auto w-fit px-6"
              aria-label="Read more about the tour"
            >
              <div className="flex items-center justify-between gap-3 w-full">
                {/* Left side: Text */}
                <RegularText className="whitespace-nowrap">
                  Read more about the tour
                </RegularText>

                {/* Right side: Icon */}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-base md:text-lg"
                />
              </div>
            </CustomButton>
          </motion.div>
        </motion.div>
      </div>

      <TourDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
