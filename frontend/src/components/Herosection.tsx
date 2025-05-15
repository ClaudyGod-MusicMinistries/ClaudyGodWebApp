// components/HeroSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  backgroundImage: string;
}

export const Herosection: React.FC<HeroSectionProps> = ({ title, backgroundImage }) => {
  return (
    <section className="relative w-full bg-black pt-20"> {/* Added padding-top for navbar */}
      <div className="container-custom mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 py-16 px-4">
        {/* Image Container */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:w-1/2 w-full"
        >
          <div className="relative overflow-hidden rounded-xl shadow-2xl left-40 bottom-10">
            <img
              src={backgroundImage}
              alt="ClaudyGod"
              className=" w-[500px] h-[500px] object-cover object-center rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
          </div>
        </motion.div>

        {/* Text Container */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:w-1/2 w-full text-white mr-60 mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <div className="border-l-4 border-white pl-4">
            <p className="text-lg md:text-xl opacity-90">
              Experience the divine fusion of American Gospel and African Soul through ClaudyGod's inspirational journey
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};