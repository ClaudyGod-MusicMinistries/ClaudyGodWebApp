// components/HomeHero/MainHero.tsx
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { heroSlides } from '../data/HeroSlide';
import { SlideContainer } from './SliderContainer';
import { PaginationDots } from './Pagination';
import { StreamingModal } from '../HomeHero/StreamingModal';

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  return (
    <section className="relative h-[100vh] md:h-[120vh] w-full overflow-hidden -mt-20">
      <StreamingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        platforms={heroSlides[2].content?.streamingPlatforms || []}
      />

      <AnimatePresence initial={false} custom={direction}>
        {heroSlides.map(
          (slide, index) =>
            index === currentSlide && (
              <SlideContainer
                key={slide.id}
                slide={slide}
                direction={direction}
                isMuted={isMuted}
                toggleMute={toggleMute}
                videoRef={videoRef as React.RefObject<HTMLVideoElement>}
                setIsModalOpen={setIsModalOpen}
                navigate={navigate}
              />
            )
        )}
      </AnimatePresence>

      <PaginationDots
        currentSlide={currentSlide}
        totalSlides={heroSlides.length}
        goToSlide={goToSlide}
      />
    </section>
  );
};
