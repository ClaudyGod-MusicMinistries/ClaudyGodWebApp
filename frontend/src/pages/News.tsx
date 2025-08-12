import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faSpotify, faApple, faDeezer } from '@fortawesome/free-brands-svg-icons';

// Components
import { HeroSlider } from '../components/news/Slider';
import { ArtistQuote } from '../components/news/ArtistQuote';
import { TourSection } from '../components/news/TourSection';
import { VolunteerForm } from '../components/news/VolunteerForm';
import { LiveSession } from '../components/news/LiveSession';
import { TourCityModal } from '../components/news/TourCityModal';
import { NewsletterForm } from '../components/util/Newsletter';
import { DonationCallToAction } from '../components/util/DonationSupport';
import { TourHighlights } from '../components/news/Tournews';
import { Tours } from '../components/news/Tours';

// Design System Components
import { ExtraBoldText, RegularText } from '../components/ui/fonts/typography';
import CustomButton from '../components/ui/fonts/buttons/CustomButton';
import { useTheme } from '../contexts/ThemeContext';
import { albums } from '../components/data/newsData';

export const News = () => {
  const { colorScheme } = useTheme();
  const [showTourModal, setShowTourModal] = useState(false);
  const [selectedTourCity, setSelectedTourCity] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [currentAlbum, setCurrentAlbum] = useState('');

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
    <div className="flex flex-col min-h-screen">
      {/* Hero Slider */}
      <div className="flex-shrink-0">
        <HeroSlider />
      </div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        {/* Tours Section */}
        {/* <section 
          className="flex flex-col py-16" 
          style={{ background: `linear-gradient(to bottom, ${colorScheme.background}, ${colorScheme.surfaceVariant})` }}
        >
          <div className="flex flex-col items-center mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center mb-16"
            >
              <ExtraBoldText fontSize="3rem" mdFontSize="4rem" style={{ color: colorScheme.text }}>
                Upcoming Events
              </ExtraBoldText>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '8rem' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 my-6"
                style={{ backgroundColor: colorScheme.primary }}
              />
            </motion.div>

            <div className="w-full">
              <TourSection 
                onCitySelect={(city) => {
                  setSelectedTourCity(city);
                  setShowTourModal(true);
                }} 
              />
            </div>
          </div>
        </section> */}

        {/* Events Section */}
        <section 
          className="flex flex-col py-16"
          style={{ background: `linear-gradient(to bottom, ${colorScheme.background}, ${colorScheme.surfaceVariant})` }}
        >
          <div className="flex flex-col items-center mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center mb-16"
            >
              <ExtraBoldText fontSize="3rem" mdFontSize="4rem" style={{ color: colorScheme.text }}>
                Upcoming Events
              </ExtraBoldText>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '8rem' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 my-6"
                style={{ backgroundColor: colorScheme.primary }}
              />
            </motion.div>

            <div className="w-full">
              <TourSection 
                onCitySelect={(city) => {
                  setSelectedTourCity(city);
                  setShowTourModal(true);
                }} 
              />
            </div>

            <div 
              className="w-full my-16" 
              style={{ borderColor: colorScheme.primary, borderTopWidth: '1px' }}
            />
            
            <div className="flex flex-col lg:flex-row gap-12 w-full">
              <div className="flex-1">
                <VolunteerForm />
              </div>
              <div className="flex-1">
                <LiveSession />
              </div>
            </div>
          </div>
        </section>

        {/* Albums Section */}
        <section 
          className="flex flex-col py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8"
          style={{ color: colorScheme.text }}
        >
          <div className="flex flex-col items-center mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center mb-12"
            >
              <ExtraBoldText fontSize="3rem" mdFontSize="6rem" style={{ color: colorScheme.primary }}>
                Latest Albums
              </ExtraBoldText>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '8rem' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 my-6"
                style={{ backgroundColor: colorScheme.secondary }}
              />
              <RegularText fontSize="1.25rem" style={{ color: colorScheme.background }}>
                We've just released three new gospel albums, packed with inspiring messages and soulful melodies.
              </RegularText>
            </motion.div>

            <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 md:gap-8 w-full mb-16">
              {albums.map((album, index) => (
                <motion.div
                  key={album.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                  className="flex flex-col rounded-2xl p-6 md:p-8 shadow-xl"
                  style={{ 
                    backgroundColor: colorScheme.surface,
                    flex: '1 1 300px',
                    maxWidth: '400px'
                  }}
                >
                  <ExtraBoldText fontSize="1.25rem" style={{ color: colorScheme.text }} className="mb-6 text-left">
                    Album: {album.title}
                  </ExtraBoldText>

                  <div className="relative aspect-video rounded-xl overflow-hidden mb-6 flex-shrink-0">
                    <img
                      src={album.image}
                      alt={album.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
                      <CustomButton
                        variant="icon"
                        size="xl"
                        onClick={() => openVideoModal(album.links.youtube, album.title)}
                        className="hover:scale-105 transition-transform"
                      >
                        <svg
                          className="w-6 h-6 md:w-8 md:h-8"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          style={{ color: colorScheme.text }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </CustomButton>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mt-auto">
                    <CustomButton
                      href={album.links.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="sm"
                      className="flex-1 min-w-[120px] justify-center gap-2"
                      style={{ backgroundColor: '#1DB954' }}
                    >
                      <FontAwesomeIcon icon={faSpotify} />
                      <span>Spotify</span>
                    </CustomButton>
                    
                    <CustomButton
                      onClick={() => openVideoModal(album.links.youtube, album.title)}
                      variant="secondary"
                      size="sm"
                      className="flex-1 min-w-[120px] justify-center gap-2"
                      style={{ backgroundColor: '#FF0000' }}
                    >
                      <FontAwesomeIcon icon={faYoutube} />
                      <span>YouTube</span>
                    </CustomButton>
                    
                    <CustomButton
                      href={album.links.apple}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="sm"
                      className="flex-1 min-w-[120px] justify-center gap-2"
                      style={{ backgroundColor: '#000000' }}
                    >
                      <FontAwesomeIcon icon={faApple} />
                      <span>Apple Music</span>
                    </CustomButton>
                    
                    <CustomButton
                      href={album.links.deezer}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="sm"
                      className="flex-1 min-w-[120px] justify-center gap-2"
                      style={{ backgroundColor: '#FEAA2D' }}
                    >
                      <FontAwesomeIcon icon={faDeezer} />
                      <span>Deezer</span>
                    </CustomButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Modal */}
        <AnimatePresence>
          {showVideoModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: `${colorScheme.background}90`, backdropFilter: 'blur(8px)' }}
              onClick={closeVideoModal}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="rounded-xl w-full max-w-4xl relative flex flex-col"
                style={{ 
                  backgroundColor: colorScheme.surface,
                  border: `1px solid ${colorScheme.primary}`
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-4 right-4 z-10">
                  <CustomButton
                    onClick={closeVideoModal}
                    variant="icon"
                    size="sm"
                    style={{ backgroundColor: `${colorScheme.primary}80`, backdropFilter: 'blur(8px)' }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </CustomButton>
                </div>
                
                <div className="p-4 text-center">
                  <ExtraBoldText fontSize="1.5rem" style={{ color: colorScheme.primary }} className="mb-2">
                    {currentAlbum}
                  </ExtraBoldText>
                </div>
                
                <div className="aspect-video w-full">
                  <iframe
                    src={currentVideoUrl.replace('youtu.be', 'youtube.com/embed').replace('watch?v=', 'embed/')}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <TourHighlights />

        {/* Live Sessions Section */}
        <section 
          className="flex flex-col py-20 mb-20"
          style={{ backgroundColor: colorScheme.background }}
        >
          <div className="flex flex-col items-center mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center mb-16"
            >
              <ExtraBoldText fontSize="3rem" mdFontSize="5rem" style={{ color: colorScheme.text }}>
                Check Out Our Live Sessions
              </ExtraBoldText>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '8rem' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 my-6"
                style={{ backgroundColor: colorScheme.primary }}
              />
              <RegularText fontSize="1rem" style={{ color: colorScheme.textSecondary }} className="max-w-3xl">
                We recently hosted vibrant live gospel sessions in Nigeria, bringing soulful performances and spiritual inspiration to the community.
                Stay connected for more updates and unforgettable moments of praise and worship!
              </RegularText>
              
              {/* Down arrow icon with YouTube link */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-12"
              >
                <CustomButton
                  href="https://youtu.be/6pDDMP9Xprg?si=EjLow0PUYG7QvIWG"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="text"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5,
                      ease: "easeInOut"
                    }}
                    className="flex flex-col items-center"
                  >
                    <FontAwesomeIcon 
                      icon={faArrowDown} 
                      style={{ color: colorScheme.primary }}
                      className="w-8 h-8 mb-2" 
                    />
                    <RegularText style={{ color: colorScheme.primary }}>Watch Now</RegularText>
                  </motion.div>
                </CustomButton>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <ArtistQuote />
      </main>

      {/* Footer Components */}
      <div className="flex-shrink-0">
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
          description="Join us in spreading the gospel through music. Your generous donations help fund worship events, album productions, and global outreach efforts. Every contribution directly impacts lives and advances God's kingdom."
          goFundMeUrl="https://www.gofundme.com/charity/claudygod-music-ministries/donate"
          donateUrl="/donate"
        />
        
        <NewsletterForm />
      </div>
    </div>
  );
};