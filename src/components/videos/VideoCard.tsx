/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import {
  ExtraBoldText,
  RegularText,
  SemiBoldText,
} from '../ui/fonts/typography/';
import { useTheme } from '../../contexts/ThemeContext';

// Define VideoType locally to match your data structure
export type VideoType = {
  id: number;
  title: string;
  youtubeId: string;
  category: 'Music Videos' | 'Visualizers' | 'Live Sessions' | 'Christmas';
  description: string;
  date: string;
};

// Memoized sub-components
const DateBadge = memo(
  ({ date, colorScheme }: { date: string; colorScheme: any }) => (
    <div
      className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/70 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full"
      style={{ backgroundColor: `${colorScheme.primary}CC` }}
    >
      <RegularText
        fontSize="0.7rem sm:text-0.75rem"
        className="text-white font-medium"
      >
        {date}
      </RegularText>
    </div>
  )
);

const PlayButton = memo(
  ({
    onSelect,
    title,
    colorScheme,
  }: {
    onSelect: () => void;
    title: string;
    colorScheme: any;
  }) => (
    <div className="absolute inset-0 flex items-center justify-center">
      <CustomButton
        onClick={onSelect}
        variant="icon"
        size="sm"
        className="opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300"
        aria-label={`Play ${title}`}
      >
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:shadow-3xl"
          style={{
            background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.primaryDark})`,
          }}
        >
          <FontAwesomeIcon
            icon={faPlay}
            className="text-white text-sm sm:text-base lg:text-lg ml-0.5 sm:ml-1"
          />
        </div>
      </CustomButton>
    </div>
  )
);

const ContentInfo = memo(
  ({
    title,
    category,
  }: {
    title: string;
    category: string;
    colorScheme: any;
  }) => (
    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 to-transparent">
      <ExtraBoldText
        fontSize="0.875rem sm:text-1rem lg:text-1.125rem"
        className="text-white mb-1 line-clamp-2 tracking-tight leading-tight"
        style={{ color: '#FFFFFF' }}
      >
        {title}
      </ExtraBoldText>
      <SemiBoldText
        fontSize="0.75rem sm:text-0.875rem"
        className="font-medium"
        style={{ color: '#E5E7EB' }}
      >
        {category}
      </SemiBoldText>
    </div>
  )
);

const HoverIndicator = memo(({ colorScheme }: { colorScheme: any }) => (
  <div
    className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden"
    style={{ backgroundColor: colorScheme.border }}
  >
    <div
      className="absolute inset-y-0 left-0 w-0 transition-all duration-500 group-hover:w-full"
      style={{
        background: `linear-gradient(to right, ${colorScheme.primary}, ${colorScheme.accent})`,
      }}
    />
  </div>
));

const Description = memo(
  ({ description, colorScheme }: { description: string; colorScheme: any }) => (
    <div className="mt-2 sm:mt-3 px-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
      <RegularText
        fontSize="0.75rem sm:text-0.875rem"
        className="line-clamp-2 sm:line-clamp-3 leading-relaxed"
        style={{ color: colorScheme.text }}
      >
        {description}
      </RegularText>
    </div>
  )
);

const MobileTouchFeedback = memo(({ colorScheme }: { colorScheme: any }) => (
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    <div
      className="absolute inset-0 rounded-xl lg:rounded-2xl border-2 border-transparent group-hover:border-opacity-50"
      style={{
        borderColor: colorScheme.primary,
        boxShadow: `0 0 0 1px ${colorScheme.primary}20`,
      }}
    />
  </div>
));

const ThumbnailImage = memo(
  ({
    src,
    alt,
    youtubeId,
  }: {
    src: string;
    alt: string;
    youtubeId: string;
  }) => {
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [imageError, setImageError] = React.useState(false);

    const handleLoad = useCallback(() => {
      setImageLoaded(true);
    }, []);

    const handleError = useCallback(() => {
      setImageError(true);
    }, []);

    // Fallback to different YouTube thumbnail qualities
    const getFallbackSrc = (currentSrc: string) => {
      if (currentSrc.includes('/hqdefault.jpg')) {
        return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
      }
      if (currentSrc.includes('/mqdefault.jpg')) {
        return `https://img.youtube.com/vi/${youtubeId}/default.jpg`;
      }
      return '/images/video-placeholder.jpg';
    };

    return (
      <>
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
        )}
        <img
          src={imageError ? getFallbackSrc(src) : src}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
        />
      </>
    );
  }
);

// Main VideoCard Component
const VideoCard: React.FC<{
  content: VideoType;
  onSelect: (videoId: string) => void;
}> = memo(({ content, onSelect }) => {
  const { colorScheme } = useTheme();

  // Memoized thumbnail source
  const thumbnailSrc = useMemo(
    () => `https://img.youtube.com/vi/${content.youtubeId}/hqdefault.jpg`,
    [content.youtubeId]
  );

  // Optimized event handler
  const handleSelect = useCallback(() => {
    onSelect(content.youtubeId);
  }, [onSelect, content.youtubeId]);

  return (
    <div className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2 w-full">
      <div className="relative overflow-hidden rounded-xl lg:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 w-full">
        <div className="relative aspect-video overflow-hidden w-full">
          <ThumbnailImage
            src={thumbnailSrc}
            alt={content.title}
            youtubeId={content.youtubeId}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <PlayButton
            onSelect={handleSelect}
            title={content.title}
            colorScheme={colorScheme}
          />

          <DateBadge date={content.date} colorScheme={colorScheme} />
        </div>

        <ContentInfo
          title={content.title}
          category={content.category}
          colorScheme={colorScheme}
        />

        <HoverIndicator colorScheme={colorScheme} />
      </div>

      <Description
        description={content.description}
        colorScheme={colorScheme}
      />

      <MobileTouchFeedback colorScheme={colorScheme} />
    </div>
  );
});

VideoCard.displayName = 'VideoCard';

export default VideoCard;
