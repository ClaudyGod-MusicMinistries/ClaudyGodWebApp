/* eslint-disable @typescript-eslint/no-unused-vars */
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
const LazyHeroSlider = lazy(() =>
  import('../components/news/Slider').then(module => ({
    default: module.HeroSlider,
  }))
);

const LazyArtistQuote = lazy(() =>
  import('../components/news/ArtistQuote').then(module => ({
    default: module.ArtistQuote,
  }))
);

const LazyTourSection = lazy(() =>
  import('../components/news/TourSection').then(module => ({
    default: module.TourSection,
  }))
);

const LazyVolunteerForm = lazy(() =>
  import('../components/news/VolunteerForm').then(module => ({
    default: module.VolunteerForm,
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
  ShadowsText,
} from '../components/ui/fonts/typography';
import CustomButton from '../components/ui/fonts/buttons/CustomButton';
import { useTheme } from '../contexts/ThemeContext';
import { LayoutTemplate } from '../components/util/hero';

// Import video data
import { videos, VideoType } from '../components/data/videosData';
// import { videos, VideoType } from '../data/videosData';

// Skeleton loaders
const HeroSliderSkeleton = () => (
  <div className="h-32 bg-gray-200 animate-pulse rounded-lg mb-4" />
);

const ArtistQuoteSkeleton = () => (
  <div className="h-24 bg-gray-200 animate-pulse rounded-lg mb-4" />
);

const AlbumsSectionSkeleton = () => (
  <div className="h-48 bg-gray-200 animate-pulse rounded-lg mb-4" />
);

const TourSectionSkeleton = () => (
  <div className="h-32 bg-gray-200 animate-pulse rounded-lg mb-4" />
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

  // Filter only Live Sessions videos
  const liveSessionVideos = videos.filter(
    video => video.category === 'Live Sessions'
  );

  const [selectedVideo, setSelectedVideo] = useState<VideoType>(
    liveSessionVideos[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);
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

  // Generate YouTube thumbnail URL
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

  return (
    <section
      className={`w-full py-6 lg:py-10 ${className}`}
      style={{ backgroundColor: colorScheme.background }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-6 lg:mb-8"
        >
          <ExtraBoldText
            fontSize="1.5rem"
            smFontSize="1.75rem"
            lgFontSize="2rem"
            style={{ color: colorScheme.text }}
            className="mb-3"
          >
            {title}
          </ExtraBoldText>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '3rem' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 my-3 lg:my-4"
            style={{ backgroundColor: colorScheme.primary }}
          />
          <RegularText
            fontSize="0.8rem"
            smFontSize="0.875rem"
            lgFontSize="0.9rem"
            style={{ color: colorScheme.textSecondary }}
            className="max-w-3xl mb-4 lg:mb-6 px-2"
          >
            {description}
          </RegularText>
        </motion.div>

        {/* Main YouTube Video Player */}
        <div className="mb-6 lg:mb-8 rounded-xl overflow-hidden shadow-lg">
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
            className="p-3 sm:p-4 rounded-b-xl"
            style={{ backgroundColor: colorScheme.background }}
          >
            <h3
              className="font-semibold text-base sm:text-lg mb-1 sm:mb-2"
              style={{ color: colorScheme.text }}
            >
              {selectedVideo.title}
            </h3>
            <p
              className="text-xs sm:text-sm mb-1 sm:mb-2"
              style={{ color: colorScheme.textSecondary }}
            >
              {selectedVideo.description}
            </p>
            <div className="text-xs opacity-75">
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
            className="flex overflow-x-auto scrollbar-hide gap-3 pb-3 -mx-4 px-4"
            onScroll={checkScrollPosition}
          >
            {liveSessionVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex-shrink-0 w-56 sm:w-64 md:w-72 cursor-pointer transition-all duration-300 ${
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
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm">
                      <FontAwesomeIcon
                        icon={faPlay}
                        className="text-white text-xs ml-0.5"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="p-2 sm:p-3 rounded-b-lg"
                  style={{ backgroundColor: colorScheme.background }}
                >
                  <h3
                    className="font-semibold text-xs sm:text-sm mb-1 line-clamp-1"
                    style={{ color: colorScheme.text }}
                  >
                    {video.title}
                  </h3>
                  <p
                    className="text-xs mb-1 sm:mb-2 line-clamp-2"
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
  <header className="mb-4 sm:mb-6 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-opacity-10 mb-1"
      style={{ backgroundColor: `${colorScheme.primary}20` }}
    >
      <FontAwesomeIcon
        icon={faNewspaper}
        style={{ color: colorScheme.primary }}
        className="text-xs"
      />
      <LightText
        style={{
          color: colorScheme.primary,
          fontSize: '0.65rem',
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
      <div className="flex flex-col items-center">
        <AbrilFatFaceText
          style={{
            color: colorScheme.primary,
            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
            lineHeight: '1.1',
            marginBottom: '0.125rem',
            letterSpacing: '0.02em',
          }}
          useThemeColor={false}
        >
          Ministry News
        </AbrilFatFaceText>
        <ShadowsText
          style={{
            color: colorScheme.accent,
            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
            lineHeight: '1',
            letterSpacing: '0.02em',
          }}
          useThemeColor={false}
        >
          & Events
        </ShadowsText>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="max-w-2xl mx-auto mt-1"
    >
      <RegularText
        style={{
          color: colorScheme.accent,
          fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
          lineHeight: '1.4',
          letterSpacing: '0.01em',
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
      className="w-8 h-0.5 mx-auto mt-1 rounded-full"
      style={{ backgroundColor: colorScheme.accent }}
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
    <section className="mb-6 sm:mb-8">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 items-center"
      >
        <motion.figure
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-lg overflow-hidden aspect-video lg:aspect-square order-2 lg:order-1"
        >
          <img
            src={Tour1}
            alt="ClaudyGod in worship"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${colorScheme.background} 0%, transparent 30%)`,
            }}
          />
        </motion.figure>

        <motion.section
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-1 lg:order-2 flex flex-col"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full mb-1 w-fit"
            style={{ backgroundColor: `${colorScheme.primary}10` }}
          >
            <FontAwesomeIcon
              icon={faMusic}
              style={{ color: colorScheme.primary }}
              className="text-xs"
            />
            <LightText
              style={{
                color: colorScheme.primary,
                fontSize: '0.65rem',
              }}
              useThemeColor={false}
            >
              MUSIC TOUR
            </LightText>
          </motion.div>

          <SemiBoldText
            fontSize="clamp(0.9rem, 2vw, 1.1rem)"
            className="mb-1"
            style={{ color: colorScheme.text }}
          >
            What to Expect - Music Tour
          </SemiBoldText>

          <RegularText
            style={{ color: colorScheme.text }}
            className="mb-1 text-xs leading-relaxed"
          >
            "My mission is to create spaces where people can encounter God
            through worship..."
          </RegularText>

          <RegularText
            style={{ color: colorScheme.background }}
            className="mb-2 text-xs leading-relaxed"
          >
            Join me on this journey as we take worship beyond church walls and
            into communities that hunger for spiritual connection.
          </RegularText>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex"
          >
            <CustomButton
              style={{
                backgroundColor: colorScheme.primary,
                color: colorScheme.onPrimary,
                display: 'flex',
                alignItems: 'center',
                padding: '0.3rem 0.6rem',
                fontSize: '0.7rem',
              }}
              aria-label="View tour highlights"
              onClick={onShowHighlights}
              className="hover:scale-105 transition-transform duration-200"
            >
              <span>Tour Highlights</span>
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ marginLeft: '0.3rem', fontSize: '0.65rem' }}
                aria-hidden="true"
              />
            </CustomButton>
          </motion.div>
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
    navigate,
  }: {
    isOpen: boolean;
    onClose: () => void;
    colorScheme: any;
    navigate: (path: string) => void;
  }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3"
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
            className="rounded-lg w-full max-w-xs sm:max-w-sm relative flex flex-col p-3"
            style={{
              backgroundColor: colorScheme.surface,
              border: `1px solid ${colorScheme.primary}`,
              maxHeight: '70vh',
              overflowY: 'auto',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-1 right-1">
              <CustomButton
                onClick={onClose}
                variant="icon"
                size="xs"
                className="hover:bg-gray-100 transition-colors p-1"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xs" />
              </CustomButton>
            </div>

            <header className="text-center mb-3 pr-5">
              <SemiBoldText
                fontSize="0.9rem"
                style={{ color: colorScheme.primary }}
                className="mb-1"
              >
                Catch up on ClaudyGod Music Tour Highlight in Nigeria
              </SemiBoldText>
              <RegularText
                style={{ color: colorScheme.textSecondary }}
                className="text-xs"
              >
                Select the tour city
              </RegularText>
            </header>

            <section className="grid grid-cols-2 sm:grid-cols-3 gap-1 mt-2">
              {['Lagos', 'Abuja', 'Imo', 'Port Harcourt', 'Aba'].map(city => (
                <motion.div
                  key={city}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer rounded-md p-2 text-center font-medium flex items-center justify-center transition-all duration-200 hover:shadow-sm"
                  style={{
                    backgroundColor: colorScheme.surfaceVariant,
                    color: colorScheme.text,
                    border: `1px solid ${colorScheme.primary}`,
                    minHeight: '45px',
                  }}
                  onClick={() => {
                    navigate(
                      `/tour/${city.toLowerCase().replace(/\s+/g, '-')}`
                    );
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-xs"
                    />
                    <span className="text-xs">{city}</span>
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
    className="py-3 sm:py-4"
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
  <section className="my-3 sm:my-4">
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
  const [showTourModal, setShowTourModal] = useState(false);
  const [selectedTourCity, setSelectedTourCity] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [currentAlbum, setCurrentAlbum] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showHighlightsModal, setShowHighlightsModal] = useState(false);
  const navigate = useNavigate();

  // Enhanced responsive handling
  useEffect(() => {
    const checkIsMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const openVideoModal = useCallback((url: string, album: string) => {
    setCurrentVideoUrl(url);
    setCurrentAlbum(album);
    setShowVideoModal(true);
  }, []);

  const closeVideoModal = useCallback(() => {
    setShowVideoModal(false);
    setCurrentVideoUrl('');
    setCurrentAlbum('');
  }, []);

  const handleShowHighlights = useCallback(() => {
    setShowHighlightsModal(true);
  }, []);

  const handleCloseHighlights = useCallback(() => {
    setShowHighlightsModal(false);
  }, []);

  const seoStructuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: 'ClaudyGod News & Updates',
      description: 'Latest news and updates from ClaudyGod Ministries',
      datePublished: new Date().toISOString(),
      author: {
        '@type': 'Person',
        name: 'ClaudyGod',
      },
      publisher: {
        '@type': 'Organization',
        name: 'ClaudyGod Ministries',
      },
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

      {/* ===== Hero Section ===== */}
      <LayoutTemplate
        backgroundImage={Tour1}
        overlayColor="rgba(0,0,0,0.55)"
        backgroundPosition="center center"
        className="h-[35vh] sm:h-[40vh] md:h-[50vh] min-h-[300px]"
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
            className="mb-1 sm:mb-2"
          >
            <AbrilFatFaceText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.3rem, 4vw, 2rem)',
                lineHeight: '1.1',
                textShadow: '0 4px 12px rgba(0,0,0,0.8)',
                marginBottom: '0.25rem',
                letterSpacing: '0.02em',
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
            className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mb-1 sm:mb-2 mx-auto"
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
                fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                lineHeight: '1.4',
                letterSpacing: '0.01em',
              }}
              useThemeColor={false}
            >
              Stay updated with the latest from ClaudyGod Ministries
            </RegularText>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-4 border-2 border-white rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-0.5 h-1 bg-white rounded-full mt-1"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </LayoutTemplate>

      {/* ===== Main Content ===== */}
      <main className="flex-grow flex flex-col w-full">
        <article className="max-w-7xl mx-auto w-full px-3 sm:px-4 py-3 sm:py-4 md:py-6">
          <NewsHeader colorScheme={colorScheme} />

          <MusicTourIntro
            colorScheme={colorScheme}
            onShowHighlights={handleShowHighlights}
          />

          {/* Albums Section */}
          <section className="mb-6 sm:mb-8">
            <Suspense fallback={<AlbumsSectionSkeleton />}>
              <LazyAlbumsSection openVideoModal={openVideoModal} />
            </Suspense>
          </section>

          {/* Live Sessions Section */}
          <section className="mb-6 sm:mb-8">
            <LiveSessionsSection />
          </section>

          {/* Other Content Sections */}
          <section className="space-y-6 sm:space-y-8">
            <Suspense fallback={<div>Loading Follow Us...</div>}>
              <LazyFollowUs />
            </Suspense>

            <Suspense fallback={<ArtistQuoteSkeleton />}>
              <LazyArtistQuote />
            </Suspense>
          </section>
        </article>

        <HighlightsModal
          isOpen={showHighlightsModal}
          onClose={handleCloseHighlights}
          colorScheme={colorScheme}
          navigate={navigate}
        />
      </main>

      {/* ===== Footer ===== */}
      <footer className="flex-shrink-0 w-full flex flex-col">
        <DonationSection />
        <NewsletterSection colorScheme={colorScheme} />
      </footer>
    </div>
  );
});

export default News;
