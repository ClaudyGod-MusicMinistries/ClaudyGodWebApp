/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, Suspense, useEffect } from 'react';
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

// Components
import { HeroSlider } from '../components/news/Slider';
import { ArtistQuote } from '../components/news/ArtistQuote';
import { TourSection } from '../components/news/TourSection';
import { VolunteerForm } from '../components/news/VolunteerForm';
import { LiveSession } from '../components/news/LiveSession';
import { TourCityModal } from '../components/news/TourCityModal';
import { NewsletterForm } from '../components/util/Newsletter';
import { DonationCallToAction } from '../components/util/DonationSupport';
import { FollowUs } from '../components/news/Tournews';
import { AlbumsSection } from '../components/news/AlbumSection';
import { LiveSessionsSection } from '../components/news/Session';
import { SEO } from '../components/util/SEO';

// Design System
import {
  ExtraBoldText,
  RegularText,
  SemiBoldText,
  LightText,
} from '../components/ui/fonts/typography';
import CustomButton from '../components/ui/fonts/buttons/CustomButton';
import { useTheme } from '../contexts/ThemeContext';
import { LayoutTemplate } from '../components/util/hero';

export const News = () => {
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

  const openVideoModal = (url: string, album: string) => {
    setCurrentVideoUrl(url);
    setCurrentAlbum(album);
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setCurrentVideoUrl('');
    setCurrentAlbum('');
  };

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <SEO
        title="ClaudyGod News & Updates - Music Tours & Ministry Events"
        description="Stay updated with the latest news from ClaudyGod Ministries. Music tours, worship events, album releases, and ministry updates."
        keywords="claudygod news, gospel music tours, worship events, ministry updates, christian events"
        canonical="https://claudygod.org/news"
        image="https://claudygod.org/images/news-og.jpg"
        structuredData={{
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
        }}
      />

      {/* ===== Hero Section - Enhanced Responsiveness ===== */}
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
            <ExtraBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2rem, 8vw, 4.5rem)',
                lineHeight: '1.1',
                textShadow: '0 4px 12px rgba(0,0,0,0.8)',
                marginBottom: '0.5rem',
              }}
              useThemeColor={false}
            >
              News & Updates
            </ExtraBoldText>
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

      {/* ===== Main Content - Enhanced Grid System ===== */}
      <main className="flex-grow flex flex-col w-full">
        {/* News Content */}
        <article className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
          {/* Section Header */}
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
              <ExtraBoldText
                style={{
                  color: colorScheme.primary,
                  fontSize: 'clamp(1.75rem, 6vw, 3rem)',
                  lineHeight: '1.1',
                  marginBottom: '0.75rem',
                }}
                useThemeColor={false}
              >
                Ministry News & Events
              </ExtraBoldText>
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
                }}
                useThemeColor={false}
              >
                Bringing divine worship experiences to communities worldwide
                through music, prayer, and fellowship
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

          {/* Music Tour Intro - Enhanced Grid */}
          <section className="mb-16 sm:mb-20 md:mb-24">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center"
            >
              {/* Image - Enhanced Responsiveness */}
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

              {/* Text Content - Enhanced Typography */}
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
                  Join me on this journey as we take worship beyond church walls
                  and into communities that hunger for spiritual connection.
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
                    onClick={() => setShowHighlightsModal(true)}
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

          {/* Albums Section */}
          <section className="mb-16 sm:mb-20 md:mb-24">
            <AlbumsSection openVideoModal={openVideoModal} />
          </section>

          {/* Other Content Sections */}
          <section className="space-y-16 sm:space-y-20 md:space-y-24">
            <FollowUs />
            <LiveSessionsSection />
            <ArtistQuote />
          </section>
        </article>

        {/* Highlights Modal - Enhanced Responsiveness */}
        <AnimatePresence>
          {showHighlightsModal && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
              style={{
                backgroundColor: `${colorScheme.surface}90`,
                backdropFilter: 'blur(8px)',
              }}
              onClick={() => setShowHighlightsModal(false)}
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
                {/* Close Button */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                  <CustomButton
                    onClick={() => setShowHighlightsModal(false)}
                    variant="icon"
                    size="xs"
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </CustomButton>
                </div>

                {/* Modal Header */}
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

                {/* Cities Grid - Enhanced Responsiveness */}
                <section className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
                  {['Lagos', 'Abuja', 'Imo', 'Port Harcourt', 'Aba'].map(
                    city => (
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
                          setShowHighlightsModal(false);
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
                    )
                  )}
                </section>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* ===== Footer - Enhanced Responsiveness ===== */}
      <footer className="flex-shrink-0 w-full flex flex-col">
        {showTourModal && selectedTourCity && (
          <Suspense
            fallback={
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            }
          >
            <TourCityModal
              city={selectedTourCity}
              isOpen={showTourModal}
              onClose={() => {
                setShowTourModal(false);
                setSelectedTourCity(null);
              }}
            />
          </Suspense>
        )}

        {/* Donation Section */}
        <section className="my-8 sm:my-12 md:my-16">
          <DonationCallToAction
            title="Partner with Our Ministry"
            subtitle="Your Support Makes a Difference"
            description="Join us in spreading the gospel through music."
            goFundMeUrl="https://www.gofundme.com/charity/claudygod-music-ministries/donate"
            donateUrl="/donate"
          />
        </section>

        {/* Newsletter Section */}
        <section
          className="py-8 sm:py-12 md:py-16"
          style={{
            background: `linear-gradient(135deg, ${colorScheme.gray[50]}, ${colorScheme.gray[100]})`,
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <NewsletterForm />
          </div>
        </section>
      </footer>
    </div>
  );
};
