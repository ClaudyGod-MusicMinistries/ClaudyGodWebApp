import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export type VideoType = {
  id: number;
  title: string;
  youtubeId: string;
  category: 'Music Videos' | 'Visualizers' | 'Live Sessions';
  description: string;
  date: string;
};

const DiagonalSection: React.FC<{
  title: string;
  description: string;
  category: 'Music Videos' | 'Visualizers' | 'Live Sessions';
  videos: VideoType[];
  reverse?: boolean;
  onExplore: () => void;
}> = ({
  title,
  description,
  category,
  videos, 
  reverse = false,
  onExplore
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  

  const categoryVideos = videos.filter(video => video.category === category);
  
  useEffect(() => {
    if (isHovered && categoryVideos.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentSlideIndex(prev => (prev + 1) % categoryVideos.length);
      }, 3000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, categoryVideos.length]);
  
  const getThumbnailUrl = (youtubeId: string) => {
    return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  };

  return (
    <div className={`relative py-16 ${reverse ? 'bg-purple-50' : 'bg-white'}`}>
      <div className={`container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? 'flex-row-reverse' : ''}`}>
        <motion.div 
          className={`${reverse ? 'lg:order-2 lg:pr-12' : 'lg:pl-12'}`}
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6">
            <div className="w-16 h-1 bg-gray-500 mb-4"></div>
            <h2 className="text-3xl md:text-4xl roboto-condensed text-purple-900 mb-4">{title}</h2>
          </div>
          <p className="text-gray-700 mb-8 raleway-medium">{description}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExplore}
            className="px-8 py-3 bg-purple-900 text-white rounded-full flex items-center gap-2"
          >
            Explore Content <FontAwesomeIcon icon={faArrowRight} />
          </motion.button>
        </motion.div>

        <motion.div 
          className={`relative aspect-video overflow-hidden rounded-xl ${reverse ? 'lg:order-1' : ''}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 transition-opacity duration-700">
              {categoryVideos.map((video, index) => (
                <div
                  key={video.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentSlideIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img 
                    src={getThumbnailUrl(video.youtubeId)}
                    alt={`${video.title} thumbnail`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                    }}
                  />
                </div>
              ))}
            </div>
            
        <motion.div
  className="absolute top-0 left-0 w-1/2 h-full origin-left cursor-pointer"
  initial={{ scaleX: 1 }}
  animate={{ scaleX: isHovered ? 0 : 1 }}
  transition={{ duration: 0.7, ease: "easeInOut" }}
  style={{
    background: 'linear-gradient(90deg, rgba(76, 29, 149, 0.9) 0%, rgba(107, 33, 168, 0.8) 100%)',
    cursor: 'pointer'
  }}
/>
<motion.div
  className="absolute top-0 right-0 w-1/2 h-full origin-right cursor-pointer"
  initial={{ scaleX: 1 }}
  animate={{ scaleX: isHovered ? 0 : 1 }}
  transition={{ duration: 0.7, ease: "easeInOut" }}
  style={{
    background: 'linear-gradient(90deg, rgba(107, 33, 168, 0.8) 0%, rgba(156, 163, 175, 0.7) 100%)',
    cursor: 'pointer'
  }}
/>  
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-white text-5xl"
                animate={{ opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <FontAwesomeIcon icon={faPlay} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className={`absolute inset-x-0 h-16 -z-10 ${reverse ? 'top-0 -skew-y-2 translate-y-[-50%] bg-white' : 'bottom-0 skew-y-2 translate-y-[50%] bg-purple-50'}`}></div>
    </div>
  );
};

export default DiagonalSection;