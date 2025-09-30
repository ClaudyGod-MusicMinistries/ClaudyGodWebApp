import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  overlayColor?: string;
  style?: React.CSSProperties;
  backgroundPosition?: string;
}

export const Herosection: React.FC<HeroSectionProps> = ({
  title,
  subtitle = 'Welcome to our platform',
  backgroundImage,
  ctaText = 'Explore Music',
  onCtaClick,
  className = '',
  children,
  overlayColor = 'rgba(0,0,0,0.4)',
  style,
  backgroundPosition = 'center center',
}) => {
  const { colorScheme } = useTheme();

  return (
    <section
      className={`relative w-full min-h-[80vh] overflow-hidden ${className}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: backgroundPosition,
        backgroundRepeat: 'no-repeat',
        // REMOVE this line - it's causing the background color
        // backgroundColor: colorScheme.background,
        ...style,
      }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: overlayColor }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        {title && (
          <h1
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ color: colorScheme.text }}
          >
            {title}
          </h1>
        )}
        {subtitle && (
          <p
            className="text-lg md:text-xl mb-6"
            style={{ color: colorScheme.subtleText }}
          >
            {subtitle}
          </p>
        )}
        {ctaText && (
          <button
            onClick={onCtaClick}
            className="px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: colorScheme.accent }}
          >
            {ctaText}
          </button>
        )}
        {children}
      </div>
    </section>
  );
};
