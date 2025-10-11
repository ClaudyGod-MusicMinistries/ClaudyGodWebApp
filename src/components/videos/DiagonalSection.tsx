/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
} from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { music1 } from '../../assets';
import {
  ExtraBoldText,
  RegularText,
  SemiBoldText,
  AbrilFatFaceText,
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

// Memoized components
const Divider = memo(
  ({
    colorScheme,
    className = '',
  }: {
    colorScheme: any;
    className?: string;
  }) => (
    <div
      className={`w-full h-[0.5px] ${className}`}
      style={{
        backgroundColor: colorScheme.border + '30',
        background: `linear-gradient(90deg, transparent 0%, ${colorScheme.border}20 50%, transparent 100%)`,
      }}
    />
  )
);

const VerticalDivider = memo(
  ({ colorScheme, reverse }: { colorScheme: any; reverse: boolean }) => (
    <div
      className={`hidden xl:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[0.5px] h-3/4 ${
        reverse ? 'xl:hidden' : ''
      }`}
      style={{
        backgroundColor: colorScheme.border + '25',
        background: `linear-gradient(180deg, transparent 0%, ${colorScheme.border}20 20%, ${colorScheme.border}20 80%, transparent 100%)`,
      }}
    />
  )
);

const DecorativeElement = memo(
  ({ colorScheme, reverse }: { colorScheme: any; reverse: boolean }) => (
    <div
      className={`absolute ${
        reverse ? 'top-8 lg:top-10 left-1/4' : 'bottom-8 lg:bottom-10 right-1/4'
      } w-48 h-48 lg:w-64 lg:h-64 rounded-full blur-3xl -z-10 opacity-20`}
      style={{
        background: `radial-gradient(circle, ${colorScheme.primaryLight}10, transparent 70%)`,
      }}
    />
  )
);

const VideoSlide = memo(
  ({
    video,
    isActive,
    onError,
  }: {
    video: VideoType;
    isActive: boolean;
    onError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  }) => (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <img
        src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
        alt={video.title}
        className="w-full h-full object-cover"
        onError={onError}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
);

const PlayButton = memo(
  ({ isHovered, colorScheme }: { isHovered: boolean; colorScheme: any }) => (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
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
  )
);

const ProgressBar = memo(
  ({ currentSlideIndex }: { currentSlideIndex: number }) => (
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700/30">
      <motion.div
        key={currentSlideIndex}
        className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 3, ease: 'linear' }}
      />
    </div>
  )
);

const VideoInfo = memo(
  ({ video, isHovered }: { video: VideoType; isHovered: boolean }) => (
    <div
      className="absolute bottom-0 left-0 right-0 p-4 lg:p-5 transition-opacity duration-500"
      style={{ opacity: isHovered ? 1 : 0 }}
    >
      <ExtraBoldText
        className="text-lg lg:text-xl mb-1 truncate"
        style={{ color: '#FFFFFF' }}
      >
        {video?.title}
      </ExtraBoldText>
      <RegularText className="text-xs lg:text-sm" style={{ color: '#E5E7EB' }}>
        {video?.date}
      </RegularText>
    </div>
  )
);

const ExploreButton = memo(
  ({ onExplore, colorScheme }: { onExplore: () => void; colorScheme: any }) => (
    <motion.button
      whileHover={{
        scale: 1.05,
        backgroundColor: colorScheme.buttonHover,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onExplore}
      className="relative px-6 sm:px-8 md:px-10 lg:px-8 py-3 lg:py-4 rounded-full flex items-center justify-center gap-3 group overflow-hidden w-auto min-w-[140px] sm:min-w-[160px] md:min-w-[180px]"
      style={{
        backgroundColor: colorScheme.button,
        color: colorScheme.buttonText,
      }}
    >
      <SemiBoldText className="relative z-10 text-sm sm:text-base lg:text-base whitespace-nowrap">
        Watch Now
      </SemiBoldText>
      <FontAwesomeIcon
        icon={faArrowRight}
        className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 text-sm sm:text-base lg:text-base"
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-300 z-0"
        style={{ backgroundColor: colorScheme.buttonActive }}
      />
    </motion.button>
  )
);

const DiagonalSection: React.FC<{
  title: string;
  description: string;
  category: 'Music Videos' | 'Visualizers' | 'Live Sessions';
  videos: VideoType[];
  reverse?: boolean;
  onExplore: () => void;
}> = memo(
  ({ title, description, category, videos, reverse = false, onExplore }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const { colorScheme } = useTheme();

    // Memoized category videos
    const categoryVideos = useMemo(
      () => videos.filter(video => video.category === category),
      [videos, category]
    );

    // Memoized current video
    const currentVideo = useMemo(
      () => categoryVideos[currentSlideIndex],
      [categoryVideos, currentSlideIndex]
    );

    // Optimized auto-slide effect
    useEffect(() => {
      if (isHovered && categoryVideos.length > 1) {
        intervalRef.current = setInterval(() => {
          setCurrentSlideIndex(prev => (prev + 1) % categoryVideos.length);
        }, 3000);
      } else if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [isHovered, categoryVideos.length]);

    // Optimized event handlers
    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    const handleImageError = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.currentTarget;
        target.src = music1;
      },
      []
    );

    const handleExplore = useCallback(() => {
      onExplore();
    }, [onExplore]);

    // Early return if no videos in category
    if (categoryVideos.length === 0) {
      return null;
    }

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
        <Divider colorScheme={colorScheme} />

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

              <ExploreButton
                onExplore={handleExplore}
                colorScheme={colorScheme}
              />
            </div>
          </motion.div>

          <VerticalDivider colorScheme={colorScheme} reverse={reverse} />

          {/* Video Slider Section */}
          <motion.div
            className={`w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-8 lg:py-12 ${
              reverse ? 'xl:order-1' : ''
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-full">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl lg:rounded-2xl shadow-2xl">
                <div className="relative w-full h-full overflow-hidden">
                  {categoryVideos.map((video, index) => (
                    <VideoSlide
                      key={video.id}
                      video={video}
                      isActive={index === currentSlideIndex}
                      onError={handleImageError}
                    />
                  ))}

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 transition-opacity duration-500"
                    style={{ opacity: isHovered ? 0.6 : 0.8 }}
                  />

                  {currentVideo && (
                    <VideoInfo video={currentVideo} isHovered={isHovered} />
                  )}

                  <ProgressBar currentSlideIndex={currentSlideIndex} />

                  <PlayButton isHovered={isHovered} colorScheme={colorScheme} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <Divider colorScheme={colorScheme} />

        <DecorativeElement colorScheme={colorScheme} reverse={reverse} />
      </div>
    );
  }
);

DiagonalSection.displayName = 'DiagonalSection';

export default DiagonalSection;
