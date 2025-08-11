import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { HeroSlide } from '../data/HeroSlide';
import { textVariants } from '../types/homeHero';
import { ExtraBoldText, RegularText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';

export const QuoteSlide = ({ slide }: { slide: HeroSlide }) => {
  const { colorScheme } = useTheme();

  return (
    <>
      {/* Quote Text */}
      <motion.div 
        variants={textVariants}
        className="relative top-20 w-full px-4 md:px-0 md:mb-6"
      >
        <ExtraBoldText
          fontSize="1.25rem"
          mdFontSize="3rem"
          style={{ color: colorScheme.text }}
          className="text-left leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
        >
          {slide.content?.quote}
        </ExtraBoldText>
      </motion.div>

      {/* Reference Text */}
      <motion.div 
        variants={textVariants}
        className="relative top-22 left-5 md:top-20"
      >
        <RegularText
          fontSize="1rem"
          mdFontSize="1.5rem"
          italic
          bold
          style={{ color: colorScheme.accent }}
          className="text-left drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          {slide.content?.reference}
        </RegularText>
      </motion.div>

      {/* Play Button (Conditional) */}
      {slide.id === 1 && (
        <motion.div 
          variants={textVariants}
          className="md:flex md:flex-row md:items-center md:gap-6 max-md:flex max-md:flex-col max-md:items-center max-md:gap-4"
        >
          <div className="md:flex md:flex-col md:mt-25 md:items-center md:gap-2 max-md:flex max-md:flex-col max-md:mt-25 max-md:mr-90 max-md:items-center max-md:gap-3">
            <motion.div whileHover={{ scale: 1.1 }}>
              <CustomButton
                variant="icon"
                size="lg"
                className="rounded-full backdrop-blur-sm shadow-lg"
                style={{ backgroundColor: `${colorScheme.textSecondary}30` }}
              >
                <FontAwesomeIcon 
                  icon={faPlayCircle} 
                  style={{ color: colorScheme.primary }}
                  className="md:text-3xl max-md:text-2xl" 
                />
              </CustomButton>
            </motion.div>
            
            <ExtraBoldText
              fontSize="1rem"
              fontSize="1.125rem"
              style={{ color: colorScheme.text }}
              className="tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              Play Now
            </ExtraBoldText>
          </div>
        </motion.div>
      )}
    </>
  );
};