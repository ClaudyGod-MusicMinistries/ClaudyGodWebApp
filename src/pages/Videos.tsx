/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  lazy,
  Suspense,
  memo,
} from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faPlayCircle,
  faVideo,
  faMusic,
  faMicrophoneAlt,
  faSnowflake,
  faGift,
} from '@fortawesome/free-solid-svg-icons';

// Lazy load heavier components
const LazyVideoPlayerModal = lazy(() =>
  import('../components/videos/VideoPlayerModel').then(module => ({
    default: module.default,
  }))
);

const LazyVideoCard = lazy(() =>
  import('../components/videos/VideoCard').then(module => ({
    default: module.default,
  }))
);

const LazyPaginationControls = lazy(() =>
  import('../components/videos/PaginationControls').then(module => ({
    default: module.default,
  }))
);

const LazyDiagonalSection = lazy(() =>
  import('../components/videos/DiagonalSection').then(module => ({
    default: module.default,
  }))
);

const LazyNewsletterForm = lazy(() =>
  import('../components/util/Newsletter').then(module => ({
    default: module.NewsletterForm,
  }))
);

const LazyAudioMackComponent = lazy(() =>
  import('../components/Homepage/AmazonMusic').then(module => ({
    default: module.AudioMackComponent,
  }))
);

const LazyDownloadSection = lazy(() =>
  import('../components/util/Download').then(module => ({
    default: module.DownloadSection,
  }))
);

import { videos } from '../components/data/videosData';
import { LayoutTemplate } from '../components/util/hero';
import { SEO } from '../components/util/SEO';

import { useTheme } from '../contexts/ThemeContext';
import {
  LightText,
  ExtraBoldText,
  BoldText,
  SemiBoldText,
  AbrilFatFaceText,
  ShadowsText,
  UltraText,
} from '../components/ui/fonts/typography';
import CustomButton from '../components/ui/fonts/buttons/CustomButton';
import { Back1 } from '../assets/';

// Skeleton loaders
const VideoCardSkeleton = () => (
  <div className="bg-gray-200 animate-pulse rounded-xl aspect-video" />
);

const DiagonalSectionSkeleton = () => (
  <div className="h-64 bg-gray-200 animate-pulse rounded-xl" />
);

const NewsletterSkeleton = () => (
  <div className="h-40 bg-gray-200 animate-pulse rounded-xl" />
);

const AudioMackSkeleton = () => (
  <div className="h-80 bg-gray-200 animate-pulse rounded-xl" />
);

