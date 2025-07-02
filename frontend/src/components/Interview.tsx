import { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown, faPlay, faXmark, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';

// Import data and types from external file
import {  videos, playerOptions } from '../components/data/InterviewData';

const Interview = () => {
  const [currentVideo, setCurrentVideo] = useState<string>(videos[0].id);
  const [showPlayer, setShowPlayer] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loadingThumbnails, setLoadingThumbnails] = useState<boolean>(true);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Handle thumbnail loading with optimized fallbacks
  const handleThumbnailError = (index: number, videoId: string) => {
    const img = thumbnailRefs.current[index];
    if (img) {
      // If HQ thumbnail fails, try MQ
      if (img.src.includes('hqdefault')) {
        img.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
      } 
      // If MQ fails, use a placeholder
      else {
        // Use a gradient placeholder
        img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23672994"/><stop offset="100%" stop-color="%23b83280"/></linearGradient></defs><rect width="320" height="180" fill="url(%23grad)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23ffffff">Thumbnail Loading</text></svg>';
      }
    }
  };

  const handleVideoClick = (videoId: string) => {
    setCurrentVideo(videoId);
    setShowPlayer(true);
    scrollToSection();
  };

  const scrollToSection = () => {
    setTimeout(() => {
      videoSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const toggleModal = () => setShowModal(!showModal);

  // Set all thumbnails to load
  useEffect(() => {
    setLoadingThumbnails(true);
    const timer = setTimeout(() => {
      setLoadingThumbnails(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-roboto-condensed lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-6">
              Ministry Interviews
            </h1>
            <p className="text-xl text-gray-300 font-work-sans max-w-3xl mx-auto mb-10">
              Exclusive conversations and insights from Minister ClaudyGod's ministry journey
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                onClick={scrollToSection}
                className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <span className="relative text-lg tracking-wider">Watch Interviews</span>
                <FontAwesomeIcon 
                  icon={faAnglesDown} 
                  className="ml-3 h-5 w-5 animate-bounce group-hover:animate-none transition-all" 
                />
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Video Player Section */}
        <div 
          id="video-section" 
          ref={videoSectionRef}
          className="mb-20"
        >
          <div className="relative bg-gradient-to-br from-black/50 to-purple-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-gray-700 p-4">
            <AnimatePresence mode="wait">
              {showPlayer ? (
                <motion.div
                  key={currentVideo}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6"
                >
                  <div className="relative">
                    <YouTube videoId={currentVideo} opts={playerOptions} />
                    <button 
                      onClick={() => setShowPlayer(false)}
                      className="absolute top-4 right-4 bg-black/70 rounded-full p-2 z-10 hover:bg-black transition-colors"
                      aria-label="Close player"
                    >
                      <FontAwesomeIcon icon={faXmark} className="text-white h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-gray-800 to-purple-900 border-2 border-dashed border-gray-600 rounded-xl w-full aspect-video flex flex-col items-center justify-center space-y-6 p-8"
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-medium text-gray-300 mb-2">Video Player</h3>
                    <p className="text-gray-400 max-w-md">
                      Select an interview below to watch Minister ClaudyGod's inspiring conversations
                    </p>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                    <FontAwesomeIcon 
                      icon={faPlay} 
                      className="text-white text-2xl ml-1" 
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Current Video Info */}
            {showPlayer && (
              <div className="mt-6 px-2">
                {videos.filter(v => v.id === currentVideo).map(video => (
                  <div key={video.id} className="space-y-3">
                    <h2 className="text-2xl font-bold text-white">{video.title}</h2>
                    <div className="flex flex-wrap gap-4 text-gray-300">
                      <span className="flex items-center">
                        <FontAwesomeIcon icon={faCalendarAlt} className="h-4 w-4 mr-2 text-purple-400" />
                        {video.date}
                      </span>
                      <span className="flex items-center">
                        <FontAwesomeIcon icon={faClock} className="h-4 w-4 mr-2 text-purple-400" />
                        {video.duration}
                      </span>
                      <span className="bg-purple-900/50 px-3 py-1 rounded-full text-sm">
                        {video.channel}
                      </span>
                    </div>
                    <p className="text-gray-400 mt-2">{video.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Video Gallery */}
        <section className="mb-20">
          <div className="text-center mb-14">
            <h2 className=" font-roboto-condensed text-transparent text-3xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-3 ">
           Our Latest Updates
            </h2>
            <p className="text-gray-400 font-work-sans max-w-2xl mx-auto">
              Catch up with all our interviews, Press releases, May God be glorified in all things.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group cursor-pointer"
                onClick={() => handleVideoClick(video.id)}
              >
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 transition-all duration-300 group-hover:border-purple-500 h-full flex flex-col">
                  <div className="relative aspect-video">
                    {loadingThumbnails && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-pink-900 animate-pulse flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-purple-700 animate-ping"></div>
                      </div>
                    )}
                    <img 
                      ref={el => thumbnailRefs.current[index] = el}
                      src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${loadingThumbnails ? 'opacity-0' : 'opacity-100'}`}
                      onError={() => handleThumbnailError(index, video.id)}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all">
                        <FontAwesomeIcon 
                          icon={faPlay} 
                          className="text-white text-xl ml-1"
                        />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-raleway-medium text-white">{video.title}</h3>
                        <span className="text-xs text-gray-300 bg-gray-800/80 px-2 py-1 rounded">
                          {video.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-gray-400 flex items-center">
                        <FontAwesomeIcon icon={faCalendarAlt} className="h-3 w-3 mr-1 font-raleway-light text-purple-400" />
                        {video.date}
                      </span>
                      <span className="text-xs font-work-sans
 bg-purple-900/40 px-2 py-1 rounded-full">
                        {video.channel}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 font-raleway-light
 flex-grow">{video.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-purple-400 font-raleway-medium">Watch Interview</span>
                      <span className="text-gray-500 text-xs flex items-center">
                        <FontAwesomeIcon icon={faClock} className="h-3 w-3 mr-1 font-raleway-light" />
                        {video.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleModal}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-roboto-condensed rounded-full hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-900/30"
            >
              View All Updates
            </motion.button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Interview;