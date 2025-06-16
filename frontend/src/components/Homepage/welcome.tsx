
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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

const columnVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: 'spring', stiffness: 120, damping: 20 }
  }
};

export const Welcome = () => {
      const navigate = useNavigate();
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-[50vh] grid grid-cols-1 md:grid-cols-2 overflow-hidden"
    >
      {/* Left Column - Purple Background */}
      <motion.div 
        variants={columnVariants}
        className="bg-purple-900 text-white p-8 md:p-12 flex flex-col justify-center items-center"
      >
        <motion.div 
          className="max-w-2xl space-y-4"
          variants={containerVariants}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold mb-3 roboto-condensed"
          >
            Intimacy Through Praise
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg italic work-sans mb-3"
          >
            "From the rising of the sun to its going down,
            The Lord's name is to be praised."
          </motion.p>
          
          <motion.p 
            variants={itemVariants}
            className="text-sm md:text-base raleway-medium"
          >
            - Psalm 113:3
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Right Column - White Background */}
      <motion.div 
        variants={{...columnVariants, hidden: { opacity: 0, x: 100 }}}
        className="bg-white p-8 md:p-12 flex flex-col justify-center items-center"
      >
        <motion.div 
          className="max-w-2xl space-y-4"
          variants={containerVariants}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 roboto-condensed"
          >
            About the Artist
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-sm md:text-base work-sans leading-relaxed"
          >
            ClaudyGod is a California-based, American Gospel Artiste. She however has both a Nigerian and Sierraleonian
   descent and spent a good amount of her childhood in Nigeria. While growing up in Nigeria, 
  ClaudyGod nursed a passion for music, participating in choral activities in both middle and high school.
          </motion.p>
          
            <motion.button 
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/biography')} // Add this line
      className="mt-4 cursor-pointer bg-purple-900 text-white px-6 raleway-light py-2 rounded-full flex items-center gap-2 text-sm md:text-base"
    >
      Read More
      <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-xs md:text-sm" />
    </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}