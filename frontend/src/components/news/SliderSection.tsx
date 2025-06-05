import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Slide {
  title: string;
  description: string;
  buttonText: string;
  bgImage: string;
}

interface SliderSectionProps {
  slides: Slide[];
  loadedImages: Record<string, boolean>;
}

export const SliderSection = ({ slides, loadedImages }: SliderSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 7000);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [slides.length]);

  const slide = slides[currentSlide];
  const isEvenSlide = currentSlide % 2 === 0;

  return (
    <div className="w-full h-[50vh] md:h-[70vh] bg-gradient-to-r from-black via-[#2a003f] to-black flex items-center justify-center px-6 md:px-16 transition-all duration-700 overflow-hidden">
      {isMobile ? (
        <div className="w-full h-full flex flex-col">
          <motion.div
            key={`mobile-image-${currentSlide}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="h-1/2 w-full flex items-center justify-center"
          >
            {/* Image display */}
          </motion.div>
          <motion.div
            key={`mobile-text-${currentSlide}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1/2 flex flex-col justify-center p-4 text-center"
          >
            {/* Text content */}
          </motion.div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full max-w-7xl">
          {/* Desktop layout */}
        </div>
      )}
      
      {/* Navigation dots */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-110'
                : 'bg-gray-400 hover:bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};