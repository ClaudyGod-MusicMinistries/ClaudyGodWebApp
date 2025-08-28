// components/StreamingPlatforms.tsx
import { SecuredLink } from './SecuredLink';
import { MusicPlatform } from './types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

interface StreamingPlatformsProps {
  platforms: MusicPlatform[];
  onLinkClick: (url: string, e: React.MouseEvent) => void;
}

export const StreamingPlatforms = ({
  platforms,
  onLinkClick,
}: StreamingPlatformsProps) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl roboto-condensed mb-4">
            Available On All Platforms
          </h2>
          <p className="text-gray-600 mt-2 md:text-xl max-md:text-sm work-sans">
            Stream ClaudyGod's music everywhere, Anytime, Anyday, Anywhere.
          </p>
        </div>

        <div className="flex flex-wrap raleway-medium justify-center gap-4">
          {platforms.map(platform => (
            <SecuredLink
              key={platform.name}
              platform={platform}
              onClick={onLinkClick}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-full">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="mr-2 text-blue-500"
            />
            <span className="text-sm text-blue-700 work-sans">
              We verify all external links for your security
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
