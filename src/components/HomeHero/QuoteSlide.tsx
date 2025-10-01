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
      <div className="md:hidden flex flex-col justify-center items-start w-full px-4 sm:px-6 min-h-[70vh]">
        {/* Main Quote - Mobile with Ultra Font */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full mb-6 sm:mb-8"
        >
          <UltraText
            fontSize="1.1rem"
            smFontSize="1.3rem"
            className="text-left"
            style={{
              color: colorScheme.text,
              textShadow: '0 3px 12px rgba(0,0,0,0.95)',
              lineHeight: '1.45', // Optimal mobile line height
              letterSpacing: '0.015em', // Subtle letter spacing
              wordSpacing: '0.06em', // Professional word spacing
              fontWeight: '400',
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
          className="mb-6 sm:mb-8"
        >
          <BoldText
            fontSize="0.85rem"
            smFontSize="1rem"
            className="text-left italic uppercase"
            style={{
              color: colorScheme.accent,
              textShadow: '0 2px 6px rgba(0,0,0,0.85)',
              letterSpacing: '0.09em', // Elegant letter spacing
              lineHeight: '1.5', // Perfect reference line height
              wordSpacing: '0.12em', // Clear word separation
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
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-7 w-full"
          >
            {/* Play Button - Mobile */}
            <motion.div
              whileHover={{
                scale: 1.08,
                transition: { type: 'spring', stiffness: 400, damping: 10 },
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/25 to-pink-500/25 blur-lg rounded-full group-hover:blur-xl transition-all duration-500" />

              <CustomButton
                variant="icon"
                size="lg"
                aria-label="Play video"
                className="rounded-2xl backdrop-blur-md shadow-xl p-4 sm:p-5 relative z-10 border border-white/25 group-hover:border-white/45 transition-all duration-300 group-hover:shadow-2xl"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(147, 51, 234, 0.9) 0%, rgba(99, 102, 241, 0.9) 100%)',
                  boxShadow:
                    '0 10px 30px rgba(147, 51, 234, 0.5), 0 0 0 1px rgba(255,255,255,0.2)',
                }}
              >
                <div className="flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="text-xl sm:text-2xl ml-0.5"
                    style={{ color: 'white' }}
                  />
                  <span className="sr-only">Play Video</span>
                </div>
              </CustomButton>
            </motion.div>

            {/* Call-to-Action Text - Mobile */}
            <div className="flex flex-col gap-2 sm:gap-2.5">
              <UltraText
                fontSize="1.15rem"
                smFontSize="1.35rem"
                className="uppercase"
                style={{
                  background:
                    'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                  letterSpacing: '0.035em', // Professional letter spacing
                  lineHeight: '1.35', // Optimal CTA line height
                  wordSpacing: '0.07em', // Clear word separation
                }}
              >
                Play Now
              </UltraText>

              <RegularText
                fontSize="0.75rem"
                smFontSize="0.9rem"
                className="text-gray-200 opacity-90"
                style={{
                  textShadow: '0 1px 5px rgba(0,0,0,0.75)',
                  letterSpacing: '0.035em', // Consistent letter spacing
                  lineHeight: '1.45', // Perfect subtitle line height
                  wordSpacing: '0.04em', // Subtle word spacing
                }}
              >
                Experience the Divine Presence
              </RegularText>
            </div>
          </motion.div>
        )}
      </div>

      {/* DESKTOP VERSION */}
      <div className="hidden md:flex flex-col justify-center items-start w-full px-8 lg:px-12 xl:px-20 min-h-[70vh]">
        {/* Main Quote - Desktop */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full mb-10 lg:mb-14 xl:mb-18"
        >
          <UltraText
            fontSize="2.2rem"
            lgFontSize="2.8rem"
            xlFontSize="3.5rem"
            className="text-left"
            style={{
              color: colorScheme.text,
              textShadow:
                '0 5px 30px rgba(0,0,0,0.95), 0 0 60px rgba(0,0,0,0.6)',
              lineHeight: '1.1', // Tight line height for headlines
              letterSpacing: '0.005em', // Minimal letter spacing for large text
              wordSpacing: '0.03em', // Professional word spacing
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
          className="mb-10 lg:mb-14 xl:mb-16"
        >
          <BoldText
            fontSize="1.6rem"
            lgFontSize="2.1rem"
            xlFontSize="2.6rem"
            className="text-left italic uppercase"
            style={{
              color: colorScheme.accent,
              textShadow: '0 3px 15px rgba(0,0,0,0.85)',
              letterSpacing: '0.12em', // Elegant wide spacing
              lineHeight: '1.35', // Perfect reference line height
              wordSpacing: '0.1em', // Clear word separation
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
            className="flex flex-row items-center gap-10 lg:gap-12 xl:gap-14 w-full"
          >
            {/* Play Button - Desktop */}
            <motion.div
              whileHover={{
                scale: 1.1,
                transition: { type: 'spring', stiffness: 400, damping: 10 },
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/40 to-pink-500/40 blur-2xl rounded-full group-hover:blur-3xl transition-all duration-500" />

              <CustomButton
                variant="icon"
                size="lg"
                aria-label="Play video"
                className="rounded-2xl backdrop-blur-md shadow-2xl p-7 lg:p-9 xl:p-11 relative z-10 border-2 border-white/30 group-hover:border-white/50 transition-all duration-500 group-hover:shadow-3xl"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(147, 51, 234, 0.9) 0%, rgba(99, 102, 241, 0.9) 100%)',
                  boxShadow:
                    '0 30px 60px rgba(147, 51, 234, 0.5), 0 0 0 2px rgba(255,255,255,0.3), inset 0 2px 0 rgba(255,255,255,0.3)',
                }}
              >
                <div className="flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="text-5xl lg:text-6xl xl:text-7xl ml-1"
                    style={{ color: 'white' }}
                  />
                  <span className="sr-only">Play Video</span>
                </div>
              </CustomButton>

              <div className="absolute inset-0 border-4 border-purple-300/50 rounded-2xl animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>

            {/* Call-to-Action Text - Desktop */}
            <div className="flex flex-col gap-3 lg:gap-4 xl:gap-5">
              <UltraText
                fontSize="2.6rem"
                lgFontSize="3.2rem"
                xlFontSize="3.8rem"
                className="uppercase"
                style={{
                  background:
                    'linear-gradient(135deg, #FFFFFF 0%, #E5E7EB 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow:
                    '0 5px 25px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.7)',
                  letterSpacing: '0.045em', // Professional letter spacing
                  lineHeight: '1.15', // Tight line height for impact
                  wordSpacing: '0.06em', // Clear word separation
                }}
              >
                PLAY NOW
              </UltraText>

              <RegularText
                fontSize="1.3rem"
                lgFontSize="1.6rem"
                xlFontSize="1.9rem"
                className="text-gray-200 opacity-90"
                style={{
                  textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                  letterSpacing: '0.045em', // Consistent letter spacing
                  lineHeight: '1.4', // Perfect subtitle line height
                  wordSpacing: '0.05em', // Professional word spacing
                }}
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
