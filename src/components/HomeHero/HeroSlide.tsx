import { motion } from 'framer-motion';
import SlideBackground from './SlideBackground';
import { QuoteSlide } from './QuoteSlide';
import { CtaSlide } from './CtaSlide';
import { MusicSlide } from './MusicSlide';
import { slideVariants, HeroSlide as HeroSlideType } from '../data/HeroSlide';
import { NavigateFunction } from 'react-router-dom';

interface HeroSlideProps {
  slide: HeroSlideType;
  direction: number;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
}

const HeroSlide = ({
  slide,
  direction,
  setIsModalOpen,
  navigate,
}: HeroSlideProps) => {
  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 h-full w-full"
      transition={{ duration: 1.2 }} // Added transition prop for longer slide duration
    >
      <SlideBackground slide={slide} />

      <div className="container mx-auto mt-24 md:mt-28 relative flex h-[calc(100%-6rem)] items-center px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
                duration: 1.5,
              },
            },
          }}
          className="max-w-4xl text-white"
        >
          {slide.type === 'quote' && <QuoteSlide slide={slide} />}
          {slide.type === 'cta' && <CtaSlide navigate={navigate} />}
          {slide.type === 'music' && (
            <MusicSlide slide={slide} setIsModalOpen={setIsModalOpen} />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSlide;
