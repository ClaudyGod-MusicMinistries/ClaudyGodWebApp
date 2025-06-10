import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Resize5, DesktopBg, Back3, Resize4 , Main} from '../assets/';
import { bgVideo } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlayCircle, 
  faMusic, 
  faVideo, 
  faNewspaper,
  faPodcast,
  faVolumeUp,
  faVolumeMute
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface HeroSlide {
  id: number;
  imageUrl?: string;
  imageUrlMobile?: string; 
  imageUrlDesktop?: string; 
  videoUrl?: string;
  type: 'quote' | 'form' | 'streaming' | 'cta' | 'music' | 'video';
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
    imageUrlMobile: Main, 
    imageUrlDesktop: DesktopBg, 
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
        { name: 'Itunes', icon: faVideo, url: 'https://music.apple.com/ng/album/very-glorious/1789665669' },
        { name: 'Deezer', icon: faNewspaper, url: 'https://www.deezer.com/us/album/695949191' },
        { name: 'Foundit', icon: faNewspaper, url: 'https://found.ee/gPjnZa' },
        { name: 'Amazon', icon: faNewspaper, url: 'https://music.amazon.com/albums/B0DSM7QGLF?tag=fndcmpgns-20' },
      ]
    }
  },
  { 
    id: 4, 
    videoUrl: bgVideo, 
    type: 'video', 
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
  const [isMuted, setIsMuted] = useState(true);
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
    <section className="relative h-[100vh] md:h-[120vh] w-full overflow-hidden">
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
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="absolute inset-0 h-full w-full"
            >
              {slide.type === 'video' ? (
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="h-full w-full object-cover object-center brightness-60"
                >
                  <source src={slide.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : ( 
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
          className="hidden md:block h-full w-full object-cover object-center "
        />
      </>
    ) : (
      <img
        src={slide.imageUrl}
        alt="Background"
        className="h-full w-full object-cover object-center"
      />
    )}
     <div className={`absolute inset-0 ${
    slide.type === 'cta' || slide.type === 'music' 
      ? 'bg-gradient-to-t from-black/60 via-black/30 to-transparent' // Lighter gradient for 2nd/3rd slides
      : 'bg-gradient-to-t from-black/100 via-black/50 to-black/10' // Original gradient for others
  }`} />
</div>
              )}
            </motion.div>
            
            <div className="container ml-4 md:ml-10 mt-6 md:mt-10 relative mx-auto flex h-full items-center px-4">
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
                className="max-w-4xl text-white"
              >
                {slide.type === 'quote' && (
                  <>
<motion.h1 
  variants={textVariants}
  className="
    sm:text-xl
    sm:leading-4 
    relative
    top-20
    w-full 
    px-4 
    text-white
    text-left 
    roboto-condensed
    md:text-5xl
    md:leading-tight 
    md:mb-6 
    md:px-0
    md:text-white
    drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
>
  {slide.content?.quote}
</motion.h1>

<motion.p 
  variants={textVariants}
  className="
    text-base 
    italic 
    text-green-400 
    text-left 
    relative 
    top-22
    left-5
    md:text-2xl 
    md:text-purple-300 
    md:top-20
    font-bold
    drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
>
  {slide.content?.reference}
</motion.p>

{slide.id === 1 && (
  <motion.div 
    variants={textVariants}
    className="
      md:flex md:flex-row md:items-center md:gap-6
      max-md:flex max-md:flex-col max-md:items-center max-md:gap-4"
  >
    <div className="
      md:flex md:flex-col md:mt-25 md:items-center md:gap-2
      max-md:flex max-md:flex-col max-md:mt-25 max-md:mr-90 max-md:items-center max-md:gap-3"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="
          md:rounded-full md:bg-white/30 md:p-4 md:backdrop-blur-sm
          max-md:rounded-full max-md:bg-white/30 max-md:p-3 max-md:backdrop-blur-sm
          hover:bg-white/40 transition-all
          shadow-lg"
      >
        <FontAwesomeIcon 
          icon={faPlayCircle} 
          className="cursor-pointer
            md:text-3xl md:text-purple-700
            max-md:text-2xl max-md:text-purple-700" 
        />
      </motion.button>
      
      <h3 className="
        md:text-lg md:text-white md:font-bold md:tracking-wider
        max-md:text-base max-md:text-white max-md:font-bold max-md:tracking-normal
        drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
      >
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
  className="
    max-md:flex max-md:flex-col max-md:items-start max-md:gap-2 max-md:mb-6
    md:flex md:flex-col md:items-start md:gap-4 md:mb-12 roboto-condensed"
>
      <span className="
        max-md:text-3xl raleway-medium max-md:leading-tight
        md:text-6xl roboto-condensed md:leading-tighter lg:text-7xl
        drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
      >
        Want to Bring 
      </span>
      
      <span className="
        max-md:text-purple-400 max-md:text-3xl max-md:leading-tight
        md:text-purple-400 work-sans md:text-6xl md:leading-tighter lg:text-7xl
        drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
      >
        ClaudyGod Live
      </span>
      
      <span className="
        max-md:text-white max-md:text-3xl max-md:leading-tight roboto-condensed
        md:text-white md:text-6xl md:leading-tighter lg:text-7xl raleway-medium
        drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
      >
        To your City?
      </span>
    </motion.div>

    <motion.button
      variants={textVariants}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: '0px 4px 30px rgba(128, 0, 255, 0.4)'
      }}
      whileTap={{ 
        scale: 0.95,
        backgroundColor: 'rgba(76, 29, 149, 0.9)',
      }}
      onClick={() => navigate('/bookings')}
      className="
        max-md:relative max-md:rounded-full max-md:bg-purple-800 max-md:px-6 cursor-pointer max-md:py-3 max-md:text-lg work-sans
        md:relative cursor-pointer md:rounded-full md:bg-purple-800 md:px-14 md:py-6 md:text-3xl
        shadow-xl"
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
      <span className="relative z-10 font-bold">Contact Us</span>
    </motion.button>
  </>
)}

                {slide.type === 'music' && (
                  <div className="space-y-6 md:space-y-8 w-full">
                    <motion.h2 
  variants={textVariants}
  className="
    max-md:text-4xl max-md:font-bold max-md:raleway-medium max-md:mb-6 max-md:leading-tight max-md:mt-30
    md:text-6xl md:font-bold md:roboto-condensed md:mb-8 md:leading-tighter
    drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
>
  MUSIC
</motion.h2>

                     <div className="flex flex-col gap-6 md:gap-8">
                      <motion.div 
                        variants={textVariants}
                        className="space-y-6"
                      >
                        <h3 className="
  max-md:text-2xl max-md:font-normal max-md:italic max-md:text-purple-300 max-md:mb-3
  md:text-4xl md:font-light md:italic md:text-purple-300 md:mb-4
  drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
>
  {slide.content?.listenText}
</h3>

<p className="
  max-md:text-base max-md:text-white/90 max-md:max-w-md max-md:leading-relaxed
  md:text-xl md:text-white/90 md:max-w-2xl md:leading-snug
  font-medium
  drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
>
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
                         <div className="w-24 h-24 rounded-full bg-purple-900/40 backdrop-blur-sm flex items-center justify-center hover:bg-purple-900/50 transition-all transform hover:scale-105 shadow-lg">
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="w-16 h-16 rounded-full bg-purple-800 flex items-center justify-center hover:bg-purple-700 transition-colors"
  >
    <FontAwesomeIcon 
      icon={faPlayCircle} 
      className="text-4xl text-white pl-1 cursor-pointer" 
    />
  </motion.button>
</div>
                        </motion.div>
                        <h3 className="text-white font-bold tracking-wider text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          Play Latest Album
                        </h3>
                      </motion.div>
                    </div>

                    <motion.div 
                        variants={textVariants}
                        className="space-y-4 md:space-y-6 mt-8 md:mt-12"
                      >
                        <h5 className="text-xl md:text-2xl font-bold text-purple-400 roboto-condensed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          STREAM EVERYWHERE
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
<div className="grid grid-cols-3 md:grid-cols-2 mb-10 gap-4 md:gap-6 pb-4 md:pb-6">
  {slide.content?.streamingPlatforms?.map((platform) => (
    <motion.a
      key={platform.name}
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -5 }}
      className="flex items-center gap-2 px-1 py-1 md:px-6 md:py-1 text-sm md:text-lg
                 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors
                 shadow-md"
    >
      <FontAwesomeIcon 
        icon={platform.icon} 
        className="text-lg md:text-2xl text-purple-700" 
      />
      <span className="font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
        {platform.name}
      </span>
    </motion.a>
  ))}
</div>
                      </div>
                    </motion.div>
                  </div>
                )}
                
                {slide.type === 'video' && (
                  <motion.div 
                    variants={textVariants}
                    className="max-w-3xl"
                  >
                    <motion.h1 
                      className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
                    >
                      {slide.content?.quote}
                    </motion.h1>
                    <motion.p 
                      className="text-xl md:text-3xl italic text-purple-300 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    >
                      {slide.content?.reference}
                    </motion.p>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Video controls for video slide */}
            {slide.type === 'video' && (
              <div className="absolute bottom-6 right-6 z-30">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMute}
                  className="bg-white/30 p-3 rounded-full backdrop-blur-sm shadow-lg"
                >
                  <FontAwesomeIcon 
                    icon={isMuted ? faVolumeMute : faVolumeUp} 
                    className="text-white text-xl" 
                  />
                </motion.button>
              </div>
            )}

            {/* Pagination Dots */}
            <div className="absolute bottom-4 md:bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 md:gap-2">
              {heroSlides.map((_, i) => (
                <motion.div
                  key={i}
                  onClick={() => goToSlide(i)}
                  className="relative cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                   <motion.div
                    className="h-1 rounded-full"
                    animate={{
                      width: i === currentSlide ? '1.5rem' : '0.75rem',
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