// components/VideoPlayerModal.tsx
import YouTube from 'react-youtube';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faExpand, faPlay, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { closePlayer } from '../../store/interviewSlice';
import { RootState } from '../../store/store';
import { playerOptions, videos } from '../data/InterviewData';
import { setCurrentVideo } from '../../store/interviewSlice';
import { useState } from 'react';

const VideoPlayerModal = () => {
  const dispatch = useDispatch();
  const { currentVideo, showPlayer } = useSelector((state: RootState) => state.interviews);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!showPlayer || !currentVideo) return null;

  return (
    <AnimatePresence>
      {showPlayer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          {/* Backdrop with blur effect */}
          <div className="fixed inset-0 bg-black/80 backdrop-blur-lg" onClick={() => dispatch(closePlayer())} />
          
          {/* Main modal container */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25 }}
              className={`relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl ${isFullscreen ? 'w-full h-screen' : 'max-w-6xl w-full'}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video player section */}
              <div className={`${isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-[70vh]'} relative`}>
                <YouTube
                  videoId={currentVideo.id}
                  opts={{
                    ...playerOptions,
                    playerVars: {
                      ...playerOptions.playerVars,
                      modestbranding: 1,
                      rel: 0,
                      showinfo: 0,
                      iv_load_policy: 3
                    }
                  }}
                  className="w-full h-full"
                />
                
                {/* Controls */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button 
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="bg-black/70 rounded-full p-2 hover:bg-black transition-colors"
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  >
                    <FontAwesomeIcon icon={faExpand} className="text-white h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => dispatch(closePlayer())}
                    className="bg-black/70 rounded-full p-2 hover:bg-black transition-colors"
                    aria-label="Close player"
                  >
                    <FontAwesomeIcon icon={faXmark} className="text-white h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Video info and related videos */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-gray-900">
                {/* Current video info */}
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-2xl font-bold text-white">{currentVideo.title}</h2>
                  <div className="flex items-center space-x-4 text-gray-300">
                    <span className="flex items-center">
                      <FontAwesomeIcon icon={faCalendarAlt} className="h-4 w-4 mr-2 text-purple-400" />
                      {currentVideo.date}
                    </span>
                    <span className="flex items-center">
                      <FontAwesomeIcon icon={faClock} className="h-4 w-4 mr-2 text-purple-400" />
                      {currentVideo.duration}
                    </span>
                  </div>
                  <p className="text-gray-300">{currentVideo.description}</p>
                </div>
                
                {/* Related videos sidebar */}
                <div className="lg:col-span-1">
                  <h3 className="text-xl font-semibold text-white mb-4">More Interviews</h3>
                  <div className="space-y-4">
                    {videos
                      .filter(v => v.id !== currentVideo.id)
                      .slice(0, 3)
                      .map((video: unknown) => (
                        <RelatedVideoCard key={video.id} video={video} />
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const RelatedVideoCard = ({ video }: { video: typeof videos[0] }) => {
  const dispatch = useDispatch();
  
  return (
    <div 
      className="flex gap-3 cursor-pointer group"
      onClick={() => dispatch(setCurrentVideo(video))}
    >
      <div className="relative flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden">
        <img
          src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <FontAwesomeIcon 
            icon={faPlay} 
            className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity" 
          />
        </div>
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-white line-clamp-2">{video.title}</h4>
        <p className="text-xs text-gray-400 mt-1">{video.channel}</p>
      </div>
    </div>
  );
};

export default VideoPlayerModal;