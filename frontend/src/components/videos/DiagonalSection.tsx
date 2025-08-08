import { useState, useEffect, useRef } from 'react';
import { color, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { MusicBan1 } from '../../assets';
import { ExtraBoldText, RegularText, SemiBoldText } from '../ui/fonts/typography';
import { useTheme } from '../../contexts/ThemeContext';

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
  const { colorScheme } = useTheme();

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

  const getThumbnailUrl = (youtubeId: string) =>
    `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

  return (
    <div 
      className={`relative py-24 overflow-hidden ${reverse ? 
        `bg-gradient-to-br ${colorScheme.primaryGradientLight}` : 
        'bg-gradient-to-br from-white to-gray-50'}`}
      style={{ backgroundColor: colorScheme.background } }
    >
      <div className={`container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 
        gap-16 items-center ${reverse ? 'flex-row-reverse' : ''}`}>
        <motion.div
          className={`${reverse ? 'lg:order-2 lg:pl-16' : 'lg:pr-16'}`}
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-8 relative">
          
            <ExtraBoldText 
             style={{color:colorScheme.primary}}
              fontSize="2rem"
              lineHeight="1.2"
            >
              {title}
            </ExtraBoldText>
          </div>
         <RegularText 
  className="mb-10 max-w-xl"
  style={{ color: colorScheme.textTertiary }}
  fontSize="1.125rem"
  lineHeight="1.75"
>
  {description}
</RegularText>

          <motion.button
            whileHover={{ 
              scale: 1.05,
              backgroundColor: colorScheme.buttonHover
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onExplore}
            className="relative px-8 py-4 rounded-full flex items-center gap-3 group overflow-hidden"
            style={{
              backgroundColor: colorScheme.button,
              color: colorScheme.buttonText
            }}
          >
            <SemiBoldText className="relative z-10">Watch Now</SemiBoldText>
            <FontAwesomeIcon 
              icon={faArrowRight} 
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" 
            />
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-300 z-0"
              style={{ backgroundColor: colorScheme.buttonActive }}
            />
          </motion.button>
        </motion.div>

        <motion.div
          className={`relative aspect-video overflow-hidden rounded-2xl shadow-2xl ${reverse ? 'lg:order-1' : ''}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full h-full overflow-hidden">
            {categoryVideos.map((video, index) => (
              <div
                key={video.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlideIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={getThumbnailUrl(video.youtubeId)}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = MusicBan1;
                  }}
                />
              </div>
            ))}

            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 transition-opacity duration-500" 
              style={{ opacity: isHovered ? 0.6 : 0.8 }} 
            />

            <div 
              className="absolute bottom-0 left-0 right-0 p-5 transition-opacity duration-500" 
              style={{ opacity: isHovered ? 1 : 0 }}
            >
              <ExtraBoldText 
                className="text-xl mb-1 truncate"
                color={colorScheme.text}
              >
                {categoryVideos[currentSlideIndex]?.title}
              </ExtraBoldText>
              <RegularText 
                className="text-sm"
                color={colorScheme.accent}
              >
                {categoryVideos[currentSlideIndex]?.date}
              </RegularText>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700/30">
              <motion.div 
                key={currentSlideIndex}
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-5xl"
                animate={{ 
                  opacity: isHovered ? 0 : 1,
                  scale: isHovered ? 0.8 : [1, 1.1, 1]
                }}
                transition={{ 
                  opacity: { duration: 0.3 },
                  scale: { duration: 1.5, repeat: Infinity, repeatType: "reverse" }
                }}
              >
                <div 
                  className="rounded-full p-5 backdrop-blur-sm border shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${colorScheme.primaryDark}70, ${colorScheme.primary}80)`,
                    borderColor: colorScheme.borderLight,
                    color: colorScheme.textInverted
                  }}
                >
                  <FontAwesomeIcon icon={faPlay} className="pl-1" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <div 
        className={`absolute inset-x-0 h-24 -z-10 ${
          reverse
            ? 'top-0 -skew-y-2 translate-y-[-30%] bg-gradient-to-b from-white to-purple-50'
            : 'bottom-0 skew-y-2 translate-y-[30%] bg-gradient-to-t from-purple-50 to-white'
        }`}
        style={colorScheme === 'dark' ? { 
          background: `linear-gradient(to bottom, ${colorScheme.background}, ${colorScheme.surface})` 
        } : {}}
      />
      
      {/* Decorative elements */}
      <div 
        className={`absolute ${reverse ? 'top-10 left-1/4' : 'bottom-10 right-1/4'} w-64 h-64 rounded-full blur-3xl -z-10`}
        style={{
          background: `radial-gradient(circle, ${colorScheme.primaryLight}30, transparent 70%)`
        }}
      />
    </div>
  );
};

export default DiagonalSection;