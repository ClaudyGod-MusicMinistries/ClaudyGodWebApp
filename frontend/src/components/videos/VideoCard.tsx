import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { MusicBan1 } from '../../assets/';

export type VideoType = {
  id: number;
  title: string;
  youtubeId: string;
  category: 'Music Videos' | 'Visualizers' | 'Live Sessions';
  description: string;
  date: string;
};

const VideoCard: React.FC<{ 
  content: VideoType;
  onSelect: (videoId: string) => void;
}> = ({ content, onSelect }) => {
  // State for handling thumbnail errors
  const [thumbnailError, setThumbnailError] = useState(false);
  const maxResUrl = `https://img.youtube.com/vi/${content.youtubeId}/maxresdefault.jpg`;
  const hqDefaultUrl = `https://img.youtube.com/vi/${content.youtubeId}/hqdefault.jpg`;
  const defaultThumbnail = MusicBan1; // Local fallback

  const handleThumbnailError = () => {
    if (!thumbnailError) {
      setThumbnailError(true);
    }
  };
  const thumbnailSrc = thumbnailError ? hqDefaultUrl : maxResUrl;

  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg">
        <img 
          src={thumbnailSrc}
          onError={handleThumbnailError}
          alt={content.title} 
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500 bg-gray-200"
          loading="lazy"
          decoding="async"
        />
        {thumbnailError && (
          <img 
            src={defaultThumbnail}
            alt="Default thumbnail"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
      
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/default-fallback.jpg';
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
          <button 
            onClick={() => onSelect(content.youtubeId)}
            className="absolute inset-0 flex items-center justify-center"
            aria-label={`Play ${content.title}`}
          >
            <div className="bg-purple-900/80 hover:bg-purple-800 text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FontAwesomeIcon icon={faPlay} className="text-lg" />
            </div>
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white robotoMedium">{content.title}</h3>
          <p className="text-gray-300 slider-font">{content.date}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;