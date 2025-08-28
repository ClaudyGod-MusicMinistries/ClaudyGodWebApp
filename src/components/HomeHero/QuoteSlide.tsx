import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { HeroSlide } from '../data/HeroSlide';
import { textVariants } from '../types/homeHero';
import { ExtraBoldText, RegularText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';

interface QuoteSlideProps {
  slide: HeroSlide;
}

export const QuoteSlide: React.FC<QuoteSlideProps> = ({ slide }) => {
  const { colorScheme } = useTheme();

  return (
    <div className="flex flex-col items-start md:items-center w-full px-4 sm:px-6 lg:px-12">
      {/* Quote Text */}
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="relative mt-10 w-full"
      >
        <ExtraBoldText
          fontSize="1.25rem"
          mdFontSize="2.5rem"
          className="text-left md:text-center leading-snug drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
          style={{ color: colorScheme.text }}
        >
          {slide.content?.quote}
        </ExtraBoldText>
      </motion.div>

      {/* Reference Text */}
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="mt-4 md:mt-6 w-full"
      >
        <RegularText
          fontSize="1rem"
          mdFontSize="1.25rem"
          className="text-left md:text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          style={{ color: colorScheme.accent }}
        >
          {slide.content?.reference}
        </RegularText>
      </motion.div>

      {/* Play Button (Conditional) */}
      {slide.id === 1 && (
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row items-center gap-4 mt-8"
        >
          <motion.div whileHover={{ scale: 1.1 }}>
            <CustomButton
              variant="icon"
              size="lg"
              aria-label="Play video"
              className="rounded-full backdrop-blur-sm shadow-lg"
              style={{ backgroundColor: `${colorScheme.textSecondary}30` }}
            >
              <FontAwesomeIcon
                icon={faPlayCircle}
                className="text-3xl sm:text-4xl"
                style={{ color: colorScheme.primary }}
              />
            </CustomButton>
          </motion.div>

          <ExtraBoldText
            fontSize="1.125rem"
            mdFontSize="1.5rem"
            className="tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center md:text-left"
            style={{ color: colorScheme.text }}
          >
            Play Now
          </ExtraBoldText>
        </motion.div>
      )}
    </div>
  );
};
