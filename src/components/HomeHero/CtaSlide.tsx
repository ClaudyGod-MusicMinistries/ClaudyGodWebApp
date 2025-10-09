// CtaSlide.tsx - Optimized
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { BoldText, UltraText, ShadowsText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';

export const CtaSlide = ({
  navigate,
}: {
  navigate: ReturnType<typeof useNavigate>;
}) => {
  const { colorScheme } = useTheme();

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full px-4 sm:px-6 lg:px-12">
      {/* Title Section */}
      <motion.div className="flex flex-col items-start gap-1 md:gap-2">
        <UltraText
          fontSize="1.5rem"
          smFontSize="1.3rem"
          mdFontSize="2.5rem"
          lgFontSize="3.5rem"
          style={{ color: colorScheme.text }}
          className="text-left leading-tight"
        >
          Want to Bring
        </UltraText>

        <ShadowsText
          fontSize="1.5rem"
          smFontSize="1.3rem"
          mdFontSize="2.5rem"
          lgFontSize="3.5rem"
          style={{ color: colorScheme.primary }}
          className="text-left leading-tight"
        >
          ClaudyGod Live
        </ShadowsText>

        <UltraText
          fontSize="1.5rem"
          smFontSize="1.3rem"
          mdFontSize="2.5rem"
          lgFontSize="3.5rem"
          style={{ color: colorScheme.text }}
          className="text-left leading-tight"
        >
          To your City?
        </UltraText>
      </motion.div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4 mt-2">
        <motion.div
          style={{ background: colorScheme.heading }}
          className="w-12 h-1 rounded-full"
        />

        <motion.div>
          <BoldText
            fontSize="0.9rem"
            smFontSize="1rem"
            style={{ color: colorScheme.textSecondary }}
            className="leading-snug max-w-md text-left"
          >
            Book ClaudyGod for an unforgettable worship experience.
          </BoldText>
        </motion.div>

        <motion.div className="pt-1">
          <CustomButton
            onClick={() => navigate('/bookings')}
            variant="primary"
            size="md"
            fullWidth
            className="py-2 text-sm font-bold"
            style={{
              backgroundColor: colorScheme.primary,
              color: colorScheme.buttonText || '#fff',
            }}
          >
            Contact Us
          </CustomButton>
        </motion.div>

        <motion.div className="pt-2">
          <BoldText
            fontSize="0.8rem"
            style={{ color: colorScheme.textSecondary }}
            className="leading-relaxed"
          >
            Available for concerts and worship events.
          </BoldText>
        </motion.div>
      </div>

      {/* Desktop/Tablet View */}
      <div className="hidden md:block">
        <div className="flex flex-col gap-6 items-start text-left">
          <motion.div className="space-y-4 max-w-3xl ml-0">
            <BoldText
              fontSize="1.1rem"
              mdFontSize="1.3rem"
              lgFontSize="1.5rem"
              style={{ color: colorScheme.textSecondary }}
              className="leading-relaxed max-w-2xl ml-0"
            >
              Book ClaudyGod for an unforgettable worship experience.
            </BoldText>
          </motion.div>

          <motion.div className="flex flex-col items-start gap-4 mt-2">
            <div
              className="w-16 md:w-20 h-1 rounded-full"
              style={{ backgroundColor: colorScheme.heading }}
            ></div>

            <motion.div className="relative group">
              <CustomButton
                onClick={() => navigate('/bookings')}
                variant="primary"
                size="lg"
                className="px-6 py-3 font-bold text-base"
                style={{
                  backgroundColor: colorScheme.primary,
                  color: colorScheme.buttonText || '#fff',
                }}
              >
                Contact Us
              </CustomButton>
            </motion.div>

            <UltraText
              fontSize="1rem"
              mdFontSize="1.1rem"
              lgFontSize="1.3rem"
              style={{ color: colorScheme.text }}
              className="tracking-wide"
            >
              Let's Make It Happen
            </UltraText>
          </motion.div>

          <motion.div className="space-y-2 mt-4 w-full max-w-2xl ml-0">
            <BoldText
              fontSize="0.9rem"
              mdFontSize="1rem"
              style={{ color: colorScheme.textSecondary }}
              className="leading-relaxed ml-0"
            >
              Available for concerts and worship events.
            </BoldText>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
