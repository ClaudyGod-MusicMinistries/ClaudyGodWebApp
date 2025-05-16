// components/HeroSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  backgroundImage: string;
}

export const Herosection: React.FC<HeroSectionProps> = ({ title, backgroundImage }) => {
  return (
    <section className="relative w-full bg-black pt-16 md:pt-20 lg:pt-24">
      <div className="container-custom mx-auto flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-12 py-8 md:py-12 lg:py-16 px-4 sm:px-6">
        {/* Image Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 xl:w-[55%] relative order-2 lg:order-1"
        >
          <div className="relative overflow-hidden rounded-xl shadow-2xl lg:left-10 xl:left-20 -bottom-4 md:bottom-8 lg:bottom-10 mx-auto max-w-[500px] lg:max-w-none">
            <img
              src={backgroundImage}
              alt="ClaudyGod"
              className="w-full h-auto aspect-square md:aspect-[1/1.1] object-cover object-center rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 to-transparent" />
          </div>
        </motion.div>

        {/* Text Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 xl:w-[45%] text-white order-1 lg:order-2 text-center lg:text-left mb-8 lg:mb-0 lg:mr-8 xl:mr-20"
        >
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-5xl xl:text-6xl font-bold leading-tight md:leading-[1.1] mb-6 md:mb-8">
            <span className="bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          <div className="border-l-0 lg:border-l-4 border-white lg:pl-4 lg:pr-8">
            <p className="text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-loose">
              Experience the divine fusion of American Gospel and African Soul through ClaudyGod's inspirational journey
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};