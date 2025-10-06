import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { streamingPlatforms } from './data/StreamingPlatform';

export const Streaming: React.FC = () => {
  return (
    <div className="w-full px-3 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Compact Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-roboto-condensed font-semibold text-white tracking-tight mb-2">
            Stream Now
          </h3>
          <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
        </div>

        {/* Ultra Compact Grid */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl mx-auto">
          {streamingPlatforms.map((platform, index) => (
            <a
              key={index}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group relative flex items-center justify-center
                transition-all duration-200 transform hover:-translate-y-1
                rounded-lg shadow-md hover:shadow-lg
                ${platform.color} overflow-hidden
                w-10 h-10 sm:w-12 sm:h-12
                min-w-[2.5rem] sm:min-w-[3rem]
              `}
              aria-label={`Stream on ${platform.name}`}
            >
              {/* Platform Icon */}
              <div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                <FontAwesomeIcon
                  icon={platform.icon}
                  className="text-white text-sm sm:text-base"
                />
              </div>

              {/* Tooltip for larger screens */}
              <div className="hidden sm:block absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                <div className="bg-black bg-opacity-90 text-white text-xs px-2 py-1 rounded">
                  {platform.name}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black bg-opacity-90 rotate-45"></div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Minimal Status */}
        <div className="mt-4 text-center">
          <span className="text-xs text-gray-400 font-medium">
            Follow for updates ↓
          </span>
        </div>
      </div>
    </div>
  );
};
