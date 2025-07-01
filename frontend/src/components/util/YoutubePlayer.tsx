// components/YouTubePlayer.tsx
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { PlayerModal } from '../PlayerModal';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
}

export const YouTubePlayer = ({ videoId, title }: YouTubePlayerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // YouTube thumbnail URLs with fallbacks
  const thumbnailBase = `https://img.youtube.com/vi/${videoId}`;
  const thumbnails = [
    `${thumbnailBase}/maxresdefault.jpg`, // Highest quality
    `${thumbnailBase}/hqdefault.jpg`,     // High quality
    `${thumbnailBase}/sddefault.jpg`,     // Standard
    `${thumbnailBase}/default.jpg`,       // Default
  ];

  return (
    <div className="mb-16">
      <div className="relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <div className="relative overflow-hidden rounded-xl shadow-xl aspect-w-16 aspect-h-9">
          {/* Thumbnail with fallbacks */}
          <picture>
            <source srcSet={thumbnails[0]} media="(min-width: 1280px)" />
            <source srcSet={thumbnails[1]} media="(min-width: 768px)" />
            <source srcSet={thumbnails[2]} />
            <img
              src={thumbnails[3]}
              alt={`${title} thumbnail`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                if (img.src !== thumbnails[3]) {
                  img.src = thumbnails[3];
                }
              }}
            />
          </picture>
          
          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/30">
            <FontAwesomeIcon 
              icon={faPlayCircle} 
              className="text-white text-6xl opacity-90 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100" 
            />
          </div>
        </div>
        
        <h3 className="mt-4 text-xl font-bold text-purple-900 group-hover:text-purple-700 transition-colors">
          {title}
        </h3>
      </div>
      
      {/* Modal player */}
      {isModalOpen && (
        <PlayerModal 
          videoId={videoId} 
          title={title}
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};