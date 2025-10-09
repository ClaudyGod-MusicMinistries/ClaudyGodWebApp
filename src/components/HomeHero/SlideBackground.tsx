// SlideBackground.tsx
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
            {/* Mobile - Properly constrained */}
            <img
              src={slide.imageUrlMobile}
              alt="Background"
              className="md:hidden h-full w-full object-cover object-top"
              style={{
                transform: 'scale(1.05)',
                transformOrigin: 'center center',
              }}
            />
            {/* Tablet - Balanced scaling */}
            <img
              src={slide.imageUrlDesktop}
              alt="Background"
              className="hidden md:block lg:hidden h-full w-full object-cover object-center"
              style={{
                transform: 'scale(1.08)',
                transformOrigin: 'center center',
              }}
            />
            {/* Desktop - Minimal scaling */}
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
            {/* Single image - Responsive handling */}
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

        {/* Responsive gradient overlays */}
        <div
          className={`absolute inset-0 ${
            slide.type === 'cta' || slide.type === 'music'
              ? 'bg-gradient-to-t from-black/65 via-black/35 to-transparent md:bg-gradient-to-t md:from-black/55 md:via-black/25 md:to-transparent'
              : 'bg-gradient-to-t from-black/85 via-black/55 to-black/25 md:bg-gradient-to-t md:from-black/95 md:via-black/45 md:to-black/15'
          }`}
        />

        {/* Additional mobile overlay for better text readability */}
        <div className="absolute inset-0 md:hidden bg-black/25" />
      </div>
    </motion.div>
  );
};

export default SlideBackground;
