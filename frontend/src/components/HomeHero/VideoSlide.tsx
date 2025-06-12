import { motion } from 'framer-motion';
import { HeroSlide } from '../data/HeroSlide';
import { textVariants } from '../data/HeroSlide';


export const VideoSlide = ({ slide }: { slide: HeroSlide }) => (
  <motion.div 
    variants={textVariants}
    className="max-w-3xl"
  >
    <motion.h1 
      className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
    >
      {slide.content?.quote}
    </motion.h1>
    <motion.p 
      className="text-xl md:text-3xl italic text-purple-300 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
    >
      {slide.content?.reference}
    </motion.p>
  </motion.div>
);