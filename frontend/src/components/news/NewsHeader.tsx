import { motion } from 'framer-motion';

export const NewsHeader = () => (
  <div className="max-w-7xl mx-auto text-center py-12 md:py-16 lg:py-20">
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-3xl sm:text-4xl md:text-5xl roboto-condensed lg:text-6xl text-purple-950 bg-clip-text"
    >
      ClaudyGod Latest News
    </motion.h1>
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: '8rem' }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="h-1 bg-gray-500 mx-auto my-6"
    ></motion.div>
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="text-lg md:text-xl work-sans text-[#72709e] max-w-3xl mx-auto"
    >
      Massive Announcement! We've got big things happening...
    </motion.p>
  </div>
);