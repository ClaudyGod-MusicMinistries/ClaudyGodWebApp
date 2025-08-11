import { motion } from 'framer-motion';
import { HeroSlide } from '../data/HeroSlide';
import { textVariants } from '../data/HeroSlide';
import { ExtraBoldText, RegularText } from '../ui/fonts/typography';
import { useTheme } from '../../contexts/ThemeContext';

export const VideoSlide = ({ slide }: { slide: HeroSlide }) => {
  const { colorScheme } = useTheme();

  return (
    <motion.div 
      variants={textVariants}
      className="max-w-3xl"
    >
      {/* Main Quote */}
      <ExtraBoldText
        fontSize="3rem"
        mdFontSize="6rem"
        style={{ color: colorScheme.text }}
        className="mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
      >
        {slide.content?.quote}
      </ExtraBoldText>

      {/* Reference */}
      <RegularText
        fontSize="1.5rem"
        mdFontSize="2rem"
        italic
        bold
        style={{ color: colorScheme.accent }}
        className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
      >
        {slide.content?.reference}
      </RegularText>
    </motion.div>
  );
};