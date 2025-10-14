/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useCallback,
  useMemo,
  lazy,
  Suspense,
  memo,
  useEffect,
  useRef,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faArrowRight,
  faNewspaper,
  faMusic,
  faMapMarkerAlt,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Tour1 } from '../assets/';

// Lazy loaded components
const LazyArtistQuote = lazy(() =>
  import('../components/news/ArtistQuote').then(module => ({
    default: module.ArtistQuote,
  }))
);

const LazyNewsletterForm = lazy(() =>
  import('../components/util/Newsletter').then(module => ({
    default: module.NewsletterForm,
  }))
);

const LazyDonationCallToAction = lazy(() =>
  import('../components/util/DonationSupport').then(module => ({
    default: module.DonationCallToAction,
  }))
);

const LazyFollowUs = lazy(() =>
  import('../components/news/Tournews').then(module => ({
    default: module.FollowUs,
  }))
);

const LazyAlbumsSection = lazy(() =>
  import('../components/news/AlbumSection').then(module => ({
    default: module.AlbumsSection,
  }))
);

const LazySEO = lazy(() =>
  import('../components/util/SEO').then(module => ({
    default: module.SEO,
  }))
);

// Design System
import {
  ExtraBoldText,
  RegularText,
  SemiBoldText,
  LightText,
  AbrilFatFaceText,
} from '../components/ui/fonts/typography';
import CustomButton from '../components/ui/fonts/buttons/CustomButton';
import { useTheme } from '../contexts/ThemeContext';
import { LayoutTemplate } from '../components/util/hero';

// Import video data
import { videos, VideoType } from '../components/data/videosData';

// Skeleton loaders
const ArtistQuoteSkeleton = () => (
  <div className="h-24 bg-gray-200 animate-pulse rounded-lg mb-4" />
);

const AlbumsSectionSkeleton = () => (
  <div className="h-48 bg-gray-200 animate-pulse rounded-lg mb-4" />
);

const NewsletterSkeleton = () => (
  <div className="h-24 bg-gray-200 animate-pulse rounded-lg my-4" />
);

const DonationSkeleton = () => (
  <div className="h-32 bg-gray-200 animate-pulse rounded-lg my-4" />
);

