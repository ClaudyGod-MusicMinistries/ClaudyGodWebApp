// components/BioSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface BioSectionProps {
  imageSrc: string;
  altText: string;
  texts: string[];
  reverse?: boolean;
  hideOnSmall?: boolean;
}

export const BioSection: React.FC<BioSectionProps> = ({
  imageSrc,
  altText,
  texts,
  reverse = false,
  hideOnSmall = false,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`flex flex-col md:flex-row ${
      reverse ? 'md:flex-row-reverse' : ''
    } gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-10 mt-6 sm:mt-8 md:mt-12`}
  >
    <div className="md:w-2/3 space-y-3 xs:space-y-4 sm:space-y-5">
      {texts.map((text, index) => (
        <p
          key={index}
          className="text-gray-700 text-[15px] work-sans xs:text-base sm:text-[17px] md:text-lg leading-relaxed md:leading-loose"
        >
          {text}
        </p>
      ))}
    </div>

    <div
      className={`${
        hideOnSmall ? 'hidden lg:block' : ''
      } md:w-1/3 aspect-[4/5] xs:aspect-[3/4] md:aspect-[5/6] mt-2 xs:mt-3 sm:mt-0`}
    >
      <motion.img
        src={imageSrc}
        alt={altText}
        loading="lazy"
        className="rounded-lg shadow-md w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      />
    </div>
  </motion.div>
);
