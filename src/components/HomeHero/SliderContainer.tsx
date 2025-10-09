// SlideContainer.tsx - FIXED (Proper image scaling)
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
    className="absolute inset-0 h-full w-full overflow-hidden"
    transition={{ duration: 1.2 }}
  >
    {/* Background Section - Proper scaling */}
    <motion.div
      variants={imageVariants}
      initial="hidden"
      animate="visible"
      className="absolute inset-0 h-full w-full"
      transition={{ duration: 1.5 }}
    >
      <div className="relative h-full w-full">
        {slide.videoUrl ? (
          <video
            ref={videoRef}
            muted={isMuted}
            autoPlay
            loop
            playsInline
            className="h-full w-full object-cover object-top md:object-center"
            style={{
              transform: 'scale(1.05)',
              transformOrigin: 'center center',
            }}
          >
            <source src={slide.videoUrl} type="video/mp4" />
          </video>
        ) : slide.imageUrlMobile && slide.imageUrlDesktop ? (
          <>
            <img
              src={slide.imageUrlMobile}
              alt="Background"
              className="md:hidden h-full w-full object-cover object-top"
              style={{
                transform: 'scale(1.05)',
                transformOrigin: 'center center',
              }}
            />
            <img
              src={slide.imageUrlDesktop}
              alt="Background"
              className="hidden md:block lg:hidden h-full w-full object-cover object-center"
              style={{
                transform: 'scale(1.08)',
                transformOrigin: 'center center',
              }}
            />
            <img
              src={slide.imageUrlDesktop}
              alt="Background"
              className="hidden lg:block h-full w-full object-cover object-center"
              style={{
                transform: 'scale(1.02)',
                transformOrigin: 'center center',
              }}
            />
          </>
        ) : slide.imageUrl ? (
          <>
            <img
              src={slide.imageUrl}
              alt="Background"
              className="md:hidden h-full w-full object-cover object-top"
              style={{
                transform: 'scale(1.05)',
                transformOrigin: 'center center',
              }}
            />
            <img
              src={slide.imageUrl}
              alt="Background"
              className="hidden md:block lg:hidden h-full w-full object-cover object-center"
              style={{
                transform: 'scale(1.08)',
                transformOrigin: 'center center',
              }}
            />
            <img
              src={slide.imageUrl}
              alt="Background"
              className="hidden lg:block h-full w-full object-cover object-center"
              style={{
                transform: 'scale(1.02)',
                transformOrigin: 'center center',
              }}
            />
          </>
        ) : null}

        {/* Balanced gradient coverage */}
        <div
          className={`absolute inset-0 ${
            slide.type === 'cta' || slide.type === 'music'
              ? 'bg-gradient-to-t from-black/55 via-black/25 to-transparent md:bg-gradient-to-t md:from-black/45 md:via-black/15 md:to-transparent'
              : 'bg-gradient-to-t from-black/75 via-black/45 to-black/15 md:bg-gradient-to-t md:from-black/85 md:via-black/35 md:to-black/10'
          }`}
        />
      </div>
    </motion.div>

    {/* Mute/Unmute Button */}
    {slide.videoUrl && (
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-4 md:bottom-8 md:right-6 z-20 bg-black/50 text-white p-2 md:p-3 rounded-full hover:bg-black/70 transition-colors duration-300"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        <FontAwesomeIcon
          icon={isMuted ? faVolumeMute : faVolumeUp}
          className="w-4 h-4 md:w-5 md:h-5"
        />
      </button>
    )}

    {/* Content Section */}
    <div className="container mx-auto mt-20 md:mt-24 lg:mt-28 relative flex h-[calc(100%-5rem)] md:h-[calc(100%-6rem)] items-center px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              duration: 1.2,
            },
          },
        }}
        className="max-w-4xl text-white w-full"
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
