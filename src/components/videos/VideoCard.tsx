import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { VideoType } from '../types/video';

import CustomButton from '../ui/fonts/buttons/CustomButton';
import { ExtraBoldText, RegularText } from '../ui/fonts/typography/';

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
          
          {/* Play button - replaced with CustomButton */}
         <div className="absolute inset-0 flex items-center justify-center">
  <CustomButton
    onClick={() => onSelect(content.youtubeId)}
    variant="icon"
    size="sm"
    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    aria-label={`Play ${content.title}`}
  >
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center shadow-lg">
      <FontAwesomeIcon 
        icon={faPlay} 
        className="text-white text-lg ml-1" 
      />
    </div>
  </CustomButton>
</div>

          
          {/* Date badge */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
            <RegularText fontSize="0.75rem" className="text-white">
              {content.date}
            </RegularText>
          </div>
        </div>
        
        {/* Content info - using custom text components */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
          <ExtraBoldText 
            fontSize="1.125rem" 
            className="text-white mb-1 line-clamp-1 tracking-tight"
          >
            {content.title}
          </ExtraBoldText>
          <RegularText 
            fontSize="0.875rem" 
            className="text-purple-300 font-medium"
          >
            {content.category}
          </RegularText>
        </div>
        
        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300 group-hover:w-full"></div>
        </div>
      </div>
      
      {/* Description on hover - using custom text */}
      <div className="mt-3 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <RegularText fontSize="0.875rem" className="text-gray-600 line-clamp-2">
          {content.description}
        </RegularText>
      </div>
    </div>
  );
};

export default VideoCard;