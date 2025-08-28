import { StreamingPlatforms } from './StreamingPlatform';
import { LazyImage } from './LazyImage';

interface AlbumReleaseProps {
  album: any;
  platforms: any[];
  onLinkClick: (url: string, e: React.MouseEvent) => void;
}

export const AlbumRelease = ({
  album,
  platforms,
  onLinkClick,
}: AlbumReleaseProps) => {
  return (
    <div className="flex flex-col font-roboto-condensed md:flex-row gap-8 items-center p-6 bg-gray-50 rounded-xl shadow-md">
      <div className="flex-shrink-0 w-full md:w-1/3">
        <LazyImage
          src={album.coverImage}
          alt={`${album.title} album cover`}
          className="rounded-lg shadow-lg object-cover"
          width={400}
          height={400}
        />
      </div>

      <div className="flex-grow">
        <h3 className="text-2xl md:text-3xl font-roboto-condensed text-purple-900 mb-4">
          {album.title}
        </h3>
        <p className="text-gray-600 mb-6">{album.description}</p>

        <div className="mt-8">
          <StreamingPlatforms
            platforms={platforms}
            onLinkClick={onLinkClick}
            customStyle="justify-start"
          />
        </div>
      </div>
    </div>
  );
};
