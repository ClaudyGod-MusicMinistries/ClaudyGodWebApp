import { useState } from 'react';
import YouTube from 'react-youtube';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesDown, faPlay } from '@fortawesome/free-solid-svg-icons';
import UpdateModal from '../components/updateModel';

// Define type for video objects
interface VideoItem {
  id: string;
  title: string;
}

const Interview = () => {
  const [currentVideo, setCurrentVideo] = useState<string>('Eom1qlm4ork');
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const videos: VideoItem[] = [
    { id: 'Eom1qlm4ork', title: 'ClaudyGod Interview - NTA10-Lagos' },
    { id: 'rGVHMpPIkY8', title: 'ClaudyGod Interview - Rhythm Station' },
    { id: 'jeY9ULX3wtY', title: 'ClaudyGod Interview - Rhema Station' },
  ];

  const playerOptions = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  // Fixed type for videoId parameter
  const handleVideoClick = (videoId: string) => {
    setCurrentVideo(videoId);
    setShowPlayer(true);

    setTimeout(() => {
      const videoSection = document.getElementById('video-section');
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const scrollToVideos = () => {
    const videoSection = document.getElementById('video-section');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div className="max-w-7xl mx-auto mb-30 px-4 py-8 bg-purple-900 rounded-2xl relative">
      {/* Header Section */}
      <div className="text-center mb-20 mt-12">
        <h1 className="text-4xl roboto-condensed text-white mb-4">Our Latest Updates</h1>
        <p className="text-gray-200 work-sans md:text-base max-md:text-xs max-w-xl mx-auto">
          Catch up with all our interviews, outings and messages, surely God is working out his purpose in us and through us.
        </p>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-20">
        <div 
          className="bg-purple-900 text-white py-6 px-8 rounded-lg inline-block cursor-pointer transition-transform hover:scale-105"
          onClick={scrollToVideos}
        >
          <div className="flex flex-col items-center bg-white rounded-2xl p-5">
            <span className="text-2xl roboto-condensed mt-2 mb-1 p-5 px-10 py-5 pb-0 text-red-500">Watch Now</span>
            <FontAwesomeIcon 
              icon={faAnglesDown} 
              className="h-6 w-6 animate-bounce text-red-500" 
            />
          </div>
        </div>
      </div>

      {/* Video Player Section */}
      <div id="video-section" className="mb-16">
        {showPlayer ? (
          <motion.div 
            className="mb-10 rounded-xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <YouTube videoId={currentVideo} opts={playerOptions} />
          </motion.div>
        ) : (
          <div className="bg-gray-200 raleway-light border-2 border-dashed rounded-xl w-full h-96 flex flex-col items-center justify-center text-gray-500 space-y-4">
            <h2 className="text-xl">Video Will Play Here</h2>
            <div className="w-18 h-18 p-5 rounded-2xl cursor-pointer bg-red-600 flex items-center justify-center">
              <FontAwesomeIcon 
                icon={faPlay} 
                className="text-white text-xl" 
              />
            </div>
          </div>
        )}

        {/* Video Slider */}
        <div className="mt-12">
          <h2 className="text-2xl roboto-condensed mt-20 mb-10 md:text-center max-md:text-left text-white">
            Latest Tour - Interviews with ClaudyGod Music & Ministry
          </h2>
          
          {/* Centered video grid */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
              {videos.map((video) => (
                <div 
                  key={video.id}
                  className="cursor-pointer group"
                  onClick={() => handleVideoClick(video.id)}
                >
                  <div className="relative rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
                    <div className="relative pb-[56.25%]">
                      <img 
                        src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} 
                        alt={video.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full bg-red-600 flex items-center justify-center group-hover:opacity-100 transition-opacity opacity-80">
                          <FontAwesomeIcon 
                            icon={faPlay} 
                            className="text-white text-2xl ml-1"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="work-sans text-xs text-gray-900 group-hover:text-purple-700 transition-colors">
                        {video.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* See More Button */}
          <div className="mt-12 text-center">
            <button 
              className="bg-gray-100 hover:bg-gray-300 cursor-pointer text-bg-purple-900 font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
              onClick={toggleModal}
            >
              See More Updates
            </button>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      <UpdateModal isOpen={showModal} onClose={toggleModal} />
    </div>
  );
};

export default Interview;