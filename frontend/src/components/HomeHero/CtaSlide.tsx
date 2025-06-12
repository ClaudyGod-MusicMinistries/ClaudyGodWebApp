import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { textVariants } from '../data/HeroSlide';

export const CtaSlide = ({ navigate }: { navigate: ReturnType<typeof useNavigate> }) => (
  <>
    <motion.div 
      variants={textVariants}
      className="
        max-md:flex max-md:flex-col max-md:items-start max-md:gap-2 max-md:mb-6
        md:flex md:flex-col md:items-start md:gap-4 md:mb-12 roboto-condensed"
    >
      <span className="
        max-md:text-3xl raleway-medium max-md:leading-tight
        md:text-6xl roboto-condensed md:leading-tighter lg:text-7xl
        drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
      >
        Want to Bring 
      </span>
      
      <span className="
        max-md:text-purple-400 max-md:text-3xl max-md:leading-tight
        md:text-purple-400 work-sans md:text-6xl md:leading-tighter lg:text-7xl
        drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
      >
        ClaudyGod Live
      </span>
      
      <span className="
        max-md:text-white max-md:text-3xl max-md:leading-tight roboto-condensed
        md:text-white md:text-6xl md:leading-tighter lg:text-7xl raleway-medium
        drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
      >
        To your City?
      </span>
    </motion.div>

    <motion.div variants={textVariants}>
      <motion.button
        whileHover={{ 
          scale: 1.05, 
          boxShadow: '0px 4px 30px rgba(128, 0, 255, 0.4)'
        }}
        whileTap={{ 
          scale: 0.95,
          backgroundColor: 'rgba(76, 29, 149, 0.9)',
        }}
        onClick={() => navigate('/bookings')}
        className="
          max-md:relative max-md:rounded-full max-md:bg-purple-800 max-md:px-6 cursor-pointer max-md:py-3 max-md:text-lg work-sans
          md:relative cursor-pointer md:rounded-full md:bg-purple-800 md:px-14 md:py-6 md:text-3xl
          shadow-xl"
      >
        <motion.span
          className="absolute inset-0 bg-white/20 opacity-0 rounded-full"
          initial={{ scale: 0 }}
          whileTap={{
            opacity: 1,
            scale: 2,
            transition: { duration: 0.6 }
          }}
        />
        <span className="relative z-10 font-bold">Contact Us</span>
      </motion.button>
    </motion.div>
  </>
);