import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { About2 } from '../../assets';
import { VideoProps, videos } from '../../components/data/FeaturedData';
import {
  SemiBoldText,
  BoldText,
  LightText,
  ExtraBoldText,
  ExtraLightText,
  RegularText,
} from '../ui/fonts/typography';
import { useTheme } from '../../contexts/ThemeContext';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faChevronLeft,
  faChevronRight,
  faClock,
  faImage,
} from '@fortawesome/free-solid-svg-icons';

const VideoCard: React.FC<VideoProps> = ({
  title,
  thumbnailUrl,
  duration,
  youtubeUrl,
}) => {
  const { colorScheme } = useTheme();
  const [imageError, setImageError] = useState(false);
  const [currentThumbnail, setCurrentThumbnail] = useState(thumbnailUrl);

  // Fallback through different YouTube thumbnail qualities
  const getFallbackThumbnail = (url: string) => {
    if (url.includes('maxresdefault.jpg')) {
      return url.replace('maxresdefault.jpg', 'hqdefault.jpg');
    } else if (url.includes('hqdefault.jpg')) {
      return url.replace('hqdefault.jpg', 'mqdefault.jpg');
    } else if (url.includes('mqdefault.jpg')) {
      return url.replace('mqdefault.jpg', 'sddefault.jpg');
    }
    return url;
  };

  const handleImageError = () => {
    if (
      currentThumbnail.includes('maxresdefault.jpg') ||
      currentThumbnail.includes('hqdefault.jpg') ||
      currentThumbnail.includes('mqdefault.jpg')
    ) {
      // Try next quality level
      const fallbackUrl = getFallbackThumbnail(currentThumbnail);
      setCurrentThumbnail(fallbackUrl);
    } else {
      // All fallbacks failed
      setImageError(true);
    }
  };

  return (
    <motion.div
      className="group relative flex flex-col w-full"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
    >
      <a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative rounded-xl overflow-hidden aspect-video shadow-lg bg-gray-800"
      >
        <div
          className="relative overflow-hidden rounded-xl w-full h-full"
          style={{ borderRadius: colorScheme.borderRadius.large }}
        >
          {/* YouTube Thumbnail with progressive fallback */}
          {!imageError ? (
            <img
              src={currentThumbnail}
              alt={title}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              loading="lazy"
              onError={handleImageError}
            />
          ) : (
            // Fallback when all thumbnails fail
            <div className="w-full h-full flex items-center justify-center bg-gray-700">
              <div className="text-center">
                <FontAwesomeIcon
                  icon={faImage}
                  className="w-12 h-12 mb-2"
                  style={{ color: colorScheme.gray[400] }}
                />
                <ExtraLightText
                  fontSize="14px"
                  style={{ color: colorScheme.gray[400] }}
                >
                  Thumbnail not available
                </ExtraLightText>
              </div>
            </div>
          )}

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 flex items-end p-3 sm:p-4"
            style={{
              background: `linear-gradient(to top, ${colorScheme.black}/90, transparent 50%)`,
              borderRadius: colorScheme.borderRadius.large,
            }}
          >
            <div
              className="flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-1 rounded-md"
              style={{
                backgroundColor: colorScheme.accent + '80',
                backdropFilter: 'blur(4px)',
              }}
            >
              <FontAwesomeIcon
                icon={faClock}
                className="text-xs"
                style={{ color: colorScheme.white }}
              />
              <ExtraLightText
                fontSize="10px sm:text-xs"
                style={{ color: colorScheme.white }}
              >
                {duration}
              </ExtraLightText>
            </div>
          </div>

          {/* Play Button Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ borderRadius: colorScheme.borderRadius.large }}
          >
            <motion.div
              className="rounded-full p-3 sm:p-4 shadow-xl"
              style={{ backgroundColor: colorScheme.accent }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <FontAwesomeIcon
                icon={faPlay}
                className="w-4 h-4 sm:w-5 sm:h-5"
                style={{ color: colorScheme.white }}
              />
            </motion.div>
          </div>
        </div>
      </a>

      {/* Title */}
      <div className="mt-3 sm:mt-4 px-2">
        <SemiBoldText
          fontSize="14px sm:text-[16px] md:text-[18px]"
          className="line-clamp-2 leading-tight"
          style={{ color: colorScheme.white }}
        >
          {title}
        </SemiBoldText>
      </div>
    </motion.div>
  );
};

