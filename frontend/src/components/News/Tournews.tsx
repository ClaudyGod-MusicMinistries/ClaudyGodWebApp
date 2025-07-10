import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Aba1, Aba2, owerri1, Log, ph, newbanner } from '../../assets';

const tourImages: Record<string, string[]> = {
  Abia: [Aba1, Aba2],
  Portharcourt: [ph, Log],
  Abuja: [Log, newbanner],
  Owerri: [owerri1, Log],
  Lagos: [Log, newbanner],
};

const stateDetails = {
  Abia: {
    title: 'Abia Music Tour',
    date: 'See flier for more details',
    venue: 'See fier for more details',
    description: 'Join us for a powerful night of moment and praise in the city of Abia State.'
  },
  Portharcourt: {
    title: 'Port Harcourt Music Tour',
    date: 'See flier for more details',
    venue: 'See fier for more details',
    description: 'Join us for a powerful moment of worship and praise in the city of Portharcourt.'
  },
  Abuja: {
    title: 'Abuja Music Tour',
    date: 'See flier for more details',
    venue: 'See fier for more details',
    description: 'Join us for a powerful moment of worship and praise in the city of Abuja.'
  },
  Owerri: {
    title: 'Owerri Music Tour',
    date: 'See flier for more details',
    venue: 'See fier for more details',
    description: 'Join us for a powerful moment of worship and praise in the city of Owerri.'
  },
  Lagos: {
    title: 'Lagos Music Tour',
    date: 'See flier for more details',
    venue: 'See fier for more details',
    description: 'Join us for a powerful moment of worship and praise in the city of Lagos.'
  }
};

const states = Object.keys(tourImages);

export const TourHighlights: React.FC = () => {
  const [activeState, setActiveState] = useState<string>('Abia');
  const [slide, setSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  // Store selected state for the modal
  const [selectedStateForModal, setSelectedStateForModal] = useState<string>('');

  /** autoplay – rotate every 5s */
  useEffect(() => {
    let id: NodeJS.Timeout;
    if (isAutoPlaying) {
      id = setInterval(() => {
        setSlide((s) => (s + 1) % tourImages[activeState].length);
      }, 5000);
    }
    return () => clearInterval(id);
  }, [activeState, isAutoPlaying]);

  const prev = () => {
    setIsAutoPlaying(false);
    setSlide((s) => (s === 0 ? tourImages[activeState].length - 1 : s - 1));
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const next = () => {
    setIsAutoPlaying(false);
    setSlide((s) => (s + 1) % tourImages[activeState].length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission (e.g., API call)
    console.log('Form submitted:', {
      ...formData,
      selectedState: selectedStateForModal,
      eventTitle: stateDetails[selectedStateForModal]?.title
    });
    // Close modal after submission
    setIsModalOpen(false);
    // Reset form
    setFormData({ name: '', email: '' });
  };

  const openModal = () => {
    // Capture the current active state when opening the modal
    setSelectedStateForModal(activeState);
    setIsModalOpen(true);
  };

  return (
    <section className="bg-gradient-to-b from-[#0a061a] to-[#1a0a2e] text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image Carousel - Full width on mobile, half on desktop */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl aspect-video">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${activeState}-${slide}`}
                  src={tourImages[activeState][slide]}
                  alt={`${activeState} tour`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all"
                aria-label="previous slide"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all"
                aria-label="next slide"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {tourImages[activeState].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setSlide(index);
                      setTimeout(() => setIsAutoPlaying(true), 10000);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === slide ? 'bg-purple-500 w-4' : 'bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-roboto-condensed mb-6"
            >
              Want to know where <span className="text-purple-400">ClaudyGod</span> will be?
            </motion.h2>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '6rem' }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`h-1 bg-purple-500 mb-8 mx-auto lg:mx-0`}
            />

            {/* State Buttons - Responsive grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-2xl mx-auto lg:mx-0 mb-10">
              {states.map((state) => (
                <motion.button
                  key={state}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveState(state);
                    setSlide(0);
                    setIsAutoPlaying(true);
                  }}
                  className={`px-3 py-3 rounded-lg text-white font-medium transition-all text-sm sm:text-base ${
                    state === activeState
                      ? 'bg-purple-600 shadow-lg shadow-purple-500/50'
                      : 'bg-[#2d1b47] hover:bg-purple-700'
                  }`}
                >
                  {state}
                </motion.button>
              ))}
            </div>

            {/* State Details */}
            <motion.div
              key={activeState}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-[#1a0a2e] p-6 rounded-xl border border-purple-900"
            >
              <h3 className="text-xl md:text-2xl font-roboto-condensed text-purple-400 mb-3">
                {stateDetails[activeState].title}
              </h3>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-white">{stateDetails[activeState].date}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-white">{stateDetails[activeState].venue}</span>
                </div>
              </div>
              
              <p className="text-[#a9a7cc] mb-5">
                {stateDetails[activeState].description}
              </p>
              
              <button 
                onClick={openModal}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-lg text-white font-semibold shadow-lg hover:opacity-90 transition-opacity"
              >
                Get Event Updates
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Event Updates Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              className="bg-[#1a0a2e] rounded-2xl border border-purple-800 max-w-md w-full p-6 md:p-8"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-roboto-condensed text-purple-400">
                    Get Event Updates
                  </h3>
                  {/* Display selected state in modal */}
                  <div className="flex items-center mt-1">
                    <div className="px-3 py-1 bg-purple-900/50 rounded-full text-sm">
                      <span className="text-white">{selectedStateForModal}</span>
                    </div>
                    <span className="ml-2 text-sm text-purple-300">
                      {stateDetails[selectedStateForModal]?.title}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-white mb-2 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#0a061a] border border-purple-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="mb-8">
                  <label htmlFor="email" className="block text-white mb-2 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#0a061a] border border-purple-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-lg text-white font-semibold shadow-lg hover:opacity-90 transition-opacity"
                >
                  Subscribe for Updates
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};