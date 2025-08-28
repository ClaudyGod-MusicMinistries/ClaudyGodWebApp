import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ExtraBoldText, RegularText } from '../ui/fonts/typography';

import { useTheme } from '../../contexts/ThemeContext';

export const Heroblog: React.FC = () => {
  const { colorScheme } = useTheme();

  return (
    <div 
      className="relative"
      style={{
        background: `linear-gradient(to right, ${colorScheme.background}, ${colorScheme.background})`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <ExtraBoldText
          fontSize="clamp(2.5rem, 8vw, 5rem)"
          lineHeight="1"
          className="mb-6 tracking-tight"
          color={colorScheme.text}
        >
          Our Blog
        </ExtraBoldText>
        
        <RegularText
          fontSize="1.25rem"
          className="max-w-2xl mx-auto mb-10"
          color={colorScheme.text}
        >
          Feel free to share your thoughts in our community
        </RegularText>
        
        <div className="relative max-w-lg w-full">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full px-5 py-3 rounded-full bg-opacity-20 border text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: colorScheme.text + '20',
              borderColor: colorScheme.textInverted + '30',
              color: colorScheme.textInverted,
              focusRingColor: colorScheme.textInverted
            }}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <FontAwesomeIcon 
              icon={faSearch} 
              className="h-5 w-5" 
              style={{ color: colorScheme.text }}
            />
          </div>
        </div>
      </div>
      <div 
        className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-transparent"
        style={{ 
          backgroundColor: colorScheme.background 
        }}
      ></div>
    </div>
  );
};