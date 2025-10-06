/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faTimes,
  faChevronLeft,
  faChevronRight,
  faBookBible,
  faHeadphones,
  faQuoteRight,
} from '@fortawesome/free-solid-svg-icons';
import { LayoutTemplate } from '../components/util/hero';
import { NewsletterForm } from '../components/util/Newsletter';
import { About1 } from '../assets/';
import { teachingsData, TeachingType } from '../components/data/MinistryData';
import { DonationCallToAction } from '../components/util/DonationSupport';
import {
  BoldText,
  ExtraBoldText,
  LightText,
  RegularText,
  SemiBoldText,
} from '../components/ui/fonts/typography';
import CustomButton from '../components/ui/fonts/buttons/CustomButton';
import { useTheme } from '../contexts/ThemeContext';
import { SEO } from '../components/util/SEO';

const VideoCard = ({
  content,
  onClick,
}: {
  content: TeachingType;
  onClick: () => void;
}) => {
  const { colorScheme } = useTheme();

  return (
    <motion.div
      className="relative cursor-pointer group overflow-hidden rounded-lg sm:rounded-xl shadow-lg flex flex-col h-full"
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={`https://img.youtube.com/vi/${content.youtubeId}/hqdefault.jpg`}
          alt={content.title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2"
            style={{
              backgroundColor: `${colorScheme.textSecondary}20`,
              backdropFilter: 'blur(8px)',
              borderColor: `${colorScheme.textSecondary}30`,
            }}
          >
            <FontAwesomeIcon
              icon={faPlay}
              className="text-sm sm:text-base md:text-lg pl-0.5 sm:pl-1"
              style={{ color: colorScheme.text }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex flex-col justify-between flex-1 p-3 sm:p-4"
        style={{ backgroundColor: colorScheme.surface }}
      >
        {/* Top row */}
        <div className="flex items-center justify-between mb-2">
          <LightText
            className="px-2 py-0.5 rounded-full truncate max-w-[50%] text-xs"
            style={{
              color: colorScheme.text,
              backgroundColor: `${colorScheme.primary}20`,
            }}
          >
            {content.scripture}
          </LightText>

          <LightText
            className="truncate max-w-[45%] text-xs"
            style={{ color: colorScheme.gray[300] }}
          >
            {content.date}
          </LightText>
        </div>

        {/* Title */}
        <BoldText
          className="text-sm sm:text-base font-semibold line-clamp-2 mb-1"
          style={{ color: colorScheme.text }}
        >
          {content.title}
        </BoldText>

        {/* Teacher */}
        <LightText
          className="text-xs sm:text-sm truncate"
          style={{ color: colorScheme.accent }}
        >
          {content.teacher}
        </LightText>
      </div>
    </motion.div>
  );
};

/* ---------- VIDEO MODAL ---------- */
const VideoModal = ({
  videoId,
  onClose,
}: {
  videoId: string | null;
  onClose: () => void;
}) => {
  const { colorScheme } = useTheme();
  if (!videoId) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
        style={{
          backgroundColor: `${colorScheme.background}90`,
          backdropFilter: 'blur(8px)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={e => e.stopPropagation()}
        >
          <CustomButton
            onClick={onClose}
            variant="icon"
            size="sm"
            className="absolute -top-8 sm:-top-10 md:-top-12 right-0 z-10"
          >
            <FontAwesomeIcon icon={faTimes} className="text-sm sm:text-base" />
          </CustomButton>

          <div
            className="aspect-video w-full rounded-lg sm:rounded-xl overflow-hidden shadow-2xl"
            style={{ border: `1px solid ${colorScheme.primary}50` }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            ></iframe>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ---------- PAGINATION DOTS ---------- */
const PaginationDots = ({
  totalSlides,
  currentSlide,
  setCurrentSlide,
  colorScheme,
}: {
  totalSlides: number;
  currentSlide: number;
  setCurrentSlide: (index: number) => void;
  colorScheme: any;
}) => {
  const maxDots = 5;
  const startIndex = Math.floor(currentSlide / maxDots) * maxDots;
  const endIndex = Math.min(startIndex + maxDots, totalSlides);

  return (
    <div className="flex space-x-1">
      {Array.from({ length: endIndex - startIndex }).map((_, i) => {
        const slideIndex = startIndex + i;
        return (
          <button
            key={slideIndex}
            onClick={() => setCurrentSlide(slideIndex)}
            className="w-2 h-2 rounded-full transition-colors"
            style={{
              backgroundColor:
                slideIndex === currentSlide
                  ? colorScheme.primary
                  : colorScheme.textSecondary,
            }}
          />
        );
      })}
    </div>
  );
};

/* ---------- MINISTRY DATA PAGE ---------- */
export const MinistryData = () => {
  const { colorScheme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setItemsPerPage(4);
      else if (window.innerWidth >= 1024) setItemsPerPage(3);
      else if (window.innerWidth >= 768) setItemsPerPage(2);
      else setItemsPerPage(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(teachingsData.length / itemsPerPage);
  const nextSlide = () =>
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  const visibleItems = teachingsData.slice(
    currentSlide * itemsPerPage,
    (currentSlide + 1) * itemsPerPage
  );

  return (
    <div style={{ backgroundColor: colorScheme.background }}>
      <SEO
        title="ClaudyGod Teachings & Podcasts - Spiritual Guidance & Ministry"
        description="Explore spiritual teachings, podcasts, and ministry content from ClaudyGod. Deepen your faith through biblical teachings and worship sessions."
        keywords="claudygod teachings, gospel podcasts, spiritual guidance, bible study, ministry content, christian teachings"
        canonical="https://claudygod.org/teachings"
        image="https://claudygod.org/images/teachings-og.jpg"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'ClaudyGod Teachings & Podcasts',
          description: 'Spiritual teachings and ministry content',
          url: 'https://claudygod.org/teachings',
          publisher: {
            '@type': 'Person',
            name: 'ClaudyGod',
          },
        }}
      />

      <VideoModal
        videoId={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      {/* Hero Section - Enhanced Responsiveness */}
      <LayoutTemplate
        backgroundImage={About1}
        overlayColor="rgba(0,0,0,0.55)"
        backgroundPosition="center center"
        className="h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-[100vh] min-h-[500px]"
        title={''}
      >
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center text-center w-full h-full px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            <ExtraBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2rem, 8vw, 4.5rem)',
                lineHeight: '1.1',
                textShadow: '0 4px 12px rgba(0,0,0,0.8)',
                marginBottom: '0.5rem',
              }}
              useThemeColor={false}
            >
              Teachings & Podcasts
            </ExtraBoldText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mb-4 sm:mb-6 md:mb-8 mx-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <SemiBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.125rem, 4vw, 1.75rem)',
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                lineHeight: '1.4',
              }}
              useThemeColor={false}
            >
              Spiritual teachings and podcasts from Min. ClaudyGod
            </SemiBoldText>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-5 h-8 border-2 border-white rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-2 bg-white rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </LayoutTemplate>

      {/* Ministry Content */}
      <article className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Section Header */}
        <header className="mb-8 sm:mb-12 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-opacity-10 mb-4 sm:mb-6"
            style={{ backgroundColor: `${colorScheme.primary}20` }}
          >
            <FontAwesomeIcon
              icon={faBookBible}
              style={{ color: colorScheme.primary }}
              className="text-sm sm:text-base"
            />
            <LightText
              style={{
                color: colorScheme.primary,
                fontSize: 'clamp(0.75rem, 3vw, 0.875rem)',
                letterSpacing: '0.05em',
              }}
              useThemeColor={false}
            >
              SPIRITUAL TEACHINGS
            </LightText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ExtraBoldText
              style={{
                color: colorScheme.primary,
                fontSize: 'clamp(1.75rem, 6vw, 3rem)',
                lineHeight: '1.1',
                marginBottom: '0.75rem',
              }}
              useThemeColor={false}
            >
              Min. ClaudyGod Teachings & Podcasts
            </ExtraBoldText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <SemiBoldText
              style={{
                color: colorScheme.accent,
                fontSize: 'clamp(1rem, 3vw, 1.375rem)',
                lineHeight: '1.5',
              }}
              useThemeColor={false}
            >
              Minister Claudy's passion for sharing the Gospel radiates through
              both her writing and speaking. As a gospel artist, devoted
              teacher, and lover of God, she has also shared her inspiring
              presence on national television.
            </SemiBoldText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-16 sm:w-20 md:w-24 h-1 mx-auto mt-4 sm:mt-6 rounded-full"
            style={{ backgroundColor: colorScheme.accent }}
          />
        </header>

        {/* Quote Section */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="relative my-8 sm:my-12 md:my-16 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${colorScheme.gray[900]}, ${colorScheme.gray[800]})`,
            border: `1px solid ${colorScheme.gray[700]}`,
          }}
        >
          <div
            className="absolute top-3 sm:top-4 right-3 sm:right-4 text-2xl sm:text-3xl md:text-4xl opacity-20"
            style={{ color: colorScheme.accent }}
          >
            <FontAwesomeIcon icon={faQuoteRight} />
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start">
              <FontAwesomeIcon
                icon={faHeadphones}
                className="mt-0.5 sm:mt-1 mr-3 sm:mr-4 text-base sm:text-lg"
                style={{ color: colorScheme.accent }}
              />
              <LightText
                style={{
                  color: 'white',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1.375rem)',
                  lineHeight: '1.6',
                  fontStyle: 'italic',
                }}
                useThemeColor={false}
              >
                The word of God is living and active, sharper than any
                double-edged sword. Through these teachings, may your faith be
                strengthened and your spirit renewed.
              </LightText>
            </div>
            <SemiBoldText
              style={{
                textAlign: 'right',
                marginTop: '0.75rem sm:1rem',
                color: colorScheme.primary,
                fontSize: '0.875rem sm:1rem',
              }}
              useThemeColor={false}
            >
              - Minister ClaudyGod
            </SemiBoldText>
          </div>
        </motion.blockquote>

        {/* Video Grid Section */}
        <section className="mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {visibleItems.map(content => (
              <VideoCard
                key={content.id}
                content={content}
                onClick={() => setSelectedVideo(content.youtubeId)}
              />
            ))}
          </motion.div>

          {totalSlides > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center mt-8 sm:mt-12"
            >
              <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6">
                <CustomButton
                  onClick={prevSlide}
                  variant="icon"
                  size="sm md:lg"
                  disabled={currentSlide === 0}
                  style={{
                    backgroundColor: colorScheme.surface,
                    color:
                      currentSlide === 0
                        ? colorScheme.textSecondary
                        : colorScheme.primary,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="text-sm sm:text-base"
                  />
                </CustomButton>

                <PaginationDots
                  totalSlides={totalSlides}
                  currentSlide={currentSlide}
                  setCurrentSlide={setCurrentSlide}
                  colorScheme={colorScheme}
                />

                <CustomButton
                  onClick={nextSlide}
                  variant="icon"
                  size="sm md:lg"
                  disabled={currentSlide === totalSlides - 1}
                  style={{
                    backgroundColor: colorScheme.surface,
                    color:
                      currentSlide === totalSlides - 1
                        ? colorScheme.textSecondary
                        : colorScheme.primary,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-sm sm:text-base"
                  />
                </CustomButton>
              </div>
            </motion.div>
          )}
        </section>
      </article>

      {/* Donation Section */}
      <section className="my-8 sm:my-12 md:my-16">
        <DonationCallToAction
          title="Partner with Our Ministry"
          subtitle="Your Support Makes a Difference"
          description="Join us in spreading the gospel through music. Your generous donations help fund worship events, album productions, and global outreach efforts. Every contribution directly impacts lives and advances God's kingdom."
          goFundMeUrl="https://www.gofundme.com/charity/claudygod-music-ministries/donate"
          donateUrl="/donate"
        />
      </section>

      {/* Newsletter Section */}
      <section
        className="py-8 sm:py-12 md:py-16"
        style={{
          background: `linear-gradient(to right, ${colorScheme.primary}, ${colorScheme.accent})`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <ExtraBoldText
              fontSize="clamp(1.5rem, 4vw, 2.5rem)"
              style={{ color: colorScheme.text }}
              className="mb-4 sm:mb-6"
            >
              Stay Connected With Our Ministry
            </ExtraBoldText>
            <RegularText
              fontSize="clamp(0.9rem, 2vw, 1.125rem)"
              style={{ color: colorScheme.textSecondary }}
              className="mb-6 sm:mb-8 max-w-2xl mx-auto"
            >
              Subscribe to receive updates on new teachings, podcasts, and
              ministry events
            </RegularText>
            <NewsletterForm />
          </motion.div>
        </div>
      </section>
    </div>
  );
};
