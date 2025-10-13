// components/news/AlbumsSection.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpotify,
  faYoutube,
  faApple,
  faDeezer,
} from '@fortawesome/free-brands-svg-icons';
import {
  faChevronLeft,
  faChevronRight,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { ExtraBoldText, RegularText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';
import { albums } from '../data/newsData';
import { useState, useEffect } from 'react';

interface AlbumsSectionProps {
  openVideoModal: (url: string, album: string) => void;
}

export const AlbumsSection = ({ openVideoModal }: AlbumsSectionProps) => {
  const { colorScheme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % albums.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + albums.length) % albums.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides on mobile with better timing
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 8000); // Increased to 8 seconds for better readability

    return () => clearInterval(interval);
  }, [isMobile, currentSlide]);

  return (
    <section
      className="w-full py-6 lg:py-10 px-4 sm:px-6 lg:px-8"
      style={{ color: colorScheme.text }}
    >
      <div className="w-full">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-6 lg:mb-10"
        >
          <ExtraBoldText
            fontSize="1.75rem"
            lgFontSize="2.5rem"
            style={{ color: colorScheme.primary }}
          >
            Latest Albums
          </ExtraBoldText>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '4rem' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 my-3 lg:my-5"
            style={{ backgroundColor: colorScheme.secondary }}
          />
          <RegularText
            fontSize="0.9rem"
            lgFontSize="1rem"
            style={{ color: colorScheme.background }}
            className="max-w-3xl"
          >
            We've just released three new gospel albums, packed with inspiring
            messages and soulful melodies.
          </RegularText>
        </motion.div>

        {/* Desktop Grid View */}
        <div className="hidden md:flex flex-col md:flex-row flex-wrap justify-center gap-4 lg:gap-6 w-full mb-10 lg:mb-14">
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
                    size="sm"
                    mdSize="md"
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
                    <FontAwesomeIcon
                      icon={faPlay}
                      style={{ color: colorScheme.text }}
                      className="w-4 h-4 lg:w-5 lg:h-5"
                    />
                  </CustomButton>
                </div>
              </div>

              {/* Platform Buttons */}
              <div className="grid grid-cols-2 gap-2 md:gap-3 mt-auto">
                <CustomButton
                  href={album.links.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="xs"
                  mdSize="sm"
                  className="px-2 py-1.5 text-xs w-full"
                  style={{ backgroundColor: '#1DB954' }}
                  aria-label={`Listen to ${album.title} on Spotify`}
                >
                  <div className="flex items-center gap-2 w-full justify-center">
                    <FontAwesomeIcon icon={faSpotify} className="text-xs" />
                    <span className="text-left truncate">Spotify</span>
                  </div>
                </CustomButton>

                <CustomButton
                  onClick={() =>
                    openVideoModal(album.links.youtube, album.title)
                  }
                  variant="secondary"
                  size="xs"
                  mdSize="sm"
                  className="px-2 py-1.5 text-xs w-full"
                  style={{ backgroundColor: '#FF0000' }}
                  aria-label={`Watch ${album.title} on YouTube`}
                >
                  <div className="flex items-center gap-2 w-full justify-center">
                    <FontAwesomeIcon icon={faYoutube} className="text-xs" />
                    <span className="text-left truncate">YouTube</span>
                  </div>
                </CustomButton>

                <CustomButton
                  href={album.links.apple}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="xs"
                  mdSize="sm"
                  className="px-2 py-1.5 text-xs w-full"
                  style={{ backgroundColor: '#000000' }}
                  aria-label={`Listen to ${album.title} on Apple Music`}
                >
                  <div className="flex items-center gap-2 w-full justify-center">
                    <FontAwesomeIcon icon={faApple} className="text-xs" />
                    <span className="text-left truncate">Apple</span>
                  </div>
                </CustomButton>

                <CustomButton
                  href={album.links.deezer}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="xs"
                  mdSize="sm"
                  className="px-2 py-1.5 text-xs w-full"
                  style={{ backgroundColor: '#FEAA2D' }}
                  aria-label={`Listen to ${album.title} on Deezer`}
                >
                  <div className="flex items-center gap-2 w-full justify-center">
                    <FontAwesomeIcon icon={faDeezer} className="text-xs" />
                    <span className="text-left truncate">Deezer</span>
                  </div>
                </CustomButton>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Slider View */}
        <div className="md:hidden w-full">
          <div className="relative overflow-hidden rounded-2xl">
            {/* Slider Container */}
            <div className="relative h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col rounded-2xl p-4 shadow-xl w-full relative"
                  style={{
                    backgroundColor: colorScheme.surface,
                  }}
                >
                  {/* Navigation Arrows - Positioned inside the card container */}
                  {/* <CustomButton
                    onClick={prevSlide}
                    variant="icon"
                    size="sm"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 shadow-lg"
                    style={{
                      backgroundColor: `${colorScheme.primary}80`,
                      backdropFilter: 'blur(8px)',
                    }}
                    aria-label="Previous album"
                  >
                    <FontAwesomeIcon 
                      icon={faChevronLeft} 
                      style={{ color: colorScheme.text }}
                      className="text-sm" 
                    />
                  </CustomButton>

                  <CustomButton
                    onClick={nextSlide}
                    variant="icon"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 shadow-lg"
                    style={{
                      backgroundColor: `${colorScheme.primary}80`,
                      backdropFilter: 'blur(8px)',
                    }}
                    aria-label="Next album"
                  >
                    <FontAwesomeIcon 
                      icon={faChevronRight} 
                      style={{ color: colorScheme.text }}
                      className="text-sm" 
                    />
                  </CustomButton> */}

                  {/* Album Title */}
                  <ExtraBoldText
                    fontSize="1rem"
                    style={{ color: colorScheme.text }}
                    className="mb-3 text-center"
                  >
                    Album: {albums[currentSlide].title}
                  </ExtraBoldText>

                  {/* Album Cover */}
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-3 flex-shrink-0">
                    <img
                      src={albums[currentSlide].image}
                      alt={`Album cover for ${albums[currentSlide].title}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
                      <CustomButton
                        variant="icon"
                        size="sm"
                        onClick={() =>
                          openVideoModal(
                            albums[currentSlide].links.youtube,
                            albums[currentSlide].title
                          )
                        }
                        className="hover:scale-105 transition-transform"
                        aria-label={`Play ${albums[currentSlide].title}`}
                        style={{
                          backgroundColor: `${colorScheme.primary}30`,
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faPlay}
                          style={{ color: colorScheme.text }}
                          className="w-4 h-4"
                        />
                      </CustomButton>
                    </div>
                  </div>

                  {/* Platform Buttons */}
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <CustomButton
                      href={albums[currentSlide].links.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="xs"
                      mdSize="sm"
                      className="px-2 py-1.5 text-xs w-full"
                      style={{ backgroundColor: '#1DB954' }}
                      aria-label={`Listen to ${albums[currentSlide].title} on Spotify`}
                    >
                      <div className="flex items-center gap-2 w-full justify-center">
                        <FontAwesomeIcon icon={faSpotify} className="text-xs" />
                        <span className="text-left truncate">Spotify</span>
                      </div>
                    </CustomButton>

                    <CustomButton
                      onClick={() =>
                        openVideoModal(
                          albums[currentSlide].links.youtube,
                          albums[currentSlide].title
                        )
                      }
                      variant="secondary"
                      size="xs"
                      mdSize="sm"
                      className="px-2 py-1.5 text-xs w-full"
                      style={{ backgroundColor: '#FF0000' }}
                      aria-label={`Watch ${albums[currentSlide].title} on YouTube`}
                    >
                      <div className="flex items-center gap-2 w-full justify-center">
                        <FontAwesomeIcon icon={faYoutube} className="text-xs" />
                        <span className="text-left truncate">YouTube</span>
                      </div>
                    </CustomButton>

                    <CustomButton
                      href={albums[currentSlide].links.apple}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="xs"
                      mdSize="sm"
                      className="px-2 py-1.5 text-xs w-full"
                      style={{ backgroundColor: '#000000' }}
                      aria-label={`Listen to ${albums[currentSlide].title} on Apple Music`}
                    >
                      <div className="flex items-center gap-2 w-full justify-center">
                        <FontAwesomeIcon icon={faApple} className="text-xs" />
                        <span className="text-left truncate">Apple</span>
                      </div>
                    </CustomButton>

                    <CustomButton
                      href={albums[currentSlide].links.deezer}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="xs"
                      mdSize="sm"
                      className="px-2 py-1.5 text-xs w-full"
                      style={{ backgroundColor: '#FEAA2D' }}
                      aria-label={`Listen to ${albums[currentSlide].title} on Deezer`}
                    >
                      <div className="flex items-center gap-2 w-full justify-center">
                        <FontAwesomeIcon icon={faDeezer} className="text-xs" />
                        <span className="text-left truncate">Deezer</span>
                      </div>
                    </CustomButton>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {albums.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'scale-125' : ''
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  style={{
                    backgroundColor:
                      index === currentSlide
                        ? colorScheme.primary
                        : `${colorScheme.primary}30`,
                  }}
                />
              ))}
            </div>

            {/* Slide Counter */}
            <div className="text-center mt-2">
              <RegularText
                fontSize="0.75rem"
                style={{ color: colorScheme.background }}
              >
                {currentSlide + 1} / {albums.length}
              </RegularText>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
