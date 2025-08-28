import { motion } from 'framer-motion';
import { HeroSlide } from '../data/HeroSlide';
import { textVariants } from '../data/HeroSlide';
import { ExtraBoldText, RegularText } from '../ui/fonts/typography';
import { useTheme } from '../../contexts/ThemeContext';

interface VideoSlideProps {
  slide: HeroSlide;
  isMuted: boolean;
  toggleMute: () => void;
}

export const VideoSlide = ({ slide, isMuted, toggleMute }: VideoSlideProps) => {
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
      
        style={{ color: colorScheme.accent }}
        className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
      >
        {slide.content?.reference}
      </RegularText>

      {/* Mute Toggle Button */}
      {slide.videoUrl && (
        <button
          onClick={toggleMute}
          className="mt-4 px-4 py-2 rounded bg-gray-800 text-white"
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      )}
    </motion.div>
  );
};
