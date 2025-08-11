import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Aba1, Aba2, owerri1, Log, ph, newbanner } from '../../assets';
import { ExtraBoldText, RegularText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';

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
    venue: 'See flier for more details',
    description: 'Join us for a powerful night of moment and praise in the city of Abia State.'
  },
  Portharcourt: {
    title: 'Port Harcourt Music Tour',
    date: 'See flier for more details',
    venue: 'See flier for more details',
    description: 'Join us for a powerful moment of worship and praise in the city of Portharcourt.'
  },
  Abuja: {
    title: 'Abuja Music Tour',
    date: 'See flier for more details',
    venue: 'See flier for more details',
    description: 'Join us for a powerful moment of worship and praise in the city of Abuja.'
  },
  Owerri: {
    title: 'Owerri Music Tour',
    date: 'See flier for more details',
    venue: 'See flier for more details',
    description: 'Join us for a powerful moment of worship and praise in the city of Owerri.'
  },
  Lagos: {
    title: 'Lagos Music Tour',
    date: 'See flier for more details',
    venue: 'See flier for more details',
    description: 'Join us for a powerful moment of worship and praise in the city of Lagos.'
  }
};

const states = Object.keys(tourImages);

export const TourHighlights: React.FC = () => {
  const { colorScheme } = useTheme();
  const [activeState, setActiveState] = useState<string>('Abia');
  const [slide, setSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [selectedStateForModal, setSelectedStateForModal] = useState<string>('');

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
    console.log('Form submitted:', {
      ...formData,
      selectedState: selectedStateForModal,
      eventTitle: stateDetails[selectedStateForModal]?.title
    });
    setIsModalOpen(false);
    setFormData({ name: '', email: '' });
  };

  const openModal = () => {
    setSelectedStateForModal(activeState);
    setIsModalOpen(true);
  };

  return (
    <section 
      className="py-16 md:py-24"
      style={{
        background: `linear-gradient(to bottom, ${colorScheme.background}, ${colorScheme.surfaceVariant})`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image Carousel */}
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
              <CustomButton
                onClick={prev}
                variant="icon"
                size="sm"
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ backgroundColor: `${colorScheme.textSecondary}20`, backdropFilter: 'blur(8px)' }}
                aria-label="previous slide"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colorScheme.text}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </CustomButton>
              <CustomButton
                onClick={next}
                variant="icon"
                size="sm"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ backgroundColor: `${colorScheme.textSecondary}20`, backdropFilter: 'blur(8px)' }}
                aria-label="next slide"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke={colorScheme.text}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </CustomButton>
              
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
                      index === slide ? 'w-4' : ''
                    }`}
                    style={{
                      backgroundColor: index === slide ? colorScheme.primary : `${colorScheme.textSecondary}50`
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ExtraBoldText 
                fontSize="2rem"
                mdFontSize="3rem"
                lgFontSize="3.5rem"
                className="mb-6"
              >
                Want to know where <span style={{ color: colorScheme.accent }}>ClaudyGod</span> will be?
              </ExtraBoldText>
            </motion.div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '6rem' }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 mb-8 mx-auto lg:mx-0"
              style={{ backgroundColor: colorScheme.primary }}
            />

            {/* State Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-2xl mx-auto lg:mx-0 mb-10">
              {states.map((state) => (
                <CustomButton
                  key={state}
                  variant={state === activeState ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => {
                    setActiveState(state);
                    setSlide(0);
                    setIsAutoPlaying(true);
                  }}
                >
                  {state}
                </CustomButton>
              ))}
            </div>

            {/* State Details */}
            <motion.div
              key={activeState}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-xl"
              style={{ 
                backgroundColor: colorScheme.surface,
                border: `1px solid ${colorScheme.primary}50`
              }}
            >
              <ExtraBoldText 
                fontSize="1.5rem"
                mdFontSize="1.75rem"
                style={{ color: colorScheme.accent }}
                className="mb-3"
              >
                {stateDetails[activeState].title}
              </ExtraBoldText>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke={colorScheme.primary} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <RegularText>{stateDetails[activeState].date}</RegularText>
                </div>
                
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke={colorScheme.primary} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <RegularText>{stateDetails[activeState].venue}</RegularText>
                </div>
              </div>
              
              <RegularText 
                style={{ color: colorScheme.textSecondary }}
                className="mb-5"
              >
                {stateDetails[activeState].description}
              </RegularText>
              
              <CustomButton
                onClick={openModal}
                variant="primary"
                size="lg"
                fullWidth
              >
                Get Event Updates
              </CustomButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Event Updates Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: `${colorScheme.background}90`, backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              className="rounded-2xl max-w-md w-full p-6 md:p-8"
              style={{ 
                backgroundColor: colorScheme.surface,
                border: `1px solid ${colorScheme.primary}50`
              }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <ExtraBoldText 
                    fontSize="1.5rem"
                    style={{ color: colorScheme.accent }}
                  >
                    Get Event Updates
                  </ExtraBoldText>
                  <div className="flex items-center mt-1">
                    <div 
                      className="px-3 py-1 rounded-full text-sm"
                      style={{ 
                        backgroundColor: `${colorScheme.primary}20`,
                        backdropFilter: 'blur(8px)'
                      }}
                    >
                      <RegularText>{selectedStateForModal}</RegularText>
                    </div>
                    <RegularText 
                      style={{ color: colorScheme.accent }}
                      className="ml-2 text-sm"
                    >
                      {stateDetails[selectedStateForModal]?.title}
                    </RegularText>
                  </div>
                </div>
                <CustomButton
                  onClick={() => setIsModalOpen(false)}
                  variant="icon"
                  size="sm"
                >
                  <svg className="w-6 h-6" fill="none" stroke={colorScheme.text} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </CustomButton>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block mb-2">
                    <RegularText className="font-medium">Full Name</RegularText>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: colorScheme.background,
                      border: `1px solid ${colorScheme.primary}`,
                      color: colorScheme.text
                    }}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="mb-8">
                  <label htmlFor="email" className="block mb-2">
                    <RegularText className="font-medium">Email Address</RegularText>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: colorScheme.background,
                      border: `1px solid ${colorScheme.primary}`,
                      color: colorScheme.text
                    }}
                    placeholder="Enter your email address"
                  />
                </div>
                
                <CustomButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  Subscribe for Updates
                </CustomButton>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};