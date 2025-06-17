import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faApple, 
  faGooglePlay 
} from '@fortawesome/free-brands-svg-icons';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, when: "beforeChildren" }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
};

const iconVariants = {
  hover: { 
    scale: 1.1,
    y: -5,
    transition: { 
      type: "spring", 
      stiffness: 300,
      damping: 10 
    }
  },
  tap: { scale: 0.95 }
};

export const DownloadSection = () => {
  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-[50vh] bg-black text-white overflow-hidden py-12 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-3xl md:text-4xl roboto-condensed mb-4"
            variants={itemVariants}
          >
            Download Our Mobile Application
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 work-sans max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Experience our music and content on the go with our mobile app
          </motion.p>
        </motion.div>

        {/* Icons Container */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto"
          variants={containerVariants}
        >
          {/* App Store Column */}
          <motion.div 
            className="flex justify-center"
            variants={itemVariants}
          >
            <motion.a
              href="https://www.claudygod.com/claudygod-tv-apple"
              className="flex flex-col items-center group"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <div className="bg-gray-900 rounded-2xl p-6 mb-4 group-hover:bg-purple-800 transition-colors">
                <FontAwesomeIcon 
                  icon={faApple} 
                  className="text-white text-5xl md:text-6xl" 
                />
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold">App Store</p>
                <p className="text-gray-400 text-sm mt-1">Download for iOS</p>
              </div>
            </motion.a>
          </motion.div>

          {/* Google Play Column */}
          <motion.div 
            className="flex justify-center"
            variants={itemVariants}
          >
            <motion.a
              href="https://www.claudygod.com/claudygod-tv-andrioid"
              className="flex flex-col items-center group"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <div className="bg-gray-900 rounded-2xl p-6 mb-4 group-hover:bg-purple-800 transition-colors">
                <FontAwesomeIcon 
                  icon={faGooglePlay} 
                  className="text-white text-5xl md:text-6xl" 
                />
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold">Google Play</p>
                <p className="text-gray-400 text-sm mt-1">Download for Android</p>
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}