// src/pages/tour/PortHarcourtTour.tsx
import React, { useState, useRef } from 'react';
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
import { FlexLayout } from '@/components/Layout/util/FlexBoxLayout';
import { GridLayout } from '@/components/Layout/util/GridboxLayout';
import { galleryCategories, teamMembers } from '@/components/data/newsData';
import { Glorious_ph, Tour1 } from '@/assets';

const SectionContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <section className={`py-8 sm:py-12 lg:py-16 ${className}`}>
    {children}
  </section>
);

const SectionHeader: React.FC<{
  title: string;
  subtitle: string;
  alignment?: 'left' | 'center';
}> = ({ title, subtitle, alignment = 'center' }) => {
  const { colorScheme } = useTheme();

  return (
    <div
      className={`${
        alignment === 'center' ? 'text-center' : 'text-left'
      } mb-8 lg:mb-12`}
    >
      <ExtraBoldText
        fontSize="1.875rem"
        smFontSize="2.25rem"
        lgFontSize="2.75rem"
        style={{ color: colorScheme.primary }}
        className="mb-2 tracking-tight"
      >
        {title}
      </ExtraBoldText>
      <RegularText
        fontSize="0.9375rem"
        smFontSize="1rem"
        lgFontSize="1.125rem"
        style={{ color: colorScheme.borderDark }}
        className="max-w-2xl mx-auto leading-relaxed px-4"
      >
        {subtitle}
      </RegularText>
    </div>
  );
};

