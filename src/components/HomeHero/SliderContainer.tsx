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
  >
    <motion.div
      variants={imageVariants}
      initial="hidden"
      animate="visible"
      className="absolute inset-0 h-full w-full"
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
        className="absolute bottom-4 right-4 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        )}
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
            transition: { staggerChildren: 0.2 },
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
