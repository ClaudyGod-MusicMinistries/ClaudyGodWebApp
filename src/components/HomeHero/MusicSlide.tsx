/* eslint-disable @typescript-eslint/no-explicit-any */
// MusicSlide.tsx
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
    <div className="space-y-8 sm:space-y-10 md:space-y-14 w-full px-4 sm:px-6 lg:px-20 xl:px-28">
      {/* Title Section */}
      <motion.div className="flex flex-col items-start gap-2 md:gap-4">
        <UltraText
          fontSize="2.5rem"
          smFontSize="2rem"
          mdFontSize="5rem"
          lgFontSize="7rem"
          style={{ color: colorScheme.heading }}
          className="drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)] text-left leading-tight tracking-tight"
        >
          MUSIC
        </UltraText>
      </motion.div>

      {/* Mobile View */}
      <div className="md:hidden space-y-8 mt-6">
        <motion.div
          style={{ background: colorScheme.heading }}
          className="w-20 h-1 rounded-full"
        />

        <motion.div>
          <RegularText
            fontSize="1.1rem"
            style={{ color: colorScheme.textSecondary }}
            className="leading-relaxed max-w-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-left"
          >
            Dive into spiritual worship through sacred melodies that uplift the
            soul and glorify His name
          </RegularText>
        </motion.div>

        <motion.div className="pt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="shadow-xl py-4 text-lg w-full rounded-xl font-bold transition-all duration-300 hover:shadow-2xl active:scale-95"
            style={{
              backgroundColor: colorScheme.primary,
              color: colorScheme.buttonText || '#fff',
            }}
          >
            Stream Across Platforms
          </button>
        </motion.div>

        {/* Additional Info - Mobile */}
        <motion.div className="pt-6">
          <LightText
            fontSize="0.9rem"
            style={{ color: colorScheme.textSecondary }}
            className="leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] italic"
          >
            Available on all major streaming services
          </LightText>
        </motion.div>
      </div>

      {/* Desktop/Tablet View */}
      <div className="hidden md:block">
        <div className="flex flex-col gap-16 items-start text-left">
          {/* Description Text */}
          <motion.div className="space-y-8 max-w-6xl ml-0">
            <RegularText
              fontSize="1.75rem"
              mdFontSize="2rem"
              lgFontSize="2.25rem"
              style={{ color: colorScheme.accent }}
              className="leading-relaxed max-w-5xl ml-0 drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] italic"
            >
              Experience the Divine Melody
            </RegularText>

            <LightText
              fontSize="1.5rem"
              mdFontSize="1.75rem"
              lgFontSize="2rem"
              style={{ color: colorScheme.textSecondary }}
              className="leading-relaxed max-w-5xl ml-0 drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)]"
            >
              Dive into spiritual worship through sacred melodies that uplift
              the soul and glorify His name
            </LightText>
          </motion.div>

          {/* Play Button Section */}
          <motion.div className="flex flex-col items-start gap-8 mt-8">
            <div
              className="w-24 md:w-28 lg:w-32 h-2 rounded-full"
              style={{ backgroundColor: colorScheme.heading }}
            />

            <motion.div className="relative group">
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{
                  scale: 1.05,
                  transition: { type: 'spring', stiffness: 400, damping: 10 },
                }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-transparent border-none cursor-pointer"
                aria-label="Play latest album"
              >
                <div
                  className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-md"
                  style={{
                    backgroundColor: `${colorScheme.primary}30`,
                    border: `2px solid ${colorScheme.primary}50`,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPlayCircle}
                    className="text-5xl md:text-6xl lg:text-7xl pl-2"
                    style={{ color: colorScheme.primary }}
                  />
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.button>
            </motion.div>

            <UltraText
              fontSize="1.5rem"
              mdFontSize="1.75rem"
              lgFontSize="2rem"
              style={{ color: colorScheme.text }}
              className="tracking-wider drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            >
              Play Latest Album
            </UltraText>
          </motion.div>

          {/* Streaming Platforms Section */}
          <motion.div className="space-y-12 mt-16 w-full max-w-6xl ml-0">
            <div className="space-y-6">
              <BoldText
                fontSize="1.25rem"
                mdFontSize="1.5rem"
                lgFontSize="1.75rem"
                style={{ color: colorScheme.accent }}
                className="tracking-widest drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] uppercase"
              >
                Stream Everywhere
              </BoldText>

              {/* Streaming Platforms Grid */}
              <div className="flex flex-wrap gap-6 lg:gap-8 justify-start">
                {streamingPlatforms.map(platform => (
                  <motion.div
                    key={platform.name}
                    whileHover={{
                      y: -4,
                      transition: {
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                      },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-none min-w-[200px] max-w-[260px] flex-grow"
                  >
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 lg:px-8 py-4 lg:py-5 shadow-xl hover:shadow-2xl flex items-center justify-start gap-4 rounded-xl transition-all duration-300 group"
                      style={{
                        backgroundColor:
                          colorScheme.background || 'rgba(255, 255, 255, 0.1)',
                        color: colorScheme.text,
                        border: `1px solid ${colorScheme.primary}20`,
                      }}
                    >
                      <FontAwesomeIcon
                        icon={platform.icon}
                        className="text-2xl md:text-3xl lg:text-4xl flex-none transition-transform duration-300 group-hover:scale-110"
                        style={{ color: colorScheme.primary }}
                      />
                      <span className="font-bold text-base md:text-lg lg:text-xl whitespace-nowrap transition-colors duration-300 group-hover:text-opacity-90">
                        {platform.name}
                      </span>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <motion.div className="pt-8">
              <LightText
                fontSize="1rem"
                mdFontSize="1.125rem"
                lgFontSize="1.25rem"
                style={{ color: colorScheme.textSecondary }}
                className="leading-relaxed max-w-4xl ml-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] italic"
              >
                Available on all major streaming platforms worldwide
              </LightText>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
