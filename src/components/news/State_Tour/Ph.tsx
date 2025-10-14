// src/pages/tour/PortHarcourtTour.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LayoutTemplate } from '@/components/util/hero';
import {
  ExtraBoldText,
  RegularText,
  SemiBoldText,
  LightText,
} from '@/components/ui/fonts/typography';
import CustomButton from '@/components/ui/fonts/buttons/CustomButton';
import { useTheme } from '@/contexts/ThemeContext';
import { Footer } from '@/components/footer/footer';

// Import images
import {
  ph1,
  ph2,
  ph3,
  Tour1,
  Glorious_ph,
  Tour2,
  Tour3,
  ph10,
  ph11,
  ph12,
  ph13,
  ph14,
  ph6,
  ph8,
  ph9,
} from '@/assets';

// Categorized gallery images
const galleryCategories = [
  {
    title: 'ClaudyGod with Students',
    description:
      'Engaging with the next generation of worshippers in universities and youth gatherings across Port Harcourt.',
    images: [ph6, ph12, ph10],
  },
  {
    title: 'Worship Moments',
    description:
      'Powerful moments of praise and worship that transformed lives and brought heaven to earth.',
    images: [Tour2, Tour3],
  },
  {
    title: 'Min. ClaudyGod With Guests',
    description:
      'Collaborative moments with ministry partners and guest worshippers who joined our gatherings.',
    images: [ph14, ph13, ph1, ph3, ph11],
  },
  {
    title: 'Community Impact',
    description:
      'Touching lives beyond the worship center through outreach and community transformation programs.',
    images: [ph8, ph9],
  },
];

