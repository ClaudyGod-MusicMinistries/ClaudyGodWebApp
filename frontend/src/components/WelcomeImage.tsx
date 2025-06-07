import React from 'react';
import blog  from '../assets/blogBanner.webp';


const WelcomeImage: React.FC = () => {
  return (
    <div className="relative h-full  overflow-hidden rounded-2xl shadow-xl">
      {/* Lazy-loaded image with gradient overlay */}
      <img 
        src={blog} 
        alt="Blog community discussion"
        className=" h-full"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-indigo-800/40"></div>
    </div>
  );
};

export default WelcomeImage;