// YouTube Thumbnail Component
const YouTubeThumbnail = memo(
  ({
    videoId,
    alt,
    className,
    quality = 'hqdefault',
  }: {
    videoId: string;
    alt: string;
    className?: string;
    quality?:
      | 'default'
      | 'mqdefault'
      | 'hqdefault'
      | 'sddefault'
      | 'maxresdefault';
  }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // YouTube thumbnail URL patterns
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;

    // Fallback qualities in case the preferred one fails
    const fallbackQualities = [
      'maxresdefault',
      'sddefault',
      'hqdefault',
      'mqdefault',
      'default',
    ];

    const handleImageError = useCallback(() => {
      setImageError(true);
    }, []);

    const handleImageLoad = useCallback(() => {
      setImageLoaded(true);
    }, []);

    if (imageError) {
      // Try next quality level
      const currentQualityIndex = fallbackQualities.indexOf(quality);
      if (currentQualityIndex < fallbackQualities.length - 1) {
        const nextQuality = fallbackQualities[currentQualityIndex + 1];
        return (
          <YouTubeThumbnail
            videoId={videoId}
            alt={alt}
            className={className}
            quality={nextQuality as any}
          />
        );
      }

      // Ultimate fallback - YouTube placeholder
      return (
        <div
          className={`${className} bg-gray-200 flex items-center justify-center`}
        >
          <FontAwesomeIcon
            icon={faPlayCircle}
            className="text-4xl text-gray-400"
          />
        </div>
      );
    }

    return (
      <div className="relative">
        {!imageLoaded && (
          <div
            className={`${className} bg-gray-200 animate-pulse absolute inset-0`}
          />
        )}
        <img
          src={thumbnailUrl}
          alt={alt}
          className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 object-cover`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }
);

// Constants
const VIDEOS_PER_PAGE = 6;

// Category icons mapping
const categoryIcons = {
  All: faVideo,
  'Music Videos': faMusic,
  Visualizers: faPlayCircle,
  'Live Sessions': faMicrophoneAlt,
  Christmas: faSnowflake,
};

// Memoized components
const VideoHeader = memo(({ colorScheme }: { colorScheme: any }) => (
  <header className="mb-8 sm:mb-12 md:mb-16 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-opacity-10 mb-6 sm:mb-8"
      style={{ backgroundColor: `${colorScheme.primary}20` }}
    >
      <FontAwesomeIcon
        icon={faVideo}
        style={{ color: colorScheme.primary }}
        className="text-sm sm:text-base"
      />
      <LightText
        style={{
          color: colorScheme.primary,
          fontSize: 'clamp(0.75rem, 3vw, 0.875rem)',
          letterSpacing: '0.05em',
        }}
        useThemeColor={false}
      >
        VIDEO COLLECTION
      </LightText>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="mb-6 sm:mb-8"
    >
      <div className="flex flex-col items-center">
        <AbrilFatFaceText
          style={{
            color: colorScheme.primary,
            fontSize: 'clamp(1.75rem, 6vw, 3rem)',
            lineHeight: '1.1',
            marginBottom: '0.25rem',
            letterSpacing: '0.02em',
          }}
          useThemeColor={false}
        >
          Worship Through
        </AbrilFatFaceText>
        <ShadowsText
          style={{
            color: colorScheme.accent,
            fontSize: 'clamp(1.875rem, 6.5vw, 3.5rem)',
            lineHeight: '1',
            letterSpacing: '0.03em',
          }}
          useThemeColor={false}
        >
          Visual Media
        </ShadowsText>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="max-w-4xl mx-auto"
    >
      <SemiBoldText
        style={{
          color: colorScheme.accent,
          fontSize: 'clamp(1rem, 3vw, 1.375rem)',
          lineHeight: '1.5',
          letterSpacing: '0.01em',
        }}
        useThemeColor={false}
      >
        Explore our collection of music videos, visualizers, and live worship
        sessions that bring the gospel to life through powerful visual
        storytelling
      </SemiBoldText>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-16 sm:w-20 md:w-24 h-1 mx-auto mt-4 sm:mt-6 rounded-full"
      style={{ backgroundColor: colorScheme.accent }}
    />
  </header>
));

const CategoryFilter = memo(
  ({
    activeCategory,
    onCategoryChange,
    colorScheme,
    hoveredCategory,
    onHoverCategory,
  }: {
    activeCategory: string;
    onCategoryChange: (category: any) => void;
    colorScheme: any;
    hoveredCategory: string | null;
    onHoverCategory: (category: string | null) => void;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 md:mb-16"
    >
      {(
        [
          'All',
          'Music Videos',
          'Visualizers',
          'Live Sessions',
          'Christmas',
        ] as const
      ).map(category => (
        <motion.div
          key={category}
          whileHover={{
            scale: 1.05,
            backgroundColor:
              hoveredCategory === category
                ? colorScheme.primary
                : colorScheme.gray[100],
            color:
              hoveredCategory === category
                ? colorScheme.primary
                : colorScheme.primary,
          }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => onHoverCategory(category)}
          onMouseLeave={() => onHoverCategory(null)}
        >
          <CustomButton
            variant={activeCategory === category ? 'primary' : 'secondary'}
            onClick={() => onCategoryChange(category)}
            className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-full flex items-center gap-2 text-xs sm:text-sm"
          >
            <BoldText className="flex items-center gap-1 sm:gap-2">
              <FontAwesomeIcon
                icon={categoryIcons[category]}
                className="text-xs sm:text-sm"
              />
              <span className="hidden xs:inline">{category}</span>
              <span className="xs:hidden">
                {category === 'All'
                  ? 'All'
                  : category === 'Music Videos'
                    ? 'Music'
                    : category === 'Visualizers'
                      ? 'Visual'
                      : category === 'Christmas'
                        ? 'Xmas'
                        : 'Live'}
              </span>
            </BoldText>
          </CustomButton>
        </motion.div>
      ))}
    </motion.div>
  )
);

const EmptyState = memo(
  ({ colorScheme, onReset }: { colorScheme: any; onReset: () => void }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      className="text-center py-8 sm:py-12 md:py-16"
    >
      <div
        className="inline-block p-4 sm:p-6 rounded-full mb-4 sm:mb-6"
        style={{ backgroundColor: colorScheme.gray[100] }}
      >
        <FontAwesomeIcon
          icon={faVideo}
          className="text-2xl sm:text-3xl md:text-4xl"
          style={{ color: colorScheme.primary }}
        />
      </div>
      <UltraText
        className="text-base sm:text-lg md:text-xl lg:text-2xl mb-3 sm:mb-4"
        style={{ color: colorScheme.primary }}
      >
        No videos found in this category
      </UltraText>
      <CustomButton
        variant="text"
        onClick={onReset}
        className="text-sm sm:text-base"
      >
        <BoldText style={{ color: colorScheme.primary }}>
          View all videos
        </BoldText>
      </CustomButton>
    </motion.div>
  )
);

const CTASection = memo(
  ({
    colorScheme,
    onScrollToGrid,
  }: {
    colorScheme: any;
    onScrollToGrid: () => void;
  }) => (
    <section
      className="w-full py-8 sm:py-12 md:py-16 text-center"
      style={{
        background: `linear-gradient(to right, ${colorScheme.primary}, ${colorScheme.secondary})`,
      }}
    >
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <UltraText
            style={{
              color: colorScheme.text,
              fontSize: 'clamp(1.375rem, 4vw, 2.5rem)',
              lineHeight: '1.2',
              marginBottom: '1.5rem sm:mb-2rem',
              letterSpacing: '0.02em',
            }}
            useThemeColor={false}
          >
            Explore Our Full Video Collection
          </UltraText>
          <CustomButton
            variant="primary"
            onClick={onScrollToGrid}
            className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base md:text-lg flex items-center mx-auto hover:scale-105 transition-transform duration-200"
            style={{
              backgroundColor: colorScheme.white,
              color: colorScheme.primary,
            }}
          >
            <BoldText className="flex items-center gap-2">
              Browse All Videos
              <FontAwesomeIcon icon={faArrowRight} />
            </BoldText>
          </CustomButton>
        </motion.div>
      </div>
    </section>
  )
);

const DividerSection = memo(({ colorScheme }: { colorScheme: any }) => (
  <div
    className="relative h-8 sm:h-12 md:h-16 lg:h-20"
    style={{
      backgroundColor: colorScheme.primary,
    }}
  >
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ backgroundColor: colorScheme.primary }}
    >
      <div
        className="w-12 sm:w-16 md:w-20 lg:w-24 h-1"
        style={{ backgroundColor: `${colorScheme.white}30` }}
      ></div>
    </div>
  </div>
));

// Christmas Section Component
const ChristmasSection = memo(
  ({
    colorScheme,
    onExploreChristmas,
  }: {
    colorScheme: any;
    onExploreChristmas: () => void;
  }) => (
    <section className="w-full py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Christmas-themed background with gradient */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(135deg, #1a936f 0%, #c72c41 50%, #1e3a8a 100%)`,
        }}
      />

      {/* Snowflake decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 16 + 8}px`,
            }}
            animate={{
              y: [0, 100],
              rotate: [0, 360],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <FontAwesomeIcon icon={faSnowflake} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          {/* Christmas Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8"
            style={{
              backgroundColor: '#c72c41',
              boxShadow: '0 4px 20px rgba(199, 44, 65, 0.3)',
            }}
          >
            <FontAwesomeIcon
              icon={faGift}
              className="text-white text-sm sm:text-base"
            />
            <LightText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(0.75rem, 3vw, 0.875rem)',
                letterSpacing: '0.05em',
              }}
              useThemeColor={false}
            >
              CHRISTMAS SPECIAL
            </LightText>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mb-6 sm:mb-8"
          >
            <AbrilFatFaceText
              style={{
                color: '#1e3a8a',
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                lineHeight: '1.1',
                marginBottom: '0.5rem',
                letterSpacing: '0.02em',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              }}
              useThemeColor={false}
            >
              Christmas Worship
            </AbrilFatFaceText>
            <ShadowsText
              style={{
                background: 'linear-gradient(135deg, #c72c41 0%, #1a936f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: 'clamp(1.875rem, 5.5vw, 3rem)',
                lineHeight: '1',
                letterSpacing: '0.03em',
              }}
              useThemeColor={false}
            >
              & Celebration
            </ShadowsText>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto mb-8 sm:mb-10"
          >
            <SemiBoldText
              style={{
                color: '#374151',
                fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                lineHeight: '1.6',
                letterSpacing: '0.01em',
              }}
              useThemeColor={false}
            >
              Experience the joy and wonder of the Christmas season through
              special worship videos.
            </SemiBoldText>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <CustomButton
              onClick={onExploreChristmas}
              className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg flex items-center mx-auto hover:scale-105 transition-all duration-300 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #c72c41 0%, #1e3a8a 100%)',
                color: 'white',
              }}
            >
              <BoldText className="flex items-center gap-2 sm:gap-3">
                <FontAwesomeIcon icon={faSnowflake} />
                Explore Christmas Videos
                <FontAwesomeIcon icon={faArrowRight} />
              </BoldText>
            </CustomButton>
          </motion.div>

          {/* Decorative divider */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-24 h-1 mx-auto mt-6 sm:mt-8 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #c72c41, #1e3a8a)',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
);

// Main Videos Component
export const VideosData: React.FC = memo(() => {
  const { colorScheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<
    'All' | 'Music Videos' | 'Visualizers' | 'Live Sessions' | 'Christmas'
  >('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const videoGridRef = useRef<HTMLDivElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Memoized filtered videos
  const filteredVideos = useMemo(
    () =>
      activeCategory === 'All'
        ? videos
        : videos.filter(video => video.category === activeCategory),
    [activeCategory]
  );

  // Memoized pagination data
  const totalPages = useMemo(
    () => Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE),
    [filteredVideos.length]
  );

  const paginatedVideos = useMemo(
    () =>
      filteredVideos.slice(
        (currentPage - 1) * VIDEOS_PER_PAGE,
        currentPage * VIDEOS_PER_PAGE
      ),
    [filteredVideos, currentPage]
  );

  // Optimized event handlers
  const scrollToVideoGrid = useCallback(() => {
    videoGridRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleCategoryChange = useCallback(
    (category: typeof activeCategory) => {
      setActiveCategory(category);
      setCurrentPage(1);
    },
    []
  );

  const handleVideoSelect = useCallback((videoId: string) => {
    setSelectedVideoId(videoId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedVideoId(null);
  }, []);

  const handleHoverCategory = useCallback((category: string | null) => {
    setHoveredCategory(category);
  }, []);

  const handleResetCategory = useCallback(() => {
    setActiveCategory('All');
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleExploreChristmas = useCallback(() => {
    setActiveCategory('Christmas');
    scrollToVideoGrid();
  }, [scrollToVideoGrid]);

  // SEO structured data
  const seoStructuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'VideoGallery',
      name: 'ClaudyGod Video Collection',
      description:
        'Music videos, visualizers, live worship sessions and Christmas specials',
      url: 'https://claudygod.org/videos',
      publisher: {
        '@type': 'Person',
        name: 'ClaudyGod',
      },
    }),
    []
  );

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: '#f8f9fa' }}
    >
      <SEO
        title="ClaudyGod Videos - Music Videos, Visualizers & Live Sessions"
        description="Watch ClaudyGod's music videos, visualizers, live worship sessions and Christmas specials. Experience the divine fusion of American Contemporary Christian Music and Afro-Gospel."
        keywords="claudygod videos, gospel music videos, worship sessions, christian music visualizers, live performances, christmas worship videos"
        canonical="https://claudygod.org/videos"
        image="https://claudygod.org/images/videos-og.jpg"
        structuredData={seoStructuredData}
      />

      {/* Video Player Modal */}
      <Suspense fallback={null}>
        <LazyVideoPlayerModal
          videoId={selectedVideoId}
          onClose={handleCloseModal}
        />
      </Suspense>

      {/* Hero Section */}
      <LayoutTemplate
        backgroundImage={Back1}
        overlayColor="rgba(0,0,0,0.55)"
        backgroundPosition="center center"
        className="h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-[100vh] min-h-[500px]"
        title={''}
      >
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center text-center w-full h-full px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            <AbrilFatFaceText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2rem, 8vw, 4.5rem)',
                lineHeight: '1.1',
                textShadow: '0 4px 12px rgba(0,0,0,0.8)',
                letterSpacing: '0.02em',
                marginBottom: '0.5rem',
              }}
              useThemeColor={false}
            >
              Videos
            </AbrilFatFaceText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mb-4 sm:mb-6 md:mb-8 mx-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <SemiBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.125rem, 4vw, 1.75rem)',
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                lineHeight: '1.4',
                letterSpacing: '0.01em',
              }}
              useThemeColor={false}
            >
              Experience the divine fusion of American Contemporary Christian
              Music and Afro-Gospel
            </SemiBoldText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-6 sm:mt-8"
          >
            <CustomButton
              onClick={scrollToVideoGrid}
              size="lg"
              className="transition-transform duration-300 ease-in-out hover:bg-white/20 text-white border-white border-2 px-4 sm:px-6 py-2 sm:py-3"
              style={{ backgroundColor: colorScheme.accent }}
            >
              <BoldText fontSize="clamp(0.875rem, 2vw, 1rem)">
                <span className="rounded-md inline-flex items-center gap-2">
                  Browse Videos
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </BoldText>
            </CustomButton>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-5 h-8 border-2 border-white rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-2 bg-white rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </LayoutTemplate>

      {/* Video Content */}
      <article className="w-full">
        {/* Section Header */}
        <section className="w-full py-8 sm:py-12 md:py-16">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <VideoHeader colorScheme={colorScheme} />

            {/* Christmas Section */}
            <ChristmasSection
              colorScheme={colorScheme}
              onExploreChristmas={handleExploreChristmas}
            />

            {/* Diagonal Sections */}
            <section className="space-y-8 sm:space-y-12 md:space-y-20">
              <Suspense fallback={<DiagonalSectionSkeleton />}>
                <LazyDiagonalSection
                  title="Music Videos"
                  description="Professionally produced music videos showcasing ClaudyGod's worship ministry"
                  category="Music Videos"
                  videos={videos}
                  onExplore={() => {
                    handleCategoryChange('Music Videos');
                    scrollToVideoGrid();
                  }}
                />
              </Suspense>

              <Suspense fallback={<DiagonalSectionSkeleton />}>
                <LazyDiagonalSection
                  title="Visualizers"
                  description="Mesmerizing audio visualizers that enhance your worship experience"
                  category="Visualizers"
                  videos={videos}
                  reverse
                  onExplore={() => {
                    handleCategoryChange('Visualizers');
                    scrollToVideoGrid();
                  }}
                />
              </Suspense>

              <Suspense fallback={<DiagonalSectionSkeleton />}>
                <LazyDiagonalSection
                  title="Live Sessions"
                  description="Captivating live performances filled with spiritual energy"
                  category="Live Sessions"
                  videos={videos}
                  onExplore={() => {
                    handleCategoryChange('Live Sessions');
                    scrollToVideoGrid();
                  }}
                />
              </Suspense>
            </section>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          colorScheme={colorScheme}
          onScrollToGrid={scrollToVideoGrid}
        />

        {/* Video Grid Section */}
        <section
          ref={videoGridRef}
          className="w-full py-8 sm:py-12 md:py-16 lg:py-20"
          style={{
            background: `linear-gradient(to bottom, ${colorScheme.background}, ${colorScheme.gray[50]})`,
          }}
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filter */}
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              colorScheme={colorScheme}
              hoveredCategory={hoveredCategory}
              onHoverCategory={handleHoverCategory}
            />

            {/* Video Grid */}
            {paginatedVideos.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
              >
                {paginatedVideos.map(video => (
                  <Suspense key={video.id} fallback={<VideoCardSkeleton />}>
                    <LazyVideoCard
                      content={video}
                      onSelect={handleVideoSelect}
                    />
                  </Suspense>
                ))}
              </motion.div>
            ) : (
              <EmptyState
                colorScheme={colorScheme}
                onReset={handleResetCategory}
              />
            )}

            {/* Pagination */}
            {paginatedVideos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.3 }}
                className="mt-8 sm:mt-12 md:mt-16"
              >
                <Suspense
                  fallback={
                    <div className="h-12 bg-gray-200 animate-pulse rounded" />
                  }
                >
                  <LazyPaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </Suspense>
              </motion.div>
            )}
          </div>
        </section>

        {/* Divider */}
        <DividerSection colorScheme={colorScheme} />
      </article>

      {/* Additional Sections */}
      <Suspense fallback={<AudioMackSkeleton />}>
        <LazyAudioMackComponent />
      </Suspense>

      {/* Download Section */}
      <Suspense fallback={<div className="h-40 bg-gray-200 animate-pulse" />}>
        <LazyDownloadSection />
      </Suspense>

      {/* Newsletter Section */}
      <section
        className="w-full py-8 sm:py-12 md:py-16"
        style={{
          background: `linear-gradient(135deg, ${colorScheme.gray[50]}, ${colorScheme.gray[100]})`,
        }}
      >
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<NewsletterSkeleton />}>
            <LazyNewsletterForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
});

export default VideosData;
