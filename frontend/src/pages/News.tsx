import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faBook, faCalendar, faCircle, faHandsPraying, faMusic, faTimes, faCheck, faImages, faPlay, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faSpotify, faApple, faDeezer, faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {Tour1} from '../assets/'


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
const cards = [
  {
    id: 1,
    title: "Latest Songs",
    description: "Discover our newest gospel releases and worship tracks that will uplift your spirit.",
    icon: faMusic,
    buttonText: "Listen Now",
    buttonIcon: faPlay,
    colorScheme: {
      bg: 'primary',
      text: 'onPrimary'
    }
  },
  {
    id: 2,
    title: "Events",
    description: "Find upcoming worship nights, concerts and special ministry events near you.",
    icon: faCalendar,
    buttonText: "View Calendar",
    buttonIcon: faArrowRight,
    colorScheme: {
      bg: 'secondary',
      text: 'onSecondary'
    }
  },
  {
    id: 3,
    title: "Gallery",
    description: "Relive the powerful moments from our worship sessions and events.",
    icon: faImages,
    buttonText: "View Photos",
    buttonIcon: faArrowRight,
    colorScheme: {
      bg: 'tertiary',
      text: 'onTertiary'
    }
  },
  {
    id: 4,
    title: "Prayer",
    description: "Share your prayer needs with our ministry team for spiritual support.",
    icon: faHandsPraying,
    buttonText: "Submit Request",
    buttonIcon: faArrowRight,
    colorScheme: {
      bg: 'error',
      text: 'onError'
    }
  }
];


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
  className="w-full py-20 px-20"
  style={{ 
    background: `linear-gradient(to bottom, 
      ${colorScheme.text}, 
      ${colorScheme.surface}, 
      ${colorScheme.surfaceVariant}
      )` 
  }}
