// components/Herosection.tsx
import React from 'react';
import { LAYOUT_CONSTANTS } from './Layout';

interface LayoutTemplateProps {
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

export const LayoutTemplate: React.FC<LayoutTemplateProps> = ({
  backgroundImage,
  className = '',
  children, // Make sure this is destructured
  overlayColor = 'rgba(0,0,0,0.4)',
  style,
  backgroundPosition = 'center center',
}) => {
  return (
    <section
      className={`relative w-full ${LAYOUT_CONSTANTS.HERO_HEIGHT.mobile} md:${LAYOUT_CONSTANTS.HERO_HEIGHT.desktop} overflow-hidden ${className}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: backgroundPosition,
        backgroundRepeat: 'no-repeat',
        ...style,
      }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: overlayColor }}
      />

      {/* ADD THIS: Render the children */}
      <div className="relative z-10 h-full">{children}</div>
    </section>
  );
};
