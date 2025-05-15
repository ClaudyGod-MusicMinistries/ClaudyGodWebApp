import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Back1 } from '../assets/'

interface VideoProps {
  id: string;
  title: string;
  thumbnailUrl: string;
}

const videos: VideoProps[] = [
  {
    id: "1",
    title: "You Are Our Everything",
    thumbnailUrl: "https://images.pexels.com/photos/7097601/pexels-photo-7097601.jpeg"
  },
  {
    id: "2",
    title: "King of Heaven",
    thumbnailUrl: "https://images.pexels.com/photos/7097557/pexels-photo-7097557.jpeg"
  },
  {
    id: "3",
    title: "We Would Reign",
    thumbnailUrl: "https://images.pexels.com/photos/7097596/pexels-photo-7097596.jpeg"
  },
  {
    id: "4",
    title: "Affirmation",
    thumbnailUrl: "https://images.pexels.com/photos/7097603/pexels-photo-7097603.jpeg"
  }
];

const VideoCard: React.FC<VideoProps> = ({ id, title, thumbnailUrl }) => {
  return (
    <motion.div 
      className="group relative flex flex-col w-full"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/watch/${id}`} className="block relative rounded-xl overflow-hidden aspect-video">
        <img 
          src={thumbnailUrl} 
          alt={title} 
          className="w-full h-full object-cover transform transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-primary/80 rounded-full p-3">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          </div>
        </div>
      </Link>
      <h3 className="mt-3 text-lg font-medium text-white text-center">{title}</h3>
    </motion.div>
  );
};

export const FeaturedVideos: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left'|'right'>('right');
  const [itemsPerSlide, setItemsPerSlide] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(window.innerWidth >= 768 ? 4 : 3);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setDirection('left');
    setActiveIndex(prev => {
      const newIndex = prev - itemsPerSlide;
      return newIndex < 0 ? videos.length - itemsPerSlide : newIndex;
    });
  };

  const handleNext = () => {
    setDirection('right');
    setActiveIndex(prev => {
      const newIndex = prev + itemsPerSlide;
      return newIndex >= videos.length ? 0 : newIndex;
    });
  };

  // Create infinite loop by duplicating videos
  const extendedVideos = [...videos, ...videos, ...videos];
  const visibleVideos = extendedVideos.slice(
    activeIndex, 
    activeIndex + itemsPerSlide
  );

  return (
    <section 
    className="relative py-[30px] min-h-[700px] flex items-center bg-cover bg-center"
    style={{ 
      backgroundImage: `url(${Back1})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
  >
      
      <div className="absolute inset-0 bg-black/50" />

      <div className="container mx-auto relative z-10 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl font-serif text-white mb-4 md:mb-0"
          >
            Featured Videos
          </motion.h2>
          
          <div className="flex gap-4">
            <Link
              to="/latest-release"
              className="bg-purple-900 text-white font-medium hover:bg-transparent transition-all duration-300 flex items-center border-2 border-purple-900 rounded-full px-6 py-2 hover:text-white"
            >
              Latest Release
              <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>

            <Link
              to="/videos"
              className="text-white font-medium hover:text-purple-500 transition-colors duration-300 flex items-center border-2 border-white rounded-full px-6 py-2 hover:border-purple-500"
            >
              More Videos
              <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto overflow-hidden">
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 p-3 rounded-full hover:bg-black/50 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 p-3 rounded-full hover:bg-black/50 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <AnimatePresence mode='wait' initial={false}>
            <motion.div
              key={`${activeIndex}-${itemsPerSlide}`}
              initial={{ opacity: 0, x: direction === 'left' ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 'left' ? 100 : -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-3 md:grid-cols-4 gap-4 px-2"
            >
              {visibleVideos.map((video, index) => (
                <motion.div 
                  key={`${video.id}-${index}`}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <VideoCard {...video} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

