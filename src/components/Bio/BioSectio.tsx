// components/BioSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface BioSectionProps {
  imageSrc: string;
  altText: string;
  texts: string[];
  reverse?: boolean;
  hideOnSmall?: boolean;
  imagePosition?: 'left' | 'right';
  imageSize?: 'small' | 'medium' | 'large';
}

export const BioSection: React.FC<BioSectionProps> = ({
  imageSrc,
  altText,
  texts,
  reverse = false,
  hideOnSmall = false,
  imagePosition = 'left',
  imageSize = 'medium',
}) => {
  // Determine layout direction based on props
  const getFlexDirection = () => {
    if (reverse) return 'md:flex-row-reverse';
    if (imagePosition === 'right') return 'md:flex-row-reverse';
    return 'md:flex-row';
  };

  // Determine image size classes
  const getImageSizeClasses = () => {
    switch (imageSize) {
      case 'small':
        return 'md:w-1/4 lg:w-1/3';
      case 'large':
        return 'md:w-1/2 lg:w-2/5';
      case 'medium':
      default:
        return 'md:w-1/3 lg:w-2/5';
    }
  };

  // Determine text container size
  const getTextSizeClasses = () => {
    switch (imageSize) {
      case 'small':
        return 'md:w-3/4 lg:w-2/3';
      case 'large':
        return 'md:w-1/2 lg:w-3/5';
      case 'medium':
      default:
        return 'md:w-2/3 lg:w-3/5';
    }
  };

  // Determine image aspect ratio
  const getImageAspectRatio = () => {
    switch (imageSize) {
      case 'small':
        return 'aspect-[3/4] md:aspect-[4/5]';
      case 'large':
        return 'aspect-[4/5] md:aspect-[3/4]';
      case 'medium':
      default:
        return 'aspect-[4/5] md:aspect-[5/6]';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${getFlexDirection()} gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center`}
    >
      {/* Text Content */}
      <div
        className={`w-full ${getTextSizeClasses()} space-y-4 sm:space-y-5 md:space-y-6`}
      >
        {texts.map((text, index) => (
          <motion.p
            key={index}
            initial={{
              opacity: 0,
              x: reverse || imagePosition === 'right' ? 20 : -20,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-gray-700 work-sans text-sm sm:text-base md:text-[15px] lg:text-[16px] leading-relaxed sm:leading-loose"
          >
            {text}
          </motion.p>
        ))}
      </div>

      {/* Image Container */}
      <div
        className={`
          ${hideOnSmall ? 'hidden md:block' : 'block'}
          w-full sm:w-4/5 md:w-auto ${getImageSizeClasses()}
          ${getImageAspectRatio()}
          ${reverse || imagePosition === 'right' ? 'md:ml-auto' : 'md:mr-auto'}
        `}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full h-full overflow-hidden rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          <img
            src={imageSrc}
            alt={altText}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-5 transition-opacity duration-300" />
        </motion.div>
      </div>
    </motion.div>
  );
};
