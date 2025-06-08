// src/pages/news.tsx
import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Cover,musicCover6 , VideoArt, veryGlorious } from '../assets/';
import {
  
 faArrowDown
} from '@fortawesome/free-solid-svg-icons';
import {
  faYoutube,
  faSpotify,
  faApple,
  faDeezer,
} from '@fortawesome/free-brands-svg-icons';

// Components
import { HeroSlider } from '../components/News/Slider';
import { ArtistQuote } from '../components/News/ArtistQuote';
import { TourSection } from '../components/News/TourSection';
import { VolunteerForm } from '../components/News/VolunteerForm';
import { LiveSession } from '../components/News/LiveSession';
import { TourCityModal } from '../components/News/TourCityModal';
import NewsletterForm from '../components/Newsletter';

export const News = () => {
  const [showTourModal, setShowTourModal] = useState(false);
  const [selectedTourCity, setSelectedTourCity] = useState<string | null>(null);

  return (
    <>
      <HeroSlider />

      {/* ─────────────── UPCOMING EVENTS SECTION ─────────────────────────────── */}
      <div className="w-full py-16 bg-gradient-to-b from-[#0a061a] to-[#1a0a2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl roboto-condensed lg:text-6xl text-white"
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

      {/* ──────────── "CLAUDYGOD LATEST NEWS" SECTION ───────────────────────────── */}
      <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto text-center py-12 md:py-16 lg:py-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl roboto-condensed lg:text-6xl text-purple-950 bg-clip-text"
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
            className="text-lg md:text-xl work-sans text-[#72709e] max-w-3xl mx-auto"
          >
      We’ve just released three new gospel albums, packed with inspiring messages and soulful melodies.
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {/* New Singles Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1a0a2e] rounded-2xl p-6 md:p-8 shadow-xl h-full"
          >
            <h3 className="sm:text-sm md:text-xl  roboto-condensed text-white mb-6 text-left">
              Album: Lover of my Soul
            </h3>

            <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
              <img
                src={musicCover6}
                alt="Latest Release"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
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
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3">
    
              <a
                href="#"
                className="flex items-center justify-center p-3 bg-green-600 rounded-lg shadow-lg hover:opacity-90 transition-all"
              >
                <FontAwesomeIcon icon={faSpotify} className="w-5 h-5 mr-2 text-white" />
                <span className="text-white text-sm font-medium">Spotify</span>
              </a>
          
              <a
                href="#"
                className="flex items-center justify-center p-3 bg-red-600 rounded-lg shadow-lg hover:opacity-90 transition-all"
              >
                <FontAwesomeIcon icon={faYoutube} className="w-5 h-5 mr-2 text-white" />
                <span className="text-white text-sm font-medium">YouTube</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center p-3 bg-black rounded-lg shadow-lg hover:opacity-90 transition-all"
              >
                <FontAwesomeIcon icon={faApple} className="w-5 h-5 mr-2 text-white" />
                <span className="text-white text-sm font-medium">Apple Music</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center p-3 bg-[#feaa2d] rounded-lg shadow-lg hover:opacity-90 transition-all"
              >
                <FontAwesomeIcon icon={faDeezer} className="w-5 h-5 mr-2 text-white" />
                <span className="text-white text-sm font-medium">Deezer</span>
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#1a0a2e] rounded-2xl p-6 md:p-8 shadow-xl h-full"
          >
            <h3 className="sm:text-sm md:text-xl  roboto-condensed text-white mb-6 text-left">
           Album: Very Glorious
            </h3>

            <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
              <img
                src={veryGlorious}
                alt="New Album"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
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
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3">
              <a
                href="#"
                className="flex items-center justify-center p-3 bg-green-600 rounded-lg shadow-lg hover:opacity-90 transition-all"
              >
                <FontAwesomeIcon icon={faSpotify} className="w-5 h-5 mr-2 text-white" />
                <span className="text-white text-sm font-medium">Spotify</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center p-3 bg-red-600 rounded-lg shadow-lg hover:opacity-90 transition-all"
              >
                <FontAwesomeIcon icon={faYoutube} className="w-5 h-5 mr-2 text-white" />
                <span className="text-white text-sm font-medium">YouTube</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center p-3 bg-black rounded-lg shadow-lg hover:opacity-90 transition-all"
              >
                <FontAwesomeIcon icon={faApple} className="w-5 h-5 mr-2 text-white" />
                <span className="text-white text-sm font-medium">Apple Music</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center p-3 bg-[#feaa2d] rounded-lg shadow-lg hover:opacity-90 transition-all"
              >
                <FontAwesomeIcon icon={faDeezer} className="w-5 h-5 mr-2 text-white" />
                <span className="text-white text-sm font-medium">Deezer</span>
              </a>
            </div>
          </motion.div>

         <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1a0a2e] rounded-2xl p-6 md:p-8 shadow-xl h-full"
          >
            <h3 className="sm:text-sm md:text-xl  roboto-condensed text-white mb-6 text-left">
              Album: King of heavens
            </h3>

            <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
              <img
                src={VideoArt}
                alt="Latest Release"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
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
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3">
              <a
                href="#"
                className="flex items-center justify-center p-3 bg-green-600 rounded-lg shadow-lg hover:opacity-90 transition-all"
              >
                <FontAwesomeIcon icon={faSpotify} className="w-5 h-5 mr-2 text-white" />
                <span className="text-white text-sm font-medium">Spotify</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center p-3 bg-red-600 rounded-lg shadow-lg hover:opacity-90 transition-all"
              >
                <FontAwesomeIcon icon={faYoutube} className="w-5 h-5 mr-2 text-white" />
                <span className="text-white text-sm font-medium">YouTube</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center p-3 bg-black rounded-lg shadow-lg hover:opacity-90 transition-all"
              >
                <FontAwesomeIcon icon={faApple} className="w-5 h-5 mr-2 text-white" />
                <span className="text-white text-sm font-medium">Apple Music</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-center p-3 bg-[#feaa2d] rounded-lg shadow-lg hover:opacity-90 transition-all"
              >
                <FontAwesomeIcon icon={faDeezer} className="w-5 h-5 mr-2 text-white" />
                <span className="text-white text-sm font-medium">Deezer</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

<div className="w-full py-20 mb-20 bg-[#0a061a]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl md:text-5xl roboto-condensed lg:text-6xl text-white"
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
        className="md:text-sm max-md:text-xx  work-sans text-[#72709e] max-w-3xl mx-auto"
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
      {/* ─────────────── ARTIST QUOTE ───────────────────────────────────────────── */}
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

      <hr className="bg-purple-500" />
      <NewsletterForm />
    </>
  );
};