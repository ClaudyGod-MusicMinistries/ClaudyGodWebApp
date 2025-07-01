import { useRef } from 'react';
import { motion } from 'framer-motion';
import { HeroSlide, slideVariants } from '../types/homeHero';
import SlideBackground from './SlideBackground';
import { QuoteSlide } from './QuoteSlide';
import { CtaSlide } from './CtaSlide';
import { MusicSlide } from './MusicSlide';
import { VideoSlide } from './VideoSlide';

const HeroSlide = ({
  slide,
  direction,
  isMuted,
  toggleMute,
  setIsModalOpen
}: {
  slide: HeroSlide;
  direction: number;
  isMuted: boolean;
  toggleMute: () => void;
  setIsModalOpen: (value: boolean) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="absolute inset-0 h-full w-full"
    >
      <SlideBackground slide={slide} isMuted={isMuted} videoRef={videoRef} />
      
      <div className="container ml-4 md:ml-10 mt-6 md:mt-10 relative mx-auto flex h-full items-center px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          className="max-w-4xl text-white"
        >
          {slide.type === 'quote' && <QuoteSlide slide={slide} />}
          {slide.type === 'cta' && <CtaSlide navigate={undefined} />}
          {slide.type === 'music' && (
            <MusicSlide slide={slide} setIsModalOpen={setIsModalOpen} />
          )}
          {slide.type === 'video' && (
            <VideoSlide slide={slide} toggleMute={toggleMute} isMuted={isMuted} />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSlide;