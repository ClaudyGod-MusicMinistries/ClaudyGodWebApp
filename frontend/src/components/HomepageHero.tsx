import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  Resize5, Back3, Back4,Resize3,Resize4 ,Resize1, Resize2} from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faMusic, faVideo, faNewspaper } from '@fortawesome/free-solid-svg-icons';

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
    imageUrl: Resize5, 
    type: 'quote', 
    content: { 
      quote: "Enter Into His Gates With Thanksgiving And Into His Courts With Praise; Be Thankful Unto Him, and Bless His Name.", 
      reference: "— Psalm 100:4" 
    }
  },
  { 
    id: 2, 
    imageUrl: Resize4, 
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
      formTitle: 'Book Us for Your Event' 
    }
  },
  { 
    id: 4, 
    imageUrl: Resize3, 
    type: 'quote', 
    content: { 
      quote: 'Praise the Lord Most High', 
      reference: '— Psalm 100:4' 
    }
  }
];

const textVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 10,
      duration: 0.5
    }
  }
};
const imageVariants = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: 'easeInOut'
    }
  }
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeInOut' }
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: { duration: 0.8, ease: 'easeInOut' }
  })
};

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

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

  return (
    <section className="relative h-[120vh] w-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        {heroSlides.map((slide, index) => index === currentSlide && (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 h-full w-full"
          >
            {/* Background Image */}
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="absolute inset-0 h-full w-full"
            >
              <img
                src={slide.imageUrl}
                alt="Background"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </motion.div>

            {/* Content Container */}
            <div className="container relative mx-auto flex h-full items-center px-4">
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
                className="max-w-2xl text-white"
              >
                {slide.type === 'quote' && (
  <>
    <motion.h1 
      variants={textVariants}
      className="mb-6 text-2xl font-bold leading-tight md:text-6xl roboto-condensed text-left"
    >
      {slide.content?.quote}
    </motion.h1>
    <motion.p 
      variants={textVariants}
      className="text-xl italic text-purple-300 md:text-2xl text-left mb-8"
    >
      {slide.content?.reference}
    </motion.p>

    {/* Added elements */}
    {slide.id === 1 && (
      <motion.div 
        variants={textVariants}
        className="flex items-center gap-6"
      >
        <div className="w-[50px] h-[3px] bg-white"></div>
         <div className="flex items-center gap-3">
         <motion.button 
            whileHover={{ scale: 1.1 }}
            className="rounded-full bg-white/20 p-4 backdrop-blur-sm hover:bg-white/30 transition-all"
          >
          <FontAwesomeIcon 
            icon={faPlayCircle} 
            className="text-3xl text-purple-400" 
          />
        </motion.button>
         <h3 className="text-white font-medium tracking-wider">Play Now</h3>
        </div>
      </motion.div>
    )}
  </>
)}
                {slide.type === 'streaming' && (
                  <>
                    <motion.h2 
                      variants={textVariants}
                      className="mb-8 text-4xl font-bold"
                    >
                      Stream Our Music
                    </motion.h2>
                    <motion.div 
                      variants={textVariants}
                      className="flex flex-wrap gap-4"
                    >
                      {slide.content?.streamingPlatforms?.map((platform) => (
                        <motion.a
                          key={platform.name}
                          href={platform.url}
                          whileHover={{ scale: 1.05 }}
                          className="flex items-center gap-3 rounded-lg bg-white/10 px-6 py-3 backdrop-blur-sm transition-all hover:bg-white/20"
                        >
                          <FontAwesomeIcon 
                            icon={platform.icon} 
                            className="text-xl" 
                          />
                          <span className="text-lg">{platform.name}</span>
                        </motion.a>
                      ))}
                    </motion.div>
                  </>
                )}

                {slide.type === 'form' && (
                  <>
                    <motion.h2 
                      variants={textVariants}
                      className="mb-8 text-4xl font-bold"
                    >
                      {slide.content?.formTitle}
                    </motion.h2>
                    <motion.form 
                      variants={textVariants}
                      className="flex flex-col gap-4"
                    >
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="rounded-lg bg-white/20 p-4 placeholder-white/70"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="rounded-lg bg-white/20 p-4 placeholder-white/70"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="w-fit rounded-full bg-purple-900 px-8 py-3"
                      >
                        Submit Request
                      </motion.button>
                    </motion.form>
                  </>
                )}
              </motion.div>
            </div>

            {/* Pagination Dots */}
       <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
  <div className="absolute h-px w-full bg-white/20" /> {/* Background line */}
  
  {heroSlides.map((_, i) => (
    <motion.div
      key={i}
      onClick={() => goToSlide(i)}
      className="relative cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`h-1 rounded-full ${
          i === currentSlide ? 'bg-white w-8' : 'bg-white/30 w-4'
        }`}
        initial={{ width: '1rem' }}
        animate={{
          width: i === currentSlide ? '2rem' : '1rem',
          backgroundColor: i === currentSlide ? '#fff' : 'rgba(255,255,255,0.3)'
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          duration: 0.5
        }}
      />
      {i < heroSlides.length - 1 && (
        <div className="absolute top-1/2 right-0 h-px w-2 -translate-y-1/2 translate-x-full bg-white/20" />
      )}
    </motion.div>
  ))}
</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
};