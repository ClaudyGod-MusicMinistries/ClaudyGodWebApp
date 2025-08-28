import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRight, 
  faPlayCircle,
  faVideo,
  faMusic,
  faMicrophoneAlt
} from '@fortawesome/free-solid-svg-icons';
import VideoPlayerModal from '../components/videos/VideoPlayerModel';
import VideoCard from '../components/videos/VideoCard';
import PaginationControls from '../components/videos/PaginationControls';
import DiagonalSection from '../components/videos/DiagonalSection';
import { NewsletterForm } from '../components/util/Newsletter';
import { AudioMackComponent } from '../components/Homepage/AmazonMusic';
import { DownloadSection } from '../components/util/Download';
import { videos } from '../components/data/videosData';
// import { DonationCallToAction } from '../components/util/DonationSupport';

import { useTheme } from '../contexts/ThemeContext';
import { 
 
  LightText,
  ExtraBoldText,
  BoldText
} from '../components/ui/fonts/typography';
import CustomButton from '../components/ui/fonts/buttons/CustomButton';

const VIDEOS_PER_PAGE = 6;

export const VideosData: React.FC = () => {
  const { colorScheme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<'All' | 'Music Videos' | 'Visualizers' | 'Live Sessions'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const videoGridRef = useRef<HTMLDivElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const filteredVideos = activeCategory === 'All' 
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
    'All': faVideo,
    'Music Videos': faMusic,
    'Visualizers': faPlayCircle,
    'Live Sessions': faMicrophoneAlt
  };

  return (
    <div >
      {/* Enhanced Hero Section */}
      <motion.section 
        className="pt-32 pb-24  relative"
        style={{
          background: `linear-gradient(to bottom right, 
          ${colorScheme.background}, ${colorScheme.background})`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 relative">
          {/* Decorative elements */}
          <div 
            className="absolute top-0 left-0 w-full h-full opacity-10"
            style={{ 
              backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}
          ></div>
          <div 
            className="absolute top-10 right-10 text-9xl"
            style={{color: `${colorScheme.accent}30` }}
          >
            <FontAwesomeIcon icon={faVideo} />
          </div>
          
          <motion.div 
            className="relative z-10 max-w-4xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
               <ExtraBoldText fontSize='3rem' style={{ color: colorScheme.gray[300] }}>
                       Videos
               </ExtraBoldText>
            </motion.div>
            
            <motion.div 
              className="h-1 mb-8"
              style={{
                background: `linear-gradient(to right, ${colorScheme.primary}, ${colorScheme.secondary})`,
                width: '6rem'
              }}
              initial={{ width: 0 }}
              animate={{ width: '6rem' }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <LightText className="text-lg md:text-xl max-w-2xl mb-10">
                Experience the divine fusion of American Contemporary Christian Music and Afro-Gospel Songs through ClaudyGod's Inspirational Journey.
              </LightText>
            </motion.div>
            
           <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.8, duration: 0.8 }}
>
  <CustomButton
    onClick={scrollToVideoGrid}
    size="lg"
    className="transition-transform duration-300 ease-in-out
               bg-transparent hover:bg-indigo-100
               text-indigo-700 hover:text-indigo-900"
    style={{ backgroundColor: 'transparent' }}
  >
    <BoldText fontSize="1rem">
      <span className="p-3 rounded-md inline-flex items-center gap-2">
        Browse more videos
        <FontAwesomeIcon icon={faArrowRight} />
      </span>
    </BoldText>
  </CustomButton>
</motion.div>


          </motion.div>
        </div>
      </motion.section>

      <div style={{ backgroundColor: colorScheme.background }}>
        <VideoPlayerModal 
          videoId={selectedVideoId} 
          onClose={() => setSelectedVideoId(null)} 
        />
        
        {/* Diagonal Sections */}
        <section className="pt-16 md:pt-24">
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

        {/* CTA Section */}
        <div 
          className="py-16 text-center"
          style={{
            background: `linear-gradient(to right, ${colorScheme.primary}, ${colorScheme.secondary})`
          }}
        >
          <CustomButton
            variant="primary"
            onClick={scrollToVideoGrid}
            className="px-10 py-4 text-xl md:text-2xl
             flex items-center  mx-auto"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: colorScheme.white,
              color: colorScheme.primary
            }}
            whileTap={{ scale: 0.98 }}
          >
<BoldText>
  Explore Full Collection
  <span className="ml-2 gap-9">
    <FontAwesomeIcon icon={faArrowRight} />
  </span>
</BoldText>
           
          </CustomButton>
        </div>

        {/* Video Grid Section */}
        <div 
          ref={videoGridRef} 
          className="pt-16 pb-24"
          style={{
            background: `linear-gradient(to bottom, ${colorScheme.background}, ${colorScheme.gray[50]})`
          }}
        >
          <div className="container mx-auto px-4 md:px-8">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {(['All', 'Music Videos', 'Visualizers', 'Live Sessions'] as const).map((category) => (
                <motion.div
                  key={category}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: hoveredCategory === category ? colorScheme.primary : colorScheme.gray[100],
                    color: hoveredCategory === category ? colorScheme.primary : colorScheme.primary
                  }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setHoveredCategory(category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <CustomButton
  variant={activeCategory === category ? "primary" : "secondary"}
  onClick={() => {
    setActiveCategory(category);
    setCurrentPage(1);
  }}
  className="px-6 py-3 rounded-full flex items-center gap-3" // Increased gap from 2 to 3
>
  <BoldText className="flex items-center gap-4"> {/* Added nested flex container */}
    <FontAwesomeIcon icon={categoryIcons[category]} />
    <span>{category}</span> {/* Wrapped text in span for better spacing control */}
  </BoldText>
</CustomButton>
                </motion.div>
              ))}
            </div>

            {/* Video Grid */}
            {paginatedVideos.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {paginatedVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    content={video}
                    onSelect={setSelectedVideoId}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-block p-6 rounded-full mb-6"
                  style={{ backgroundColor: colorScheme.gray[100] }}
                >
                  <FontAwesomeIcon 
                    icon={faVideo} 
                    className="text-4xl"
                    style={{ color: colorScheme.primary }}
                  />
                </motion.div>
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
              </div>
            )}

            {/* Pagination */}
            {paginatedVideos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </motion.div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div 
          className="relative h-24"
          style={{
            backgroundColor: colorScheme.primary
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

        {/* Additional Sections */}
        <AudioMackComponent />
        <DownloadSection />
        {/* 
        <NewsletterForm /> */}
      </div>
    </div>
  );
};