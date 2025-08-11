import { motion } from 'framer-motion';
import { faPlayCircle, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { 
  faSpotify, 
  faApple, 
  faYoutube, 
  faDeezer 
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HeroSlide } from './HeroSlide';
import { textVariants } from '../data/HeroSlide';
import { ExtraBoldText, RegularText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';

export const MusicSlide = ({ 
  setIsModalOpen 
}: { 
  slide: HeroSlide; 
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> 
}) => {
  const { colorScheme } = useTheme();

  const streamingPlatforms = [
    { name: "Spotify", icon: faSpotify, url: "#" },
    { name: "Apple Music", icon: faApple, url: "#" },
    { name: "YouTube Music", icon: faYoutube, url: "#" },
    { name: "Deezer", icon: faDeezer, url: "#" }
  ];

  return (
    <div className="space-y-6 md:space-y-10 w-full">
      {/* Title */}
      <motion.div variants={textVariants}>
        <ExtraBoldText 
          fontSize="3rem" 
          fontSize="6rem"
          style={{ color: colorScheme.heading }}
          useThemeColor={false}
          className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
        >
          MUSIC
        </ExtraBoldText>
      </motion.div>

      {/* Mobile View */}
      <div className="md:hidden space-y-6 mt-6">
        <motion.div variants={textVariants} className="w-16 h-1 bg-white rounded-full" />
        
        <motion.div variants={textVariants}>
          <RegularText
            fontSize="1.125rem"
            style={{ color: colorScheme.textSecondary }}
            className="max-w-md leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            Dive into spiritual worship through sacred melodies that uplift the soul and glorify His name
          </RegularText>
        </motion.div>
        
        <motion.div variants={textVariants}>
          <CustomButton
            onClick={() => setIsModalOpen(true)}
            variant="primary"
            size="lg"
            fullWidth
            className="shadow-lg"
          >
            Stream across platforms
          </CustomButton>
        </motion.div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="flex flex-col gap-8">
          {/* Header Text */}
          <motion.div variants={textVariants} className="space-y-4">
            <RegularText
              fontSize="2rem"
              italic
              style={{ color: colorScheme.accent }}
              className="mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              Experience the Divine Melody
            </RegularText>
            <RegularText
              fontSize="1.25rem"
              style={{ color: colorScheme.textSecondary }}
              className="max-w-2xl leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              Dive into spiritual worship through sacred melodies that uplift the soul and glorify His name
            </RegularText>
          </motion.div>

          {/* Play Button Section */}
          <motion.div variants={textVariants} className="flex flex-col items-start gap-6 mt-2">
            <div className="w-20 h-2" style={{ backgroundColor: colorScheme.heading }}></div>
            <motion.div className="relative group">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
                style={{ 
                  backgroundColor: `${colorScheme.primary}40`,
                  backdropFilter: 'blur(8px)'
                }}
              >
                <CustomButton
                  onClick={() => setIsModalOpen(true)}
                  variant="icon"
                  size="xl"
                  className="hover:scale-105 transition-transform"
                >
                  <FontAwesomeIcon 
                    icon={faPlayCircle} 
                    className="text-4xl pl-1" 
                  />
                </CustomButton>
              </div>
            </motion.div>
            <ExtraBoldText
              fontSize="1.25rem"
              style={{ color: colorScheme.text }}
              className="tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              Play Latest Album
            </ExtraBoldText>
          </motion.div>
          
          {/* Streaming Platforms */}
          <motion.div variants={textVariants} className="space-y-6 mt-8">
            <ExtraBoldText
              fontSize="1.5rem"
              style={{ color: colorScheme.accent }}
              className="roboto-condensed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            >
              STREAM EVERYWHERE
            </ExtraBoldText>
            
            <div className="grid grid-cols-2 gap-6">
              {streamingPlatforms.map((platform) => (
                <motion.div
                  key={platform.name}
                  whileHover={{ y: -5 }}
                >
                  <CustomButton
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="md"
                    fullWidth
                    className="justify-start gap-3 px-6 py-3 shadow-md"
                  >
                    <FontAwesomeIcon 
                      icon={platform.icon} 
                      className="text-2xl" 
                    />
                    <span>{platform.name}</span>
                    <FontAwesomeIcon 
                      icon={faExternalLinkAlt} 
                      className="ml-auto text-sm" 
                    />
                  </CustomButton>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};