// Live Sessions Component
const LiveSessionsSection: React.FC<{
  title?: string;
  description?: string;
  className?: string;
}> = ({
  title = 'Check Out Our Live Sessions',
  description = 'Experience the powerful live worship sessions by Min. ClaudyGod and her worship team. These recordings capture the spirit and energy of our live performances.',
  className = '',
}) => {
  const { colorScheme } = useTheme();

  const liveSessionVideos = videos.filter(
    video => video.category === 'Live Sessions'
  );

  const [selectedVideo, setSelectedVideo] = useState<VideoType>(
    liveSessionVideos[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
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

  const getThumbnailUrl = (
    youtubeId: string,
    quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'hq'
  ) => {
    const qualities = {
      default: 'default.jpg',
      hq: 'hqdefault.jpg',
      mq: 'mqdefault.jpg',
      sd: 'sddefault.jpg',
      maxres: 'maxresdefault.jpg',
    };
    return `https://img.youtube.com/vi/${youtubeId}/${qualities[quality]}`;
  };

  const handleVideoSelect = (video: VideoType) => {
    setIsLoading(true);
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <section
      className={`w-full py-8 lg:py-12 ${className}`}
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
            lgFontSize="2.25rem"
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
            fontSize="1rem"
            style={{ color: colorScheme.textSecondary }}
            className="max-w-3xl mb-6 lg:mb-8"
          >
            {description}
          </RegularText>
        </motion.div>

        {/* Main YouTube Video Player */}
        <div className="mb-8 lg:mb-12 rounded-xl overflow-hidden shadow-lg">
          <div className="relative aspect-video bg-black">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            )}
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=${isPlaying ? 1 : 0}&rel=0&modestbranding=1`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              frameBorder="0"
              onLoad={handleIframeLoad}
              loading="eager"
            />
          </div>
          <div
            className="p-4 sm:p-6 rounded-b-xl"
            style={{ backgroundColor: colorScheme.background }}
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
              <FontAwesomeIcon
                icon={faArrowRight}
                className="rotate-180 text-sm"
              />
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-2 shadow-lg hidden md:block"
              style={{ color: colorScheme.primary }}
              aria-label="Scroll right"
            >
              <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
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
                    ? 'ring-2 scale-[1.02]'
                    : 'opacity-80 hover:opacity-100'
                } rounded-lg overflow-hidden`}
                style={{
                  border:
                    selectedVideo.id === video.id
                      ? `2px solid ${colorScheme.primary}`
                      : 'none',
                }}
                onClick={() => handleVideoSelect(video)}
              >
                <div className="relative aspect-video bg-gray-700 rounded-t-lg overflow-hidden">
                  <img
                    src={getThumbnailUrl(video.youtubeId, 'hq')}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm">
                      <FontAwesomeIcon
                        icon={faPlay}
                        className="text-white text-sm ml-0.5"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="p-4 rounded-b-lg"
                  style={{ backgroundColor: colorScheme.background }}
                >
                  <h3
                    className="font-semibold text-sm mb-2 line-clamp-1"
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

// Memoized components
const NewsHeader = memo(({ colorScheme }: { colorScheme: any }) => (
  <header className="mb-8 sm:mb-12 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-opacity-10 mb-4"
      style={{ backgroundColor: `${colorScheme.primary}20` }}
    >
      <FontAwesomeIcon
        icon={faNewspaper}
        style={{ color: colorScheme.primary }}
        className="text-sm"
      />
      <LightText
        style={{
          color: colorScheme.primary,
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
        }}
        useThemeColor={false}
      >
        LATEST UPDATES
      </LightText>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <AbrilFatFaceText
        style={{
          color: colorScheme.text,
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          lineHeight: '1.1',
          marginBottom: '0.5rem',
        }}
        useThemeColor={false}
      >
        Ministry News & Events
      </AbrilFatFaceText>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="max-w-2xl mx-auto mt-4"
    >
      <SemiBoldText
        fontSize="1.5rem"
        lgFontSize="1.75rem"
        style={{ color: colorScheme.primary }}
      >
        Transformative Worship Experiences
      </SemiBoldText>
      <RegularText
        style={{
          color: colorScheme.background,
          fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
          lineHeight: '1.6',
        }}
        useThemeColor={false}
      >
        Bringing divine worship experiences to communities worldwide through
        music, prayer, and fellowship
      </RegularText>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-16 h-1 mx-auto mt-6 rounded-full"
      style={{ backgroundColor: colorScheme.primary }}
    />
  </header>
));

const MusicTourIntro = memo(
  ({
    colorScheme,
    onShowHighlights,
  }: {
    colorScheme: any;
    onShowHighlights: () => void;
  }) => (
    <section className="mb-12 sm:mb-16">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
      >
        {/* Image Section */}
        <motion.figure
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-xl overflow-hidden aspect-video lg:aspect-square order-2 lg:order-1"
        >
          <img
            src={Tour1}
            alt="ClaudyGod in worship"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
            <div className="text-center lg:text-left">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 w-fit mx-auto lg:mx-0"
                style={{ backgroundColor: `${colorScheme.primary}20` }}
              >
                <FontAwesomeIcon
                  icon={faMusic}
                  style={{ color: colorScheme.primary }}
                  className="text-sm"
                />
                <LightText
                  style={{ color: colorScheme.primary, fontSize: '0.75rem' }}
                  useThemeColor={false}
                >
                  MUSIC TOUR 2024
                </LightText>
              </div>

              <SemiBoldText fontSize="1.25rem" className="mb-2 text-white">
                Experience Worship Beyond Walls
              </SemiBoldText>

              <RegularText
                style={{ color: '#ffffff' }}
                className="text-sm leading-relaxed opacity-90"
              >
                Join us for transformative worship experiences
              </RegularText>
            </div>
          </div>
        </motion.figure>

        {/* Content Section */}
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-1 lg:order-2 flex flex-col space-y-6"
        >
          <div className="space-y-4">
            <RegularText
              style={{ color: colorScheme.subtleText }}
              className="text-base leading-relaxed"
            >
              My mission is to create spaces where people can encounter God's
              presence through authentic worship. This isn't just about
              music—it's about creating moments of divine connection that
              transform lives and communities.
            </RegularText>

            <RegularText
              style={{ color: colorScheme.subtleText }}
              className="text-base leading-relaxed"
            >
              Through powerful worship sessions, intimate acoustic moments, and
              community outreach, we're taking the gospel beyond traditional
              church walls to reach hearts that hunger for spiritual truth.
            </RegularText>
          </div>

          <div className="flex flex-wrap gap-3">
            {['Live Worship', 'Community Outreach', 'Spiritual Mentorship'].map(
              feature => (
                <div
                  key={feature}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg"
                  style={{ backgroundColor: `${colorScheme.background}10` }}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: colorScheme.primary }}
                  />
                  <LightText
                    style={{ color: colorScheme.background }}
                    className="text-sm"
                    useThemeColor={false}
                  >
                    {feature}
                  </LightText>
                </div>
              )
            )}
          </div>

          <div className="flex justify-center lg:justify-start pt-4">
            <CustomButton
              style={{
                backgroundColor: colorScheme.primary,
                color: colorScheme.onPrimary,
              }}
              aria-label="View tour highlights"
              onClick={onShowHighlights}
              className="px-6 py-3 text-base font-semibold hover:scale-105 transition-transform duration-200 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <LightText
                  style={{ color: colorScheme.onPrimary }}
                  useThemeColor={false}
                  className="whitespace-nowrap"
                >
                  Explore Tour Highlights
                </LightText>
                <FontAwesomeIcon icon={faArrowRight} className="text-current" />
              </div>
            </CustomButton>
          </div>
        </motion.section>
      </motion.article>
    </section>
  )
);

