// src/components/news/LiveSession.tsx
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSpotify, 
  faYoutube, 
  faApple, 
  faDeezer 
} from '@fortawesome/free-brands-svg-icons';
import { faPlay, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Cover } from '../../assets/';

export const LiveSession = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-[#1a0a2e] rounded-2xl p-6 md:p-8 shadow-xl h-full border border-purple-900/50"
    >
      <div className="text-center mb-8">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl font-roboto-condensed text-white mb-4"
        >
          Latest Release: <span className="text-purple-400">You Are Our Everything</span>
        </motion.h3>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100px' }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-1 bg-purple-500 mx-auto mb-6"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-purple-200 font-work-sans text-sm md:text-base max-w-2xl mx-auto"
        >
          Discover the latest gospel singles now featured on our Gospel News page! 
          Stay updated with fresh releases, inspiring messages, and uplifting melodies.
        </motion.p>
      </div>

      <div className="relative aspect-video rounded-xl overflow-hidden mb-8 shadow-lg">
        <img
          src={Cover}
          alt="Latest Release"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-center justify-center">
          <motion.div 
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-600/30 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-purple-700/50 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon 
              icon={faPlay} 
              className="w-6 h-6 md:w-7 md:h-7 text-white ml-1" 
            />
          </motion.div>
        </div>
        
        <div className="absolute bottom-4 left-4">
          <div className="px-3 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full text-sm font-medium text-white">
            New Release
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h4 className="text-xl font-roboto-condensed text-purple-300 mb-4">Available On All Platforms</h4>
        <div className="flex justify-center space-x-3 mb-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="w-2 h-2 rounded-full bg-purple-500"></div>
          ))}
        </div>
      </div>

      <div className="mt-6 md:mt-8 grid grid-cols-2 gap-4 font-raleway-light">
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="flex items-center justify-center p-4 bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg hover:opacity-90 transition-all group"
        >
          <div className="flex items-center">
            <FontAwesomeIcon 
              icon={faSpotify} 
              className="w-6 h-6 mr-3 text-white group-hover:scale-110 transition-transform" 
            />
            <span className="text-white font-medium">Spotify</span>
          </div>
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="flex items-center justify-center p-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg hover:opacity-90 transition-all group"
        >
          <div className="flex items-center">
            <FontAwesomeIcon 
              icon={faYoutube} 
              className="w-6 h-6 mr-3 text-white group-hover:scale-110 transition-transform" 
            />
            <span className="text-white font-medium">YouTube</span>
          </div>
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="flex items-center justify-center p-4 bg-gradient-to-r from-gray-900 to-black rounded-xl shadow-lg hover:opacity-90 transition-all group"
        >
          <div className="flex items-center">
            <FontAwesomeIcon 
              icon={faApple} 
              className="w-6 h-6 mr-3 text-white group-hover:scale-110 transition-transform" 
            />
            <span className="text-white font-medium">Apple Music</span>
          </div>
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="flex items-center justify-center p-4 bg-gradient-to-r from-[#feaa2d] to-[#ff8c00] rounded-xl shadow-lg hover:opacity-90 transition-all group"
        >
          <div className="flex items-center">
            <FontAwesomeIcon 
              icon={faDeezer} 
              className="w-6 h-6 mr-3 text-white group-hover:scale-110 transition-transform" 
            />
            <span className="text-white font-medium">Deezer</span>
          </div>
        </motion.a>
      </div>

      <div className="mt-8 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-purple-700 to-indigo-800 rounded-full text-white font-medium shadow-lg hover:opacity-90 transition-opacity flex items-center mx-auto"
        >
          <span>View All Releases</span>
          <FontAwesomeIcon 
            icon={faArrowRight} 
            className="w-4 h-4 ml-2 mt-0.5" 
          />
        </motion.button>
      </div>
    </motion.div>
  );
};