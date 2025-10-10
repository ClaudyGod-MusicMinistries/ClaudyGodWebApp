// QuoteSlide.tsx - Optimized
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { HeroSlide } from '../data/HeroSlide';
import { textVariants } from '../types/homeHero';
import { UltraText, RegularText, BoldText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';

interface QuoteSlideProps {
  slide: HeroSlide;
}

export const QuoteSlide: React.FC<QuoteSlideProps> = ({ slide }) => {
  const { colorScheme } = useTheme();

  return (
    <>
      {/* MOBILE VERSION */}
      <div className="md:hidden flex flex-col justify-end items-start w-full px-4 pb-16 min-h-[60vh]">
        {/* Main Quote - Mobile */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full mb-6"
        >
          <UltraText
            fontSize="0.95rem"
            smFontSize="1.1rem"
            className="text-left"
            style={{
              color: colorScheme.text,
              textShadow: '0 2px 8px rgba(0,0,0,0.9)',
              lineHeight: '1.4',
              letterSpacing: '0.01em',
            }}
          >
            {slide.content?.quote}
          </UltraText>
        </motion.div>

        {/* Reference - Mobile */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <BoldText
            fontSize="0.75rem"
            smFontSize="0.85rem"
            className="text-left italic uppercase"
            style={{
              color: colorScheme.accent,
              textShadow: '0 1px 4px rgba(0,0,0,0.8)',
              letterSpacing: '0.06em',
              lineHeight: '1.4',
            }}
          >
            {slide.content?.reference}
          </BoldText>
        </motion.div>

        {/* Play Section - Mobile */}
        {slide.id === 1 && (
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-4 w-full"
          >
            {/* Play Button - Mobile */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <CustomButton
                variant="icon"
                size="md"
                aria-label="Play video"
                className="rounded-xl backdrop-blur-md shadow-lg p-3 relative z-10 border border-white/20"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(147, 51, 234, 0.9) 0%, rgba(99, 102, 241, 0.9) 100%)',
                }}
              >
                <FontAwesomeIcon
                  icon={faPlay}
                  className="text-lg ml-0.5"
                  style={{ color: 'white' }}
                />
              </CustomButton>
            </motion.div>

            {/* Call-to-Action Text - Mobile */}
            <div className="flex flex-col gap-1">
              <UltraText
                fontSize="1rem"
                smFontSize="1.1rem"
                className="uppercase"
                style={{
                  background:
                    'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 1px 6px rgba(0,0,0,0.8)',
                }}
              >
                Play Now
              </UltraText>

              <RegularText
                fontSize="0.7rem"
                smFontSize="0.8rem"
                className="text-gray-200 opacity-90"
                style={{
                  textShadow: '0 1px 3px rgba(0,0,0,0.7)',
                }}
              >
                Experience the Divine Presence
              </RegularText>
            </div>
          </motion.div>
        )}
      </div>

      {/* DESKTOP VERSION */}
      <div className="hidden md:flex flex-col justify-center items-start w-full px-8 lg:px-12 min-h-[70vh]">
        {/* Main Quote - Desktop */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full mb-6 lg:mb-8"
        >
          <UltraText
            fontSize="1.8rem"
            lgFontSize="2.2rem"
            xlFontSize="2.8rem"
            className="text-left"
            style={{
              color: colorScheme.text,
              textShadow: '0 4px 20px rgba(0,0,0,0.9)',
              lineHeight: '1.2',
            }}
          >
            {slide.content?.quote}
          </UltraText>
        </motion.div>

        {/* Reference - Desktop */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 lg:mb-8"
        >
          <BoldText
            fontSize="1.2rem"
            lgFontSize="1.5rem"
            xlFontSize="1.8rem"
            className="text-left italic uppercase"
            style={{
              color: colorScheme.accent,
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              letterSpacing: '0.08em',
            }}
          >
            {slide.content?.reference}
          </BoldText>
        </motion.div>

        {/* Play Section - Desktop */}
        {slide.id === 1 && (
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-row items-center gap-6 lg:gap-8 w-full"
          >
            {/* Play Button - Desktop */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <CustomButton
                variant="icon"
                size="lg"
                aria-label="Play video"
                className="rounded-xl backdrop-blur-md shadow-xl p-5 lg:p-6 relative z-10 border border-white/25"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(147, 51, 234, 0.9) 0%, rgba(99, 102, 241, 0.9) 100%)',
                }}
              >
                <FontAwesomeIcon
                  icon={faPlay}
                  className="text-3xl lg:text-4xl ml-1"
                  style={{ color: 'white' }}
                />
              </CustomButton>
            </motion.div>

            {/* Call-to-Action Text - Desktop */}
            <div className="flex flex-col gap-2">
              <UltraText
                fontSize="1.8rem"
                lgFontSize="2.2rem"
                xlFontSize="2.6rem"
                className="uppercase"
                style={{
                  background:
                    'linear-gradient(135deg, #FFFFFF 0%, #E5E7EB 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                PLAY NOW
              </UltraText>

              <RegularText
                fontSize="1rem"
                lgFontSize="1.2rem"
                xlFontSize="1.4rem"
                className="text-gray-200 opacity-90"
              >
                Experience the Divine Presence
              </RegularText>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};
