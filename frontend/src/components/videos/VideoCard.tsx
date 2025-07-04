import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { VideoType } from '../types/video';

const VideoCard: React.FC<{ 
  content: VideoType;
  onSelect: (videoId: string) => void;
}> = ({ content, onSelect }) => {
  const thumbnailSrc = `https://img.youtube.com/vi/${content.youtubeId}/hqdefault.jpg`;

  return (
    <div className="group cursor-pointer transform transition-transform duration-500 hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-xl shadow-xl">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={thumbnailSrc}
            alt={content.title} 
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 bg-gradient-to-br from-gray-200 to-gray-300"
            loading="lazy"
            decoding="async"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          
          {/* Play button */}
          <button 
            onClick={() => onSelect(content.youtubeId)}
            className="absolute inset-0 flex items-center justify-center"
            aria-label={`Play ${content.title}`}
          >
            <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-110">
              <FontAwesomeIcon 
                icon={faPlay} 
                className="text-white text-xl ml-1" 
              />
            </div>
          </button>
          
          {/* Date badge */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white font-medium">
            {content.date}
          </div>
        </div>
        
        {/* Content info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
          <h3 className="text-white font-bold text-lg font-roboto-condensed tracking-tight mb-1 line-clamp-1">
            {content.title}
          </h3>
          <p className="text-purple-300 text-sm font-medium">
            {content.category}
          </p>
        </div>
        
        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></div>
        </div>
      </div>
      
      {/* Description on hover */}
      <div className="mt-3 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-gray-600 text-sm line-clamp-2 font-raleway">
          {content.description}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;