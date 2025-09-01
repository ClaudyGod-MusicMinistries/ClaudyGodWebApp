import { motion } from 'framer-motion';
import {
  ExtraBoldText,
  RegularText,
  SemiBoldText,
} from '../ui/fonts/typography';
import { useTheme } from '../../contexts/ThemeContext';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const Herosection: React.FC<HeroSectionProps> = ({
  title,
  subtitle = "Experience the divine fusion of American Contemporary Christian Music and Afro-Gospel Songs through ClaudyGod's Inspirational Journey.",
  backgroundImage,
  ctaText = 'Explore Music',
  onCtaClick,
  className = '',
}) => {
  const { colorScheme } = useTheme();

  return (
    <section
      className={`relative w-full min-h-[80vh] overflow-hidden ${className}`}
      style={{ backgroundColor: colorScheme.background }}
    >
      {/* Background overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-0" />

      <div className="container mx-auto h-full mt-10 flex flex-col md:flex-row">
        {/* Text Column - Enhanced spacing and typography */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-1/2 flex flex-col justify-center h-full py-16 md:py-24 px-6 md:px-12 lg:px-16 relative z-10"
        >
          <div className="max-w-2xl space-y-6 md:mt-20">
            {' '}
            {/* Added md:mt-20 */}
            {/* Decorative element */}
            <motion.div
              className="w-16 h-1 rounded-full mb-6"
              style={{ backgroundColor: colorScheme.primary }}
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
            <ExtraBoldText
              className="mb-2"
              fontSize="clamp(2.5rem, 5vw, 4rem)"
              lineHeight="1.1"
              color={colorScheme.textInverted}
            >
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, ${colorScheme.primaryLight}, ${colorScheme.textInverted})`,
                }}
              >
                {title}
              </span>
            </ExtraBoldText>
            <div
              className="border-l-4 pl-6 my-6"
              style={{ borderColor: colorScheme.primary }}
            >
              <RegularText
                color={colorScheme.text}
                fontSize="clamp(1rem, 1.5vw, 1.25rem)"
                lineHeight="1.7"
              >
                {subtitle}
              </RegularText>
            </div>
            {onCtaClick && (
              <motion.button
                onClick={onCtaClick}
                className="mt-8"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <SemiBoldText
                  className="px-8 py-4 rounded-full inline-block"
                  style={{
                    backgroundColor: colorScheme.primary,
                    color: colorScheme.textInverted, // Fixed color to be visible (was using primary color for text)
                  }}
                  fontSize="1.125rem"
                >
                  {ctaText}
                </SemiBoldText>
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Image Column - Enhanced presentation */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-1/2 h-full flex items-center justify-center relative"
        >
          {/* Mobile: Full screen image with overlay */}
          <div className="block md:hidden w-full h-full">
            <img
              src={backgroundImage}
              alt="ClaudyGod"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Desktop: Elegant image presentation */}
          <div className="hidden md:flex items-center mt-20 justify-center w-full h-full px-8 lg:px-16">
            <motion.div
              className="relative w-full h-full max-w-[600px]"
              whileInView={{ scale: [0.95, 1] }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <img
                src={backgroundImage}
                alt="ClaudyGod"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                style={{
                  boxShadow: `0 25px 50px -12px ${colorScheme.primary}20`,
                }}
                loading="eager"
              />
              {/* Decorative frame */}
              <div className="absolute inset-0 border-2 border-white/20 rounded-2xl pointer-events-none" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Title Overlay - Enhanced */}
      <div className="absolute inset-0 flex items-end pb-12 md:hidden px-6 z-10">
        <div className="w-full space-y-4">
          <ExtraBoldText
            fontSize="2.5rem"
            color={colorScheme.text}
            lineHeight="1.1"
          >
            {title}
          </ExtraBoldText>
          {onCtaClick && (
            <motion.button onClick={onCtaClick} whileTap={{ scale: 0.98 }}>
              <SemiBoldText
                className="px-6 py-3 rounded-full inline-block"
                style={{
                  backgroundColor: colorScheme.primary,
                  color: colorScheme.textInverted,
                }}
                fontSize="1rem"
              >
                {ctaText}
              </SemiBoldText>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};