export const PortHarcourtTour: React.FC = () => {
  const { colorScheme } = useTheme();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  /* ---------- Handlers ---------- */
  const handleBackToNews = () => navigate('/news');

  const openImageModal = (image: string, category: string) => {
    setSelectedImage(image);
    setSelectedCategory(category);
  };
  const closeImageModal = () => {
    setSelectedImage(null);
    setSelectedCategory(null);
  };

  const nextTeamMember = () => {
    setCurrentTeamIndex(i => (i + 1) % teamMembers.length);
  };
  const prevTeamMember = () => {
    setCurrentTeamIndex(i => (i - 1 + teamMembers.length) % teamMembers.length);
  };
  const goToTeamMember = (idx: number) => setCurrentTeamIndex(idx);

  /* ---------- Render ---------- */
  return (
    <div className="min-h-screen flex flex-col space-y-0">
      {/* ---------- Hero ---------- */}
      <LayoutTemplate
        backgroundImage={Tour1}
        overlayColor="rgba(0,0,0,0.45)"
        backgroundPosition="center center"
        className="h-[50vh] sm:h-[60vh] md:h-[70vh] bg-cover bg-no-repeat bg-center"
        title=""
      >
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center text-center w-full h-full px-4 mt-24 sm:mt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ExtraBoldText
            style={{
              color: '#fff',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              lineHeight: '1.1',
              textShadow: '0 4px 12px rgba(0,0,0,0.9)',
              marginBottom: '0.75rem',
            }}
            useThemeColor={false}
          >
            Port Harcourt Worship Tour
          </ExtraBoldText>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-16 sm:w-20 h-1 mb-2 mx-auto rounded-full"
            style={{ backgroundColor: colorScheme.accent }}
          />

          <RegularText
            style={{
              color: '#fff',
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              lineHeight: '1.5',
              textShadow: '0 2px 8px rgba(0,0,0,0.7)',
              maxWidth: '90%',
            }}
            useThemeColor={false}
          >
            Experience vibrant worship in the Garden City where joy and
            thanksgiving overflow
          </RegularText>
        </motion.div>
      </LayoutTemplate>

      {/* ---------- Back Button ---------- */}
      <div className="container mx-auto px-4 sm:px-6 mt-4">
        <CustomButton
          style={{
            backgroundColor: 'transparent',
            color: colorScheme.primary,
            border: `2px solid ${colorScheme.primary}`,
          }}
          onClick={handleBackToNews}
          className="hover:bg-opacity-10 transition-all duration-200 text-sm sm:text-base"
        >
          ← Back to News
        </CustomButton>
      </div>

      {/* ---------- Main Content ---------- */}
      <main className="flex-grow">
        {/* ---- Section 1: Two Column ---- */}
        <SectionContainer className="border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6">
            <GridLayout cols={1} mdCols={2} gap="6" className="items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="order-2 md:order-1"
              >
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={Glorious_ph}
                    alt="Port Harcourt Worship Gathering"
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <RegularText
                      fontSize="0.875rem"
                      smFontSize="1rem"
                      style={{ color: '#fff' }}
                      useThemeColor={false}
                    >
                      Very Glorious Concert - Min. ClaudyGod And Worship Team
                    </RegularText>
                  </div>
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="order-1 md:order-2 space-y-4"
              >
                <ExtraBoldText
                  fontSize="1.5rem"
                  smFontSize="1.75rem"
                  lgFontSize="2rem"
                  style={{ color: colorScheme.primary }}
                  className="leading-tight"
                >
                  Transforming Lives Through Worship in Port Harcourt
                </ExtraBoldText>

                <FlexLayout direction="col" gap="3">
                  <RegularText
                    fontSize="0.875rem"
                    smFontSize="1rem"
                    lgFontSize="1.125rem"
                    style={{ color: colorScheme.borderLight }}
                    className="leading-relaxed"
                  >
                    The Min. Claudy Music Tour in Port Harcourt was a divine
                    encounter that stirred hearts and rekindled faith. Hosted
                    across various worship centers in the city, the atmosphere
                    was saturated with God's presence from start to finish.
                  </RegularText>

                  <RegularText
                    fontSize="0.875rem"
                    smFontSize="1rem"
                    lgFontSize="1.125rem"
                    style={{ color: colorScheme.borderLight }}
                    className="leading-relaxed"
                  >
                    Each moment of worship carried the fragrance of heaven,
                    touching lives and igniting a fresh hunger for God's glory.
                    We give all the glory to God for the outpouring of His
                    Spirit and for using Min. Claudy and the entire team as
                    vessels of revival and transformation.
                  </RegularText>
                </FlexLayout>
              </motion.div>
            </GridLayout>
          </div>
        </SectionContainer>

        {/* ---- Section 2: Gallery ---- */}
        <SectionContainer className="bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <SectionHeader
              title="Port Harcourt Gallery"
              subtitle="Relive the powerful moments of worship, connection, and transformation from our ministry in Port Harcourt"
            />

            <div className="space-y-10 lg:space-y-14">
              {galleryCategories.map((cat, cIdx) => (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + cIdx * 0.1, duration: 0.6 }}
                  className="space-y-5"
                >
                  <FlexLayout direction="col" align="center" gap="2">
                    <SemiBoldText
                      fontSize="1.25rem"
                      smFontSize="1.5rem"
                      lgFontSize="1.75rem"
                      style={{ color: colorScheme.primary }}
                      className="text-center px-4"
                    >
                      {cat.title}
                    </SemiBoldText>
                    <RegularText
                      fontSize="0.875rem"
                      smFontSize="1rem"
                      lgFontSize="1.125rem"
                      style={{ color: colorScheme.borderLight }}
                      className="text-center max-w-3xl leading-relaxed px-4"
                    >
                      {cat.description}
                    </RegularText>
                  </FlexLayout>

                  <GridLayout cols={2} smCols={3} lgCols={4} gap="4">
                    {cat.images.map((img, iIdx) => (
                      <motion.div
                        key={iIdx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.3 + cIdx * 0.1 + iIdx * 0.05,
                          duration: 0.4,
                        }}
                        whileHover={{ scale: 1.03 }}
                        className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md bg-white"
                        onClick={() => openImageModal(img, cat.title)}
                      >
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={img}
                            alt={`${cat.title} ${iIdx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end">
                            <div className="w-full p-2 bg-gradient-to-t from-black/70 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                              <LightText
                                fontSize="0.7rem"
                                style={{ color: '#fff' }}
                                className="text-center opacity-0 group-hover:opacity-100 transition-opacity"
                                useThemeColor={false}
                              >
                                Click to view
                              </LightText>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </GridLayout>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <CustomButton
                style={{
                  backgroundColor: colorScheme.accent,
                  color: colorScheme.onPrimary,
                }}
                onClick={() => {}}
                className="hover:scale-105 transition-transform px-5 py-2 text-sm"
              >
                View More Photos
              </CustomButton>
            </div>
          </div>
        </SectionContainer>

        {/* ---- Section 3: Team Carousel (Mobile = Horizontal Scroll) ---- */}
        <SectionContainer>
          <div className="container mx-auto px-4 sm:px-6">
            <SectionHeader
              title="Our Dedicated Team"
              subtitle="The passionate individuals who made the Port Harcourt Worship Tour an unforgettable experience"
            />

            {/* Desktop – slide animation */}
            <div className="hidden lg:block relative max-w-6xl mx-auto">
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="relative h-[560px]">
                  {teamMembers.map((member, idx) => (
                    <motion.div
                      key={member.id}
                      initial={{
                        opacity: 0,
                        x: idx === currentTeamIndex ? 100 : -100,
                      }}
                      animate={{
                        opacity: idx === currentTeamIndex ? 1 : 0,
                        x:
                          idx === currentTeamIndex
                            ? 0
                            : idx < currentTeamIndex
                              ? -100
                              : 100,
                      }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="absolute inset-0 flex flex-row"
                    >
                      {/* Image */}
                      <div className="w-1/2 relative overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="w-1/2 p-8 flex flex-col justify-center">
                        <SemiBoldText
                          fontSize="1.875rem"
                          style={{ color: colorScheme.primary }}
                          className="mb-2"
                        >
                          {member.name}
                        </SemiBoldText>
                        <div
                          className="inline-block px-5 py-1.5 rounded-full border-2 mb-4"
                          style={{
                            borderColor: colorScheme.accent,
                            color: colorScheme.accent,
                          }}
                        >
                          <RegularText
                            fontSize="0.9375rem"
                            className="font-semibold"
                          >
                            {member.role}
                          </RegularText>
                        </div>
                        <RegularText
                          fontSize="1rem"
                          style={{ color: colorScheme.borderLight }}
                          className="leading-relaxed"
                        >
                          {member.description}
                        </RegularText>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Nav arrows */}
                <button
                  onClick={prevTeamMember}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:scale-110 transition-all z-10"
                  style={{ color: colorScheme.primary }}
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextTeamMember}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:scale-110 transition-all z-10"
                  style={{ color: colorScheme.primary }}
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {teamMembers.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToTeamMember(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === currentTeamIndex ? 'scale-125' : 'bg-gray-300'
                      }`}
                      style={{
                        backgroundColor:
                          i === currentTeamIndex
                            ? colorScheme.accent
                            : undefined,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile – Horizontal scroll snap */}
            <div className="lg:hidden">
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4"
                style={{ scrollSnapType: 'x mandatory' }}
              >
                {teamMembers.map((member, idx) => (
                  <div
                    key={member.id}
                    className="snap-center shrink-0 w-[85vw] sm:w-[70vw] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                  >
                    <div className="flex flex-col h-full">
                      {/* Image */}
                      <div className="h-48 relative overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-grow justify-center">
                        <SemiBoldText
                          fontSize="1.5rem"
                          style={{ color: colorScheme.primary }}
                          className="mb-1"
                        >
                          {member.name}
                        </SemiBoldText>
                        <div
                          className="inline-block px-4 py-1 rounded-full border-2 mb-3"
                          style={{
                            borderColor: colorScheme.accent,
                            color: colorScheme.accent,
                          }}
                        >
                          <RegularText
                            fontSize="0.875rem"
                            className="font-semibold"
                          >
                            {member.role}
                          </RegularText>
                        </div>
                        <RegularText
                          fontSize="0.875rem"
                          style={{ color: colorScheme.borderLight }}
                          className="leading-relaxed"
                        >
                          {member.description}
                        </RegularText>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile dots */}
              <div className="flex justify-center gap-2 mt-4">
                {teamMembers.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const el = scrollContainerRef.current?.children[
                        i
                      ] as HTMLElement;
                      el?.scrollIntoView({
                        behavior: 'smooth',
                        inline: 'center',
                      });
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentTeamIndex ? 'scale-125' : 'bg-gray-300'
                    }`}
                    style={{
                      backgroundColor:
                        i === currentTeamIndex ? colorScheme.accent : undefined,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* ---- Image Modal ---- */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeImageModal}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl lg:max-w-6xl max-h-[90vh] bg-white rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={closeImageModal}
                className="absolute top-2 right-2 lg:top-4 lg:right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 lg:p-2 transition-all hover:scale-110"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex-1 lg:flex-[2] bg-black flex items-center justify-center p-2 lg:p-6">
                <motion.img
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={selectedImage}
                  alt="Enlarged"
                  className="max-w-full max-h-[40vh] lg:max-h-[80vh] object-contain"
                />
              </div>

              {selectedCategory && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="hidden lg:flex flex-col flex-1 p-6 bg-white border-l border-gray-200"
                >
                  <SemiBoldText
                    fontSize="1.25rem"
                    style={{ color: colorScheme.primary }}
                    className="mb-2"
                  >
                    {selectedCategory}
                  </SemiBoldText>
                  <div
                    className="w-10 h-1 rounded-full mb-3"
                    style={{ backgroundColor: colorScheme.accent }}
                  />
                  <RegularText
                    fontSize="0.875rem"
                    style={{ color: colorScheme.textSecondary }}
                    className="leading-relaxed"
                  >
                    {
                      galleryCategories.find(c => c.title === selectedCategory)
                        ?.description
                    }
                  </RegularText>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ---- CTA ---- */}
        <SectionContainer className="bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6">
            <FlexLayout
              direction="col"
              align="center"
              gap="4"
              className="text-center"
            >
              <SemiBoldText
                fontSize="1.5rem"
                smFontSize="1.75rem"
                lgFontSize="2rem"
                style={{ color: '#fff' }}
                useThemeColor={false}
              >
                Join Our Next Worship Experience
              </SemiBoldText>
              <RegularText
                fontSize="0.875rem"
                smFontSize="1rem"
                lgFontSize="1.125rem"
                style={{ color: '#fff' }}
                className="max-w-2xl leading-relaxed opacity-90 px-4"
                useThemeColor={false}
              >
                Be part of the transformative worship movement in Port Harcourt.
                Experience God's presence in ways that will change your life
                forever.
              </RegularText>
              <FlexLayout gap="3" className="flex-wrap justify-center">
                <CustomButton
                  style={{
                    backgroundColor: colorScheme.accent,
                    color: colorScheme.onPrimary,
                  }}
                  onClick={() => window.open('/events', '_blank')}
                  className="hover:scale-105 transition-transform px-5 py-2 text-sm"
                >
                  View Event Schedule
                </CustomButton>
                <CustomButton
                  style={{
                    backgroundColor: 'transparent',
                    color: '#fff',
                    border: `2px solid #fff`,
                  }}
                  onClick={() => window.open('/volunteer', '_blank')}
                  className="hover:scale-105 transition-transform px-5 py-2 text-sm"
                >
                  Become a Volunteer
                </CustomButton>
              </FlexLayout>
            </FlexLayout>
          </div>
        </SectionContainer>
      </main>

      <Footer />
    </div>
  );
};
