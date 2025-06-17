import { useState, useEffect } from 'react';
import {  AnimatePresence } from 'framer-motion';
import { heroSlides } from '../data/HeroSlide';
import HeroSlide from './HeroSlide';
import { PaginationDots } from './Pagination';
import StreamingModal from '../StreamingModel';


const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <section className="relative h-[100vh] md:h-[120vh] w-full overflow-hidden">
      <StreamingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        platforms={heroSlides[2].content?.streamingPlatforms || []}
      />
      
      <AnimatePresence initial={false} custom={direction}>
        {heroSlides.map((slide, index) => index === currentSlide && (
          <HeroSlide 
            key={slide.id}
            slide={slide}
            direction={direction}
            isMuted={isMuted}
            toggleMute={toggleMute}
            setIsModalOpen={setIsModalOpen}
          />
        ))}
      </AnimatePresence>

      <PaginationDots 
        slides={heroSlides} 
        currentSlide={currentSlide} 
        goToSlide={goToSlide} 
      />
    </section>
  );
};

export default HeroSection;