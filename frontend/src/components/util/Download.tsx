/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faApple, 
  faGooglePlay 
} from '@fortawesome/free-brands-svg-icons';
import { useEffect, useRef } from 'react';
import { ExtraBoldText, LightText, RegularText, SemiBoldText } from '../ui/fonts/typography';
import { useTheme } from '../../contexts/ThemeContext';
import CustomButton from '../ui/fonts/buttons/CustomButton';
// Animation variants
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const { colorScheme } = useTheme();
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = async () => {
      try {
        // Try playing without mute first
        video.muted = true;
        await video.play();
      } catch (err) {
        // If that fails, mute and try again
        try {
          video.muted = true;
          await video.play();
        } catch (err) {
          console.error('Video playback failed:', err);
        }
      }
    };

    // Add event listener for when video is loaded
    video.addEventListener('loadedmetadata', handlePlay);
    
    // Cleanup function
    return () => {
      video.removeEventListener('loadedmetadata', handlePlay);
      if (!video.paused) {
        video.pause();
      }
    };
  }, []);

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="relative min-h-[45vh] overflow-hidden py-10 px-4"
      style={{ background: `linear-gradient(135deg, ${colorScheme.background}, ${colorScheme.background})` }}
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${colorScheme.primaryLight}30, transparent 70%)`,
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
                    preload="auto"
                    poster="/video-poster.jpg" // Add a poster frame
                  >
                    <source src="/mainBanner.mp4" type="video/mp4" />
                    <source src="/mainBanner.webm" type="video/webm" />
                    Your browser does not support HTML video.
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
                        <SemiBoldText className="text-white text-sm">ClaudyGod</SemiBoldText>
                        <RegularText className="text-purple-300 text-xs">Premium Music</RegularText>
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
                aria-label="Download app"
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
              <ExtraBoldText 
                className="mb-3 sm:mb-4"
                fontSize="2rem"
                lineHeight="1.2"
                color={colorScheme.text}
              >
                ClaudyGod Music On the Go
              </ExtraBoldText>
              
              <LightText
                className="mb-4 sm:mb-5 max-w-md mx-auto lg:mx-0"
                color={colorScheme.textSecondary}
                fontSize="0.9rem"
              >
                Experience premium music streaming with our mobile app. Download now to enjoy your favorite tracks anytime.
              </LightText>
            </motion.div>
            
           <motion.div 
  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0"
  variants={containerVariants}
>
  {/* App Store Button */}
  <motion.div 
    className="flex-1"
    variants={itemVariants}
  >
    <CustomButton
      href="https://www.claudygod.com/claudygod-tv-apple"
      icon={<FontAwesomeIcon icon={faApple} />}
      variant="appStore"
      whileHover="hover"
      whileTap="tap"
    >
      <div className="text-left">
        <RegularText className="text-[10px] tracking-wide">
          Download on the
        </RegularText>
        <SemiBoldText className="text-base tracking-tight">
          App Store
        </SemiBoldText>
      </div>
    </CustomButton>
  </motion.div>

  {/* Google Play Button */}
  <motion.div 
    className="flex-1"
    variants={itemVariants}
  >
    <CustomButton
      href="https://www.claudygod.com/claudygod-tv-andrioid"
      icon={<FontAwesomeIcon icon={faGooglePlay} />}
      variant="googlePlay"
      whileHover="hover"
      whileTap="tap"
    >
      <div className="text-left">
        <RegularText 
        style={{color:colorScheme.textSecondary}}
        className="text-[10px] tracking-wide uppercase">
          Get it on
        </RegularText>
        <SemiBoldText className="text-base tracking-tight">
          Google Play
        </SemiBoldText>
      </div>
    </CustomButton>
  </motion.div>
</motion.div>
            <motion.div 
              className="mt-6 pt-4 border-t border-opacity-10 max-w-md mx-auto lg:mx-0"
              style={{ borderColor: colorScheme.border }}
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
                    <RegularText className="text-xs" color={colorScheme.textSecondary}>
                      {feature.text}
                    </RegularText>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};