const HighlightsModal = memo(
  ({
    isOpen,
    onClose,
    colorScheme,
    onSelectState,
  }: {
    isOpen: boolean;
    onClose: () => void;
    colorScheme: any;
    onSelectState: (state: string) => void;
  }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor: `${colorScheme.surface}90`,
            backdropFilter: 'blur(8px)',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="rounded-xl w-full max-w-sm sm:max-w-md relative flex flex-col p-6"
            style={{
              backgroundColor: colorScheme.surface,
              border: `1px solid ${colorScheme.primary}`,
              maxHeight: '70vh',
              overflowY: 'auto',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-3 right-3">
              <CustomButton
                onClick={onClose}
                variant="icon"
                size="sm"
                className="hover:bg-gray-100 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} />
              </CustomButton>
            </div>

            <header className="text-center mb-6 pr-8">
              <SemiBoldText
                fontSize="1.125rem"
                style={{ color: colorScheme.primary }}
                className="mb-2"
              >
                Music Tour Highlights in Nigeria
              </SemiBoldText>
              <RegularText
                style={{ color: colorScheme.textSecondary }}
                className="text-sm"
              >
                Select a state to explore
              </RegularText>
            </header>

            <section className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Lagos', 'Abuja', 'Imo', 'Port Harcourt', 'Aba'].map(state => (
                <motion.div
                  key={state}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer rounded-lg p-4 text-center font-medium flex items-center justify-center transition-all duration-200 hover:shadow-md"
                  style={{
                    backgroundColor: colorScheme.surfaceVariant,
                    color: colorScheme.text,
                    border: `1px solid ${colorScheme.primary}`,
                    minHeight: '60px',
                  }}
                  onClick={() => onSelectState(state)}
                >
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-sm"
                    />
                    <span className="text-sm">{state}</span>
                  </div>
                </motion.div>
              ))}
            </section>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
);

const NewsletterSection = memo(({ colorScheme }: { colorScheme: any }) => (
  <section
    className="py-8 sm:py-12"
    style={{
      background: `linear-gradient(135deg, ${colorScheme.gray[50]}, ${colorScheme.gray[100]})`,
    }}
  >
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <Suspense fallback={<NewsletterSkeleton />}>
        <LazyNewsletterForm />
      </Suspense>
    </div>
  </section>
));

const DonationSection = memo(() => (
  <section className="my-8 sm:my-12">
    <Suspense fallback={<DonationSkeleton />}>
      <LazyDonationCallToAction
        title="Partner with Our Ministry"
        subtitle="Your Support Makes a Difference"
        description="Join us in spreading the gospel through music."
        goFundMeUrl="https://www.gofundme.com/charity/claudygod-music-ministries/donate"
        donateUrl="/donate"
      />
    </Suspense>
  </section>
));

