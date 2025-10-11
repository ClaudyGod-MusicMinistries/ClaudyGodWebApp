/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useState,
  useCallback,
  useMemo,
  lazy,
  Suspense,
  memo,
  useEffect,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faArrowRight,
  faNewspaper,
  faMusic,
  faMapMarkerAlt,
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

const LazyLiveSession = lazy(() =>
  import('../components/news/LiveSession').then(module => ({
    default: module.LiveSession,
  }))
);

const LazyTourCityModal = lazy(() =>
  import('../components/news/TourCityModal').then(module => ({
    default: module.TourCityModal,
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

const LazyLiveSessionsSection = lazy(() =>
  import('../components/news/Session').then(module => ({
    default: module.LiveSessionsSection,
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

// Skeleton loaders
const HeroSliderSkeleton = () => (
  <div className="h-64 bg-gray-200 animate-pulse rounded-xl mb-8" />
);

const ArtistQuoteSkeleton = () => (
  <div className="h-40 bg-gray-200 animate-pulse rounded-xl mb-8" />
);

const AlbumsSectionSkeleton = () => (
  <div className="h-80 bg-gray-200 animate-pulse rounded-xl mb-8" />
);

const TourSectionSkeleton = () => (
  <div className="h-60 bg-gray-200 animate-pulse rounded-xl mb-8" />
);

const NewsletterSkeleton = () => (
  <div className="h-40 bg-gray-200 animate-pulse rounded-xl my-8" />
);

const DonationSkeleton = () => (
  <div className="h-60 bg-gray-200 animate-pulse rounded-xl my-8" />
);

// Security utilities - moved outside component
const SecurityUtils = {
  sanitizeUrl: (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const safeParams = [
        'si',
        'referral',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'tag',
      ];
      safeParams.forEach(param => parsedUrl.searchParams.delete(param));
      return parsedUrl.toString();
    } catch {
      return '#';
    }
  },
  isTrustedDomain: (url: string, trustedDomains: string[]) => {
    try {
      const parsedUrl = new URL(url);
      return trustedDomains.some(domain => parsedUrl.hostname.endsWith(domain));
    } catch {
      return false;
    }
  },
};

const TRUSTED_DOMAINS = [
  'spotify.com',
  'apple.com',
  'youtube.com',
  'deezer.com',
  'amazon.com',
];

// Memoized components
const NewsHeader = memo(({ colorScheme }: { colorScheme: any }) => (
  <header className="mb-12 sm:mb-16 md:mb-20 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-opacity-10 mb-4 sm:mb-6"
      style={{ backgroundColor: `${colorScheme.primary}20` }}
    >
      <FontAwesomeIcon
        icon={faNewspaper}
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
            fontSize: 'clamp(1.75rem, 6vw, 3rem)',
            lineHeight: '1.1',
            marginBottom: '0.25rem',
            letterSpacing: '0.02em',
          }}
          useThemeColor={false}
        >
          Ministry News
        </AbrilFatFaceText>
        <ShadowsText
          style={{
            color: colorScheme.accent,
            fontSize: 'clamp(1.75rem, 6vw, 3rem)',
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
        Bringing divine worship experiences to communities worldwide through
        music, prayer, and fellowship
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

const MusicTourIntro = memo(
  ({
    colorScheme,
    onShowHighlights,
  }: {
    colorScheme: any;
    onShowHighlights: () => void;
  }) => (
    <section className="mb-16 sm:mb-20 md:mb-24">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center"
      >
        <motion.figure
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden aspect-video xl:aspect-square order-2 xl:order-1"
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
          className="order-1 xl:order-2 flex flex-col"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 w-fit"
            style={{ backgroundColor: `${colorScheme.primary}10` }}
          >
            <FontAwesomeIcon
              icon={faMusic}
              style={{ color: colorScheme.primary }}
              className="text-sm sm:text-base"
            />
            <LightText
              style={{
                color: colorScheme.primary,
                fontSize: 'clamp(0.75rem, 3vw, 0.875rem)',
              }}
              useThemeColor={false}
            >
              MUSIC TOUR
            </LightText>
          </motion.div>

          <ExtraBoldText
            fontSize="clamp(1.5rem, 4vw, 2rem)"
            className="mb-3 sm:mb-4"
            style={{ color: colorScheme.text }}
          >
            What to Expect - Music Tour
          </ExtraBoldText>

          <RegularText
            style={{ color: colorScheme.text }}
            className="mb-2 sm:mb-3 text-sm sm:text-base lg:text-lg leading-relaxed"
          >
            "My mission is to create spaces where people can encounter God
            through worship..."
          </RegularText>

          <RegularText
            style={{ color: colorScheme.textSecondary }}
            className="mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg leading-relaxed"
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
                padding: '0.75rem 1.5rem',
                justifyContent: 'space-between',
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              }}
              aria-label="View tour highlights"
              onClick={onShowHighlights}
              className="hover:scale-105 transition-transform duration-200"
            >
              <span>Tour Highlights</span>
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ marginLeft: '0.75rem', fontSize: '0.875rem' }}
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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
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
            className="rounded-xl sm:rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl relative flex flex-col p-4 sm:p-6"
            style={{
              backgroundColor: colorScheme.surface,
              border: `1px solid ${colorScheme.primary}`,
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
              <CustomButton
                onClick={onClose}
                variant="icon"
                size="xs"
                className="hover:bg-gray-100 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} />
              </CustomButton>
            </div>

            <header className="text-center mb-4 sm:mb-6 pr-8">
              <ExtraBoldText
                fontSize="clamp(1.25rem, 4vw, 1.5rem)"
                style={{ color: colorScheme.primary }}
                className="mb-2"
              >
                Catch up on ClaudyGod Music Tour Highlight in Nigeria
              </ExtraBoldText>
              <RegularText
                style={{ color: colorScheme.textSecondary }}
                className="text-sm sm:text-base"
              >
                Select the tour city
              </RegularText>
            </header>

            <section className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
              {['Lagos', 'Abuja', 'Imo', 'Port Harcourt', 'Aba'].map(city => (
                <motion.div
                  key={city}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer rounded-xl p-4 sm:p-5 text-center font-semibold flex items-center justify-center transition-all duration-200 hover:shadow-lg"
                  style={{
                    backgroundColor: colorScheme.surfaceVariant,
                    color: colorScheme.text,
                    border: `1px solid ${colorScheme.primary}`,
                    minHeight: '80px',
                  }}
                  onClick={() => {
                    navigate(
                      `/tour/${city.toLowerCase().replace(/\s+/g, '-')}`
                    );
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-sm sm:text-base"
                    />
                    <span className="text-sm sm:text-base">{city}</span>
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
    className="py-8 sm:py-12 md:py-16"
    style={{
      background: `linear-gradient(135deg, ${colorScheme.gray[50]}, ${colorScheme.gray[100]})`,
    }}
  >
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<NewsletterSkeleton />}>
        <LazyNewsletterForm />
      </Suspense>
    </div>
  </section>
));

const DonationSection = memo(() => (
  <section className="my-8 sm:my-12 md:my-16">
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
                marginBottom: '0.5rem',
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
            className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mb-4 sm:mb-6 md:mb-8 mx-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-4xl mx-auto"
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
              Stay updated with the latest from ClaudyGod Ministries
            </SemiBoldText>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </LayoutTemplate>

      {/* ===== Main Content ===== */}
      <main className="flex-grow flex flex-col w-full">
        <article className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
          <NewsHeader colorScheme={colorScheme} />

          <MusicTourIntro
            colorScheme={colorScheme}
            onShowHighlights={handleShowHighlights}
          />

          {/* Albums Section */}
          <section className="mb-16 sm:mb-20 md:mb-24">
            <Suspense fallback={<AlbumsSectionSkeleton />}>
              <LazyAlbumsSection openVideoModal={openVideoModal} />
            </Suspense>
          </section>

          {/* Other Content Sections */}
          <section className="space-y-16 sm:space-y-20 md:space-y-24">
            <Suspense fallback={<div>Loading Follow Us...</div>}>
              <LazyFollowUs />
            </Suspense>

            <Suspense fallback={<div>Loading Live Sessions...</div>}>
              <LazyLiveSessionsSection />
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
        {showTourModal && selectedTourCity && (
          <Suspense
            fallback={
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            }
          >
            <LazyTourCityModal
              city={selectedTourCity}
              isOpen={showTourModal}
              onClose={() => {
                setShowTourModal(false);
                setSelectedTourCity(null);
              }}
            />
          </Suspense>
        )}

        <DonationSection />
        <NewsletterSection colorScheme={colorScheme} />
      </footer>
    </div>
  );
});

export default News;
