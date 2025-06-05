import { useEffect, useState, lazy, Suspense } from 'react';
import NewsletterForm from '../components/Newsletter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { About1, Cover, newsBanner } from '../assets';
import { motion, AnimatePresence } from 'framer-motion';
import {
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

// Fixed lazy loading implementation
const LazyTourCityModal = lazy(() => import('../components/TourCityModal'));

export const News = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showTourModal, setShowTourModal] = useState(false);
  const [selectedTourCity, setSelectedTourCity] = useState<string | null>(null);
  const [volunteerForm, setVolunteerForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    reason: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Lazy loaded images state
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({
    [newsBanner]: false,
    [Cover]: false,
    [About1]: false
  });

  const slides = [
    {
      title: 'MUSIC TOUR IN NIGERIA',
      description: `We will be sharing God's love and messages across 5 states in Nigeria.`,
      buttonText: 'Stay Updated with the latest',
      bgImage: newsBanner,
    },
    {
      title: 'UPCOMING WORSHIP EXPERIENCE',
      description: `Join us for an unforgettable night of worship and praise.`,
      buttonText: 'Subscribe to our Newsletter',
      bgImage: newsBanner,
    },
  ];

  useEffect(() => {
    setIsClient(true);
    
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    
    // Preload images
    const preloadImages = async () => {
      const imagePromises = Object.keys(loadedImages).map(src => 
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            setLoadedImages(prev => ({ ...prev, [src]: true }));
            resolve(true);
          };
          img.onerror = () => resolve(false);
        })
      );
      
      await Promise.all(imagePromises);
    };
    
    preloadImages();
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const slide = slides[currentSlide];
  const isEvenSlide = currentSlide % 2 === 0;

  // Handle volunteer form submission
  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Volunteer form submitted:', volunteerForm);
    setFormSubmitted(true);
    setVolunteerForm({
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      reason: ''
    });
  };

  // Handle volunteer form changes
  const handleVolunteerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setVolunteerForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Slider Section with Video Background */}
      <div className="relative w-full h-[100vh] md:h-[100vh] flex items-center justify-center px-4 md:px-16 transition-all duration-700 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {/* Fallback gradient while video loads */}
          {!videoLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-black via-[#2a003f] to-black animate-pulse z-10"></div>
          )}
          
          {/* Video element with lazy loading - only on desktop */}
          {isClient && !isMobile && (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              onLoadedData={() => setVideoLoaded(true)}
              preload="none"
            >
              <source src="/public/mainBanner.mp4" type="video/mp4" />
              <source src="/assets/tour-video.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          )}
          
          {/* For mobile, use the slide image as background */}
          {isClient && isMobile && (
            <div className="absolute inset-0">
              {loadedImages[slide.bgImage] ? (
                <img 
                  src={slide.bgImage} 
                  alt="Background" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-gradient-to-r from-black via-[#2a003f] to-black w-full h-full" />
              )}
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-[#2a003f]/60 to-black/70 z-10"></div>
        </div>

        {/* Mobile Layout */}
        {isMobile && (
          <div className="w-full h-full flex flex-col relative z-20 pt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mobile-slide-${currentSlide}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full flex flex-col items-center justify-center"
              >
                {/* Image */}
                <div className="w-full max-w-sm flex justify-center mb-6">
                  <div className="relative max-w-xs">
                    <div className="shadow-2xl rounded-2xl overflow-hidden p-1">
                      {loadedImages[slide.bgImage] ? (
                        <img
                          src={slide.bgImage}
                          alt="Slider Visual"
                          className="w-full h-auto max-h-[50vh] object-cover rounded-2xl shadow-lg"
                          loading="lazy"
                        />
                      ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="px-4 text-center">
                  <h2 className="text-xl md:text-2xl text-white roboto-condensed mb-3">{slide.title}</h2>
                  <p className="text-gray-300 text-sm md:text-base work-sans mb-4">{slide.description}</p>
                  <button className="mt-2 bg-purple-700 text-white px-5 py-2 text-sm rounded-md shadow-lg hover:bg-purple-800 transition w-48">
                    {slide.buttonText}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Desktop Layout */}
        {!isMobile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full max-w-7xl relative z-20">
            {/* Text Column */}
            <motion.div
              key={`text-${currentSlide}`}
              initial={{ opacity: 0, x: isEvenSlide ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={`space-y-6 ${isEvenSlide ? 'order-1' : 'order-2'}`}
            >
              <h2 className="md:text-5xl text-white roboto-condensed">{slide.title}</h2>
              <p className="work-sans md:text-2xl text-purple-300">{slide.description}</p>
              <button className="bg-purple-700 text-white raleway-light px-6 py-3 rounded-md shadow-lg hover:bg-purple-800 transition">
                {slide.buttonText}
              </button>
            </motion.div>

            {/* Image Column */}
            <motion.div
              key={`image-${currentSlide}`}
              initial={{ opacity: 0, x: isEvenSlide ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`flex items-center justify-center ${isEvenSlide ? 'order-2' : 'order-1'}`}
            >
              <div className="relative w-full max-w-md">
                <div className="shadow-2xl rounded-2xl overflow-hidden p-1">
                  {loadedImages[slide.bgImage] ? (
                    <img
                      src={slide.bgImage}
                      alt="Description"
                      className="w-[800px] h-[400px] rounded-2xl shadow-lg object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-[800px] h-[400px] animate-pulse" />
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
        
        {/* Navigation Dots - Position based on device */}
        <div className={`absolute ${isMobile ? 'bottom-6 left-1/2 transform -translate-x-1/2 flex-row space-x-3' : 'right-6 top-1/2 transform -translate-y-1/2 flex-col space-y-3'} flex z-30`}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-gray-400 hover:bg-gray-300'
              }`}
              style={{
                width: isMobile ? '10px' : '12px',
                height: isMobile ? '10px' : '12px'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>


      {/* Upcoming Events Section */}
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
            ></motion.div>
          </div>
          
          {/* Nigeria Tour Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-full rounded-2xl overflow-hidden shadow-2xl"
            >
              {loadedImages[newsBanner] ? (
                <img 
                  src={newsBanner} 
                  alt="Nigeria Tour" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 animate-pulse" />
              )}
            </motion.div>

            {/* Content Column */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl roboto-condensed text-white mb-6">
                Min. ClaudyGod Visits Nigeria
              </h2>
              <p className="text-lg md:text-xl work-sans text-purple-200 mb-8">
                Min. ClaudyGod will be sharing the love of God through music in 5 different states in Nigeria.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                {['Lagos', 'Aba', 'Owerri', 'Portharcourt', 'Abuja'].map((city) => (
                  <motion.button
                    key={city}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-900 to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all text-sm md:text-base"
                    onClick={() => {
                      setSelectedTourCity(city);
                      setShowTourModal(true);
                    }}
                  >
                    {city}
                  </motion.button>
                ))}
              </div>
              <a href="#tour-details" className="text-purple-400 hover:text-purple-300 transition-colors">
                Read more about the tour &rarr;
              </a>
            </motion.div>
          </div>
          
          <hr className="border-purple-800 my-16" />
          
          {/* Volunteer Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Volunteer Form */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#1a0a2e] rounded-2xl p-6 md:p-8 shadow-xl"
            >
              <h3 className="text-xl md:text-2xl roboto-condensed text-white mb-6 text-center">
                Volunteer to be part of our Music Tour
              </h3>
              
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="text-green-500 text-5xl mb-4">✓</div>
                  <h4 className="text-xl text-white mb-2">Thank You for Volunteering!</h4>
                  <p className="text-purple-200">We'll contact you soon with more details.</p>
                </div>
              ) : (
                <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-purple-200 mb-2 text-sm md:text-base">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={volunteerForm.firstName}
                        onChange={handleVolunteerChange}
                        required
                        className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#0a061a] border border-purple-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-purple-200 mb-2 text-sm md:text-base">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={volunteerForm.lastName}
                        onChange={handleVolunteerChange}
                        required
                        className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#0a061a] border border-purple-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-purple-200 mb-2 text-sm md:text-base">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={volunteerForm.email}
                      onChange={handleVolunteerChange}
                      required
                      className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#0a061a] border border-purple-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="role" className="block text-purple-200 mb-2 text-sm md:text-base">Volunteering as</label>
                    <select
                      id="role"
                      name="role"
                      value={volunteerForm.role}
                      onChange={handleVolunteerChange}
                      required
                      className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#0a061a] border border-purple-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base appearance-none"
                    >
                      <option value="">Select a role</option>
                      <option value="backup-singer">Backup Singer</option>
                      <option value="protocol">Protocol</option>
                      <option value="media">Media</option>
                      <option value="security">Security</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="reason" className="block text-purple-200 mb-2 text-sm md:text-base">Reason for Volunteering</label>
                    <textarea
                      id="reason"
                      name="reason"
                      value={volunteerForm.reason}
                      onChange={handleVolunteerChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#0a061a] border border-purple-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full py-2.5 md:py-3.5 bg-gradient-to-r from-purple-800 to-purple-600 text-white rounded-lg shadow-lg hover:opacity-90 transition-all font-medium text-sm md:text-base"
                  >
                    Submit Volunteer Application
                  </button>
                </form>
              )}
            </motion.div>
            
            {/* Live Session Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#1a0a2e] rounded-2xl p-6 md:p-8 shadow-xl h-full"
            >
              <h3 className="text-xl md:text-2xl roboto-condensed text-white mb-6 text-center">
                Upcoming Live Worship Session
              </h3>
              
              <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                {loadedImages[Cover] ? (
                  <img 
                    src={Cover} 
                    alt="Live Worship Session" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full animate-pulse" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <p className="text-purple-200 mb-4 text-sm md:text-base">
                Join us for an intimate live worship session. Experience the presence of God through powerful worship and spontaneous moments.
              </p>
              
              <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                <span className="px-2 py-1 md:px-3 md:py-1 bg-purple-900/50 rounded-full text-xs md:text-sm text-purple-200"> Spontaneous Worship </span>
                <span className="px-2 py-1 md:px-3 md:py-1 bg-purple-900/50 rounded-full text-xs md:text-sm text-purple-200"> Pray </span>
                <span className="px-2 py-1 md:px-3 md:py-1 bg-purple-900/50 rounded-full text-xs md:text-sm text-purple-200"> Teachings </span>
              </div>
              
              <div className="mt-6 md:mt-8 text-center">
                <button className="px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-lg shadow-lg hover:opacity-90 transition-all text-sm md:text-base">
                  Stay Updated
                </button>
              </div>
            </motion.div>
          </div>
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
          className="text-3xl sm:text-4xl md:text-5xl roboto-condensed lg:text-6xl text-purple-950 bg-clip-text"
        >
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
          Massive Announcement! We've got big things happening:
        </motion.p>
      </div>

      {/* News Cards */}
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
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff4d94] to-[#6a11cb] opacity-20 rounded-xl"></div>
                {loadedImages[Cover] ? (
                  <img
                    src={Cover}
                    alt="You Are Our Everything"
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full animate-pulse" />
                )}
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
                  { icon: faSoundcloud, name: 'SoundCloud', color: '#FF7700' },
                  { icon: faTiktok, name: 'TikTok', color: '#000000' },
                ].map((platform, idx) => (
                  <a key={idx} href="#" target="_blank" rel="noopener noreferrer" className="inline-block w-full">
                    <button
                      className="w-full py-2 text-xs md:text-sm rounded-lg flex items-center justify-center transition-all hover:scale-[1.02] transform cursor-pointer"
                      style={{ backgroundColor: platform.color }}
                    >
                      <FontAwesomeIcon icon={platform.icon} className="mr-1 md:mr-2 text-white" />
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
              <FontAwesomeIcon icon={faRecordVinyl} className="text-4xl md:text-5xl text-[#ff4d94]" />
            </div>
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl roboto-condensed mb-2 text-white">3 New Albums Out Now</h3>
              <ul className="space-y-2 text-gray-300 work-sans text-sm md:text-base">
                {['Very Glorious', 'King of Heaven', 'Lover of My Soul'].map((title, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    {title}
                  </li>
                ))}
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
              <FontAwesomeIcon icon={faCalendarAlt} className="text-2xl md:text-3xl text-[#5c4b61] mr-2 md:mr-3" />
              <h2 className="text-xl md:text-2xl roboto-condensed">2024 TOUR AND CONCERT</h2>
            </div>
          </div>
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {[
              {
                date: '22nd December 2024',
                title: 'ONE MILLION MAN WORSHIP',
                location: 'Yakubu Gowon Stadium, Elekahia, Port Harcourt',
              },
              {
                date: '31st December 2024',
                title: 'OPENS HEAVENS CALGARY 2024',
                location: 'BMO Centre: 338-13 A/ENUE SE, Calgary, Canada',
              },
              {
                date: '29th March 2025',
                title: 'A NIGHT OF WORSHIP WITH SINACH',
                location: '23 Summit Drive, Rispark, Johannesburg, South Africa',
              },
            ].map((event, i) => (
              <div key={i} className="border-b border-[#4e2a8e] pb-3 md:pb-4">
                <div className="text-[#ff4d94] text-base md:text-lg font-bold mb-1 md:mb-2">{event.date}</div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{event.title}</h3>
                <p className="text-gray-300 text-sm md:text-base">{event.location}</p>
              </div>
            ))}

            {/* Coming Soon */}
            <div className="border-b border-[#4e2a8e] pb-3 md:pb-4">
              <div className="text-[#ff4d94] text-base md:text-lg font-bold mb-1 md:mb-2">COMING SOON</div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">COMING SOON</h3>
              <button className="mt-1 md:mt-2 bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white py-1.5 px-3 md:py-2 md:px-4 rounded-lg hover:opacity-90 transition-all text-sm md:text-base">
                BUY NOW
              </button>
            </div>

            {/* Latest Release */}
            <div>
              <div className="text-[#ff4d94] text-base md:text-lg font-bold mb-1 md:mb-2">LATEST RELEASE</div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">PRAYER APP PRAISE Artichi</h3>
              <div className="text-gray-300 space-y-1 text-sm md:text-base">
                <p>Sinach</p>
                <p>Lucy Grimble</p>
                <p>SINACH : A MILLION TO...</p>
              </div>
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
          className="max-w-5xl mx-auto bg-black p-6 md:p-8 rounded-2xl border-l-4 border-[#ff4d94] mb-16"
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-[#ff4d94] to-[#6a11cb] mb-4 md:mb-6">
              {loadedImages[About1] ? (
                <img src={About1} className="rounded-xl w-10 h-10 md:w-12 md:h-12 object-cover" alt="ClaudyGod" loading="lazy" />
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 md:w-12 md:h-12" />
              )}
            </div>
            <blockquote className="text-base md:text-xl work-sans mb-4 md:mb-6 text-[#e2e1f3]">
              To reach the world with the love of Jesus, to proclaim truth always, and to redirect mankind to God through Worship and the Word.
            </blockquote>
            <p className="text-lg md:text-xl font-bold text-[#ff4d94]">— Min. ClaudyGod</p>
          </div>
        </motion.div>
    
        {/* Fixed lazy loading for modal */}
        {isClient && showTourModal && selectedTourCity && (
          <Suspense fallback={
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-[#140f3c] p-6 md:p-8 rounded-xl text-center">
                <p className="text-white">Loading tour details...</p>
              </div>
            </div>
          }>
            <LazyTourCityModal 
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

// TourCityModal component with form
const TourCityModal = ({ city, isOpen, onClose }: { city: string | null, isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: city || ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      // Auto-close after success
      setTimeout(() => {
        onClose();
      }, 3000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#140f3c] border border-purple-800 rounded-xl w-full max-w-md overflow-hidden">
        <div className="p-4 md:p-6 border-b border-purple-800 flex justify-between items-center">
          <h3 className="text-lg md:text-xl roboto-condensed text-white">Tour Registration</h3>
          <button 
            onClick={onClose}
            className="text-purple-300 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 md:p-6">
          {submitted ? (
            <div className="text-center py-6 md:py-8">
              <div className="text-green-500 text-4xl md:text-5xl mb-3 md:mb-4">✓</div>
              <h4 className="text-lg md:text-xl text-white mb-1 md:mb-2">Submitted Successfully!</h4>
              <p className="text-purple-200 text-sm md:text-base">
                We will reach out to you once we arrive in {city}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-purple-200 mb-2 text-sm md:text-base">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#0a061a] border border-purple-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-purple-200 mb-2 text-sm md:text-base">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#0a061a] border border-purple-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-purple-200 mb-2 text-sm md:text-base">City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 md:px-4 md:py-3 bg-[#0a061a] border border-purple-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-white text-sm md:text-base appearance-none"
                  >
                    <option value="">Select a city</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Aba">Aba</option>
                    <option value="Owerri">Owerri</option>
                    <option value="Portharcourt">Portharcourt</option>
                    <option value="Abuja">Abuja</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 md:py-3.5 bg-gradient-to-r from-purple-800 to-purple-600 text-white rounded-lg shadow-lg transition-all font-medium text-sm md:text-base ${
                    loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                  }`}
                >
                  {loading ? 'Submitting...' : 'Submit Registration'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};