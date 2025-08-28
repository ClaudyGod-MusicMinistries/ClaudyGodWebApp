// src/components/news/HeroSlider.tsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const slides = [
    {
      title: 'MUSIC TOUR IN NIGERIA',
      description: `We will be sharing God's love and messages across 5 states in Nigeria.`,
      bgImage: '/path/to/image.jpg',
    },
    {
      title: 'UPCOMING WORSHIP EXPERIENCE',
      description: `Join us for an unforgettable night of worship and praise.`,
      bgImage: '/path/to/image.jpg',
    },
  ];

  useEffect(() => {
    setIsClient(true);

    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-black via-[#2a003f] to-black animate-pulse z-10" />
        )}

        {isClient && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover pointer-events-none"
            onLoadedData={() => setVideoLoaded(true)}
            preload="none"
          >
            <source src="/mainBanner.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-[#2a003f]/60 to-black/70 z-10" />
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`slide-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="bg-black/30 backdrop-blur-sm p-8 md:p-10 rounded-2xl max-w-2xl lg:max-w-3xl"
          >
            <h2 className="md:text-8xl sm:text-4xl font-roboto-condensed lg:text-6xl text-white tracking-tight roboto-condensed mb-4 md:mb-5">
              {slide.title}
            </h2>
            <p className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl font-work-sans md:font-work-sans leading-relaxed work-sans mb-6 md:mb-8">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating dropdown arrow */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1.5,
            duration: 0.5,
          },
        }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        // animate={{
        //   y: [0, -10, 0],
        //   transition: {
        //     repeat: Infinity,
        //     duration: 1.5,
        //     ease: "easeInOut"
        //   }
        // }}
      >
        <FontAwesomeIcon
          icon={faArrowDown}
          className="w-8 h-8 text-purple-400"
        />
      </motion.div>
    </div>
  );
};
