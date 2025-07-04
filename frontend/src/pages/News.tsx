import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { albums } from '../components/data/newsData';

import { faArrowDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faSpotify, faApple, faDeezer } from '@fortawesome/free-brands-svg-icons';

// Components
import { HeroSlider } from '../components/news/Slider';
import { ArtistQuote } from '../components/news/ArtistQuote';
import { TourSection } from '../components/news/TourSection';
import { VolunteerForm } from '../components/news/VolunteerForm';
import { LiveSession } from '../components/news/LiveSession';
import { TourCityModal } from '../components/news/TourCityModal';
import {NewsletterForm} from '../components/util/Newsletter';
import { DonationCallToAction } from '../components/util/DonationSupport';
import {TourHighlights} from '../components/news/Tournews'

export const News = () => {
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
    <>
      <HeroSlider />
      <div className="w-full py-16 bg-gradient-to-b from-[#0a061a] to-[#1a0a2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:text-4xl max-md:text-3xl font-roboto-condensed lg:text-6xl text-white"
            >
              Upcoming Events
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '8rem' }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-purple-500 mx-auto my-6"
            />
          </div>

          <TourSection 
            onCitySelect={(city) => {
              setSelectedTourCity(city);
              setShowTourModal(true);
            }} 
          />
          <hr className="border-purple-800 my-16" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <VolunteerForm />
            <LiveSession />
          </div>
        </div>
      </div>
      <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto text-center py-12 md:py-16 lg:py-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=" max-md:text-4xl md:text-6xl font-roboto-condensed text-purple-950 bg-clip-text"
          >
            Latest Albums
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '8rem' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gray-500 mx-auto my-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:text-xl max-md:text-xl font-work-sans text-[#72709e] max-w-3xl mx-auto"
          >
            We've just released three new gospel albums, packed with inspiring messages and soulful melodies.
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {albums.map((album, index) => (
            <motion.div
              key={album.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
              className="bg-[#1a0a2e] rounded-2xl p-6 md:p-8 shadow-xl h-full"
            >
              <h3 className="sm:text-sm md:text-xl font-roboto-condensed text-white mb-6 text-left">
                Album: {album.title}
              </h3>

              <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                <img
                  src={album.image}
                  alt={album.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
                  <motion.div 
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openVideoModal(album.links.youtube, album.title)}
                  >
                    <svg
                      className="w-6 h-6 md:w-8 md:h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>
              
              <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3 font-raleway-light">
                <a 
                  href={album.links.spotify} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-3 bg-green-600 rounded-lg shadow-lg hover:opacity-90 transition-all"
                >
                  <FontAwesomeIcon icon={faSpotify} className="w-5 h-5 mr-2 text-white" />
                  <span className="text-white text-sm font-medium">Spotify</span>
                </a>
                
                <button
                  onClick={() => openVideoModal(album.links.youtube, album.title)}
                  className="flex items-center justify-center p-3 bg-red-600 rounded-lg shadow-lg hover:opacity-90 transition-all"
                >
                  <FontAwesomeIcon icon={faYoutube} className="w-5 h-5 mr-2 text-white" />
                  <span className="text-white text-sm font-medium">YouTube</span>
                </button>
                
                <a 
                  href={album.links.apple} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-3 bg-black rounded-lg shadow-lg hover:opacity-90 transition-all"
                >
                  <FontAwesomeIcon icon={faApple} className="w-5 h-5 mr-2 text-white" />
                  <span className="text-white text-sm font-medium">Apple Music</span>
                </a>
                
                <a 
                  href={album.links.deezer} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-3 bg-[#feaa2d] rounded-lg shadow-lg hover:opacity-90 transition-all"
                >
                  <FontAwesomeIcon icon={faDeezer} className="w-5 h-5 mr-2 text-white" />
                  <span className="text-white text-sm font-medium">Deezer</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1a0a2e] rounded-xl border border-purple-700 w-full max-w-4xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={closeVideoModal}
                  className="w-10 h-10 rounded-full bg-purple-800/50 backdrop-blur-sm flex items-center justify-center hover:bg-purple-700 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-white" />
                </button>
              </div>
              
              <div className="p-4 text-center">
                <h3 className="text-xl md:text-2xl font-roboto-condensed text-purple-400 mb-2">
                  {currentAlbum}
                </h3>
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
<div className="w-full py-20 mb-20 bg-[#0a061a]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-md:text-2xl md:text-5xl font-roboto-condensed lg:text-6xl text-white"
      >
        Check Out Our Live Sessions
      </motion.h2>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '8rem' }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="h-1 bg-purple-500 mx-auto my-6"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="md:text-sm max-md:text-xx  font-work-sans text-[#72709e] max-w-3xl mx-auto"
      >
        We recently hosted vibrant live gospel sessions in Nigeria, bringing soulful performances and spiritual inspiration to the community.
        Stay connected for more updates and unforgettable moments of praise and worship!
      </motion.p>
      
      {/* Down arrow icon with YouTube link */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-12"
      >
        <a 
          href="https://youtu.be/6pDDMP9Xprg?si=EjLow0PUYG7QvIWG" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
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
              className="w-8 h-8 text-purple-500 mb-2" 
            />
            <span className="text-purple-400 text-sm font-medium">Watch Now</span>
          </motion.div>
        </a>
      </motion.div>
    </div>
  </div>
</div>
    <ArtistQuote  />
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
    </>
  );
};