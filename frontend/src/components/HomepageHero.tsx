import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Back1, Back2, Back3, Back4 } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import {
  faPlayCircle,
  faMusic,
  faVideo,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';

interface HeroSlide {
  id: number;
  imageUrl: string;
  type: 'quote' | 'form' | 'streaming';
  content?: {
    quote?: string;
    reference?: string;
    formTitle?: string;
    streamingPlatforms?: { name: string; icon: any; url: string }[];
  };
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    imageUrl: Back1,
    type: 'quote',
    content: {
      quote: "Enter Into His Gates With Thanksgiving And Into His Courts With Praise; Be Thankful Unto Him, and Bless His Name.",
      reference: "— Psalm 100:4"
    }
  },
  {
    id: 2,
    imageUrl: Back2,
    type: 'streaming',
    content: {
      streamingPlatforms: [
        { name: 'Spotify', icon: faMusic, url: '#' },
        { name: 'YouTube Music', icon: faVideo, url: '#' },
        { name: 'Apple Music', icon: faMusic, url: '#' },
        { name: 'Deezer', icon: faNewspaper, url: '#' }
      ]
    }
  },
  {
    id: 3,
    imageUrl: Back3,
    type: 'form',
    content: {
      formTitle: "Book Us for Your Event"
    }
  },
  {
    id: 1,
    imageUrl: Back4,
    type: 'quote',
    content: {
      quote: "Praise the Lord Most High",
      reference: "— Psalm 100:4"
    }
  }
];

 export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: isMobile ? (direction > 0 ? "100%" : "-100%") : 0,
      opacity: isMobile ? 0 : 1,
      scale: 1.1
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { duration: isMobile ? 0.8 : 0 },
        scale: { duration: isMobile ? 10 : 0 }
      }
    },
    exit: (direction: number) => ({
      x: isMobile ? (direction > 0 ? "-100%" : "100%") : 0,
      opacity: isMobile ? 0 : 1,
      scale: 1.1,
      transition: { duration: isMobile ? 1.0 : 0 }
    })
  };

  return (
    <section className="relative h-[90vh] min-h-[500px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        {heroSlides.map((slide, index) => 
          index === currentSlide && (
            <motion.div
              key={slide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full  h-full "
            >
        
            <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-green-900/90 via-black/50 to-transparent">
                <img
                  src={slide.imageUrl}
                  alt=""
                  className="w-full h-full object-cover object-center mix-blend-multiply opacity-90"
                  loading="eager"
                  style={{ transform: 'translateZ(0) ,backgroundSize: 800% auto, backgroundPosition:top center, backgroundRepeat:no-repeat' }}
                />
              </div> 
          

              {/* Darker Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t  from-black/100 via-purple-900/50 to-transparent" />

              {/* Content Section */}
              <div className="container-custom h-full flex flex-col justify-center  items-center text-white relative z-10">
                {slide.type === 'quote' && (
                  <div className="flex flex-col w-full items-start gap-8 min-h-[60vh] md:min-h-0">
                <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeInOut' }} // Reduced duration from 5s to 0.5s
  className="flex flex-col gap-6 max-w-2xl  ml-20 roboto-condensed text-2xl mt-50" // Changed mt-auto to mt-8, added md:mt-16
>
                      <div className="flex flex-col gap-4">
                        <h1 className="text-1xl md:text-1xl lg:text-1xl leading-tight md:leading-normal ">
                          {slide.content?.quote}
                        </h1>
                        {slide.content?.reference && (
                          <p className="text-accent text-lg md:text-xl work-sans">
                            {slide.content.reference}
                          </p>
                        )}
                      </div>

                      <div className="w-[70px] h-[10px] bg-white  my-4" aria-hidden="true" />

                      <div className="flex items-center -ml-4 md:-ml-4 -mt-4">
                        <a
                          href="#"
                          className="btn bg-primary hover:bg-primary-dark rounded-full flex flex-col items-center gap-1 px-6 py-3 md:px-6 md:py-4 transition-all duration-300 transform -translate-y-2 -translate-x-4 md:-translate-x-6"
                        >
                          <FontAwesomeIcon 
                            icon={faPlayCircle} 
                            className="text-2xl md:text-2xl lg:text-4xl mb-1 hover:scale-110 transition-transform duration-300"
                          />
                          <span className="text-sm md:text-base">Play Now</span>
                        </a>
                      </div>
                    </motion.div>
                  </div>
                )}

                {slide.type === 'streaming' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center max-w-4xl"
                  >
                    <h2 className="text-3xl md:text-4xl  mb-8 roboto-condensed">
                      Stream Our Music On Various Platforms
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {slide.content?.streamingPlatforms?.map((platform) => (
                        <a
                          key={platform.name}
                          href={platform.url}
                          className="flex flex-col items-center p-6 raleway-medium bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all"
                        >
                          <FontAwesomeIcon 
                            icon={platform.icon} 
                            className="text-3xl mb-4"
                          />
                          <span className="text-lg">{platform.name}</span>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}

                {slide.type === 'form' && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-md bg-white/10 backdrop-blur-sm p-8 rounded-xl"
                  >
                    <h2 className="text-2xl md:text-3xl mb-6 roboto-condensed">
                      {slide.content?.formTitle}
                    </h2>
                    <form className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="w-full p-3 bg-white/20 rounded-lg work-sans placeholder-white/70"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          className="w-full p-3 bg-white/20 rounded-lg placeholder-white/70"
                        />
                      </div>
                      <div>
                        <input
                          type="date"
                          className="w-full p-3 bg-white/20 rounded-lg"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-purple-900 hover:bg-primary-dark roboto-condensed py-3 rounded-lg transition-colors"
                      >
                        Submit Request
                      </button>
                    </form>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>

      {/* Pagination Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
        <div className="flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
 
    </section>

    
  );
};
