import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

import { HeroSlide } from '../data/HeroSlide';
import { textVariants } from '../types/homeHero';

export const QuoteSlide = ({ slide }: { slide: HeroSlide }) => (
  <>
    <motion.div 
      variants={textVariants}
      className="
        sm:text-xl
        sm:leading-4 
        relative
        top-20
        w-full 
        px-4 
        text-white
        text-left 
        roboto-condensed
        md:text-5xl
        md:leading-tight 
        md:mb-6 
        md:px-0
        md:text-white
        drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
    >
      {slide.content?.quote}
    </motion.div>

    <motion.div 
      variants={textVariants}
      className="
        text-base 
        italic 
        text-green-400 
        text-left 
        relative 
        top-22
        left-5
        md:text-2xl 
        md:text-purple-300 
        md:top-20
        font-bold
        drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
    >
      {slide.content?.reference}
    </motion.div>

    {slide.id === 1 && (
      <motion.div 
        variants={textVariants}
        className="
          md:flex md:flex-row md:items-center md:gap-6
          max-md:flex max-md:flex-col max-md:items-center max-md:gap-4"
      >
        <div className="
          md:flex md:flex-col md:mt-25 md:items-center md:gap-2
          max-md:flex max-md:flex-col max-md:mt-25 max-md:mr-90 max-md:items-center max-md:gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="
              md:rounded-full md:bg-white/30 md:p-4 md:backdrop-blur-sm
              max-md:rounded-full max-md:bg-white/30 max-md:p-3 max-md:backdrop-blur-sm
              hover:bg-white/40 transition-all
              shadow-lg"
          >
            <FontAwesomeIcon 
              icon={faPlayCircle} 
              className="cursor-pointer
                md:text-3xl md:text-purple-700
                max-md:text-2xl max-md:text-purple-700" 
            />
          </motion.button>
          
          <h3 className="
            md:text-lg md:text-white md:font-bold md:tracking-wider
            max-md:text-base max-md:text-white max-md:font-bold max-md:tracking-normal
            drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            Play Now
          </h3>
        </div>
      </motion.div>
    )}
  </>
);