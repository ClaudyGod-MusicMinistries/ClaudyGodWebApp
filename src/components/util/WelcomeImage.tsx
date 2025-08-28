import React from 'react';
import { blog } from '../../assets/';

const WelcomeImage: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl aspect-[3/2] sm:aspect-video md:aspect-auto md:h-full">
      <img
        src={blog}
        alt="Blog community discussion"
        className="w-full h-full object-cover md:hidden"
        loading="lazy"
      />

      <img
        src={blog}
        alt="Blog community discussion"
        className="hidden md:block h-full w-full"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-indigo-800/40"></div>
    </div>
  );
};

export default WelcomeImage;
