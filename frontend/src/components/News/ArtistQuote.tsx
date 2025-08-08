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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="max-w-5xl mx-auto p-6 md:p-8 rounded-2xl mb-16"
      style={{
        backgroundColor: colorScheme.surface,
        borderLeft: `4px solid ${colorScheme.accent}`
      }}
    >
      <div className="text-center">
        <div 
          className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full mb-4 md:mb-6"
          style={{
            background: `linear-gradient(to right, ${colorScheme.accent}, ${colorScheme.primary})`
          }}
        >
          <img
            src={About1}
            alt="ClaudyGod"
            className="rounded-xl w-10 h-10 md:w-12 md:h-12 object-cover"
            onLoad={() => setLoadedImage(true)}
            style={{
              border: `2px solid ${colorScheme.surface}`
            }}
          />
          {!loadedImage && (
            <div 
              className="border-2 border-dashed rounded-xl w-10 h-10 md:w-12 md:h-12 animate-pulse"
              style={{
                backgroundColor: colorScheme.surfaceVariant,
                borderColor: colorScheme.secondary
              }}
            />
          )}
        </div>
        
        <RegularText
          fontSize="1.25rem"
          mdFontSize="1.5rem"
          className="mb-4 md:mb-6"
          style={{ color: colorScheme.textSecondary }}
        >
          My Vision is to reach the world with the love of Jesus, to proclaim truth always, and to
          redirect mankind to God through Worship and the Word.
        </RegularText>
        
        <ExtraBoldText
          fontSize="1.25rem"
          mdFontSize="1.5rem"
          style={{ color: colorScheme.accent }}
        >
          — Min. ClaudyGod
        </ExtraBoldText>
      </div>
    </motion.div>
  );
};