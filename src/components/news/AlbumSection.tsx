// components/news/AlbumsSection.tsx
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpotify,
  faYoutube,
  faApple,
  faDeezer,
} from '@fortawesome/free-brands-svg-icons';
import { ExtraBoldText, RegularText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';
import { albums } from '../data/newsData';

interface AlbumsSectionProps {
  openVideoModal: (url: string, album: string) => void;
}

export const AlbumsSection = ({ openVideoModal }: AlbumsSectionProps) => {
  const { colorScheme } = useTheme();

  return (
    <section
      className="w-full py-8 lg:py-12 px-4 sm:px-6 lg:px-8"
      style={{ color: colorScheme.text }}
    >
      <div className="w-full">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-8 lg:mb-12"
        >
          <ExtraBoldText
            fontSize="2rem"
            lgFontSize="3rem"
            style={{ color: colorScheme.primary }}
          >
            Latest Albums
          </ExtraBoldText>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '5rem' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 my-4 lg:my-6"
            style={{ backgroundColor: colorScheme.secondary }}
          />
          <RegularText
            fontSize="1rem"
            style={{ color: colorScheme.background }}
            className="max-w-3xl"
          >
            We've just released three new gospel albums, packed with inspiring
            messages and soulful melodies.
          </RegularText>
        </motion.div>

        {/* Albums Grid */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 lg:gap-6 w-full mb-12 lg:mb-16">
          {albums.map((album, index) => (
            <motion.div
              key={album.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
              className="flex flex-col rounded-2xl p-4 lg:p-6 shadow-xl"
              style={{
                backgroundColor: colorScheme.surface,
                flex: '1 1 300px',
                maxWidth: '100%',
                marginBottom: '1rem',
              }}
            >
              {/* Title */}
              <ExtraBoldText
                fontSize="1.1rem"
                style={{ color: colorScheme.text }}
                className="mb-4 text-left"
              >
                Album: {album.title}
              </ExtraBoldText>

              {/* Cover */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4 flex-shrink-0">
                <img
                  src={album.image}
                  alt={`Album cover for ${album.title}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
                  <CustomButton
                    variant="icon"
                    size="lg"
                    mdSize="xl"
                    onClick={() =>
                      openVideoModal(album.links.youtube, album.title)
                    }
                    className="hover:scale-105 transition-transform"
                    aria-label={`Play ${album.title}`}
                    style={{
                      backgroundColor: `${colorScheme.primary}30`,
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <svg
                      className="w-6 h-6 lg:w-8 lg:h-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      style={{ color: colorScheme.text }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </CustomButton>
                </div>
              </div>

              {/* Platform Buttons */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 mt-auto">
                {/* Spotify */}
                <CustomButton
                  href={album.links.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="sm"
                  mdSize="lg"
                  className="px-4 py-2 text-xs md:text-base w-full"
                  style={{ backgroundColor: '#1DB954' }}
                  aria-label={`Listen to ${album.title} on Spotify`}
                >
                  <div className="flex items-center gap-3 md:gap-4 w-full">
                    <FontAwesomeIcon
                      icon={faSpotify}
                      className="text-sm md:text-lg"
                    />
                    <span className="text-left">Spotify</span>
                  </div>
                </CustomButton>

                {/* YouTube */}
                <CustomButton
                  onClick={() =>
                    openVideoModal(album.links.youtube, album.title)
                  }
                  variant="secondary"
                  size="sm"
                  mdSize="lg"
                  className="px-4 py-2 text-xs md:text-base w-full"
                  style={{ backgroundColor: '#FF0000' }}
                  aria-label={`Watch ${album.title} on YouTube`}
                >
                  <div className="flex items-center gap-3 md:gap-4 w-full">
                    <FontAwesomeIcon
                      icon={faYoutube}
                      className="text-sm md:text-lg"
                    />
                    <span className="text-left">YouTube</span>
                  </div>
                </CustomButton>

                {/* Apple Music */}
                <CustomButton
                  href={album.links.apple}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="sm"
                  mdSize="lg"
                  className="px-4 py-2 text-xs md:text-base w-full"
                  style={{ backgroundColor: '#000000' }}
                  aria-label={`Listen to ${album.title} on Apple Music`}
                >
                  <div className="flex items-center gap-3 md:gap-4 w-full">
                    <FontAwesomeIcon
                      icon={faApple}
                      className="text-sm md:text-lg"
                    />
                    <span className="text-left">Apple</span>
                  </div>
                </CustomButton>

                {/* Deezer */}
                <CustomButton
                  href={album.links.deezer}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="sm"
                  mdSize="lg"
                  className="px-4 py-2 text-xs md:text-base w-full"
                  style={{ backgroundColor: '#FEAA2D' }}
                  aria-label={`Listen to ${album.title} on Deezer`}
                >
                  <div className="flex items-center gap-3 md:gap-4 w-full">
                    <FontAwesomeIcon
                      icon={faDeezer}
                      className="text-sm md:text-lg"
                    />
                    <span className="text-left">Deezer</span>
                  </div>
                </CustomButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
