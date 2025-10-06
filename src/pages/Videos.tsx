import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faPlayCircle,
  faVideo,
  faMusic,
  faMicrophoneAlt,
} from '@fortawesome/free-solid-svg-icons';
import VideoPlayerModal from '../components/videos/VideoPlayerModel';
import VideoCard from '../components/videos/VideoCard';
import PaginationControls from '../components/videos/PaginationControls';
import DiagonalSection from '../components/videos/DiagonalSection';
import { NewsletterForm } from '../components/util/Newsletter';
import { AudioMackComponent } from '../components/Homepage/AmazonMusic';
import { DownloadSection } from '../components/util/Download';
import { videos } from '../components/data/videosData';
import { LayoutTemplate } from '../components/util/hero';
import { SEO } from '../components/util/SEO';

import { useTheme } from '../contexts/ThemeContext';
import {
  LightText,
  ExtraBoldText,
  BoldText,
  SemiBoldText,
  AbrilFatFaceText,
  ShadowsText,
  UltraText,
  BricolageText,
} from '../components/ui/fonts/typography';
import CustomButton from '../components/ui/fonts/buttons/CustomButton';
import { Resize4, About1, Back1 } from '../assets/';

const VIDEOS_PER_PAGE = 6;

export const VideosData: React.FC = () => {
  const { colorScheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<
    'All' | 'Music Videos' | 'Visualizers' | 'Live Sessions'
  >('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const videoGridRef = useRef<HTMLDivElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const filteredVideos =
    activeCategory === 'All'
      ? videos
      : videos.filter(video => video.category === activeCategory);

  const totalPages = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE);
  const paginatedVideos = filteredVideos.slice(
    (currentPage - 1) * VIDEOS_PER_PAGE,
    currentPage * VIDEOS_PER_PAGE
  );

  const scrollToVideoGrid = () => {
    videoGridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Category icons mapping
  const categoryIcons = {
    All: faVideo,
    'Music Videos': faMusic,
    Visualizers: faPlayCircle,
    'Live Sessions': faMicrophoneAlt,
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: '#f8f9fa' }}
    >
      <SEO
        title="ClaudyGod Videos - Music Videos, Visualizers & Live Sessions"
        description="Watch ClaudyGod's music videos, visualizers, and live worship sessions. Experience the divine fusion of American Contemporary Christian Music and Afro-Gospel."
        keywords="claudygod videos, gospel music videos, worship sessions, christian music visualizers, live performances"
        canonical="https://claudygod.org/videos"
        image="https://claudygod.org/images/videos-og.jpg"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'VideoGallery',
          name: 'ClaudyGod Video Collection',
          description: 'Music videos, visualizers and live worship sessions',
          url: 'https://claudygod.org/videos',
          publisher: {
            '@type': 'Person',
            name: 'ClaudyGod',
          },
        }}
      />

      <VideoPlayerModal
        videoId={selectedVideoId}
        onClose={() => setSelectedVideoId(null)}
      />

      {/* Hero Section - Enhanced Responsiveness */}
      <LayoutTemplate
        backgroundImage={Back1}
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
            <AbrilFatFaceText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2rem, 8vw, 4.5rem)',
                lineHeight: '1.1',
                textShadow: '0 4px 12px rgba(0,0,0,0.8)',
                letterSpacing: '0.02em',
                marginBottom: '0.5rem',
              }}
              useThemeColor={false}
            >
              Videos
            </AbrilFatFaceText>
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
                letterSpacing: '0.01em',
              }}
              useThemeColor={false}
            >
              Experience the divine fusion of American Contemporary Christian
              Music and Afro-Gospel
            </SemiBoldText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-6 sm:mt-8"
          >
            <CustomButton
              onClick={scrollToVideoGrid}
              size="lg"
              className="transition-transform duration-300 ease-in-out hover:bg-white/20 text-white border-white border-2 px-4 sm:px-6 py-2 sm:py-3"
              style={{ backgroundColor: colorScheme.accent }}
            >
              <BoldText fontSize="clamp(0.875rem, 2vw, 1rem)">
                <span className="rounded-md inline-flex items-center gap-2">
                  Browse Videos
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </BoldText>
            </CustomButton>
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

      {/* Video Content */}
      <article className="w-full">
        {/* Section Header */}
        <section className="w-full py-8 sm:py-12 md:py-16">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="mb-8 sm:mb-12 md:mb-16 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-opacity-10 mb-6 sm:mb-8"
                style={{ backgroundColor: `${colorScheme.primary}20` }}
              >
                <FontAwesomeIcon
                  icon={faVideo}
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
                  VIDEO COLLECTION
                </LightText>
              </motion.div>

              {/* Main Title with Professional Font Combination */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mb-6 sm:mb-8"
              >
                <div className="flex flex-col items-center">
                  <AbrilFatFaceText
                    style={{
                      color: colorScheme.primary,
                      fontSize: 'clamp(1.75rem, 6vw, 3rem)',
                      lineHeight: '1.1',
                      marginBottom: '0.25rem',
                      letterSpacing: '0.02em',
                    }}
                    useThemeColor={false}
                  >
                    Worship Through
                  </AbrilFatFaceText>
                  <ShadowsText
                    style={{
                      color: colorScheme.accent,
                      fontSize: 'clamp(1.875rem, 6.5vw, 3.5rem)',
                      lineHeight: '1',
                      letterSpacing: '0.03em',
                    }}
                    useThemeColor={false}
                  >
                    Visual Media
                  </ShadowsText>
                </div>
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
                    letterSpacing: '0.01em',
                  }}
                  useThemeColor={false}
                >
                  Explore our collection of music videos, visualizers, and live
                  worship sessions that bring the gospel to life through
                  powerful visual storytelling
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

            {/* Diagonal Sections */}
            <section className="space-y-8 sm:space-y-12 md:space-y-20">
              <DiagonalSection
                title="Music Videos"
                description="Professionally produced music videos showcasing ClaudyGod's worship ministry"
                category="Music Videos"
                videos={videos}
                onExplore={() => {
                  setActiveCategory('Music Videos');
                  scrollToVideoGrid();
                }}
              />

              <DiagonalSection
                title="Visualizers"
                description="Mesmerizing audio visualizers that enhance your worship experience"
                category="Visualizers"
                videos={videos}
                reverse
                onExplore={() => {
                  setActiveCategory('Visualizers');
                  scrollToVideoGrid();
                }}
              />

              <DiagonalSection
                title="Live Sessions"
                description="Captivating live performances filled with spiritual energy"
                category="Live Sessions"
                videos={videos}
                onExplore={() => {
                  setActiveCategory('Live Sessions');
                  scrollToVideoGrid();
                }}
              />
            </section>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="w-full py-8 sm:py-12 md:py-16 text-center"
          style={{
            background: `linear-gradient(to right, ${colorScheme.primary}, ${colorScheme.secondary})`,
          }}
        >
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              <UltraText
                style={{
                  color: colorScheme.text,
                  fontSize: 'clamp(1.375rem, 4vw, 2.5rem)',
                  lineHeight: '1.2',
                  marginBottom: '1.5rem sm:mb-2rem',
                  letterSpacing: '0.02em',
                }}
                useThemeColor={false}
              >
                Explore Our Full Video Collection
              </UltraText>
              <CustomButton
                variant="primary"
                onClick={scrollToVideoGrid}
                className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base md:text-lg flex items-center mx-auto hover:scale-105 transition-transform duration-200"
                style={{
                  backgroundColor: colorScheme.white,
                  color: colorScheme.primary,
                }}
              >
                <BoldText className="flex items-center gap-2">
                  Browse All Videos
                  <FontAwesomeIcon icon={faArrowRight} />
                </BoldText>
              </CustomButton>
            </motion.div>
          </div>
        </section>

        {/* Video Grid Section */}
        <section
          ref={videoGridRef}
          className="w-full py-8 sm:py-12 md:py-16 lg:py-20"
          style={{
            background: `linear-gradient(to bottom, ${colorScheme.background}, ${colorScheme.gray[50]})`,
          }}
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 md:mb-16"
            >
              {(
                ['All', 'Music Videos', 'Visualizers', 'Live Sessions'] as const
              ).map(category => (
                <motion.div
                  key={category}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor:
                      hoveredCategory === category
                        ? colorScheme.primary
                        : colorScheme.gray[100],
                    color:
                      hoveredCategory === category
                        ? colorScheme.primary
                        : colorScheme.primary,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setHoveredCategory(category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <CustomButton
                    variant={
                      activeCategory === category ? 'primary' : 'secondary'
                    }
                    onClick={() => {
                      setActiveCategory(category);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-full flex items-center gap-2 text-xs sm:text-sm"
                  >
                    <BoldText className="flex items-center gap-1 sm:gap-2">
                      <FontAwesomeIcon
                        icon={categoryIcons[category]}
                        className="text-xs sm:text-sm"
                      />
                      <span className="hidden xs:inline">{category}</span>
                      <span className="xs:hidden">
                        {category === 'All'
                          ? 'All'
                          : category === 'Music Videos'
                            ? 'Music'
                            : category === 'Visualizers'
                              ? 'Visual'
                              : 'Live'}
                      </span>
                    </BoldText>
                  </CustomButton>
                </motion.div>
              ))}
            </motion.div>

            {/* Video Grid */}
            {paginatedVideos.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
              >
                {paginatedVideos.map(video => (
                  <VideoCard
                    key={video.id}
                    content={video}
                    onSelect={setSelectedVideoId}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                className="text-center py-8 sm:py-12 md:py-16"
              >
                <div
                  className="inline-block p-4 sm:p-6 rounded-full mb-4 sm:mb-6"
                  style={{ backgroundColor: colorScheme.gray[100] }}
                >
                  <FontAwesomeIcon
                    icon={faVideo}
                    className="text-2xl sm:text-3xl md:text-4xl"
                    style={{ color: colorScheme.primary }}
                  />
                </div>
                <UltraText
                  className="text-base sm:text-lg md:text-xl lg:text-2xl mb-3 sm:mb-4"
                  style={{ color: colorScheme.primary }}
                >
                  No videos found in this category
                </UltraText>
                <CustomButton
                  variant="text"
                  onClick={() => setActiveCategory('All')}
                  className="text-sm sm:text-base"
                >
                  <BoldText style={{ color: colorScheme.primary }}>
                    View all videos
                  </BoldText>
                </CustomButton>
              </motion.div>
            )}

            {/* Pagination */}
            {paginatedVideos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.3 }}
                className="mt-8 sm:mt-12 md:mt-16"
              >
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </motion.div>
            )}
          </div>
        </section>

        {/* Divider */}
        <div
          className="relative h-8 sm:h-12 md:h-16 lg:h-20"
          style={{
            backgroundColor: colorScheme.primary,
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: colorScheme.primary }}
          >
            <div
              className="w-12 sm:w-16 md:w-20 lg:w-24 h-1"
              style={{ backgroundColor: `${colorScheme.white}30` }}
            ></div>
          </div>
        </div>
      </article>

      {/* Additional Sections */}
      <AudioMackComponent />

      {/* Download Section */}
      <DownloadSection />

      {/* Newsletter Section */}
      <section
        className="w-full py-8 sm:py-12 md:py-16"
        style={{
          background: `linear-gradient(135deg, ${colorScheme.gray[50]}, ${colorScheme.gray[100]})`,
        }}
      >
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
};
