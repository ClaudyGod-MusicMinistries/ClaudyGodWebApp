// src/pages/news.tsx
import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Cover } from '../assets/';
import {
  faRecordVinyl,
  faCalendarAlt,
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
            ClaudyGod Latest News
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
            Massive Announcement! We've got big things happening:
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {/* New Singles Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#140f3c]/80 backdrop-blur-sm border border-[#6a11cb]/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-[#ff4d94]/30 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="flex flex-col">
              <div className="w-full h-60 bg-gradient-to-br from-[#0a061a] to-[#1a0a2e] flex items-center justify-center p-6">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff4d94] to-[#6a11cb] opacity-20 rounded-xl" />
                  <img
                    src={Cover}
                    alt="You Are Our Everything"
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl roboto-condensed mb-4 text-white text-center">
                  New Singles out: You Are Our Everything
                </h3>
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  {[
                    { icon: faSpotify, name: 'Spotify', color: '#1DB954' },
                    { icon: faApple, name: 'Apple Music', color: '#FF2D55' },
                    { icon: faYoutube, name: 'YouTube', color: '#FF0000' },
                    { icon: faDeezer, name: 'Deezer', color: '#FEAA2D' },
                    
                  ].map((platform, idx) => (
                    <a
                      key={idx}
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full"
                    >
                      <button
                        className="w-full py-2 text-xs md:text-sm rounded-lg flex items-center justify-center transition-all hover:scale-[1.02] transform cursor-pointer"
                        style={{ backgroundColor: platform.color }}
                      >
                        <FontAwesomeIcon
                          icon={platform.icon}
                          className="mr-1 md:mr-2 text-white"
                        />
                        <span className="text-white">{platform.name}</span>
                      </button>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* New Albums Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#140f3c]/80 backdrop-blur-sm border border-[#6a11cb]/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-[#ff4d94]/30 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="flex flex-col">
              <div className="p-6 bg-gradient-to-br from-[#0a061a] to-[#1a0a2e] flex justify-center">
                <FontAwesomeIcon
                  icon={faRecordVinyl}
                  className="text-4xl md:text-5xl text-[#ff4d94]"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl roboto-condensed mb-2 text-white">
                  3 New Albums Out Now
                </h3>
                <ul className="space-y-2 text-gray-300 work-sans text-sm md:text-base">
                  {['Very Glorious', 'King of Heaven', 'Lover of My Soul'].map(
                    (title, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        {title}
                      </li>
                    )
                  )}
                </ul>
                <button className="mt-4 w-full py-2.5 bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white raleway-medium rounded-lg hover:opacity-90 transition-all text-sm md:text-base">
                  Listen on All Platforms
                </button>
              </div>
            </div>
          </motion.div>

          {/* Tour & Concerts Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-[#140f3c]/80 backdrop-blur-sm border border-[#6a11cb]/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-[#ff4d94]/30 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="p-4 md:p-6 bg-gradient-to-r from-[#6a11cb]/30 to-[#ff4d94]/30 border-b border-[#6a11cb]/30">
              <div className="flex items-center mb-4">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-2xl md:text-3xl text-[#5c4b61] mr-2 md:mr-3"
                />
                <h2 className="text-xl md:text-2xl roboto-condensed">
                   Latest Updates
                </h2>
              </div>
            </div>
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {[
                {
                  date: 'Upcoming',
                  title: 'Min. ClaudyGod Live In Nigeria',
                  location: 'Min. ClaudyGod will be visiting 5 States in Nigeria. Read More',
                },
        
              ].map((event, i) => (
                <div
                  key={i}
                  className="border-b border-[#4e2a8e] pb-3 md:pb-4"
                >
                  <div className="text-[#ff4d94] text-base md:text-lg font-bold mb-1 md:mb-2">
                    {event.date}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base">
                    {event.location}
                  </p>
                </div>
              ))}

          
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─────────────── ARTIST QUOTE ───────────────────────────────────────────── */}
    <ArtistQuote />

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