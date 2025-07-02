// src/components/FeaturedVideos.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { About2 } from '../../assets';
import { VideoProps, videos } from '../../components/data/FeaturedData'; // Import from data folder

const VideoCard: React.FC<VideoProps> = ({ title, thumbnailUrl, duration, youtubeUrl }) => (
  <motion.div
    className="group relative flex flex-col w-full"
    whileHover={{ y: -10 }}
    transition={{ duration: 0.3 }}
  >
    <a
      href={youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative rounded-xl overflow-hidden aspect-video shadow-lg"
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
          <span className="text-white bg-purple-700/80 px-2 py-1 rounded-md text-xs font-medium">
            {duration}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-purple-700 rounded-full p-4 shadow-xl">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </a>
    <div className="mt-4 px-2">
      <h3 className="text-lg font-work-sans text-white roboto-condensed">{title}</h3>
    </div>
  </motion.div>
);

export const FeaturedVideos: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1280) setItemsPerSlide(4);
      else if (w >= 768) setItemsPerSlide(3);
      else if (w >= 640) setItemsPerSlide(2);
      else setItemsPerSlide(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const iv = setInterval(() => {
      setDirection('right');
      setActiveIndex((i) => (i + 1) % Math.ceil(videos.length / itemsPerSlide));
    }, 5000);
    return () => clearInterval(iv);
  }, [autoPlay, itemsPerSlide]);

  const totalSlides = Math.ceil(videos.length / itemsPerSlide);
  const visibleVideos = videos.slice(
    activeIndex * itemsPerSlide,
    activeIndex * itemsPerSlide + itemsPerSlide
  );

  const handlePrev = () => {
    setDirection('left');
    setActiveIndex((i) => (i - 1 + totalSlides) % totalSlides);
  };
  const handleNext = () => {
    setDirection('right');
    setActiveIndex((i) => (i + 1) % totalSlides);
  };

  return (
    <section className="relative py-16 md:py-24 min-h-screen flex items-center overflow-hidden">
     
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${About2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-purple-900/70 to-black/90" />
      </div>

      <div className="container mx-auto relative z-10 px-4">
        <div className="flex flex-col items-center text-center md:text-left md:flex-row md:justify-between md:items-end mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 md:mb-0"
          >
            <h2 className="text-6xl md:text-6xl max-md:text-2xl  font-roboto-condensed text-white mb-4">
              Featured <span className="text-purple-400">Videos</span>
            </h2>
            <p className="text-gray-300 font-work-sans max-w-xl text-lg">
              Experience our latest worship sessions and musical performances
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <Link
              to="/music"
              className="relative inline-flex group items-center justify-center bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-600 hover:to-purple-800 text-white font-medium rounded-full px-6 py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="font-work-sans">Latest Release</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              to="/videos"
              className="relative inline-flex group items-center justify-center bg-transparent text-white font-medium rounded-full px-6 py-3 border-2 border-purple-600 hover:bg-purple-900/50 transition-all duration-300"
            >
             <span className="font-work-sans">View All</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>
        </div>
        <div 
          className="relative overflow-hidden py-8 rounded-2xl bg-gradient-to-r from-black/50 to-purple-900/30 backdrop-blur-sm border border-purple-500/30 shadow-2xl"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-purple-700 p-3 rounded-full transition-all shadow-lg"
            aria-label="Previous videos"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-purple-700 p-3 rounded-full transition-all shadow-lg"
            aria-label="Next videos"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: direction === 'left' ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 'left' ? 100 : -100 }}
              transition={{ duration: 0.5 }}
              className="px-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {visibleVideos.map((video) => (
                  <VideoCard key={video.id} {...video} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Pagination */}
        <div className="flex justify-center mt-10 space-x-3">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setDirection(i > activeIndex ? 'right' : 'left');
                setActiveIndex(i);
              }}
              whileHover={{ scale: 1.2 }}
              className={`w-3 h-3 rounded-full transition-all ${
                i === activeIndex 
                  ? 'bg-purple-500 scale-125' 
                  : 'bg-gray-600 hover:bg-purple-400'
              }`}
              aria-label={`Go to slide ${i+1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};