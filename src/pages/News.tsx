/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons';
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

// Design System
import { ExtraBoldText, RegularText } from '../components/ui/fonts/typography';
import CustomButton from '../components/ui/fonts/buttons/CustomButton';
import { useTheme } from '../contexts/ThemeContext';

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
      {/* ===== Hero ===== */}
      <header className="flex-shrink-0 w-full">
        <HeroSlider />
      </header>

      {/* ===== Main Content ===== */}
      <main className="flex-grow flex flex-col w-full">
        {/* Music Tour Intro */}
        <section
          id="music"
          className="py-12 px-4 sm:px-6 lg:px-8 lg:py-20"
          style={{
            background: `linear-gradient(to bottom, 
              ${colorScheme.text}, 
              ${colorScheme.surface}, 
              ${colorScheme.surfaceVariant}
            )`,
          }}
        >
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center mb-12 lg:mb-16 text-center"
          >
            <ExtraBoldText
              fontSize="2rem"
              mdFontSize="3rem"
              style={{ color: colorScheme.background }}
              className="mb-4"
            >
              ClaudyGod - Uniting Hearts in Worship Across Various Cities
            </ExtraBoldText>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mt-2 text-sm lg:text-base"
              style={{ color: colorScheme.background }}
            >
              Bringing divine worship experiences to communities worldwide
              through music, prayer, and fellowship
            </motion.p>

            <motion.span
              initial={{ width: 0 }}
              animate={{ width: '5rem' }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="block h-1 my-4 lg:my-6"
              style={{ backgroundColor: colorScheme.primary }}
            />
          </motion.header>

          {/* Image + Text Grid */}
          <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-20">
            {/* Image */}
            <motion.figure
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
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
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2 flex flex-col"
            >
              <ExtraBoldText
                fontSize="1.5rem"
                className="mb-4"
                style={{ color: colorScheme.text }}
              >
                What to Expect - Music Tour
              </ExtraBoldText>

              <RegularText
                style={{ color: colorScheme.text }}
                className="mb-3 text-sm lg:text-base"
              >
                "My mission is to create spaces where people can encounter God
                through worship..."
              </RegularText>

              <RegularText
                style={{ color: colorScheme.textSecondary }}
                className="mb-6 text-sm lg:text-base"
              >
                Join me on this journey as we take worship beyond church walls
                and into communities that hunger for spiritual connection.
              </RegularText>

              <div className="flex">
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
              </div>
            </motion.section>
          </article>
        </section>

        {/* Albums Section */}
        <section>
          <AlbumsSection openVideoModal={openVideoModal} />
        </section>

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
                        {city}
                      </motion.div>
                    )
                  )}
                </section>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Other Content Sections */}
        <FollowUs />
        <LiveSessionsSection />
        <ArtistQuote />
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

        <DonationCallToAction
          title="Partner with Our Ministry"
          subtitle="Your Support Makes a Difference"
          description="Join us in spreading the gospel through music."
          goFundMeUrl="https://www.gofundme.com/charity/claudygod-music-ministries/donate"
          donateUrl="/donate"
        />
        <NewsletterForm />
      </footer>
    </div>
  );
};
