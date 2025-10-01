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

  // Handle responsiveness
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
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

      {/* ===== Hero ===== */}
      <LayoutTemplate
        backgroundImage={Tour1}
        overlayColor="rgba(0,0,0,0.75)"
        backgroundPosition="center center"
        className="h-[100vh] md:h-[100vh]"
        title={''}
      >
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-6"
          >
            <ExtraBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: '1.1',
                textShadow: '0 4px 8px rgba(0,0,0,0.6)',
                marginBottom: '1rem',
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
            className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mb-8 mx-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-3xl"
          >
            <SemiBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                lineHeight: '1.4',
              }}
              useThemeColor={false}
            >
              Stay updated with the latest from ClaudyGod Ministries
            </SemiBoldText>
          </motion.div>
        </motion.div>
      </LayoutTemplate>

      {/* ===== Main Content ===== */}
      <main className="flex-grow flex flex-col w-full">
        {/* News Content */}
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Section Header */}
          <header className="mb-12 md:mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-opacity-10 mb-6"
              style={{ backgroundColor: `${colorScheme.primary}20` }}
            >
              <FontAwesomeIcon
                icon={faNewspaper}
                style={{ color: colorScheme.primary }}
              />
              <LightText
                style={{
                  color: colorScheme.primary,
                  fontSize: '0.875rem',
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
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ExtraBoldText
                style={{
                  color: colorScheme.primary,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  lineHeight: '1.2',
                  marginBottom: '1rem',
                }}
                useThemeColor={false}
              >
                Ministry News & Events
              </ExtraBoldText>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <SemiBoldText
                style={{
                  color: colorScheme.accent,
                  fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                  lineHeight: '1.6',
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
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-24 h-1 mx-auto mt-6 rounded-full"
              style={{ backgroundColor: colorScheme.accent }}
            />
          </header>

          {/* Music Tour Intro */}
          <section className="mb-20">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              {/* Image */}
              <motion.figure
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-square order-2 lg:order-1"
              >
                <img
                  src={Tour1}
                  alt="ClaudyGod in worship"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <figcaption
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${colorScheme.background} 0%, transparent 30%)`,
                  }}
                />
              </motion.figure>

              {/* Text */}
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="order-1 lg:order-2 flex flex-col"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 w-fit"
                  style={{ backgroundColor: `${colorScheme.primary}10` }}
                >
                  <FontAwesomeIcon
                    icon={faMusic}
                    style={{ color: colorScheme.primary }}
                  />
                  <LightText
                    style={{
                      color: colorScheme.primary,
                      fontSize: '0.875rem',
                    }}
                    useThemeColor={false}
                  >
                    MUSIC TOUR
                  </LightText>
                </motion.div>

                <ExtraBoldText
                  fontSize="1.75rem"
                  className="mb-4"
                  style={{ color: colorScheme.text }}
                >
                  What to Expect - Music Tour
                </ExtraBoldText>

                <RegularText
                  style={{ color: colorScheme.text }}
                  className="mb-3 text-base lg:text-lg"
                >
                  "My mission is to create spaces where people can encounter God
                  through worship..."
                </RegularText>

                <RegularText
                  style={{ color: colorScheme.textSecondary }}
                  className="mb-6 text-base lg:text-lg"
                >
                  Join me on this journey as we take worship beyond church walls
                  and into communities that hunger for spiritual connection.
                </RegularText>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex"
                >
                  <CustomButton
                    style={{
                      backgroundColor: colorScheme.primary,
                      color: colorScheme.onPrimary,
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 16px',
                      justifyContent: 'space-between',
                    }}
                    aria-label="View tour highlights"
                    onClick={() => setShowHighlightsModal(true)}
                  >
                    <span className="text-sm">Tour Highlights</span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      style={{ marginLeft: '20px', fontSize: '16px' }}
                      aria-hidden="true"
                    />
                  </CustomButton>
                </motion.div>
              </motion.section>
            </motion.article>
          </section>

          {/* Albums Section */}
          <section className="mb-20">
            <AlbumsSection openVideoModal={openVideoModal} />
          </section>

          {/* Other Content Sections */}
          <section className="space-y-20">
            <FollowUs />
            <LiveSessionsSection />
            <ArtistQuote />
          </section>
        </article>

        {/* Highlights Modal */}
        <AnimatePresence>
          {showHighlightsModal && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
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
                className="rounded-xl w-full max-w-2xl relative flex flex-col p-6"
                style={{
                  backgroundColor: colorScheme.surface,
                  border: `1px solid ${colorScheme.primary}`,
                }}
                onClick={e => e.stopPropagation()}
              >
                {/* Close Button */}
                <div className="absolute top-2 right-2">
                  <CustomButton
                    onClick={() => setShowHighlightsModal(false)}
                    variant="icon"
                    size="xs"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </CustomButton>
                </div>

                {/* Modal Header */}
                <header className="text-center mb-4">
                  <ExtraBoldText
                    fontSize="1.5rem"
                    style={{ color: colorScheme.primary }}
                  >
                    Catch up on ClaudyGod Music Tour Highlight in Nigeria
                  </ExtraBoldText>
                  <RegularText style={{ color: colorScheme.textSecondary }}>
                    Select the tour city
                  </RegularText>
                </header>

                {/* Cities Grid */}
                <section className="grid grid-cols-2 gap-4 mt-6">
                  {['Lagos', 'Abuja', 'Imo', 'Port Harcourt', 'Aba'].map(
                    city => (
                      <motion.div
                        key={city}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer rounded-xl p-6 text-center font-semibold flex items-center justify-center"
                        style={{
                          backgroundColor: colorScheme.surfaceVariant,
                          color: colorScheme.text,
                          border: `1px solid ${colorScheme.primary}`,
                        }}
                        onClick={() => {
                          navigate(
                            `/tour/${city.toLowerCase().replace(/\s+/g, '-')}`
                          );
                          setShowHighlightsModal(false);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="mr-2"
                        />
                        {city}
                      </motion.div>
                    )
                  )}
                </section>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* ===== Footer ===== */}
      <footer className="flex-shrink-0 w-full flex flex-col">
        {showTourModal && selectedTourCity && (
          <Suspense fallback={<div>Loading...</div>}>
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
        <section className="my-12 md:my-16">
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
          className="py-12 md:py-16"
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
