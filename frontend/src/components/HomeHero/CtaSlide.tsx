import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { textVariants } from '../data/HeroSlide';
import { ExtraBoldText, RegularText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';

export const CtaSlide = ({ navigate }: { navigate: ReturnType<typeof useNavigate> }) => {
  const { colorScheme } = useTheme();

  return (
    <>
      <motion.div 
        variants={textVariants}
        className="max-md:flex max-md:flex-col max-md:items-start max-md:gap-2 max-md:mb-6
                  md:flex md:flex-col md:items-start md:gap-4 md:mb-12"
      >
        <ExtraBoldText
          fontSize="3rem"
          mdFontSize="6rem"
          style={{ color: colorScheme.text }}
          className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
        >
          Want to Bring
        </ExtraBoldText>
        
        <ExtraBoldText
          fontSize="3rem"
          mdFontSize="6rem"
          style={{ color: colorScheme.primary }}
          className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
        >
          ClaudyGod Live
        </ExtraBoldText>
        
        <ExtraBoldText
          fontSize="3rem"
          mdFontSize="6rem"
          style={{ color: colorScheme.text }}
          className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
        >
          To your City?
        </ExtraBoldText>
      </motion.div>

      <motion.div variants={textVariants}>
        <CustomButton
          onClick={() => navigate('/bookings')}
          variant="primary"
          size="xl"
          whileHover={{ 
            scale: 1.05, 
            boxShadow: `0px 4px 30px ${colorScheme.primary}66`
          }}
          whileTap={{ 
            scale: 0.95,
            backgroundColor: colorScheme.buttonActive,
          }}
          className="shadow-xl relative overflow-hidden"
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
          <span className="relative z-10">Contact Us</span>
        </CustomButton>
      </motion.div>
    </>
  );
};