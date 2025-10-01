import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { modalVariants } from '../data/HeroSlide';
import { BoldText, RegularText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { useTheme } from '../../contexts/ThemeContext';

interface StreamingModalProps {
  isOpen: boolean;
  onClose: () => void;
  platforms?: {
    name: string;
    url?: string;
    icon: IconDefinition;
  }[];
}

export const StreamingModal = ({
  isOpen,
  onClose,
  platforms = [],
}: StreamingModalProps) => {
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
            className="p-6 rounded-2xl max-w-sm w-full"
            style={{
              backgroundColor: `${colorScheme.surface}ee`,
              backdropFilter: 'blur(12px)',
              border: `1px solid ${colorScheme.primary}20`,
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <BoldText
                fontSize="1.25rem"
                style={{ color: colorScheme.text }}
                className="tracking-tight"
              >
                Streaming Platforms
              </BoldText>

              <CustomButton
                onClick={onClose}
                variant="icon"
                size="sm"
                className="hover:bg-gray-500/20 rounded-full p-2 transition-colors"
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className="text-lg"
                  style={{ color: colorScheme.textSecondary }}
                />
              </CustomButton>
            </div>

            {/* Platform List */}
            <div className="space-y-3">
              {platforms.map(platform => (
                <motion.div
                  key={platform.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CustomButton
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="md"
                    fullWidth
                    className="!flex !flex-row !items-center !justify-start gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md"
                    style={{
                      backgroundColor: `${colorScheme.surfaceVariant}66`,
                      color: colorScheme.text,
                      border: `1px solid ${colorScheme.primary}15`,
                    }}
                  >
                    <motion.button
                      onClick={() => window.open(platform.url, '_blank')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-start gap-3 w-full px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md"
                      style={{
                        backgroundColor: `${colorScheme.surfaceVariant}66`,
                        color: colorScheme.text,
                        border: `1px solid ${colorScheme.primary}15`,
                      }}
                    >
                      <FontAwesomeIcon
                        icon={platform.icon}
                        className="text-lg"
                        style={{ color: colorScheme.primary }}
                      />
                      <span className="text-sm font-medium tracking-tight whitespace-nowrap">
                        {platform.name}
                      </span>
                    </motion.button>
                  </CustomButton>
                </motion.div>
              ))}
            </div>

            {/* Footer Note */}
            <div className="mt-6 pt-4 border-t border-gray-500/20">
              <RegularText
                fontSize="0.8rem"
                style={{ color: colorScheme.textSecondary }}
                className="text-center italic"
              >
                Available on all platforms
              </RegularText>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
