import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { music1 } from '../../assets';
import {
  ExtraBoldText,
  RegularText,
  SemiBoldText,
  AbrilFatFaceText,
  ShadowsText,
} from '../ui/fonts/typography';
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
}> = ({ title, description, category, videos, reverse = false, onExplore }) => {
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
      className="relative w-screen overflow-hidden"
      style={{
        backgroundColor: '#ffffff',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        width: '100vw',
      }}
    >
      {/* Top Divider */}
      <div
        className="w-full h-px"
        style={{ backgroundColor: colorScheme.border }}
      />

      <div
        className={`w-full grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-16 items-center ${
          reverse ? 'flex-row-reverse' : ''
        }`}
      >
        {/* Content Section */}
        <motion.div
          className={`w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-12 lg:py-16 ${
            reverse ? 'xl:order-2 xl:pl-12 2xl:pl-16' : 'xl:pr-12 2xl:pr-16'
          }`}
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-2xl">
            <div className="mb-6 lg:mb-8">
              <AbrilFatFaceText
                style={{
                  color: colorScheme.primary,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  lineHeight: '1.1',
                  letterSpacing: '0.02em',
                }}
              >
                {title}
              </AbrilFatFaceText>
            </div>

            <RegularText
              className="mb-8 lg:mb-10 max-w-xl"
              style={{
                color: colorScheme.textTertiary,
                fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                lineHeight: '1.75',
              }}
            >
              {description}
            </RegularText>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: colorScheme.buttonHover,
              }}
              whileTap={{ scale: 0.98 }}
              onClick={onExplore}
              className="relative px-6 lg:px-8 py-3 lg:py-4 rounded-full flex items-center gap-3 group overflow-hidden w-full sm:w-auto"
              style={{
                backgroundColor: colorScheme.button,
                color: colorScheme.buttonText,
              }}
            >
              <SemiBoldText className="relative z-10 text-sm lg:text-base">
                Watch Now
              </SemiBoldText>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 text-sm lg:text-base"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-300 z-0"
                style={{ backgroundColor: colorScheme.buttonActive }}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Vertical Divider for Desktop */}
        <div
          className={`hidden xl:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-3/4 ${
            reverse ? 'xl:hidden' : ''
          }`}
          style={{ backgroundColor: colorScheme.border }}
        />

        {/* Video Slider Section */}
        <motion.div
          className={`w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-8 lg:py-12 ${
            reverse ? 'xl:order-1' : ''
          }`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-full">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl lg:rounded-2xl shadow-2xl">
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
                      onError={e => {
                        const target = e.currentTarget;
                        target.src = music1;
                      }}
                    />
                  </div>
                ))}

                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 transition-opacity duration-500"
                  style={{ opacity: isHovered ? 0.6 : 0.8 }}
                />

                <div
                  className="absolute bottom-0 left-0 right-0 p-4 lg:p-5 transition-opacity duration-500"
                  style={{ opacity: isHovered ? 1 : 0 }}
                >
                  <ExtraBoldText
                    className="text-lg lg:text-xl mb-1 truncate"
                    style={{ color: '#FFFFFF' }}
                  >
                    {categoryVideos[currentSlideIndex]?.title}
                  </ExtraBoldText>
                  <RegularText
                    className="text-xs lg:text-sm"
                    style={{ color: '#E5E7EB' }}
                  >
                    {categoryVideos[currentSlideIndex]?.date}
                  </RegularText>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700/30">
                  <motion.div
                    key={currentSlideIndex}
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, ease: 'linear' }}
                  />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="text-4xl lg:text-5xl"
                    animate={{
                      opacity: isHovered ? 0 : 1,
                      scale: isHovered ? 0.8 : [1, 1.1, 1],
                    }}
                    transition={{
                      opacity: { duration: 0.3 },
                      scale: {
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: 'reverse',
                      },
                    }}
                  >
                    <div
                      className="rounded-full p-3 lg:p-4 w-12 h-12 lg:w-16 lg:h-16 backdrop-blur-sm border shadow-lg flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${colorScheme.primaryDark}70, ${colorScheme.primary}80)`,
                        borderColor: colorScheme.borderLight,
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faPlay}
                        className="text-base lg:text-lg"
                        style={{ color: colorScheme.textInverted }}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Divider */}
      <div
        className="w-full h-px"
        style={{ backgroundColor: colorScheme.border }}
      />

      {/* Diagonal Background Elements - Removed since we have clean white background */}

      {/* Decorative elements - Made more subtle */}
      <div
        className={`absolute ${
          reverse
            ? 'top-8 lg:top-10 left-1/4'
            : 'bottom-8 lg:bottom-10 right-1/4'
        } w-48 h-48 lg:w-64 lg:h-64 rounded-full blur-3xl -z-10 opacity-20`}
        style={{
          background: `radial-gradient(circle, ${colorScheme.primaryLight}10, transparent 70%)`,
        }}
      />
    </div>
  );
};

export default DiagonalSection;
