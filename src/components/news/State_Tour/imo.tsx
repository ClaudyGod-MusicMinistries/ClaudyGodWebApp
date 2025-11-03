import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LayoutTemplate } from '@/components/util/hero';
import {
  ExtraBoldText,
  LightText,
  RegularText,
  SemiBoldText,
} from '@/components/ui/fonts/typography';
import CustomButton from '@/components/ui/fonts/buttons/CustomButton';
import { useTheme } from '@/contexts/ThemeContext';
import { Footer } from '@/components/footer/footer';

// Import Imo Tour Images (replace with your actual Imo tour assets)
import { ph1, ph2, ph3, landing_1, landing_2, owerri1 } from '@/assets';

const galleryImages = [ph1, ph2, ph3, ph1, ph2, ph3];
const sliderImages = [owerri1, landing_1];

export const ImoTour: React.FC = () => {
  const { colorScheme } = useTheme();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBackToNews = () => navigate('/news');
  const openImageModal = (img: string) => setSelectedImage(img);
  const closeImageModal = () => setSelectedImage(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide(prev => (prev + 1) % sliderImages.length);
  const prevSlide = () =>
    setCurrentSlide(
      prev => (prev - 1 + sliderImages.length) % sliderImages.length
    );
  const goToSlide = (i: number) => setCurrentSlide(i);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <LayoutTemplate
        backgroundImage={landing_2}
        overlayColor="rgba(0,0,0,0.45)" // slightly deeper for readability
        backgroundPosition="center center"
        className="h-[55vh] sm:h-[65vh] md:h-[75vh] bg-cover bg-no-repeat bg-center"
        title=""
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
              fontSize: 'clamp(1.2rem, 3.5vw, 2.2rem)', // smaller and responsive
              lineHeight: '1.2',
              textShadow: '0 3px 10px rgba(0,0,0,0.8)',
            }}
            useThemeColor={false}
          >
            Min. ClaudyGod Imo Worship Tour
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
              fontSize: 'clamp(0.85rem, 2.5vw, 1.05rem)', // smaller but still clear
              lineHeight: '1.6',
              textShadow: '0 2px 6px rgba(0,0,0,0.6)',
              maxWidth: '90%',
            }}
            useThemeColor={false}
          >
            A City Touched by God’s Power — Worship, Healing, and Revival
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
        {/* Worship Story Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          {/* Slider */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="relative h-96 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={sliderImages[currentSlide]}
                  alt={`Imo Worship Experience ${currentSlide + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              </AnimatePresence>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              {/* Slide Info */}
              <div className="absolute bottom-6 left-6">
                <SemiBoldText style={{ color: '#fff' }} className="text-lg">
                  Imo Worship Encounter
                </SemiBoldText>
                <LightText
                  style={{ color: '#fff' }}
                  className="text-sm opacity-80"
                >
                  {currentSlide + 1} of {sliderImages.length}
                </LightText>
              </div>

              {/* Navigation */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
              >
                ‹
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
              >
                ›
              </button>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-4"
          >
            <ExtraBoldText
              fontSize="1.5rem"
              smFontSize="1.75rem"
              lgFontSize="2rem"
              style={{ color: colorScheme.primary }}
            >
              God’s Mighty Move in Imo State
            </ExtraBoldText>

            <RegularText
              fontSize="0.875rem"
              smFontSize="1rem"
              lgFontSize="1.125rem"
              style={{ color: colorScheme.borderLight }}
              className="leading-relaxed"
            >
              The Min. Claudy Music Tour in Imo was a divine encounter that
              stirred hearts and rekindled faith. Hosted across various worship
              centers in the city, the atmosphere was saturated with God's
              presence from start to finish. Each moment of worship carried the
              fragrance of heaven, touching lives and igniting a fresh hunger
              for God's glory.
            </RegularText>

            <RegularText
              fontSize="0.875rem"
              smFontSize="1rem"
              lgFontSize="1.125rem"
              style={{ color: colorScheme.borderLight }}
              className="leading-relaxed"
            >
              We give all the glory to God for the outpouring of His Spirit and
              for using Min. Claudy and the entire team as vessels of revival
              and transformation. Truly, Imo State witnessed a mighty move of
              God — a reminder that when Jesus is lifted high, lives are forever
              changed.
            </RegularText>
          </motion.div>
        </motion.section>

        {/* Gallery Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mb-16"
        >
          <ExtraBoldText
            fontSize="1.25rem"
            style={{ color: colorScheme.primary }}
            className="mb-4 text-base sm:text-lg md:text-xl"
          >
            Gallery Moments
          </ExtraBoldText>
          <LightText
            style={{ color: colorScheme.borderLight }}
            className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto"
          >
            Capturing sacred moments of worship and joy during the Imo Tour.
          </LightText>

          {/* Load More */}
          <div className="mt-8">
            <CustomButton
              style={{
                backgroundColor: colorScheme.accent,
                color: colorScheme.onPrimary,
              }}
            >
              Load More Photos
            </CustomButton>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center py-12"
        >
          <RegularText
            fontSize="1.1rem"
            style={{ color: colorScheme.primary }}
            className="mb-4 text-base sm:text-lg md:text-xl"
          >
            Join Us for Our Next Music Tour
          </RegularText>
          <LightText
            style={{ color: colorScheme.borderLight }}
            className="mb-6 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed"
          >
            Don’t miss the next worship experience — a gathering where hearts
            connect deeply with God’s Spirit, and lives are changed forever.
          </LightText>

          <div className="flex flex-wrap justify-center gap-4">
            <CustomButton
              style={{
                backgroundColor: colorScheme.accent,
                color: colorScheme.onPrimary,
              }}
              onClick={() => window.open('/events', '_blank')}
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
            >
              Volunteer
            </CustomButton>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};
