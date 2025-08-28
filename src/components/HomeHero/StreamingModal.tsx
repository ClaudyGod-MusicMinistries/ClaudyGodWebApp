import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { modalVariants } from '../data/HeroSlide';
import { ExtraBoldText, RegularText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';

interface StreamingPlatformsModalProps {
  isOpen: boolean;
  onClose: () => void;
  platforms?: {
    name: string; // ✅ ensure it's string
    url?: string;
    icon: IconDefinition;
  }[];
}

export const StreamingPlatformsModal = ({
  isOpen,
  onClose,
  platforms = [],
}: StreamingPlatformsModalProps) => {
  const { colorScheme } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{
            opacity: 1,
            backdropFilter: 'blur(8px)',
            transition: { duration: 0.3 },
          }}
          exit={{
            opacity: 0,
            backdropFilter: 'blur(0px)',
            transition: { duration: 0.2 },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: `${colorScheme.background}80` }}
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="p-6 rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
            style={{
              backgroundColor: `${colorScheme.surface}dd`,
              backdropFilter: 'blur(12px)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <ExtraBoldText
                fontSize="1.5rem"
                style={{ color: colorScheme.text }}
              >
                Streaming Platforms
              </ExtraBoldText>

              <CustomButton
                onClick={onClose}
                variant="icon"
                size="sm"
                className="text-gray-400 hover:text-gray-200"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </CustomButton>
            </div>

            {/* Platform List */}
            <div className="grid grid-cols-1 gap-3">
              {platforms.map(platform => (
                <motion.div key={platform.name} whileHover={{ scale: 1.03 }}>
                  <CustomButton
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="lg"
                    fullWidth
                    className="justify-start gap-4 px-4 py-3 backdrop-blur-sm"
                    style={{
                      backgroundColor: `${colorScheme.surfaceVariant}aa`,
                      color: colorScheme.text,
                    }}
                  >
                    <FontAwesomeIcon icon={platform.icon} className="text-xl" />
                    <RegularText fontSize="1.125rem" className="font-medium">
                      {platform.name}
                    </RegularText>
                  </CustomButton>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
