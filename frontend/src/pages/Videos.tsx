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
import { DonationCallToAction } from '../components/util/DonationSupport';



const VIDEOS_PER_PAGE = 6;

export const VideosData: React.FC = () => {
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
    <>
      {/* Enhanced Hero Section */}
      <motion.section 
        className="pt-32 pb-24 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute top-10 right-10 text-purple-500/10 text-9xl">
            <FontAwesomeIcon icon={faVideo} />
          </div>
          
          <motion.div 
            className="relative z-10 max-w-4xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-roboto-condensed mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Video Collection
            </motion.h1>
            
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mb-8"
              initial={{ width: 0 }}
              animate={{ width: '6rem' }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
            
            <motion.p 
              className="text-lg md:text-xl max-w-2xl font-work-sans mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Experience the divine fusion of American Contemporary Christian Music and Afro-Gospel Songs through ClaudyGod's Inspirational Journey.
            </motion.p>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                backgroundColor: '#fff',
                color: '#6d28d9'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToVideoGrid}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-roboto-condensed flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Browse Videos <FontAwesomeIcon icon={faArrowRight} />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      <div className="bg-white">
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
        <div className="py-16 bg-gradient-to-r from-purple-800 to-indigo-900 text-center">
          <motion.button
            whileHover={{ 
              scale: 1.05,
              backgroundColor: '#fff',
              color: '#6d28d9'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToVideoGrid}
            className="px-10 py-4 bg-white text-purple-900 text-xl md:text-2xl rounded-full font-roboto-condensed flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl"
          >
            Explore Full Collection <FontAwesomeIcon icon={faArrowRight} />
          </motion.button>
        </div>

        {/* Video Grid Section */}
        <div ref={videoGridRef} className="pt-16 pb-24 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {(['All', 'Music Videos', 'Visualizers', 'Live Sessions'] as const).map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: hoveredCategory === category ? '#6d28d9' : '#f3f4f6',
                    color: hoveredCategory === category ? '#fff' : '#6d28d9'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setHoveredCategory(category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  onClick={() => {
                    setActiveCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-purple-700 text-white shadow-lg'
                      : 'bg-gray-100 text-purple-800 hover:bg-gray-200'
                  }`}
                >
                  <FontAwesomeIcon icon={categoryIcons[category]} />
                  {category}
                </motion.button>
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
                  className="inline-block p-6 bg-purple-50 rounded-full mb-6"
                >
                  <FontAwesomeIcon icon={faVideo} className="text-purple-700 text-4xl" />
                </motion.div>
                <h3 className="text-xl md:text-2xl text-purple-900 font-roboto-condensed mb-4">
                  No videos found in this category
                </h3>
                <button
                  onClick={() => setActiveCategory('All')}
                  className="text-purple-700 hover:underline font-work-sans"
                >
                  View all videos
                </button>
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
        <div className="relative h-24 bg-gradient-to-r from-purple-900 to-indigo-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-1 bg-white/30"></div>
          </div>
        </div>

        {/* Additional Sections */}
        <AudioMackComponent />
        <DownloadSection />
        <NewsletterForm />
      </div>
    </>
  );
};