>
<div className="w-full px-4 sm:px-6 lg:px-8">
  {/* Hero Section with Heading and Subheading */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center mb-16 text-center"
  >
    <ExtraBoldText fontSize="3rem" mdFontSize="4rem" style={{ color: colorScheme.accent }}>
      ClaudyGod - Uniting Hearts in Worship Across Various Cities
    </ExtraBoldText>
    
    {/* Subheading */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="max-w-3xl mt-4"
      style={{ color: colorScheme.background }}
    >
      Bringing divine worship experiences to communities worldwide through music, 
      prayer, and fellowship
    </motion.p>
    
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: '8rem' }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="h-1 my-6"
      style={{ backgroundColor: colorScheme.primary }}
    />
  </motion.div>

  {/* Two Column Layout - Image + Text */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
    {/* Column 1 - Image */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-square"
    >
      <img
        src={Tour1} // Replace with your image path
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
    >
      <ExtraBoldText fontSize="2rem" className="mb-6" style={{ color: colorScheme.text }}>
       What to Expect - Music Tour
      </ExtraBoldText>
      
      <RegularText style={{ color: colorScheme.text }} className="mb-4">
        "My mission is to create spaces where people can encounter God through worship. 
        Each city we visit becomes a new opportunity to unite believers in praise and 
        experience the transformative power of God's presence."
      </RegularText>
      
      <RegularText style={{ color: colorScheme.textSecondary }} className="mb-8">
        Join me on this journey as we take worship beyond church walls and into communities 
        that hunger for spiritual connection.
      </RegularText>
      
      <div className="flex flex-wrap gap-4">

<CustomButton
  style={{
    backgroundColor: colorScheme.primary,
    color: colorScheme.onPrimary,
    display: "flex",
    alignItems: "center",
    padding: "20px",
    justifyContent: "space-between", // pushes label and icon apart
    // width: "100%",
  }}
>
  <span>Tour Highlights</span>
  <FontAwesomeIcon icon={faArrowRight} 
  style={{marginLeft:"40px", fontSize:"20px"}} aria-hidden="true" />
</CustomButton>





    
      </div>
    </motion.div>
  </div>

  {/* Connection Section */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4 }}
    className="text-center mb-16"
  >
    <ExtraBoldText fontSize="2rem" className="mb-6" style={{ color: colorScheme.text }}>
     Catch up on our Music Tour Across Various States in Nigeria
    </ExtraBoldText>
    
  <RegularText 
  style={{ color: colorScheme.textSecondary }} 
  className="max-w-3xl mx-auto mb-8"
>
  
  Explore each tour stop to see highlights, testimonies, and the unique ways God is moving 
  in every community we visit.
</RegularText>

  </motion.div>

  {/* 4-Column Grid - Full width */}
 <section className="w-full py-12 sm:py-16 lg:py-24 px-4">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-10 sm:mb-16"
      >
        <ExtraBoldText
          className="mb-4 leading-tight text-xl sm:text-2xl md:text-3xl"
          style={{ color: colorScheme.text }}
        >
          Catch up on our Music Tour Across Various States in Nigeria
        </ExtraBoldText>

        <RegularText
          style={{ color: colorScheme.textSecondary }}
          className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg"
        >
          Explore each tour stop to see highlights, testimonies, and the unique ways God is moving
          in every community we visit.
        </RegularText>
      </motion.div>

      {/* Responsive Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col rounded-xl p-5 sm:p-6 transition-all duration-300 hover:shadow-lg"
            style={{
              backgroundColor: colorScheme.surface,
              border: `1px solid ${colorScheme.outline}`,
              boxShadow: `0 4px 6px -1px ${colorScheme.primary}20, 0 2px 4px -1px ${colorScheme.primary}10`
            }}
          >
            <div className="flex items-center mb-4">
              <div
                className="w-10 h-10 rounded-full mr-3 flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: colorScheme.primary,
                  boxShadow: `0 4px 6px -1px ${colorScheme.primary}40`
                }}
              >
                <FontAwesomeIcon icon={card.icon} style={{ color: colorScheme.onPrimary }} className="text-lg" />
              </div>
              <ExtraBoldText fontSize="1.1rem" style={{ color: colorScheme.text }}>
                {card.title}
              </ExtraBoldText>
            </div>

            <RegularText style={{ color: colorScheme.textSecondary }} className="mb-6 text-sm sm:text-base">
              {card.description}
            </RegularText>

            <CustomButton variant="text" className="mt-auto self-start group" style={{ color: colorScheme.primary }}>
              <span className="flex items-center gap-2">
                {card.button}
                <FontAwesomeIcon icon={card.buttonIcon} className="transition-transform group-hover:translate-x-1" />
              </span>
            </CustomButton>
          </motion.div>
        ))}
      </div>
    </section>

  {/* Tour Highlights CTA */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="bg-gradient-to-r rounded-2xl p-8 text-center"
    style={{ 
      background: `linear-gradient(135deg, ${colorScheme.primary} 0%, ${colorScheme.primaryDark} 100%)`,
      color: colorScheme.onPrimary
    }}
  >
    <ExtraBoldText fontSize="2rem" className="mb-4">
      Relive the Worship Moments
    </ExtraBoldText>
    
    <RegularText className="mb-6 max-w-2xl mx-auto">
      Experience the powerful worship sessions from our recent tour across multiple cities.
    </RegularText>
    
    <CustomButton
      variant="outlined"
      size="large"
      endIcon={<FontAwesomeIcon icon={faImages} />}
      style={{
        borderColor: colorScheme.onPrimary,
        color: colorScheme.onPrimary
      }}
    >
      View Tour Highlights
    </CustomButton>
  </motion.div>
</div>
        </section>

        {/* Centered Events Section */}
        <section 
          className="w-full py-16"
          style={{ background: `linear-gradient(to bottom, ${colorScheme.background}, ${colorScheme.surfaceVariant})` }}
        >
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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

        {/* Full-width Albums Section */}
        <section 
          className="w-full py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8"
          style={{ color: colorScheme.text }}
        >
          <div className="w-full">
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
          className="w-full py-20 mb-20"
          style={{ backgroundColor: colorScheme.background }}
        >
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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