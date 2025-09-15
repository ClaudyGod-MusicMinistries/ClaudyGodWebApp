import React from 'react';
import { useTheme } from '../../contexts/ThemeContext'; // adjust import path to your project

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  overlayColor?: string;

  /** 👇 new prop */
  style?: React.CSSProperties;
}

export const Herosection: React.FC<HeroSectionProps> = ({
  title,
  subtitle = 'Welcome to our platform',
  backgroundImage,
  ctaText = 'Explore Music',
  onCtaClick,
  className = '',
  children,
  overlayColor = 'rgba(0,0,0,0.5)',
  style, // destructure the new style prop
}) => {
  const { colorScheme } = useTheme();

  return (
    <section
      className={`relative w-full min-h-[80vh] overflow-hidden ${className}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: colorScheme.background,
        ...style, // merge in any extra styles passed by parent
      }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: overlayColor }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <h1
          className="text-4xl md:text-6xl font-bold mb-4"
          style={{ color: colorScheme.text }}
        >
          {title}
        </h1>
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
            className="px-6 py-3 rounded-lg text-white font-medium"
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
