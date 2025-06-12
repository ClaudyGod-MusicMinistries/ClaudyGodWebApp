import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { modalVariants } from '../data/HeroSlide';
import { HeroSlide } from '../data/HeroSlide';

export const StreamingPlatformsModal = ({ 
  isOpen, 
  onClose, 
  platforms 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  platforms: HeroSlide['content']['streamingPlatforms'] 
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-gray-900 p-6 rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Streaming Platforms</h3>
            <button 
              onClick={onClose} 
              className="text-white hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faTimes} className="text-2xl" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {platforms?.map((platform) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-4 px-4 py-3 bg-gray-800 rounded-xl hover:bg-purple-900 transition-colors"
              >
                <FontAwesomeIcon 
                  icon={platform.icon as IconDefinition} 
                  className="text-2xl text-white" 
                />
                <span className="text-lg font-medium text-white">
                  {platform.name}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);