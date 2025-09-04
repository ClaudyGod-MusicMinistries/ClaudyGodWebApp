import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAnglesDown,
  faPlay,
  faCalendarAlt,
  faClock,
  faArrowRight,
  faSearch,
  faFilter,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setCurrentVideo } from '../../store/interviewSlice';
import { videos } from '../data/InterviewData';
import VideoPlayerModal from './VideoPlayer';

const Interview = () => {
  const dispatch = useDispatch();
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const [loadingThumbnails, setLoadingThumbnails] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const thumbnailRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Extract unique categories from videos
  const categories = [
    'all',
    ...new Set(videos.map(video => video.category || 'interview')),
  ];

  // Filter videos based on search and category
  const filteredVideos = videos.filter(video => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleVideoClick = (video: (typeof videos)[0]) => {
    dispatch(setCurrentVideo(video));
  };

  const scrollToSection = () => {
    videoSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const handleThumbnailError = (index: number, videoId: string) => {
    const img = thumbnailRefs.current[index];
    if (img) {
      if (img.src.includes('hqdefault')) {
        img.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
      } else {
        img.src =
          'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231a1a2e"/><stop offset="100%" stop-color="%23162146"/></linearGradient></defs><rect width="320" height="180" fill="url(%23grad)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23ffffff">Thumbnail Loading</text></svg>';
      }
    }
  };

  useEffect(() => {
    setLoadingThumbnails(true);
    const timer = setTimeout(() => setLoadingThumbnails(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen  text-white">
      {/* Video Player Modal */}
      <VideoPlayerModal />

      {/* Hero Section - Redesigned */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 "></div>
          <div className="absolute top-0 left-0 w-full h-full b"></div>
          <div className="absolute top-1/4 -left-20 w-96 h-96 "></div>
          <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-indigo-900/30 border border-indigo-700/30 text-indigo-300 text-sm mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 animate-pulse"></span>
                Exclusive Ministry Content
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                  Ministry Insights
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto  leading-relaxed">
                Deep conversations and inspirational insights from Minister
                ClaudyGod's spiritual journey and ministry work
              </p>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToSection}
                className="group relative inline-flex items-center justify-center px-8 py-4 
                overflow-hidden font-medium text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-indigo-500/30"
              >
                <span className="relative z-10 text-lg tracking-wide">
                  Explore Content
                </span>
                <FontAwesomeIcon
                  icon={faAnglesDown}
                  className="ml-3 h-5 w-5 animate-bounce group-hover:animate-none transition-all z-10"
                />
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FontAwesomeIcon
              icon={faAnglesDown}
              className="h-6 w-6 text-indigo-400 opacity-60"
            />
          </motion.div>
        </div>
      </section>

      {/* Video Gallery Section - Completely Redesigned */}
      <section ref={videoSectionRef} className="relative py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
                Ministry Conversations
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Browse through our collection of inspirational interviews and
              press releases
            </p>

            {/* Search and Filter Bar - Redesigned */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
              <div className="relative w-full md:w-80">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search interviews..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="text-gray-500 hover:text-gray-300"
                    />
                  </button>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
                  <span>Filter</span>
                </button>

                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10"
                    >
                      <div className="p-2">
                        {categories.map(category => (
                          <button
                            key={category}
                            onClick={() => {
                              setSelectedCategory(category);
                              setIsFilterOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              selectedCategory === category
                                ? 'bg-indigo-600/20 text-indigo-300'
                                : 'text-gray-300 hover:bg-gray-700/50'
                            }`}
                          >
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {filteredVideos.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-indigo-300 text-6xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No interviews found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {filteredVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group cursor-pointer"
                    onClick={() => handleVideoClick(video)}
                  >
                    <div className="relative h-full rounded-xl overflow-hidden bg-gray-800 border border-gray-700 hover:border-indigo-500/30 transition-all duration-300 shadow-lg hover:shadow-indigo-500/10">
                      {/* Thumbnail */}
                      <div className="relative aspect-video overflow-hidden">
                        {loadingThumbnails && (
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-indigo-900/50 animate-ping"></div>
                          </div>
                        )}
                        <img
                          ref={el => (thumbnailRefs.current[index] = el)}
                          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                          alt={video.title}
                          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${loadingThumbnails ? 'opacity-0' : 'opacity-100'}`}
                          onError={() => handleThumbnailError(index, video.id)}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                            <FontAwesomeIcon
                              icon={faPlay}
                              className="text-white text-xl ml-1"
                            />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-white line-clamp-2 pr-2">
                              {video.title}
                            </h3>
                            <span className="text-xs text-white bg-indigo-900/80 px-2 py-1 rounded-full flex-shrink-0">
                              {video.duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Video Info */}
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-gray-400 flex items-center">
                            <FontAwesomeIcon
                              icon={faCalendarAlt}
                              className="h-3 w-3 mr-2 text-indigo-400"
                            />
                            {video.date}
                          </span>
                          {video.category && (
                            <span className="text-xs bg-gray-700/50 px-2 py-1 rounded-full border border-gray-600/50">
                              {video.category}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {video.description}
                        </p>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
                          <span className="text-indigo-400 text-sm font-medium flex items-center group-hover:text-indigo-300 transition-colors">
                            Watch Now
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="ml-2 text-xs transition-transform group-hover:translate-x-1"
                            />
                          </span>
                          <span className="text-gray-500 text-xs flex items-center">
                            <FontAwesomeIcon
                              icon={faClock}
                              className="h-3 w-3 mr-1"
                            />
                            {video.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <button className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-indigo-500/20 border border-indigo-500/30 hover:border-indigo-400/30">
              Load More Interviews
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Interview;
