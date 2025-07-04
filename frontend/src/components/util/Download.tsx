import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faApple, 
  faGooglePlay 
} from '@fortawesome/free-brands-svg-icons';
import { useEffect, useRef } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      when: "beforeChildren",
      duration: 0.4
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: 'spring', 
      stiffness: 120, 
      damping: 15,
      duration: 0.4
    }
  }
};

const iconVariants = {
  hover: { 
    scale: 1.03,
    y: -2,
    transition: { 
      type: "spring", 
      stiffness: 400,
      damping: 10 
    }
  },
  tap: { scale: 0.97 }
};

const phoneVariants = {
  float: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const DownloadSection = () => {
  const videoRef = useRef(null);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        videoRef.current.muted = true;
        videoRef.current.play();
      });
    }
  }, []);

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="relative min-h-[45vh] overflow-hidden py-10 px-4 bg-gradient-to-br from-gray-900 to-black"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(142, 45, 226, 0.3) 0%, transparent 70%)`,
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 1.5
            }}
          />
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center">
          {/* Phone Mockup - Left Column */}
          <motion.div 
            className="flex justify-center max-w-[180px] sm:max-w-[220px] mx-auto lg:mx-0"
            variants={itemVariants}
          >
            <div className="relative w-full">
              <motion.div 
                className="relative"
                variants={phoneVariants}
                animate="float"
              >
                <div className="absolute inset-0 rounded-[30px] border-[8px] border-gray-800 shadow-lg"></div>
                
                {/* Phone screen with video */}
                <div className="absolute top-[3%] left-[6%] w-[88%] h-[94%] rounded-[24px] overflow-hidden border-2 border-gray-800">
                  <video 
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    loop
                    muted
                  >
                    <source src="https://assets.codepen.io/3364143/screen.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Video overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  
                  {/* App branding */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-roboto-condensed text-base">ClaudyGod</h3>
                        <p className="text-purple-300 text-xs font-work-sans">Premium Music</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative pt-[180%] rounded-[30px] overflow-hidden"></div>
              </motion.div>
              
              {/* Floating download icon */}
              <motion.div 
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md bg-gradient-to-r from-purple-600 to-indigo-700"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/>
                </svg>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right column - Content */}
          <motion.div 
            className="text-center lg:text-left"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <motion.h2 
                className="text-2xl sm:text-3xl font-roboto-condensed mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300"
              >
                ClaudyGod Music On the Go
              </motion.h2>
              
              <motion.p 
                className="text-sm sm:text-base mb-4 sm:mb-5 max-w-md mx-auto lg:mx-0 font-raleway-light text-gray-300"
                variants={itemVariants}
              >
                Experience premium music streaming with our mobile app. Download now to enjoy your favorite tracks anytime.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0"
              variants={containerVariants}
            >
              <motion.div 
                className="flex-1 min-w-[160px]"
                variants={itemVariants}
              >
                <motion.a
                  href="https://www.claudygod.com/claudygod-tv-apple"
                  className="flex items-center font-work-sans justify-center gap-2 py-3 px-4 rounded-lg transition-all shadow-md h-full"
                  style={{ 
                    background: 'linear-gradient(135deg, #000 0%, #3a0ca3 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  variants={iconVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FontAwesomeIcon 
                    icon={faApple} 
                    className="text-xl text-white" 
                  />
                  <div className="text-left">
                    <div className="text-[10px] tracking-wide font-work-sans text-gray-300">Download on the</div>
                    <div className="text-base tracking-tight font-roboto-condensed text-white">App Store</div>
                  </div>
                </motion.a>
              </motion.div>
              
              <motion.div 
                className="flex-1 min-w-[160px]"
                variants={itemVariants}
              >
                <motion.a
                  href="https://www.claudygod.com/claudygod-tv-andrioid"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all shadow-md h-full"
                  style={{ 
                    background: 'linear-gradient(135deg, #4285F4 0%, #34A853 33%, #FBBC05 66%, #EA4335 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  variants={iconVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FontAwesomeIcon 
                    icon={faGooglePlay} 
                    className="text-xl text-white" 
                  />
                  <div className="text-left">
                    <div className="text-[10px] tracking-wide uppercase font-work-sans text-gray-100">Get it on</div>
                    <div className="text-base font-bold tracking-tight font-roboto-condensed text-white">Google Play</div>
                  </div>
                </motion.a>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="mt-6 pt-4 border-t border-opacity-10 max-w-md mx-auto lg:mx-0 border-gray-600"
              variants={itemVariants}
            >
              <div className="grid grid-cols-3 gap-3">
                {[
                  {icon: '🎧', text: 'HQ Audio'},
                  {icon: '📱', text: 'Offline'},
                  {icon: '🔒', text: 'Ad-Free'},
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="text-xl mb-1">{feature.icon}</div>
                    <div className="text-xs font-work-sans text-gray-400">{feature.text}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}