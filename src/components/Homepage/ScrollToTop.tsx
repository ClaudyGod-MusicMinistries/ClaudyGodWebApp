import { useState, useEffect } from 'react';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleVisibility = () => {
    const scrolled = window.pageYOffset;
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / scrollHeight) * 100;

    setScrollProgress(progress);

    if (scrolled > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
            duration: 0.2,
          }}
        >
          <div className="relative">
            {/* Circular Progress Background */}
            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-200/30 stroke-current"
                strokeWidth="2"
                fill="transparent"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <motion.path
                className="text-purple-600 stroke-current"
                strokeWidth="2"
                strokeLinecap="round"
                fill="transparent"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: scrollProgress / 100 }}
                transition={{ duration: 0.1 }}
              />
            </svg>

            {/* Main Button */}
            <motion.button
              onClick={scrollToTop}
              className="absolute inset-0 m-auto w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white rounded-full shadow-lg shadow-purple-500/25 flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/10"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  '0 10px 25px -5px rgba(139, 92, 246, 0.4), 0 0 15px -3px rgba(255, 255, 255, 0.1)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <FontAwesomeIcon
                  icon={faArrowUp}
                  className="w-4 h-4 filter drop-shadow-sm"
                />
              </motion.div>
            </motion.button>

            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full blur-md opacity-20 animate-pulse"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