export const PortHarcourtTour: React.FC = () => {
  const { colorScheme } = useTheme();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleBackToNews = () => {
    navigate('/news');
  };

  const openImageModal = (image: string, category: string) => {
    setSelectedImage(image);
    setSelectedCategory(category);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <LayoutTemplate
        backgroundImage={Tour1} // dynamic per page
        overlayColor="rgba(0,0,0,0.45)" // slightly stronger overlay for readability
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
              color: '#ffffff',
              fontSize: 'clamp(1.2rem, 3.5vw, 2.2rem)', // responsive title
              lineHeight: '1.2',
              textShadow: '0 3px 10px rgba(0,0,0,0.8)',
              marginBottom: '1rem',
            }}
            useThemeColor={false}
          >
            Port Harcourt Worship Tour
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
              fontSize: 'clamp(0.85rem, 2.5vw, 1.05rem)', // readable subtitle
              lineHeight: '1.6',
              textShadow: '0 2px 6px rgba(0,0,0,0.6)',
              maxWidth: '90%',
            }}
            useThemeColor={false}
          >
            Experience vibrant worship in the Garden City where joy and
            thanksgiving overflow
          </RegularText>
        </motion.div>
      </LayoutTemplate>

      {/* Back Button */}
      <div className="container mx-auto px-4 sm:px-6 mt-6 sm:mt-8">
        <CustomButton
          style={{
            backgroundColor: 'transparent',
            color: colorScheme.primary,
            border: `2px solid ${colorScheme.primary}`,
          }}
          onClick={handleBackToNews}
          className="hover:bg-opacity-10 transition-all duration-200 mb-4 text-sm sm:text-base"
        >
          ← Back to News
        </CustomButton>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Section 1: Two Column Diagonal Layout with Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Column - Banner Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl transform lg:-rotate-2 lg:hover:rotate-0 transition-transform duration-500">
                <img
                  src={Glorious_ph}
                  alt="Port Harcourt Worship Gathering"
                  className="w-full h-64 sm:h-80 lg:h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <RegularText
                    fontSize="1rem"
                    smFontSize="1.05rem"
                    lgFontSize="1.25rem"
                    style={{ color: '#ffffff' }}
                    useThemeColor={false}
                  >
                    Very Glorious Concert - Min. ClaudyGod And Worship Team
                  </RegularText>
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
                Transforming Lives Through Worship in Port Harcourt
              </ExtraBoldText>

              <RegularText
                fontSize="0.875rem"
                smFontSize="1rem"
                lgFontSize="1.125rem"
                style={{ color: colorScheme.borderLight }}
                className="leading-relaxed"
              >
                Min. Claudy Music Tour in Port Harcourt was truly a move of God
                and a blessing to everyone who attended. From the first sound of
                worship to the final word of prayer, the presence of God filled
                the atmosphere with glory and peace. Lives were changed, hearts
                were renewed, and many encountered the love of Christ in a fresh
                way.
              </RegularText>

              <RegularText
                fontSize="0.875rem"
                smFontSize="1rem"
                lgFontSize="1.125rem"
                style={{ color: colorScheme.borderLight }}
                className="leading-relaxed"
              >
                We give all the glory to God for using Min. Claudy God and the
                team as instruments of revival and hope. Indeed, Port Harcourt
                experienced heaven on earth through worship that lifted Jesus
                above all.
              </RegularText>
            </motion.div>
          </div>

          {/* Updated HR Line */}
          <div className="mt-8 sm:mt-12 lg:mt-16 flex justify-center">
            <div
              className="w-48 h-px opacity-40"
              style={{ backgroundColor: colorScheme.borderLight }}
            />
          </div>
        </motion.section>

        {/* Section 2: Categorized Photo Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <div className="text-center mb-8 sm:mb-12">
            <ExtraBoldText
              fontSize="2rem"
              smFontSize="2.25rem"
              lgFontSize="2.5rem"
              style={{ color: colorScheme.primary }}
              className="mb-3 sm:mb-4"
            >
              Port Harcourt Gallery
            </ExtraBoldText>
            <RegularText
              fontSize="1rem"
              smFontSize="1.125rem"
              lgFontSize="1.25rem"
              style={{ color: colorScheme.borderDark }}
              className="max-w-2xl mx-auto leading-relaxed"
            >
              Relive the powerful moments of worship, connection, and
              transformation from our ministry in PortHarcourt
            </RegularText>
          </div>

          {/* Categorized Galleries */}
          <div className="space-y-12 sm:space-y-16">
            {galleryCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + categoryIndex * 0.1, duration: 0.6 }}
                className="space-y-6 sm:space-y-8"
              >
                {/* HR Line before each category (except first) */}
                {categoryIndex > 0 && (
                  <div className="flex justify-center">
                    <div
                      className="w-32 h-0.5 sm:h-1 rounded-full opacity-60"
                      style={{ backgroundColor: colorScheme.accent }}
                    />
                  </div>
                )}

                {/* Category Header */}
                <div className="text-center">
                  <SemiBoldText
                    fontSize="1.5rem"
                    smFontSize="1.625rem"
                    lgFontSize="1.75rem"
                    style={{ color: colorScheme.primary }}
                    className="mb-3 sm:mb-4"
                  >
                    {category.title}
                  </SemiBoldText>
                  <RegularText
                    fontSize="0.9375rem"
                    smFontSize="1rem"
                    lgFontSize="1.125rem"
                    style={{ color: colorScheme.borderLight }}
                    className="max-w-3xl mx-auto leading-relaxed"
                  >
                    {category.description}
                  </RegularText>
                </div>

                {/* Photo Grid for Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {category.images.map((image, imageIndex) => (
                    <motion.div
                      key={imageIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.3 + categoryIndex * 0.1 + imageIndex * 0.1,
                        duration: 0.5,
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -8,
                        transition: { duration: 0.3 },
                      }}
                      className="relative group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl"
                      onClick={() => openImageModal(image, category.title)}
                    >
                      {/* Image with Zoom Effect */}
                      <div className="relative overflow-hidden">
                        <img
                          src={image}
                          alt={`${category.title} moment ${imageIndex + 1}`}
                          className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Overlay with Text */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-3 sm:p-4">
                          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <SemiBoldText
                              fontSize="0.75rem"
                              smFontSize="0.875rem"
                              style={{ color: '#ffffff' }}
                              className="mb-1"
                              useThemeColor={false}
                            >
                              {category.title}
                            </SemiBoldText>
                            <LightText
                              fontSize="0.625rem"
                              smFontSize="0.75rem"
                              style={{ color: '#ffffff' }}
                              className="opacity-90"
                              useThemeColor={false}
                            >
                              Click to view full size
                            </LightText>
                          </div>
                        </div>

                        {/* Hover Zoom Icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <svg
                              className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Label (Visible Always) */}
                      <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm p-2 sm:p-3">
                        <LightText
                          fontSize="0.625rem"
                          smFontSize="0.75rem"
                          style={{ color: '#ffffff' }}
                          className="text-center"
                          useThemeColor={false}
                        >
                          {category.title}
                        </LightText>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8 sm:mt-12">
            <CustomButton
              style={{
                backgroundColor: colorScheme.accent,
                color: colorScheme.onPrimary,
              }}
              onClick={() => {
                /* Add load more functionality */
              }}
              className="hover:scale-105 transition-transform px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base"
            >
              View More Photos
            </CustomButton>
          </div>
        </motion.section>

        {/* Enhanced Image Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeImageModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeImageModal}
                className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 hover:scale-110"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Image Section - Full width on mobile, 2/3 on desktop */}
              <div className="flex-1 lg:flex-[2] bg-black flex items-center justify-center p-4 lg:p-8">
                <motion.img
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  src={selectedImage}
                  alt="Enlarged view"
                  className="max-w-full max-h-[50vh] lg:max-h-[80vh] w-auto h-auto object-contain"
                />
              </div>

              {/* Text Section - Hidden on mobile, 1/3 on desktop */}
              {selectedCategory && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="hidden lg:flex flex-col flex-1 p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white border-l border-gray-200"
                >
                  <div className="space-y-4">
                    {/* Category Title */}
                    <div>
                      <SemiBoldText
                        fontSize="1.5rem"
                        lgFontSize="1.75rem"
                        style={{ color: colorScheme.primary }}
                        className="mb-2 leading-tight"
                      >
                        {selectedCategory}
                      </SemiBoldText>
                      <div
                        className="w-12 h-1 rounded-full"
                        style={{ backgroundColor: colorScheme.accent }}
                      />
                    </div>

                    {/* Category Description */}
                    <RegularText
                      fontSize="0.875rem"
                      lgFontSize="1rem"
                      style={{ color: colorScheme.textSecondary }}
                      className="leading-relaxed"
                    >
                      {
                        galleryCategories.find(
                          cat => cat.title === selectedCategory
                        )?.description
                      }
                    </RegularText>

                    {/* Image Count and Info */}
                    <div className="pt-4 border-t border-gray-200">
                      <LightText
                        fontSize="0.75rem"
                        style={{ color: colorScheme.textSecondary }}
                        className="uppercase tracking-wide mb-2"
                      >
                        Gallery Information
                      </LightText>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <LightText
                            fontSize="0.75rem"
                            style={{ color: colorScheme.textSecondary }}
                          >
                            Total Images in Category:
                          </LightText>
                          <SemiBoldText
                            fontSize="0.75rem"
                            style={{ color: colorScheme.primary }}
                          >
                            {
                              galleryCategories.find(
                                cat => cat.title === selectedCategory
                              )?.images.length
                            }
                          </SemiBoldText>
                        </div>
                        <div className="flex items-center justify-between">
                          <LightText
                            fontSize="0.75rem"
                            style={{ color: colorScheme.textSecondary }}
                          >
                            Category:
                          </LightText>
                          <LightText
                            fontSize="0.75rem"
                            style={{ color: colorScheme.accent }}
                            className="font-medium"
                          >
                            {selectedCategory.split(' ')[0]}
                          </LightText>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Hint */}
                    <div className="pt-4">
                      <LightText
                        fontSize="0.625rem"
                        style={{ color: colorScheme.textSecondary }}
                        className="italic"
                      >
                        Click anywhere outside to close
                      </LightText>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Mobile Text Overlay */}
              {selectedCategory && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="lg:hidden bg-gradient-to-t from-black/80 to-transparent p-4 absolute bottom-0 left-0 right-0"
                >
                  <SemiBoldText
                    fontSize="1rem"
                    style={{ color: '#ffffff' }}
                    className="mb-1"
                    useThemeColor={false}
                  >
                    {selectedCategory}
                  </SemiBoldText>
                  <RegularText
                    fontSize="0.75rem"
                    style={{ color: '#ffffff' }}
                    className="opacity-90 line-clamp-2"
                    useThemeColor={false}
                  >
                    {
                      galleryCategories.find(
                        cat => cat.title === selectedCategory
                      )?.description
                    }
                  </RegularText>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center py-8 sm:py-12"
        >
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 max-w-4xl mx-auto">
            <SemiBoldText
              fontSize="1.5rem"
              smFontSize="1.75rem"
              lgFontSize="2rem"
              style={{ color: colorScheme.primary }}
              className="mb-4 sm:mb-6"
            >
              Join Our Next Worship Experience
            </SemiBoldText>
            <RegularText
              fontSize="0.875rem"
              smFontSize="1rem"
              lgFontSize="1.125rem"
              style={{ color: colorScheme.borderLight }}
              className="mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Be part of the transformative worship movement in Port Harcourt.
              Experience God's presence in ways that will change your life
              forever.
            </RegularText>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <CustomButton
                style={{
                  backgroundColor: colorScheme.accent,
                  color: colorScheme.onPrimary,
                }}
                onClick={() => window.open('/events', '_blank')}
                className="hover:scale-105 transition-transform px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base"
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
                className="hover:scale-105 transition-transform px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base"
              >
                Become a Volunteer
              </CustomButton>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