// Main News Component
export const News = memo(() => {
  const { colorScheme } = useTheme();
  const navigate = useNavigate();

  // Simple local state for modal
  const [isHighlightsModalOpen, setIsHighlightsModalOpen] = useState(false);

  const handleShowHighlights = useCallback(() => {
    setIsHighlightsModalOpen(true);
  }, []);

  const handleCloseHighlights = useCallback(() => {
    setIsHighlightsModalOpen(false);
  }, []);

  const handleSelectState = useCallback(
    (state: string) => {
      setIsHighlightsModalOpen(false);
      // Navigate directly to the tour page for the selected state
      navigate(`/tour/${state.toLowerCase().replace(/\s+/g, '-')}`);
    },
    [navigate]
  );

  const seoStructuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: 'ClaudyGod News & Updates - Music Tours & Ministry Events',
      description:
        'Stay updated with the latest news from ClaudyGod Ministries. Music tours, worship events, album releases, and ministry updates.',
      datePublished: new Date().toISOString(),
      author: { '@type': 'Person', name: 'ClaudyGod' },
      publisher: { '@type': 'Organization', name: 'ClaudyGod Ministries' },
    }),
    []
  );

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Suspense fallback={<div>Loading SEO...</div>}>
        <LazySEO
          title="ClaudyGod News & Updates - Music Tours & Ministry Events"
          description="Stay updated with the latest news from ClaudyGod Ministries. Music tours, worship events, album releases, and ministry updates."
          keywords="claudygod news, gospel music tours, worship events, ministry updates, christian events"
          canonical="https://claudygod.org/news"
          image="https://claudygod.org/images/news-og.jpg"
          structuredData={seoStructuredData}
        />
      </Suspense>

      {/* Hero Section */}
      <LayoutTemplate
        backgroundImage={Tour1}
        overlayColor="rgba(0,0,0,0.55)"
        backgroundPosition="center center"
        className="h-[50vh] sm:h-[60vh] md:h-[70vh] min-h-[400px]"
        title={''}
      >
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center text-center w-full h-full px-4 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-4"
          >
            <AbrilFatFaceText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                lineHeight: '1.1',
                textShadow: '0 4px 12px rgba(0,0,0,0.8)',
                marginBottom: '1rem',
              }}
              useThemeColor={false}
            >
              News & Updates
            </AbrilFatFaceText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mb-4 mx-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <RegularText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                lineHeight: '1.6',
              }}
              useThemeColor={false}
            >
              Stay updated with the latest from ClaudyGod Ministries
            </RegularText>
          </motion.div>
        </motion.div>
      </LayoutTemplate>

      {/* Main Content */}
      <main className="flex-grow flex flex-col w-full">
        <article className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
          <NewsHeader colorScheme={colorScheme} />

          <MusicTourIntro
            colorScheme={colorScheme}
            onShowHighlights={handleShowHighlights}
          />

          {/* Albums Section */}
          <section className="mb-12 sm:mb-16">
            <Suspense fallback={<AlbumsSectionSkeleton />}>
              <LazyAlbumsSection openVideoModal={() => {}} />
            </Suspense>
          </section>

          {/* Live Sessions Section */}
          <section className="mb-12 sm:mb-16">
            <LiveSessionsSection />
          </section>

          {/* Other Content Sections */}
          <section className="space-y-12 sm:space-y-16">
            <Suspense fallback={<div>Loading Follow Us...</div>}>
              <LazyFollowUs />
            </Suspense>

            <Suspense fallback={<ArtistQuoteSkeleton />}>
              <LazyArtistQuote />
            </Suspense>
          </section>
        </article>

        <HighlightsModal
          isOpen={isHighlightsModalOpen}
          onClose={handleCloseHighlights}
          colorScheme={colorScheme}
          onSelectState={handleSelectState}
        />
      </main>

      {/* Footer */}
      <footer className="flex-shrink-0 w-full flex flex-col">
        <DonationSection />
        <NewsletterSection colorScheme={colorScheme} />
      </footer>
    </div>
  );
});

export default News;
