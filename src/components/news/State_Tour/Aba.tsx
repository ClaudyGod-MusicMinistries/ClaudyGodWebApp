// src/pages/tour/AbaTour.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LayoutTemplate } from '@/components/util/hero';
import {
  AbrilFatFaceText,
  ExtraBoldText,
  ExtraLightText,
  LightText,
  RegularText,
  SemiBoldText,
  ShadowsText,
} from '@/components/ui/fonts/typography';
import CustomButton from '@/components/ui/fonts/buttons/CustomButton';
import { useTheme } from '@/contexts/ThemeContext';
import { Footer } from '@/components/footer/footer';

// Import images
import {
  ph1,
  ph2,
  ph3,
  Aba1,
  Aba2,
  Glorious_ph,
  landing_1,
  landing_2,
} from '@/assets';

// Sample gallery images - you can add more
const galleryImages = [
  ph1,
  ph2,
  ph3,
  ph1, // Duplicates for demo - replace with actual images
  ph2,
  ph3,
  ph1,
  ph2,
];

// Slider images - add your Aba tour images here
const sliderImages = [Aba1, Aba2];

export const AbaTour: React.FC = () => {
  const { colorScheme } = useTheme();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBackToNews = () => {
    navigate('/news');
  };

  const openImageModal = (image: string) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % sliderImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      prev => (prev - 1 + sliderImages.length) % sliderImages.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <LayoutTemplate
        backgroundImage={landing_2}
        overlayColor="rgba(0,0,0,0.4)"
        backgroundPosition="center center"
        className="h-[60vh] min-h-[500px] sm:h-[70vh] sm:min-h-[600px] bg-cover"
        title={''}
      >
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center text-center w-full h-full px-4 mt-36 sm:mt-44 md:mt-56"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ExtraBoldText
            style={{
              color: '#fff',
              fontSize: 'clamp(1.2rem, 3.5vw, 2.2rem)', // consistent with Imo tour
              lineHeight: '1.2',
              textShadow: '0 3px 10px rgba(0,0,0,0.8)',
            }}
            useThemeColor={false}
          >
            Min. ClaudyGod Aba Worship Tour
          </ExtraBoldText>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-16 sm:w-20 h-1 mb-3 mx-auto rounded-full"
            style={{ backgroundColor: colorScheme.accent }}
          />

          <RegularText
            style={{
              color: '#ffffff',
              fontSize: 'clamp(0.85rem, 2.5vw, 1.05rem)', // smaller and balanced
              lineHeight: '1.6',
              textShadow: '0 2px 6px rgba(0,0,0,0.6)',
              maxWidth: '90%',
            }}
            useThemeColor={false}
          >
            Soul-Lifting Worship. Transformative Words.
          </RegularText>
        </motion.div>
      </LayoutTemplate>

      {/* Back Button */}
      <div className="container mx-auto px-4 sm:px-6 mt-8">
        <CustomButton
          style={{
            backgroundColor: 'transparent',
            color: colorScheme.primary,
            border: `2px solid ${colorScheme.primary}`,
          }}
          onClick={handleBackToNews}
          className="hover:bg-opacity-10 transition-all duration-200 mb-2"
        >
          ← Back to News
        </CustomButton>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
        {/* Section 1: Two Column Diagonal Layout with Slider */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Slider */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform lg:-rotate-3 lg:hover:rotate-0 transition-transform duration-500">
                {/* Image Slider */}
                <div className="relative h-96 lg:h-[500px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentSlide}
                      src={sliderImages[currentSlide]}
                      alt={`Aba Worship Experience ${currentSlide + 1}`}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  {/* Slide Info */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <SemiBoldText
                      style={{ color: '#ffffff' }}
                      className="text-xl"
                    >
                      Aba Worship Experience
                    </SemiBoldText>
                    <LightText
                      style={{ color: '#ffffff' }}
                      className="text-sm opacity-90"
                    >
                      {currentSlide + 1} of {sliderImages.length}
                    </LightText>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 hover:scale-110"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 hover:scale-110"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Dot Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {sliderImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? 'bg-white scale-125'
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4 sm:space-y-6"
            >
              <ExtraBoldText
                fontSize="1.75rem"
                smFontSize="2rem"
                lgFontSize="2.5rem"
                style={{ color: colorScheme.primary }}
                className="leading-tight"
              >
                Transforming Lives Through Worship
              </ExtraBoldText>

              <RegularText
                fontSize="0.875rem"
                smFontSize="1rem"
                lgFontSize="1.125rem"
                style={{ color: colorScheme.borderLight }}
                className="leading-relaxed"
              >
                The Min. Claudy Music Tour in Aba was a divine encounter that
                stirred hearts and rekindled faith. Hosted across various
                worship centers in the city, the atmosphere was saturated with
                God's presence from start to finish. Each moment of worship
                carried the fragrance of heaven, touching lives and igniting a
                fresh hunger for God's glory.
              </RegularText>

              <RegularText
                fontSize="0.875rem"
                smFontSize="1rem"
                lgFontSize="1.125rem"
                style={{ color: colorScheme.borderLight }}
                className="leading-relaxed"
              >
                We give all the glory to God for the outpouring of His Spirit
                and for using Min. Claudy and the entire team as vessels of
                revival and transformation. Truly, Aba witnessed a mighty move
                of God — a reminder that when Jesus is lifted high, lives are
                forever changed.
              </RegularText>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 2: Photo Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <ExtraBoldText
              fontSize="1.25rem"
              style={{ color: colorScheme.primary }}
              className="mb-4 text-base sm:text-lg md:text-xl lg:text-2xl"
            >
              Gallery Moments
            </ExtraBoldText>
            <LightText
              style={{ color: colorScheme.borderLight }}
              className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            >
              Capturing the powerful moments of worship, praise, and
              transformation from our Aba gatherings
            </LightText>
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8">
            <CustomButton
              style={{
                backgroundColor: colorScheme.accent,
                color: colorScheme.onPrimary,
              }}
              onClick={() => {
                /* Add load more functionality */
              }}
              className="hover:scale-105 transition-transform"
            >
              Load More Photos
            </CustomButton>
          </div>
        </motion.section>

        {/* Image Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeImageModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-4xl max-h-full"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={closeImageModal}
                className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors"
              >
                ✕
              </button>
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center py-12"
        >
          <div className="mb-4">
            <div className="mb-4">
              <RegularText
                fontSize="1.25rem"
                style={{ color: colorScheme.primary }}
                className="mb-4 text-base sm:text-lg md:text-xl"
              >
                Join Us for our{' '}
                <span className="font-shadows-into-light text-base sm:text-lg md:text-xl">
                  Next Music Tour
                </span>
              </RegularText>
            </div>
          </div>

          <LightText
            style={{ color: colorScheme.borderLight }}
            className="mb-6 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed"
          >
            Be part of the next worship experience in the Garden City.
            Experience God's presence in a unique way that transforms lives.
          </LightText>

          <div className="flex flex-wrap gap-4 justify-center">
            <CustomButton
              style={{
                backgroundColor: colorScheme.accent,
                color: colorScheme.onPrimary,
              }}
              onClick={() => window.open('/events', '_blank')}
              className="hover:scale-105 transition-transform"
            >
              View Event Schedule
            </CustomButton>
            <CustomButton
              style={{
                backgroundColor: 'transparent',
                color: colorScheme.accent,
                border: `2px solid ${colorScheme.accent}`,
              }}
              onClick={() => window.open('/volunteer', '_blank')}
              className="hover:scale-105 transition-transform"
            >
              Volunteer
            </CustomButton>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
