// MusicSlide.tsx - Optimized
import { motion } from 'framer-motion';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { streamingPlatforms } from '../data/musicData';
import { useTheme } from '../../contexts/ThemeContext';
import {
  BoldText,
  LightText,
  RegularText,
  UltraText,
} from '../ui/fonts/typography';

export const MusicSlide = ({
  setIsModalOpen,
}: {
  slide: any;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { colorScheme } = useTheme();

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10 w-full px-4 sm:px-6 lg:px-12">
      {/* Title Section */}
      <motion.div className="flex flex-col items-start gap-1 md:gap-2">
        <UltraText
          fontSize="2rem"
          smFontSize="1.8rem"
          mdFontSize="3rem"
          lgFontSize="4rem"
          style={{ color: colorScheme.heading }}
          className="text-left leading-tight"
        >
          MUSIC
        </UltraText>
      </motion.div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4 mt-2">
        <motion.div
          style={{ background: colorScheme.heading }}
          className="w-16 h-1 rounded-full"
        />

        <motion.div>
          <RegularText
            fontSize="0.9rem"
            style={{ color: colorScheme.textSecondary }}
            className="leading-relaxed max-w-md text-left"
          >
            Spiritual worship through sacred melodies.
          </RegularText>
        </motion.div>

        <motion.div className="pt-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="py-3 text-base w-full rounded-lg font-bold"
            style={{
              backgroundColor: colorScheme.primary,
              color: colorScheme.buttonText || '#fff',
            }}
          >
            Stream Now
          </button>
        </motion.div>

        <motion.div className="pt-2">
          <LightText
            fontSize="0.8rem"
            style={{ color: colorScheme.textSecondary }}
            className="leading-relaxed italic"
          >
            Available on major platforms
          </LightText>
        </motion.div>
      </div>

      {/* Desktop/Tablet View */}
      <div className="hidden md:block">
        <div className="flex flex-col gap-8 items-start text-left">
          <motion.div className="space-y-4 max-w-3xl ml-0">
            <RegularText
              fontSize="1.3rem"
              mdFontSize="1.5rem"
              style={{ color: colorScheme.accent }}
              className="leading-relaxed italic"
            >
              Experience the Divine Melody
            </RegularText>

            <LightText
              fontSize="1.1rem"
              mdFontSize="1.3rem"
              style={{ color: colorScheme.textSecondary }}
              className="leading-relaxed"
            >
              Spiritual worship through sacred melodies.
            </LightText>
          </motion.div>

          <motion.div className="flex flex-col items-start gap-4 mt-2">
            <div
              className="w-20 h-1 rounded-full"
              style={{ backgroundColor: colorScheme.heading }}
            />

            <motion.div className="relative group">
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-transparent border-none cursor-pointer"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${colorScheme.primary}30`,
                    border: `2px solid ${colorScheme.primary}50`,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPlayCircle}
                    className="text-4xl pl-1"
                    style={{ color: colorScheme.primary }}
                  />
                </div>
              </motion.button>
            </motion.div>

            <UltraText
              fontSize="1.2rem"
              mdFontSize="1.4rem"
              style={{ color: colorScheme.text }}
              className="tracking-wide"
            >
              Play Latest Album
            </UltraText>
          </motion.div>

          <motion.div className="space-y-4 mt-8 w-full max-w-3xl ml-0">
            <div className="space-y-3">
              <BoldText
                fontSize="1rem"
                mdFontSize="1.2rem"
                style={{ color: colorScheme.accent }}
                className="tracking-wide uppercase"
              >
                Stream Everywhere
              </BoldText>

              <div className="flex flex-wrap gap-3 justify-start">
                {streamingPlatforms.map(platform => (
                  <motion.div
                    key={platform.name}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-none min-w-[140px]"
                  >
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 flex items-center justify-start gap-3 rounded-lg group"
                      style={{
                        backgroundColor:
                          colorScheme.background || 'rgba(255, 255, 255, 0.1)',
                        color: colorScheme.text,
                        border: `1px solid ${colorScheme.primary}20`,
                      }}
                    >
                      <FontAwesomeIcon
                        icon={platform.icon}
                        className="text-xl flex-none"
                        style={{ color: colorScheme.primary }}
                      />
                      <span className="font-bold text-sm whitespace-nowrap">
                        {platform.name}
                      </span>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div className="pt-4">
              <LightText
                fontSize="0.9rem"
                style={{ color: colorScheme.textSecondary }}
                className="leading-relaxed italic"
              >
                Available on all major platforms
              </LightText>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
