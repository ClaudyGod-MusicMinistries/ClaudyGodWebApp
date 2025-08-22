import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExtraBoldText, RegularText } from '../ui/fonts/typography';
import { useTheme } from '../../contexts/ThemeContext';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

// Import your video data
import { videos, VideoType } from '../data/videosData';

interface LiveSessionsSectionProps {
  title?: string;
  description?: string;
  className?: string;
}

export const LiveSessionsSection: React.FC<LiveSessionsSectionProps> = ({
  title = "Check Out Our Live Sessions",
  description = "Experience the powerful live worship sessions by Min. ClaudyGod and her worship team. These recordings capture the spirit and energy of our live performances.",
  className = ""
}) => {
  const { colorScheme } = useTheme();
  
  // Filter only Live Sessions videos
  const liveSessionVideos = videos.filter(video => video.category === 'Live Sessions');
  
  const [selectedVideo, setSelectedVideo] = useState<VideoType>(liveSessionVideos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      checkScrollPosition();
      
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);

  // Generate YouTube thumbnail URL
  const getThumbnailUrl = (youtubeId: string, quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'hq') => {
    const qualities = {
      'default': 'default.jpg',
      'hq': 'hqdefault.jpg',
      'mq': 'mqdefault.jpg',
      'sd': 'sddefault.jpg',
      'maxres': 'maxresdefault.jpg'
    };
    return `https://img.youtube.com/vi/${youtubeId}/${qualities[quality]}`;
  };

  return (
    <section 
      className={`w-full py-8 lg:py-16 ${className}`}
      style={{ backgroundColor: colorScheme.background }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-8 lg:mb-12"
        >
          <ExtraBoldText 
            fontSize="1.75rem" 
            smFontSize="2rem" 
            lgFontSize="2.5rem" 
            style={{ color: colorScheme.text }}
            className="mb-4"
          >
            {title}
          </ExtraBoldText>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '4rem' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 my-4 lg:my-6"
            style={{ backgroundColor: colorScheme.primary }}
          />
          <RegularText 
            fontSize="0.875rem" 
            smFontSize="0.9rem" 
            lgFontSize="1rem" 
            style={{ color: colorScheme.textSecondary }} 
            className="max-w-3xl mb-6 lg:mb-8 px-2"
          >
            {description}
          </RegularText>
        </motion.div>

        {/* Main YouTube Video Player */}
        <div className="mb-8 lg:mb-12 rounded-xl overflow-hidden shadow-lg">
          <div className="relative aspect-video bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=${isPlaying ? 1 : 0}`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              frameBorder="0"
            />
          </div>
          <div 
            className="p-4 rounded-b-xl"
            style={{ backgroundColor: colorScheme.cardBackground }}
          >
            <h3 
              className="font-semibold text-lg mb-2"
              style={{ color: colorScheme.text }}
            >
              {selectedVideo.title}
            </h3>
            <p 
              className="text-sm mb-2"
              style={{ color: colorScheme.textSecondary }}
            >
              {selectedVideo.description}
            </p>
            <div className="text-sm opacity-75">
              <span style={{ color: colorScheme.textSecondary }}>
                {selectedVideo.date}
              </span>
            </div>
          </div>
        </div>

        {/* Video Carousel */}
        <div className="relative">
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-lg hidden md:block"
              style={{ color: colorScheme.primary }}
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-lg hidden md:block"
              style={{ color: colorScheme.primary }}
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          )}

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 -mx-4 px-4"
            onScroll={checkScrollPosition}
          >
            {liveSessionVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex-shrink-0 w-64 sm:w-72 md:w-80 cursor-pointer transition-all duration-300 ${
                  selectedVideo.id === video.id 
                    ? 'ring-4 scale-105' 
                    : 'opacity-70 hover:opacity-100'
                } rounded-lg overflow-hidden`}
                style={{
                  ringColor: colorScheme.primary
                }}
                onClick={() => {
                  setSelectedVideo(video);
                  setIsPlaying(true);
                }}
              >
                <div className="relative aspect-video bg-gray-700 rounded-t-lg overflow-hidden">
                  {/* YouTube Thumbnail */}
                  <img
                    src={getThumbnailUrl(video.youtubeId, 'hq')}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm">
                      <Play size={16} fill="white" />
                    </div>
                  </div>
                </div>
                <div 
                  className="p-3 rounded-b-lg"
                  style={{ backgroundColor: colorScheme.cardBackground }}
                >
                  <h3 
                    className="font-semibold text-sm mb-1 line-clamp-1"
                    style={{ color: colorScheme.text }}
                  >
                    {video.title}
                  </h3>
                  <p 
                    className="text-xs mb-2 line-clamp-2"
                    style={{ color: colorScheme.textSecondary }}
                  >
                    {video.description}
                  </p>
                  <div className="text-xs opacity-75">
                    <span style={{ color: colorScheme.textSecondary }}>
                      {video.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};