export const FeaturedVideos: React.FC = () => {
  const { colorScheme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const [autoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Timing controls
  const AUTO_PLAY_INTERVAL = 8000; // 8 seconds between slides
  const SLIDE_TRANSITION_DURATION = 0.8; // 800ms slide animation
  const SLIDE_EASE = 'easeInOut'; // Use a valid easing function

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1280)
        setItemsPerSlide(4); // xl screens
      else if (w >= 1024)
        setItemsPerSlide(3); // lg screens
      else if (w >= 768)
        setItemsPerSlide(2); // md screens
      else if (w >= 640)
        setItemsPerSlide(1); // sm screens
      else setItemsPerSlide(1); // xs screens
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!autoPlay || isHovered) return;
    const iv = setInterval(() => {
      setDirection('right');
      setActiveIndex(i => (i + 1) % Math.ceil(videos.length / itemsPerSlide));
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(iv);
  }, [autoPlay, itemsPerSlide, isHovered]);

  const totalSlides = Math.ceil(videos.length / itemsPerSlide);
  const visibleVideos = videos.slice(
    activeIndex * itemsPerSlide,
    activeIndex * itemsPerSlide + itemsPerSlide
  );

  const handlePrev = () => {
    setDirection('left');
    setActiveIndex(i => (i - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setDirection('right');
    setActiveIndex(i => (i + 1) % totalSlides);
  };

  return (
    <section
      className="relative py-12 md:py-20 lg:py-24 min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: colorScheme.black }}
    >
      {/* Background with parallax effect */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${About2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        initial={{ scale: 1 }}
        whileInView={{ scale: 1.05 }}
        transition={{ duration: 10 }}
      >
        {/* Very dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
        to bottom, 
        ${colorScheme.background}cc,    /* 80% opacity black */
        ${colorScheme.accent}50,  /* 60% opacity accent */
        ${colorScheme.background}cc     /* 80% opacity black */
      )`,
          }}
        />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, ${colorScheme.accent} 0%, transparent 70%)`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.1,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10 px-4 sm:px-6">
        {/* Header section - Improved spacing for mobile */}
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between w-full mb-8 md:mb-12 lg:mb-16">
          {/* Heading & Subheading - FIXED: Smaller mobile, larger desktop */}
          <div className="flex flex-col text-center md:text-left mt-8 md:mt-0 mb-6 md:mb-0">
            <ExtraBoldText
              fontSize="24px md:text-5xl lg:text-6xl xl:text-7xl"
              className="leading-tight md:leading-[1.1]"
              style={{ color: colorScheme.white }}
            >
              Featured <span style={{ color: colorScheme.accent }}>Videos</span>
            </ExtraBoldText>

            <SemiBoldText
              fontSize="12px md:text-lg lg:text-xl"
              className="mt-3 md:mt-4 max-w-2xl mx-auto md:mx-0"
              style={{ color: colorScheme.accent }}
            >
              Experience our latest worship sessions and musical performances
            </SemiBoldText>
          </div>

          {/* Buttons - Improved mobile layout */}
          <motion.div
            className="flex flex-row flex-wrap gap-3 md:gap-4 justify-center md:justify-end items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/music" className="w-auto">
              <CustomButton
                variant="primary"
                size="sm"
                className="flex items-center justify-center px-4 py-2 md:px-6 md:py-3 group"
                icon={<FontAwesomeIcon icon={faPlay} />}
                iconPosition="right"
              >
                <SemiBoldText className="text-sm md:text-base">
                  Latest Release
                </SemiBoldText>
              </CustomButton>
            </Link>

            <Link to="/videos" className="w-auto">
              <CustomButton
                variant="outline"
                size="sm"
                className="flex items-center justify-center px-4 py-2 md:px-6 md:py-3"
                style={{
                  borderColor: colorScheme.primary,
                  color: colorScheme.background,
                }}
                hoverStyle={{ backgroundColor: colorScheme.accent + '20' }}
              >
                <RegularText
                  className="text-sm md:text-base"
                  style={{ color: colorScheme.background }}
                >
                  View All
                </RegularText>
              </CustomButton>
            </Link>
          </motion.div>
        </div>

        {/* Video Slider */}
        <motion.div
          className="relative overflow-hidden py-6 md:py-8 lg:py-10 rounded-xl md:rounded-2xl"
          style={{
            backgroundColor: colorScheme.black + '80',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${colorScheme.accent}30`,
            boxShadow: `0 20px 40px ${colorScheme.black}80`,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Navigation Arrows - Smaller on mobile */}
          <motion.button
            onClick={handlePrev}
            className="absolute left-2 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full shadow-lg"
            style={{
              backgroundColor: colorScheme.black + '80',
              backdropFilter: 'blur(4px)',
              border: `1px solid ${colorScheme.accent}30`,
            }}
            whileHover={{
              backgroundColor: colorScheme.accent + '80',
              scale: 1.1,
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            aria-label="Previous videos"
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="w-4 h-4 md:w-5 md:h-5"
              style={{ color: colorScheme.white }}
            />
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="absolute right-2 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full shadow-lg"
            style={{
              backgroundColor: colorScheme.black + '80',
              backdropFilter: 'blur(4px)',
              border: `1px solid ${colorScheme.accent}30`,
            }}
            whileHover={{
              backgroundColor: colorScheme.accent + '80',
              scale: 1.1,
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            aria-label="Next videos"
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className="w-4 h-4 md:w-5 md:h-5"
              style={{ color: colorScheme.white }}
            />
          </motion.button>

          {/* Slider Content */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: direction === 'left' ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 'left' ? 100 : -100 }}
              transition={{
                duration: SLIDE_TRANSITION_DURATION,
                ease: SLIDE_EASE,
              }}
              className="px-3 sm:px-4 md:px-6 lg:px-8"
            >
              <div
                className={`grid gap-3 md:gap-4 lg:gap-6 mx-auto ${
                  itemsPerSlide === 4
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : itemsPerSlide === 3
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                      : itemsPerSlide === 2
                        ? 'grid-cols-1 sm:grid-cols-2'
                        : 'grid-cols-1'
                }`}
              >
                {visibleVideos.map(video => (
                  <VideoCard key={video.id} {...video} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Pagination */}
        <motion.div
          className="flex justify-center mt-8 md:mt-10 gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {Array.from({ length: totalSlides }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setDirection(i > activeIndex ? 'right' : 'left');
                setActiveIndex(i);
              }}
              className={`rounded-full transition-all ${
                i === activeIndex ? 'scale-125' : 'hover:scale-110'
              }`}
              style={{
                backgroundColor:
                  i === activeIndex
                    ? colorScheme.accent
                    : colorScheme.gray[600],
                width:
                  i === activeIndex ? '1.25rem md:1.5rem' : '0.5rem md:0.75rem',
                height: '0.5rem md:0.75rem',
              }}
              whileHover={{ scale: 1.2 }}
              aria-label={`Go to slide ${i + 1}`}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 15,
                duration: 0.4,
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
