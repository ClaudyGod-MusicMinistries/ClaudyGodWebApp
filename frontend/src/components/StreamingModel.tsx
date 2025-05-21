import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faSpotify, faYoutube, faApple, faDeezer } from '@fortawesome/free-brands-svg-icons';

export default function StreamingModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const streamingPlatforms = [
    { name: 'Spotify', icon: faSpotify, color: 'text-green-500', link: '#' },
    { name: 'YouTube Music', icon: faYoutube, color: 'text-red-500', link: '#' },
    { name: 'Apple Music', icon: faApple, color: 'text-black', link: '#' },
    { name: 'Deezer', icon: faDeezer, color: 'text-pink-500', link: '#' },
  ];

  return (
    <div>
      {/* Mobile & Desktop Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed lg:relative bottom-4 right-4 lg:bottom-auto lg:right-auto 
        bg-purple-900 hover:bg-purple-800 text-white px-6 py-2.5 rounded-full 
        text-sm work-sans flex items-center transition duration-150 ease-in-out 
        shadow-lg lg:shadow-none z-40 mr-20 cursor-pointer "
      >
        <FontAwesomeIcon icon={faHeadset} className="mr-3 text-base" />
        <span className="hidden lg:inline ralewayMedium">Listen Now</span>
      </button>

      {/* Responsive Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white rounded-lg p-6 w-full max-w-md relative mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-600 transition"
            >
              <FontAwesomeIcon icon={faXmark} className="text-xl" />
            </button>

            {/* Modal Content */}
            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
              Choose a platform
            </h3>
            
            <div className="space-y-3 lg:space-y-4">
              {streamingPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 lg:p-4 rounded-lg hover:bg-gray-100 
                  transition-colors duration-200"
                >
                  <FontAwesomeIcon 
                    icon={platform.icon} 
                    className={`text-xl lg:text-2xl mr-3 lg:mr-4 ${platform.color}`} 
                  />
                  <span className="text-base lg:text-lg text-gray-700 font-medium">
                    {platform.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}