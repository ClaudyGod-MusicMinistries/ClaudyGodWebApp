import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faHandsPraying, faMicrophoneAlt } from '@fortawesome/free-solid-svg-icons';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.2, 
      when: "beforeChildren",
      duration: 0.8
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: 'spring', 
      stiffness: 120, 
      damping: 15,
      duration: 0.7
    }
  }
};

const columnVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: 'spring', 
      stiffness: 120, 
      damping: 20,
      duration: 0.8
    }
  }
};

export const Welcome = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-[70vh] overflow-hidden"
    >
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-7xl mx-auto">
        {/* Left Column - Ministry Focus */}
        <motion.div 
          variants={columnVariants}
          className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white p-10 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-400"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute top-10 right-10 text-purple-200/10 text-8xl">
            <FontAwesomeIcon icon={faHandsPraying} />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto w-full space-y-8">
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-3 bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium font-work-sans tracking-wider">MINISTRY FOCUS</span>
            </motion.div>
            
            <div className="space-y-6">
              <motion.h2 
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold roboto-condensed leading-tight"
              >
                Intimacy Through <br className="hidden md:block" />
                <span className="text-purple-300">Sacred Praise</span>
              </motion.h2>
              
              <motion.div 
                variants={itemVariants}
                className="relative pl-8 py-5 border-l-2 border-purple-500/30"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-purple-700"></div>
                <div className="space-y-4">
                  <motion.p 
                    variants={itemVariants}
                    className="text-xl md:text-2xl italic work-sans leading-relaxed"
                  >
                    "From the rising of the sun to its going down,<br />
                    The Lord's name is to be praised."
                  </motion.p>
                  
                  <motion.p 
                    variants={itemVariants}
                    className="text-lg raleway-medium text-purple-200"
                  >
                    — Psalm 113:3
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Artist Biography */}
        <motion.div 
          variants={{...columnVariants, hidden: { opacity: 0, x: 100 }}}
          className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 p-10 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-center"
        >
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-300 to-white"></div>
          <div className="absolute bottom-10 left-10 text-gray-100 text-8xl">
            <FontAwesomeIcon icon={faMicrophoneAlt} />
          </div>
          
          <div className="relative z-10 max-w-2xl mx-auto w-full space-y-8">
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-3 bg-purple-900/10 px-5 py-2.5 rounded-full backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-medium font-work-sans tracking-wider text-purple-800">ARTIST BIOGRAPHY</span>
            </motion.div>
            
            <div className="space-y-6">
              <motion.h2 
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-gray-800 roboto-condensed leading-tight"
              >
                The Spiritual Journey of <br className="hidden md:block" />
                <span className="text-purple-700">ClaudyGod</span>
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-gray-600 text-lg work-sans leading-relaxed"
              >
                ClaudyGod is a California-based Christian & Gospel artist of Nigerian and Sierra Leonean heritage. 
                Her musical journey began in childhood choirs in Nigeria, culminating in a divine encounter in 
                2003 Nashville where she heard God affirm, "I love your worship." This moment ignited her 
                calling to create music that bridges cultural traditions and contemporary worship.
              </motion.p>
              
              <motion.div variants={itemVariants}>
                <motion.button 
                  whileHover={{ 
                    scale: 1.03,
                    background: 'linear-gradient(135deg, #6d28d9, #4c1d95)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/biography')}
                  className="mt-4 cursor-pointer bg-gradient-to-r from-purple-700 to-indigo-800 text-white px-8 py-4 rounded-xl font-medium flex items-center gap-3 group shadow-lg hover:shadow-xl transition-all"
                >
                  <span className="raleway-medium tracking-wide text-lg">Read More</span>
                  <FontAwesomeIcon 
                    icon={faArrowRight} 
                    className="ml-1 transition-transform group-hover:translate-x-1.5 text-sm" 
                  />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}