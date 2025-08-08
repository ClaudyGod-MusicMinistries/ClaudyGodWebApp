import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSpotify, 
  faYoutube, 
  faApple, 
  faDeezer 
} from '@fortawesome/free-brands-svg-icons';
import { faPlay, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Cover } from '../../assets/';
import { ExtraBoldText, RegularText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';

export const LiveSession = () => {
  const { colorScheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-2xl p-6 md:p-8 shadow-xl h-full"
      style={{
        backgroundColor: colorScheme.surface,
        border: `1px solid ${colorScheme.primary}50`
      }}
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ExtraBoldText 
            fontSize="2rem" 
            mdFontSize="3rem"
            className="mb-4"
          >
            Latest Release: <span style={{ color: colorScheme.accent }}>You Are Our Everything</span>
          </ExtraBoldText>
        </motion.div>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100px' }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-1 mx-auto mb-6"
          style={{ backgroundColor: colorScheme.primary }}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <RegularText 
            fontSize="0.875rem"
            mdFontSize="1rem"
            className="max-w-2xl mx-auto"
            style={{ color: colorScheme.textSecondary }}
          >
            Discover the latest gospel singles now featured on our Gospel News page! 
            Stay updated with fresh releases, inspiring messages, and uplifting melodies.
          </RegularText>
        </motion.div>
      </div>

      <div className="relative aspect-video rounded-xl overflow-hidden mb-8 shadow-lg">
        <img
          src={Cover}
          alt="Latest Release"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `linear-gradient(to top, ${colorScheme.background}90, transparent)`
          }}
        >
          <CustomButton
            variant="icon"
            size="xl"
            className="hover:scale-105 transition-transform"
            style={{
              backgroundColor: `${colorScheme.primary}30`,
              backdropFilter: 'blur(8px)'
            }}
          >
            <FontAwesomeIcon 
              icon={faPlay} 
              style={{ color: colorScheme.text }}
              className="ml-1" 
            />
          </CustomButton>
        </div>
        
        <div className="absolute bottom-4 left-4">
          <div 
            className="px-3 py-1 rounded-full text-sm font-medium"
            style={{
              backgroundColor: `${colorScheme.primary}80`,
              backdropFilter: 'blur(8px)',
              color: colorScheme.text
            }}
          >
            New Release
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <ExtraBoldText 
          fontSize="1.25rem"
          style={{ color: colorScheme.accent }}
          className="mb-4"
        >
          Available On All Platforms
        </ExtraBoldText>
        <div className="flex justify-center space-x-3 mb-6">
          {[1, 2, 3, 4].map((item) => (
            <div 
              key={item} 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: colorScheme.primary }}
            ></div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <CustomButton
          href="#"
          variant="secondary"
          size="lg"
          className="justify-center gap-3"
          style={{ backgroundColor: '#1DB954' }}
        >
          <FontAwesomeIcon icon={faSpotify} />
          <span>Spotify</span>
        </CustomButton>

        <CustomButton
          href="#"
          variant="secondary"
          size="lg"
          className="justify-center gap-3"
          style={{ backgroundColor: '#FF0000' }}
        >
          <FontAwesomeIcon icon={faYoutube} />
          <span>YouTube</span>
        </CustomButton>

        <CustomButton
          href="#"
          variant="secondary"
          size="lg"
          className="justify-center gap-3"
          style={{ backgroundColor: '#000000' }}
        >
          <FontAwesomeIcon icon={faApple} />
          <span>Apple Music</span>
        </CustomButton>

        <CustomButton
          href="#"
          variant="secondary"
          size="lg"
          className="justify-center gap-3"
          style={{ backgroundColor: '#FEAA2D' }}
        >
          <FontAwesomeIcon icon={faDeezer} />
          <span>Deezer</span>
        </CustomButton>
      </div>

      <div className="mt-8 text-center">
        <CustomButton
          variant="primary"
          size="lg"
          className="mx-auto gap-2"
        >
          <span>View All Releases</span>
          <FontAwesomeIcon icon={faArrowRight} />
        </CustomButton>
      </div>
    </motion.div>
  );
};