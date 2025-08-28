/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendar, 
  faHandsPraying, 
  faMusic, 
  faTimes, 
  faImages, 
  faPlay, 
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';

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

// Design System Components
import { ExtraBoldText, RegularText } from '../components/ui/fonts/typography';
import CustomButton from '../components/ui/fonts/buttons/CustomButton';
import { useTheme } from '../contexts/ThemeContext';
import { AlbumsSection } from '../components/news/AlbumSection';
import { LiveSessionsSection } from '../components/news/Session';

export const News = () => {
  const { colorScheme } = useTheme();
  const [showTourModal, setShowTourModal] = useState(false);
  const [selectedTourCity, setSelectedTourCity] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [currentAlbum, setCurrentAlbum] = useState('');
  const [isMobile, setIsMobile] = useState(false); // Added missing state

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
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
      {/* Hero Slider - Full width */}
      <div className="flex-shrink-0 w-full">
        <HeroSlider />
      </div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col w-full">
        {/* Full-width 4-Column Section */}
        <section 
          className="w-full py-12 px-4 sm:px-6 lg:px-8 lg:py-20"
          style={{ 
            background: `linear-gradient(to bottom, 
              ${colorScheme.text}, 
              ${colorScheme.surface}, 
              ${colorScheme.surfaceVariant}
              )` 
          }}
          id="music"
        >
          {/* Hero Section with Heading and Subheading */}
          <motion.div
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
            
            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mt-2 text-sm lg:text-base"
              style={{ color: colorScheme.background }}
            >
              Bringing divine worship experiences to communities worldwide through music, 
              prayer, and fellowship
            </motion.p>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '5rem' }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 my-4 lg:my-6"
              style={{ backgroundColor: colorScheme.primary }}
            />
          </motion.div>

          {/* Two Column Layout - Image + Text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-20">
            {/* Column 1 - Image */}
            <motion.div
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
              <div 
                className="absolute inset-0"
                style={{ 
                  background: `linear-gradient(to top, ${colorScheme.background} 0%, transparent 30%)` 
                }}
              />
            </motion.div>

            {/* Column 2 - Artist Text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <ExtraBoldText fontSize="1.5rem" className="mb-4" style={{ color: colorScheme.text }}>
                What to Expect - Music Tour
              </ExtraBoldText>
              
              <RegularText style={{ color: colorScheme.text }} className="mb-3 text-sm lg:text-base">
                "My mission is to create spaces where people can encounter God through worship. 
                Each city we visit becomes a new opportunity to unite believers in praise and 
                experience the transformative power of God's presence."
              </RegularText>
              
              <RegularText style={{ color: colorScheme.textSecondary }} className="mb-6 text-sm lg:text-base">
                Join me on this journey as we take worship beyond church walls and into communities 
                that hunger for spiritual connection.
              </RegularText>
              
              <CustomButton
                style={{
                  backgroundColor: colorScheme.primary,
                  color: colorScheme.onPrimary,
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                  justifyContent: "space-between",
                }}
                aria-label="View tour highlights"
              >
                <span className="text-sm">Tour Highlights</span>
                <FontAwesomeIcon icon={faArrowRight} style={{marginLeft: "20px", fontSize: "16px"}} aria-hidden="true" />
              </CustomButton>
            </motion.div>
          </div>

          {/* Connection Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-12 lg:mb-16"
          >
            <ExtraBoldText fontSize="1.5rem" className="mb-4" style={{ color: colorScheme.text }}>
              Catch up on our Music Tour Across Various States in Nigeria
            </ExtraBoldText>
            
            <RegularText 
              style={{ color: colorScheme.textSecondary }} 
              className="max-w-3xl mx-auto mb-6 text-sm lg:text-base"
            >
              Explore each tour stop to see highlights, testimonies, and the unique ways God is moving 
              in every community we visit.
            </RegularText>
          </motion.div>

          {/* 4-Column Grid - Responsive */}
          <section className="w-full py-8 lg:py-12" id="events">
            {/* Section Heading */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8 lg:mb-12"
            >
            </motion.div>

       
          </section>

          {/* Tour Highlights CTA */}
     <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
  className="rounded-2xl p-6 lg:p-8 text-center -mt-20 lg:-mt-10" 
  style={{ 
    background: `linear-gradient(135deg, ${colorScheme.primary} 0%, ${colorScheme.primaryDark} 100%)`,
    color: colorScheme.onPrimary
  }}
>
  <ExtraBoldText fontSize="1.5rem" className="mb-3">
    Relive the Worship Moments
  </ExtraBoldText>
  
  <RegularText className="mb-4 max-w-2xl mx-auto text-sm lg:text-base">
    Experience the powerful worship sessions from our recent tour across multiple cities.
  </RegularText>
  
  <CustomButton
    variant="outlined"
    size="sm"
    style={{
      borderColor: colorScheme.onPrimary,
      color: colorScheme.onPrimary,
      fontSize: '14px',
      padding: '8px 16px'
    }}
    aria-label="View tour highlights"
  >
    View Tour Highlights
  </CustomButton>
</motion.div>

        </section>

        {/* Centered Events Section */}
 
        <section 
          className="w-full py-12 lg:py-16"
              style={{ 
            background: `linear-gradient(to bottom, 
              ${colorScheme.text}, 
              ${colorScheme.surface}, 
              ${colorScheme.surfaceVariant}
              )` 
          }}
          id="gallery"
        >
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center mb-12 lg:mb-16"
            >
              <ExtraBoldText fontSize="2rem" lgFontSize="3rem" style={{ color: colorScheme.background }}>
                Upcoming Events
              </ExtraBoldText>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '5rem' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 my-4 lg:my-6"
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
              className="w-full my-12 lg:my-16" 
              style={{ borderColor: colorScheme.primary, borderTopWidth: '1px' }}
            />
            
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">
              <div className="flex-1">
                <VolunteerForm />
              </div>
              <div className="flex-1 mt-8 lg:mt-0">
                <LiveSession />
              </div>
            </div>
          </div>
        </section>

        <AlbumsSection openVideoModal={openVideoModal} />

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
                <div className="absolute top-2 right-2 lg:top-4 lg:right-4 z-10">
                  <CustomButton
                    onClick={closeVideoModal}
                    variant="icon"
                    size="xs"
                    style={{ backgroundColor: `${colorScheme.primary}80`, backdropFilter: 'blur(8px)' }}
                    aria-label="Close video modal"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-sm lg:text-base" />
                  </CustomButton>
                </div>
                
                <div className="p-3 lg:p-4 text-center">
                  <ExtraBoldText fontSize="1.1rem" lgFontSize="1.5rem" style={{ color: colorScheme.primary }} className="mb-2">
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
                    title={`${currentAlbum} video`}
                  ></iframe>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <FollowUs />

        {/* Live Sessions Section */}
     <LiveSessionsSection />

        <ArtistQuote/>
      </main>

      {/* Footer Components */}
      <div className="flex-shrink-0 w-full">
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