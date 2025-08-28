import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { BoldText, ExtraBoldText} from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';

export const CtaSlide = ({ navigate }: { navigate: ReturnType<typeof useNavigate> }) => {
  const { colorScheme } = useTheme();

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-12 w-full px-4 sm:px-6 lg:px-20 xl:px-28">
      {/* Title Section - Mobile & Desktop */}
      <motion.div className="flex flex-col items-start gap-2 md:gap-4">
        <ExtraBoldText
          fontSize="2rem"
          smFontSize="1.5rem"
          mdFontSize="4rem"
          lgFontSize="6rem"
          style={{ color: colorScheme.text }}
          className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] text-left leading-tight"
        >
          Want to Bring
        </ExtraBoldText>
        
        <ExtraBoldText
          fontSize="2rem"
          smFontSize="1.5rem"
          mdFontSize="4rem"
          lgFontSize="6rem"
          style={{ color: colorScheme.primary }}
          className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] text-left leading-tight"
        >
          ClaudyGod Live
        </ExtraBoldText>
        
        <ExtraBoldText
          fontSize="2.5rem"
          smFontSize="1.5rem"
          mdFontSize="4rem"
          lgFontSize="6rem"
          style={{ color: colorScheme.text }}
          className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] text-left leading-tight"
        >
          To your City?
        </ExtraBoldText>
      </motion.div>

      {/* Mobile View */}
      <div className="md:hidden space-y-6 mt-4">
        <motion.div
          style={{ background: colorScheme.heading }}
          className="w-16 h-1 rounded-full"
        />

        <motion.div>
          <BoldText
            fontSize="1.1rem"
            style={{ color: colorScheme.textSecondary }}
            className="leading-snug max-w-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-left"
          >
            Book ClaudyGod for an unforgettable worship experience that will transform your event and touch hearts.
          </BoldText>
        </motion.div>

        <motion.div className="pt-2">
          <CustomButton
            onClick={() => navigate('/bookings')}
            variant="primary"
            size="lg"
            fullWidth
            className="shadow-lg py-3 text-base font-bold"
            style={{ 
              backgroundColor: colorScheme.primary,
              color: colorScheme.buttonText || '#fff'
            }}
          >
            Contact Us
          </CustomButton>
        </motion.div>

        {/* Additional Info - Mobile */}
        <motion.div className="pt-4">
          <BoldText
            fontSize="1rem"
            style={{ color: colorScheme.textSecondary }}
            className="leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            Available for concerts, worship nights, church events, and special gatherings.
          </BoldText>
        </motion.div>
      </div>

      {/* Desktop/Tablet View */}
      <div className="hidden md:block">
        <div className="flex flex-col gap-10 items-start text-left">
          {/* Description Text */}
          <motion.div className="space-y-6 max-w-5xl ml-0">
            <BoldText
              fontSize="1.5rem"
              mdFontSize="1.75rem"
              lgFontSize="2rem"
              style={{ color: colorScheme.textSecondary }}
              className="leading-relaxed max-w-4xl ml-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              Book ClaudyGod for an unforgettable worship experience that will transform your event and touch hearts.
            </BoldText>
          </motion.div>

          {/* Button Section */}
          <motion.div className="flex flex-col items-start gap-6 mt-6">
            <div
              className="w-20 md:w-24 lg:w-32 h-2 rounded-full"
              style={{ backgroundColor: colorScheme.heading }}
            ></div>
            
            <motion.div className="relative group">
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
                className="shadow-xl relative overflow-hidden px-8 py-4 font-bold"
                style={{
                  backgroundColor: colorScheme.primary,
                  color: colorScheme.buttonText || '#fff'
                }}
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
                <span className="relative z-10 text-lg md:text-xl lg:text-2xl">Contact Us</span>
              </CustomButton>
            </motion.div>
            
            <BoldText
              fontSize="1.25rem"
              mdFontSize="1.5rem"
              lgFontSize="1.75rem"
              style={{ color: colorScheme.text }}
              className="tracking-widest drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)]"
            >
              Let's Make It Happen
            </BoldText>
          </motion.div>

          {/* Additional Info */}
          <motion.div className="space-y-4 mt-8 w-full max-w-6xl ml-0">
            <BoldText
              fontSize="1rem"
              mdFontSize="1.125rem"
              lgFontSize="1.25rem"
              style={{ color: colorScheme.textSecondary }}
              className="leading-relaxed max-w-4xl ml-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              Available for concerts, worship nights, church events, and special gatherings.
            </BoldText>
          </motion.div>
        </div>
      </div>
    </div>
  );
};