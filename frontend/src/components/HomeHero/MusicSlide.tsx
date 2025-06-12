import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import HeroSlide from './HeroSlide';
import { textVariants } from '../data/HeroSlide';

export const MusicSlide = ({ 
  slide, 
  setIsModalOpen 
}: { 
  slide: HeroSlide; 
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> 
}) => (
  <div className="space-y-4 md:space-y-8 w-full">
    <motion.div 
      variants={textVariants}
      className="
        text-3xl md:text-6xl 
        font-bold 
        roboto-condensed 
        drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
    >
      MUSIC
    </motion.div>

    <div className="md:hidden space-y-6 mt-6">
      <motion.div variants={textVariants} className="w-16 h-1 bg-white rounded-full" />
      
      <motion.div 
        variants={textVariants}
        className="text-lg text-white/90 max-w-md leading-snug font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
      >
        Dive into spiritual worship through sacred melodies that uplift the soul and glorify His name
      </motion.div>
      
      <motion.div variants={textVariants}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="
            bg-purple-700/90 
            backdrop-blur-sm 
            rounded-full 
            px-8 py-4 
            text-white 
            font-bold 
            shadow-lg
            hover:bg-purple-800
            transition-colors
            text-lg"
        >
          Stream across platforms
        </motion.button>
      </motion.div>
    </div>

    <div className="hidden md:block">
      <div className="flex flex-col gap-6 md:gap-8">
        <motion.div variants={textVariants} className="space-y-6">
          <h3 className="md:text-4xl md:font-light md:italic md:text-purple-300 md:mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Experience the Divine Melody
          </h3>
          <p className="md:text-xl md:text-white/90 md:max-w-2xl md:leading-snug font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Dive into spiritual worship through sacred melodies that uplift the soul and glorify His name
          </p>
        </motion.div>

        <motion.div variants={textVariants} className="flex flex-col items-start gap-6 mt-2">
          <div className="w-[80px] h-[10px] bg-white"></div>
          <motion.div className="relative group">
            <div className="w-24 h-24 rounded-full bg-purple-900/40 backdrop-blur-sm flex items-center justify-center hover:bg-purple-900/50 transition-all transform hover:scale-105 shadow-lg">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 rounded-full bg-purple-800 flex items-center justify-center hover:bg-purple-700 transition-colors"
              >
                <FontAwesomeIcon 
                  icon={faPlayCircle} 
                  className="text-4xl text-white pl-1 cursor-pointer" 
                />
              </motion.button>
            </div>
          </motion.div>
          <h3 className="text-white font-bold tracking-wider text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Play Latest Album
          </h3>
        </motion.div>
        
        <motion.div variants={textVariants} className="space-y-4 md:space-y-6 mt-4 md:mt-12">
          <h5 className="text-xl md:text-2xl font-bold text-purple-400 roboto-condensed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            STREAM EVERYWHERE
          </h5>
          
          <div className="grid grid-cols-3 md:grid-cols-2 gap-4 md:gap-6">
            {slide.content?.streamingPlatforms?.map((platform) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="flex items-center gap-2 px-1 py-1 md:px-6 md:py-1 text-sm md:text-lg
                           bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors
                           shadow-md"
              >
                <FontAwesomeIcon 
                  icon={platform.icon as IconDefinition} 
                  className="text-lg md:text-2xl text-purple-700" 
                />
                <span className="font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {platform.name}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);