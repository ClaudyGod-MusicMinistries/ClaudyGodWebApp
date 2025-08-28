import { motion } from 'framer-motion';
import { 
  HeroSlide, 
  imageVariants, 
  slideVariants 
} from '../data/HeroSlide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export const SlideContainer = ({
  slide,
  direction,
  isMuted,
  toggleMute,
  videoRef,
  children
}: {
  slide: HeroSlide;
  direction: number;
  isMuted: boolean;
  toggleMute: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  children: React.ReactNode;
}) => (
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
      {slide.type === 'video' ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="h-full w-full object-cover object-center brightness-60"
        >
          <source src={slide.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : ( 
        <div className="relative h-full w-full">
          {slide.imageUrlMobile && slide.imageUrlDesktop ? (
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
            <img
              src={slide.imageUrl}
              alt="Background"
              className="h-full w-full object-cover object-center"
            />
          )}
          <div className={`absolute inset-0 ${
            slide.type === 'cta' || slide.type === 'music' 
              ? 'bg-gradient-to-t from-black/60 via-black/30 to-transparent'
              : 'bg-gradient-to-t from-black/100 via-black/50 to-black/10'
          }`} />
        </div>
      )}
    </motion.div>
    
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
        {children}
      </motion.div>
    </div>

    {slide.type === 'video' && (
      <div className="absolute bottom-6 right-6 z-30">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className="bg-white/30 p-3 rounded-full backdrop-blur-sm shadow-lg"
        >
          <FontAwesomeIcon 
            icon={isMuted ? faVolumeMute : faVolumeUp} 
            className="text-white text-xl" 
          />
        </motion.button>
      </div>
    )}
  </motion.div>
);