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
} from '../components/ui/fonts/typography';
import CustomButton from '../components/ui/fonts/buttons/CustomButton';
import { Resize4, Back3 } from '../assets/';

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
      style={{ backgroundColor: colorScheme.background }}
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

      {/* Hero Section */}
      <LayoutTemplate
        backgroundImage={Back3}
        overlayColor="rgba(0,0,0,0.55)"
        backgroundPosition="center center"
        className="h-[100vh] md:h-[100vh]"
        title={''}
      >
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-6"
          >
            <ExtraBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: '1.1',
                textShadow: '0 4px 8px rgba(0,0,0,0.6)',
                marginBottom: '1rem',
              }}
              useThemeColor={false}
            >
              Videos
            </ExtraBoldText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mb-8 mx-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-3xl"
          >
            <SemiBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                lineHeight: '1.4',
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
            className="mt-8"
          >
            <CustomButton
              onClick={scrollToVideoGrid}
              size="lg"
              className="transition-transform duration-300 ease-in-out hover:bg-white/20 text-white border-white border-2"
              style={{ backgroundColor: colorScheme.accent }}
            >
              <BoldText fontSize="1rem">
                <span className="p-3 rounded-md inline-flex items-center gap-2">
                  Browse Videos
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </BoldText>
            </CustomButton>
          </motion.div>
        </motion.div>
      </LayoutTemplate>

      {/* Video Content */}
      <article className="w-full">
        {/* Section Header */}
        <section className="w-full py-12 md:py-16">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="mb-12 md:mb-16 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-opacity-10 mb-6"
                style={{ backgroundColor: `${colorScheme.primary}20` }}
              >
                <FontAwesomeIcon
                  icon={faVideo}
                  style={{ color: colorScheme.primary }}
                />
                <LightText
                  style={{
                    color: colorScheme.primary,
                    fontSize: '0.875rem',
                    letterSpacing: '0.05em',
                  }}
                  useThemeColor={false}
                >
                  VIDEO COLLECTION
                </LightText>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <ExtraBoldText
                  style={{
                    color: colorScheme.primary,
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    lineHeight: '1.2',
                    marginBottom: '1rem',
                  }}
                  useThemeColor={false}
                >
                  Worship Through Visual Media
                </ExtraBoldText>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-4xl mx-auto"
              >
                <SemiBoldText
                  style={{
                    color: colorScheme.accent,
                    fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                    lineHeight: '1.6',
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
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-24 h-1 mx-auto mt-6 rounded-full"
                style={{ backgroundColor: colorScheme.accent }}
              />
            </header>

            {/* Diagonal Sections */}
            <section className="space-y-12 md:space-y-20">
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
          className="w-full py-16 text-center"
          style={{
            background: `linear-gradient(to right, ${colorScheme.primary}, ${colorScheme.secondary})`,
          }}
        >
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <CustomButton
                variant="primary"
                onClick={scrollToVideoGrid}
                className="px-8 py-4 text-lg md:text-xl flex items-center mx-auto"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: colorScheme.white,
                  color: colorScheme.primary,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <BoldText>
                  Explore Full Collection
                  <span className="ml-2">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </BoldText>
              </CustomButton>
            </motion.div>
          </div>
        </section>

        {/* Video Grid Section */}
        <section
          ref={videoGridRef}
          className="w-full py-16 md:py-24"
          style={{
            background: `linear-gradient(to bottom, ${colorScheme.background}, ${colorScheme.gray[50]})`,
          }}
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16"
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
                    className="px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-2 text-sm md:text-base"
                  >
                    <BoldText className="flex items-center gap-2">
                      <FontAwesomeIcon icon={categoryIcons[category]} />
                      <span>{category}</span>
                    </BoldText>
                  </CustomButton>
                </motion.div>
              ))}
            </motion.div>

            {/* Video Grid */}
            {paginatedVideos.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
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
                viewport={{ once: true }}
                className="text-center py-12"
              >
                <div
                  className="inline-block p-6 rounded-full mb-6"
                  style={{ backgroundColor: colorScheme.gray[100] }}
                >
                  <FontAwesomeIcon
                    icon={faVideo}
                    className="text-4xl"
                    style={{ color: colorScheme.primary }}
                  />
                </div>
                <ExtraBoldText
                  className="text-xl md:text-2xl mb-4"
                  style={{ color: colorScheme.primary }}
                >
                  No videos found in this category
                </ExtraBoldText>
                <CustomButton
                  variant="text"
                  onClick={() => setActiveCategory('All')}
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
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-12"
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
          className="relative h-16 md:h-24"
          style={{
            backgroundColor: colorScheme.primary,
          }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: colorScheme.primary }}
          >
            <div
              className="w-24 h-1"
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
        className="w-full py-12 md:py-16"
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
