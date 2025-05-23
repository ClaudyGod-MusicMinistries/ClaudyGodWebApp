import { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Resize5, Back3, Resize3, Resize4 } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlayCircle, 
  faMusic, 
  faVideo, 
  faNewspaper,
  faPodcast 
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface HeroSlide {
  id: number;
  imageUrl: string;
  type: 'quote' | 'form' | 'streaming' | 'cta' | 'music';
  content?: {
    quote?: string;
    reference?: string;
    formTitle?: string;
    streamingPlatforms?: { name: string; icon: any; url: string }[];
    listenText?: string;
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
    type: 'cta', 
    content: {}
  },
  { 
    id: 3, 
    imageUrl: Back3, 
    type: 'music', 
    content: { 
      listenText: "Experience the Divine Melody",
      streamingPlatforms: [
        { name: 'Spotify', icon: faMusic, url: 'https://open.spotify.com/album/2MY5xlrYfuvKXaYfdB5v2A?referral=labelaffiliate&utm_source=1101lBmnzTP8&utm_medium=Indie_CDBaby&utm_campaign=labelaffiliate' },
        { name: 'Apple Music', icon: faPodcast, url: 'https://music.apple.com/ng/album/very-glorious/1789665669' },
        { name: 'YouTube Music', icon: faVideo, url: 'https://youtube.com/@claudygodministries?si=6Ne99tTC48Ihv44s' },
       // Fix the array syntax in your platform list:
    { name: 'Itunes', icon: faVideo, url: 'https://music.apple.com/ng/album/very-glorious/1789665669' },
        { name: 'Deezer', icon: faNewspaper, url: 'https://www.deezer.com/us/album/695949191' },
         { name: 'Foundit', icon: faNewspaper, url: 'https://found.ee/gPjnZa' },
       { name: 'Amazon', icon: faNewspaper, url: 'https://music.amazon.com/albums/B0DSM7QGLF?tag=fndcmpgns-20' },
      ]
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
  const navigate = useNavigate();

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
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
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
            <div className="container ml-10 mt-10 relative mx-auto flex h-full items-center px-4">
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
                className="max-w-4xl  text-white"
              >
                {slide.type === 'quote' && (
                  <>
                    <motion.h1 
                      variants={textVariants}
                      className="mb-6 text-5xl roboto-condensed leading-tight md:text-6xl roboto-condensed text-left"
                    >
                      {slide.content?.quote}
                    </motion.h1>
                    <motion.p 
                      variants={textVariants}
                      className="text-xl italic text-purple-300 md:text-2xl text-left mb-8"
                    >
                      {slide.content?.reference}
                    </motion.p>

               {slide.id === 1 && (
  <motion.div 
    variants={textVariants}
    className="flex items-center gap-6"
  >
    {/* Vertical line */}
    <div className="w-[2px] h-[50px] bg-white/40"></div>
    
    {/* Button + text group */}
    <div className="flex items-center gap-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="rounded-full bg-white/20 p-4 backdrop-blur-sm hover:bg-white/30 transition-all"
      >
        <FontAwesomeIcon 
          icon={faPlayCircle} 
          className="text-3xl text-purple-400" 
        />
      </motion.button>
      <h3 className="text-white font-medium tracking-wider text-lg">
        Play Now
      </h3>
    </div>
  </motion.div>
)}
                  </>
                )}

                {slide.type === 'cta' && (
                  <>
                    <motion.div
                      variants={textVariants}
                      className="flex flex-wrap items-center gap-3 mb-8"
                    >
                      <span className="px-4 py-2 text-5xl md:text-5xl roboto-condensed leading-tight">
                        Want to Bring 
                      </span>
                      <span className="text-purple-400 px-3 py-2 text-5xl md:text-5xl leading-tight">
                        ClaudyGod Live In Concert
                      </span>
                      <span className="text-5xl md:text-5xl px-3 py-2 text-white leading-tight">
                        To your City?
                      </span>
                    </motion.div>
                    <motion.button
                      variants={textVariants}
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: '0px 4px 20px rgba(128, 0, 255, 0.3)',
                      }}
                      whileTap={{ 
                        scale: 0.95,
                        backgroundColor: 'rgba(76, 29, 149, 0.9)',
                      }}
                      onClick={() => navigate('/contact')}
                      className="relative rounded-full bg-purple-900 px-10 py-5 cursor-pointer text-xl md:text-2xl font-semibold overflow-hidden"
                    >
                      <motion.span
                        className="absolute inset-0 bg-white/20 opacity-0 rounded-full"
                        initial={{ scale: 0 }}
                        whileTap={{
                          opacity: 1,
                          scale: 2,
                          transition: { duration: 0.6 }
                        }}
                      />
                      <span className="relative z-10">Contact Us</span>
                    </motion.button>
                  </>
                )}

                {slide.type === 'music' && (
                  <div className="space-y-8 w-full">
                    <motion.h2 
                      variants={textVariants}
                      className="text-5xl md:text-6xl font-bold roboto-condensed mb-8"
                    >
                      MUSIC
                    </motion.h2>

                    <div className="flex flex-col gap-8">
                      <motion.div 
                        variants={textVariants}
                        className="space-y-6"
                      >
                        <h3 className="text-3xl md:text-4xl font-light italic text-purple-300">
                          {slide.content?.listenText}
                        </h3>
                        <p className="text-xl text-white/80 max-w-2xl">
                          Dive into spiritual worship through sacred melodies that uplift the soul and glorify His name
                        </p>
                      </motion.div>

                      <motion.div 
                        variants={textVariants}
                        className="flex flex-col items-start gap-6 mt-2"
                      >
                        <div className="w-[80px] h-[10px] bg-white"></div>
                        <motion.div 
                          className="relative group"
                          whileHover={{ scale: 1.02 }}
                        >
                         <div className="w-24 h-24 rounded-full bg-purple-900/30 backdrop-blur-sm flex items-center justify-center hover:bg-purple-900/40 transition-all transform hover:scale-105">
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="w-16 h-16 rounded-full bg-purple-900 flex items-center justify-center hover:bg-purple-800 transition-colors"
  >
    <FontAwesomeIcon 
      icon={faPlayCircle} 
      className="text-4xl text-white pl-1 cursor-pointer" 
    />
  </motion.button>
</div>
                        </motion.div>
                        <h3 className="text-white font-medium tracking-wider text-xl">
                          Play Latest Album
                        </h3>
                      </motion.div>
                    </div>

                    <motion.div 
                      variants={textVariants}
                      className="space-y-6 mt-12"
                    >
                      <h5 className="text-2xl font-semibold text-purple-300 roboto-condensed">
                        STREAM ACROSS ALL PLATFORMS
                      </h5>
                      <div className="flex flex-wrap gap-6">
                        {slide.content?.streamingPlatforms?.map((platform) => (
                          <motion.a
                            key={platform.name}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5 }}
                            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                          >
                            <FontAwesomeIcon 
                              icon={platform.icon} 
                              className="text-2xl text-purple-400" 
                            />
                            <span className="text-lg font-medium">{platform.name}</span>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
              <div className="absolute h-px w-full bg-white/20" />
              {heroSlides.map((_, i) => (
                <motion.div
                  key={i}
                  onClick={() => goToSlide(i)}
                  className="relative cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="h-1 rounded-full bg-white/30"
                    animate={{
                      width: i === currentSlide ? '2rem' : '1rem',
                      backgroundColor: i === currentSlide ? '#fff' : 'rgba(255,255,255,0.3)'
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
};