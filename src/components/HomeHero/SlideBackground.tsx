import { motion } from 'framer-motion';
import { HeroSlide, imageVariants } from '../data/HeroSlide';
import React from 'react';

interface SlideBackgroundProps {
  slide: HeroSlide;
}

const SlideBackground = ({ slide }: SlideBackgroundProps) => {
  return (
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
        ) : slide.imageUrl ? (
          <img
            src={slide.imageUrl}
            alt="Background"
            className="h-full w-full object-cover object-center"
          />
        ) : null}
        <div
          className={`absolute inset-0 ${
            slide.type === 'cta' || slide.type === 'music'
              ? 'bg-gradient-to-t from-black/60 via-black/30 to-transparent'
              : 'bg-gradient-to-t from-black/100 via-black/50 to-black/10'
          }`}
        />
      </div>
    </motion.div>
  );
};

export default SlideBackground;
