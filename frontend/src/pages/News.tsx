import  { useEffect, useState } from 'react';
import { NewsletterForm } from '../components/Newsletter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { About1, Cover, newsBanner } from '../assets';
import { motion } from 'framer-motion';
import { CityTourModal } from '../components/CityTourModal';
import {
  faMusic,
  faGlobeAfrica,
  faRecordVinyl,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  faYoutube,
  faSpotify,
  faApple,
  faDeezer,
  faSoundcloud,
  faTiktok
} from '@fortawesome/free-brands-svg-icons';

export const News = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const slides = [
    {
      title: 'MUSIC TOUR IN NIGERIA',
      description: `We will be sharing God's love and messages across 5 states in Nigeria.`,
      buttonText: 'Stay Updated',
      bgImage: newsBanner,
    },
    {
      title: 'MUSIC TOUR IN NIGERIA',
      description: `We will be sharing God's love and messages across 5 states in Nigeria.`,
      buttonText: 'Stay Updated',
      bgImage: newsBanner,
    },
  ];

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const slide = slides[currentSlide];
  const isEvenSlide = currentSlide % 2 === 0;

  return (
    <>
      {/* Slider Section */}
      <div className="w-full h-[50vh] md:h-[70vh] bg-gradient-to-r from-black via-[#2a003f] to-black to-black flex items-center justify-center px-6 md:px-16 transition-all duration-700 overflow-hidden">
        {/* Mobile Layout (Image top, Text bottom) */}
        {isMobile && (
          <div className="w-full h-full flex flex-col">
            {/* Image Top */}
            <motion.div
              key={`mobile-image-${currentSlide}`}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              className="h-1/2 w-full flex items-center justify-center"
            >
              <div className="relative  max-w-md">
                <div className="shadow-2xl rounded-2xl overflow-hidden p-1 h-full">
                  <img
                    src={slide.bgImage}
                    alt="Slider Visual"
                    className="w-[400px] h-full mt-5 rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Text Bottom */}
            <motion.div
              key={`mobile-text-${currentSlide}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1/2 flex flex-col justify-center p-4 text-center"
            >
              <h2 className="max-md:text-xl text-white roboto-condensed">{slide.title}</h2>
              <p className="max-md:text-gray-500 max-md:work-sans mt-2">{slide.description}</p>
              <button className="mt-4 bg-purple-950 max-md:text-white md:text-white px-6 py-2 rounded-md shadow-lg hover:bg-gray-200 transition w-48 mx-auto">
                {slide.buttonText}
              </button>
            </motion.div>
          </div>
        )}

        {/* Desktop Layout */}
        {!isMobile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full max-w-7xl">
            {/* Text Column - Position alternates based on slide index */}
            <motion.div
              key={`text-${currentSlide}`}
              initial={{ opacity: 0, x: isEvenSlide ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`space-y-6 ${isEvenSlide ? 'order-1' : 'order-2'}`}
            >
              <h2 className="md:text-5xl text-white roboto-condensed">{slide.title}</h2>
              <p className="work-sans md-text-2xl text-purple-400">{slide.description}</p>
              <button className="bg-purple-900 text-white raleway-light px-6 py-2 rounded-md shadow-lg hover:bg-gray-200 transition">
                {slide.buttonText}
              </button>
            </motion.div>

            {/* Image Column - Position alternates based on slide index */}
            <motion.div
              key={`image-${currentSlide}`}
              initial={{ opacity: 0, x: isEvenSlide ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`flex items-center justify-center ${isEvenSlide ? 'order-2' : 'order-1'}`}
            >
              <div className="relative w-full max-w-md">
                <div className="shadow-2xl rounded-2xl overflow-hidden p-1">
                  <img
                    src={slide.bgImage}
                    alt="Description"
                    className="w-[800px] h-[400px]  rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
        
        {/* Side Navigation Dots */}
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-110'
                  : 'bg-gray-400 hover:bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* News Section */}
      <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto text-center py-12 md:py-16 lg:py-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl roboto-condensed lg:text-6xl text-purple-950 bg-clip-text">
            ClaudyGod Latest News
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '8rem' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gray-500 mx-auto my-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-lg md:text-xl work-sans text-[#72709e] max-w-3xl mx-auto"
          >
           Massive Announcement!
We’ve got big things happening:
🎤 1 Nigerian tour coming soon
🎶 3 new albums out now — Very Glorious, King of Heaven, Lover of My Soul
💿 New single — You're Everything is live!
📺 Plus, live session videos dropping soon
          </motion.p>
        </div>

        {/* News Cards - Corrected 2-column layout */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 mb-16">
          {/* First Column - Vertical Stack */}
          <div className="md:w-1/2 flex flex-col gap-8">
            {/* New Singles Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#140f3c]/80 backdrop-blur-sm border border-[#6a11cb]/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-[#ff4d94]/30 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image Column */}
                <div className="md:w-2/5 flex items-center justify-center p-6 bg-gradient-to-br from-[#0a061a] to-[#1a0a2e]">
                  <div className="relative w-full h-48 md:h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff4d94] to-[#6a11cb] opacity-20 rounded-xl"></div>
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                      <img 
                        src={Cover} 
                        alt="You Are Our Everything" 
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Content Column */}
                <div className="md:w-3/5 p-6">
                  <div className="mb-4">
                    <h3 className="text-xl roboto-condensed mb-4 text-white text-center">
                      New Singles out: You Are Our Everything
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: faSpotify, name: 'Spotify', color: '#1DB954' },
                        { icon: faApple, name: 'Apple Music', color: '#FF2D55' },
                        { icon: faYoutube, name: 'YouTube', color: '#FF0000' },
                        { icon: faDeezer, name: 'Deezer', color: '#FEAA2D' },
                        { icon: faSoundcloud, name: 'SoundCloud', color: '#FF7700' },
                        { icon: faTiktok, name: 'TikTok', color: '#000000' },
                      ].map((platform, idx) => (
                        <a 
                          key={idx}
                          href="#" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block w-full"
                        >
                          <button 
                            className="w-full py-2.5 rounded-lg flex items-center justify-center transition-all hover:scale-[1.02] transform cursor-pointer"
                            style={{ backgroundColor: platform.color }}
                          >
                            <FontAwesomeIcon icon={platform.icon} className="mr-2 text-white" /> 
                            <span className="text-white text-xs">{platform.name}</span>
                          </button>
                        </a>
                      ))}
                    </div>
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
              <div className="flex flex-col md:flex-row">
                {/* Icon Column */}
                <div className="md:w-1/4 flex items-center justify-center p-6 bg-gradient-to-br from-[#0a061a] to-[#1a0a2e]">
                  <FontAwesomeIcon icon={faRecordVinyl} className="text-5xl text-[#ff4d94]" />
                </div>
                
                {/* Content Column */}
                <div className="md:w-3/4 p-6">
                  <div className="mb-4">
                    <h3 className="text-xl roboto-condensed mb-2 text-white">
                      3 New Albums Out Now
                    </h3>
                    <ul className="space-y-2 text-gray-300 work-sans">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        Very Glorious
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        King of Heaven
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        Lover of My Soul
                      </li>
                    </ul>
                    <button className="mt-4 w-full py-2.5 bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white raleway-medium rounded-lg hover:opacity-90 transition-all">
                      Listen on All Platforms
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Live Session Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-[#140f3c]/80 backdrop-blur-sm border border-[#6a11cb]/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-[#ff4d94]/30 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex flex-col md:flex-row">
                {/* Icon Column */}
                <div className="md:w-1/4 flex items-center justify-center p-6 bg-gradient-to-br from-[#0a061a] to-[#1a0a2e]">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-5xl text-[#ff4d94]" />
                </div>
                
                {/* Content Column */}
                <div className="md:w-3/4 p-6">
                  <div className="mb-4">
                    <h3 className="text-xl roboto-condensed mb-2 text-white">
                      Live Session Coming Soon
                    </h3>
                    <p className="text-gray-300 work-sans mb-4">
                      Intimate worship session with Min. ClaudyGod and the Worship team. Watch this space for updates!
                    </p>
                    <div className="flex space-x-3">
                      <div className="flex-1 bg-gray-800 rounded-lg h-32 flex items-center justify-center">
                        <span className="text-gray-400">Teaser Coming Soon</span>
                      </div>
                      <div className="flex-1 bg-gray-800 rounded-lg h-32 flex items-center justify-center">
                        <span className="text-gray-400">Behind the Scenes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
           
          {/* Second Column - Nigeria Tour */}
          <div className="md:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-[#140f3c]/80 backdrop-blur-sm border border-[#6a11cb]/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-[#ff4d94]/30 transition-all duration-300 hover:-translate-y-2 h-full"
            >
              <div className="p-6 bg-gradient-to-r from-[#6a11cb]/30 to-[#ff4d94]/30 border-b border-[#6a11cb]/30">
                <div className="flex items-center mb-4">
                  <FontAwesomeIcon icon={faGlobeAfrica} className="text-3xl text-[#5c4b61] mr-3" />
                  <h2 className="text-2xl roboto-condensed">Musical tour in Nigeria</h2>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {['Lagos', 'Abuja', 'Port Harcourt', 'Aba', 'Owerri'].map((city) => (
                  <div 
                    key={city} 
                    onClick={() => setSelectedCity(city)}
                    className="bg-gradient-to-r from-[#0a061a] to-[#1a0a2e] p-4 rounded-xl border work-sans border-[#4e2a8e] cursor-pointer hover:border-[#c77dff] transition-colors"
                  >
                    <h3 className="font-bold text-lg text-[#d1d1d1]">{city}</h3>
                  </div>
                ))}
                
                <div className="pt-2">
                  <p className="italic text-gray-400">
                    Click on Tour Cities to know when Min. ClaudyGod will be in your City.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Artist Quote */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-5xl mx-auto bg-black p-8 md:p-12 rounded-2xl border-l-4 border-[#ff4d94] mb-16"
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#ff4d94] to-[#6a11cb] mb-6">
              <img src={About1} className="rounded-xl w-12 h-12 object-cover" alt="ClaudyGod" />
            </div>
            <blockquote className="md:text-xl work-sans mb-6 text-[#e2e1f3]">
              To reach the world with the love of Jesus, to proclaim truth always, and to redirect mankind to God through Worship and the Word.
            </blockquote>
            <p className="text-xl font-bold text-[#ff4d94]">— Min. ClaudyGod</p>
          </div>
        </motion.div>
    
        <CityTourModal 
          city={selectedCity || ''} 
          isOpen={Boolean(selectedCity)} 
          onClose={() => setSelectedCity(null)} 
        />
        
        <hr className="bg-purple-500" />
        <NewsletterForm />
      </div>
    </>
  );
};