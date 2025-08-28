import { motion } from 'framer-motion';
import { About1 } from '../../assets/';
import { useState } from 'react';
import { ExtraBoldText, RegularText } from '../ui/fonts/typography';
import { useTheme } from '../../contexts/ThemeContext';

export const ArtistQuote = () => {
  const { colorScheme } = useTheme();
  const [loadedImage, setLoadedImage] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-5xl mx-auto p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl mt-20 sm:rounded-2xl mb-10 sm:mb-12 md:mb-14 lg:mb-16"
      style={{
        backgroundColor: colorScheme.surface,
        borderLeft: `4px solid ${colorScheme.accent}`,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="text-center">
        <div
          className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full mb-3 sm:mb-4 md:mb-5 lg:mb-6"
          style={{
            background: `linear-gradient(to right, ${colorScheme.accent}, ${colorScheme.primary})`,
          }}
        >
          <img
            src={About1}
            alt="ClaudyGod"
            className="rounded-xl w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover"
            onLoad={() => setLoadedImage(true)}
            style={{
              border: `2px solid ${colorScheme.surface}`,
            }}
          />
          {!loadedImage && (
            <div
              className="border-2 border-dashed rounded-xl w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 animate-pulse"
              style={{
                backgroundColor: colorScheme.surfaceVariant,
                borderColor: colorScheme.secondary,
              }}
            />
          )}
        </div>

        <RegularText
          fontSize="1rem"
          smFontSize="1.1rem"
          mdFontSize="1.25rem"
          lgFontSize="1.4rem"
          className="mb-3 sm:mb-4 md:mb-5 lg:mb-6 px-1 sm:px-2"
          style={{ color: colorScheme.textSecondary, lineHeight: '1.6' }}
        >
          "My Vision is to reach the world with the love of Jesus, to proclaim
          truth always, and to redirect mankind to God through Worship and the
          Word."
        </RegularText>

        <ExtraBoldText
          fontSize="1rem"
          smFontSize="1.1rem"
          mdFontSize="1.2rem"
          lgFontSize="1.3rem"
          className="tracking-wide"
          style={{
            color: colorScheme.accent,
          }}
        >
          — Min. ClaudyGod
        </ExtraBoldText>

        {/* Decorative elements for visual appeal */}
        <div className="flex justify-center mt-4 sm:mt-5">
          <div
            className="w-6 h-1 rounded-full mx-1"
            style={{ backgroundColor: colorScheme.accent, opacity: 0.6 }}
          ></div>
          <div
            className="w-4 h-1 rounded-full mx-1"
            style={{ backgroundColor: colorScheme.accent, opacity: 0.4 }}
          ></div>
          <div
            className="w-2 h-1 rounded-full mx-1"
            style={{ backgroundColor: colorScheme.accent, opacity: 0.2 }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};
