import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faAnglesDown, 
  faPlay, 
  faCalendarAlt, 
  faClock,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setCurrentVideo } from '../../store/interviewSlice';
import { videos } from '../data/InterviewData';
import VideoPlayerModal from './VideoPlayer';

const Interview = () => {
  const dispatch = useDispatch();
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const [loadingThumbnails, setLoadingThumbnails] = useState(true);
  const thumbnailRefs = useRef<(HTMLImageElement | null)[]>([]);

  const handleVideoClick = (video: typeof videos[0]) => {
    dispatch(setCurrentVideo(video));
  };

  const scrollToSection = () => {
    videoSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  const handleThumbnailError = (index: number, videoId: string) => {
    const img = thumbnailRefs.current[index];
    if (img) {
      if (img.src.includes('hqdefault')) {
        img.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
      } else {
        img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%231a1a2e"/><stop offset="100%" stop-color="%23162146"/></linearGradient></defs><rect width="320" height="180" fill="url(%23grad)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23ffffff">Thumbnail Loading</text></svg>';
      }
    }
  };

  useEffect(() => {
    setLoadingThumbnails(true);
    const timer = setTimeout(() => setLoadingThumbnails(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Video Player Modal */}
      <VideoPlayerModal />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-gray-950 z-0">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-400 mb-6">
                Ministry Interviews
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                Exclusive conversations and insights from Minister ClaudyGod's ministry journey
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToSection}
                className="relative group inline-flex items-center justify-center px-8 py-4 font-medium text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/20"
              >
                <span className="relative z-10 text-lg tracking-wider">Watch Interviews</span>
                <FontAwesomeIcon 
                  icon={faAnglesDown} 
                  className="ml-3 h-5 w-5 animate-bounce group-hover:animate-none transition-all z-10" 
                />
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Gallery Section */}
      <section 
        ref={videoSectionRef}
        className="relative py-20 bg-gray-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-400 mb-4">
                Our Latest Updates
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Catch up with all our interviews and press releases
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
                onClick={() => handleVideoClick(video)}
              >
                <div className="relative h-full rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/10">
                  {/* Thumbnail */}
                  <div className="relative aspect-video">
                    {loadingThumbnails && (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-purple-900/50 animate-ping"></div>
                      </div>
                    )}
                    <img 
                      ref={el => thumbnailRefs.current[index] = el}
                      src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${loadingThumbnails ? 'opacity-0' : 'opacity-100'}`}
                      onError={() => handleThumbnailError(index, video.id)}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-lg">
                        <FontAwesomeIcon 
                          icon={faPlay} 
                          className="text-white text-xl ml-1" 
                        />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-5">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-white line-clamp-2">{video.title}</h3>
                        <span className="text-xs text-white bg-purple-900/80 px-2 py-1 rounded-full flex-shrink-0">
                          {video.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-400 flex items-center">
                        <FontAwesomeIcon icon={faCalendarAlt} className="h-4 w-4 mr-2 text-purple-400" />
                        {video.date}
                      </span>
                      <span className="text-xs bg-purple-900/30 px-3 py-1 rounded-full border border-purple-500/20">
                        {video.channel}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-5 line-clamp-3">{video.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 text-sm font-medium flex items-center group-hover:text-purple-300 transition-colors">
                        Watch Interview
                        <FontAwesomeIcon 
                          icon={faArrowRight} 
                          className="ml-2 text-xs transition-transform group-hover:translate-x-1" 
                        />
                      </span>
                      <span className="text-gray-500 text-xs flex items-center">
                        <FontAwesomeIcon icon={faClock} className="h-3 w-3 mr-1" />
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
              className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/20 relative overflow-hidden"
            >
              <span className="relative z-10">View All Updates</span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Interview;