// SlideContainer.tsx
import { motion } from 'framer-motion';
import {
  slideVariants,
  imageVariants,
  HeroSlide as HeroSlideType,
} from '../data/HeroSlide';
import { NavigateFunction } from 'react-router-dom';
import React, { RefObject } from 'react';
import { QuoteSlide } from './QuoteSlide';
import { CtaSlide } from './CtaSlide';
import { MusicSlide } from './MusicSlide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

interface SlideContainerProps {
  slide: HeroSlideType;
  direction: number;
  isMuted: boolean;
  toggleMute: () => void;
  videoRef: RefObject<HTMLVideoElement>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navigate: NavigateFunction;
}

export const SlideContainer = ({
  slide,
  direction,
  isMuted,
  toggleMute,
  videoRef,
  setIsModalOpen,
  navigate,
}: SlideContainerProps) => (
  <motion.div
    custom={direction}
    variants={slideVariants}
    initial="enter"
    animate="center"
    exit="exit"
    className="absolute inset-0 h-full w-full"
    transition={{ duration: 1.5 }} // Increased slide duration
  >
    <motion.div
      variants={imageVariants}
      initial="hidden"
      animate="visible"
      className="absolute inset-0 h-full w-full"
      transition={{ duration: 2 }} // Increased image animation duration
    >
      <div className="relative h-full w-full">
        {slide.videoUrl ? (
          // Video background
          <video
            ref={videoRef}
            muted={isMuted}
            autoPlay
            loop
            playsInline
            className="h-full w-full object-cover object-center"
          >
            <source src={slide.videoUrl} type="video/mp4" />
          </video>
        ) : slide.imageUrlMobile && slide.imageUrlDesktop ? (
          // Responsive image background
          <>
            <img
              src={slide.imageUrlMobile}
              alt="Background"
              className="md:hidden h-full w-full object-cover object-center saturate-[1.2]"
            />
            <img
              src={slide.imageUrlDesktop}
              alt="Background"
              className="hidden md:block h-full w-full object-cover object-center"
            />
          </>
        ) : (
          // Single image background
          <img
            src={slide.imageUrl}
            alt="Background"
            className="h-full w-full object-cover object-center"
          />
        )}
        <div
          className={`absolute inset-0 ${
            slide.type === 'cta' || slide.type === 'music'
              ? 'bg-gradient-to-t from-black/60 via-black/30 to-transparent'
              : 'bg-gradient-to-t from-black/100 via-black/50 to-black/10'
          }`}
        />
      </div>
    </motion.div>

    {/* Mute/Unmute button for video slides */}
    {slide.videoUrl && (
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-300"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        <FontAwesomeIcon
          icon={isMuted ? faVolumeMute : faVolumeUp}
          className="w-5 h-5"
        />
      </button>
    )}

    <div className="container mx-auto mt-24 md:mt-28 relative flex h-[calc(100%-6rem)] items-center px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3, // Increased stagger timing
              duration: 1.8, // Added duration for content animation
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
