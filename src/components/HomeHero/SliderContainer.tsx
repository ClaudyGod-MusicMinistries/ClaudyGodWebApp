import { motion } from 'framer-motion';
import { HeroSlide, imageVariants, slideVariants } from '../data/HeroSlide';
import React from 'react';

export const SlideContainer = ({
  slide,
  direction,

  children,
}: {
  slide: HeroSlide;
  direction: number;
  isMuted: boolean;
  toggleMute: () => void;
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
        <div
          className={`absolute inset-0 ${
            slide.type === 'cta' || slide.type === 'music'
              ? 'bg-gradient-to-t from-black/60 via-black/30 to-transparent'
              : 'bg-gradient-to-t from-black/100 via-black/50 to-black/10'
          }`}
        />
      </div>
    </motion.div>

    <div className="container ml-4 md:ml-10 mt-6 md:mt-10 relative mx-auto flex h-full items-center px-4">
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
        {children}
      </motion.div>
    </div>
  </motion.div>
);
