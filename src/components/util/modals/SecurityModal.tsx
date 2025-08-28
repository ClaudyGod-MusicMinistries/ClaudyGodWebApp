import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldAlt,
  faTimes,
  faCopy,
  faArrowRight, // Added for continue button
  faBan, // Added for cancel button
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../../contexts/ThemeContext';
import { useState, useEffect } from 'react';
import { LightText, ExtraBoldText } from '../../ui/fonts/typography';
import CustomButton from '../../../components/ui/fonts/buttons/CustomButton';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  redirectUrl: string;
  title?: string;
  description?: string;
  continueText?: string;
  cancelText?: string;
}

export const SecurityModal = ({
  isOpen,
  onClose,
  onContinue,
  redirectUrl,
  title = 'Security Notice',
  description = 'Stream our Music on various Streaming Platforms',
  continueText = 'Continue',
  cancelText = 'Cancel',
}: SecurityModalProps) => {
  const { colorScheme } = useTheme();
  const [copyAttempted, setCopyAttempted] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setCopyAttempted(true);
    showTemporaryMessage();
  };

  const handleSelectStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setCopyAttempted(true);
    showTemporaryMessage();
  };

  const showTemporaryMessage = () => {
    setShowCopiedMessage(true);
    setTimeout(() => setShowCopiedMessage(false), 2000);
  };

  useEffect(() => {
    if (!isOpen) {
      setCopyAttempted(false);
      setShowCopiedMessage(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="max-w-md w-full overflow-hidden rounded-xl"
        style={{ backgroundColor: colorScheme.gray[200] }}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <div
          className="p-5 rounded-t-xl"
          style={{
            background: `linear-gradient(to right, ${colorScheme.gray[100]}, ${colorScheme.gray[100]})`,
          }}
        >
          <div className="flex justify-between items-center">
            <ExtraBoldText
              className="flex items-center"
              style={{ color: colorScheme.primary }}
            >
              <FontAwesomeIcon
                icon={faShieldAlt}
                className="mr-3 text-amber-300"
              />
              {title}
            </ExtraBoldText>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
          </div>
        </div>

        <div className="p-6 rounded-b-xl">
          <div className="mb-6">
            <LightText className="mb-4" style={{ color: colorScheme.primary }}>
              {description}
            </LightText>
            <div className="relative">
              <div
                className="p-3 rounded-lg break-words text-sm font-mono select-none"
                style={{
                  backgroundColor: colorScheme.gray[100],
                  border: `1px solid ${colorScheme.gray[200]}`,
                  color: colorScheme.gray[800],
                  userSelect: 'none',
                  cursor: 'default',
                }}
                onContextMenu={handleContextMenu}
                onSelectStart={handleSelectStart}
              >
                {redirectUrl}
              </div>
              {copyAttempted && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/80 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-center p-4">
                    <FontAwesomeIcon
                      icon={faCopy}
                      className="text-2xl mb-2"
                      style={{ color: colorScheme.accent }}
                    />
                    <LightText style={{ color: colorScheme.gray[100] }}>
                      {showCopiedMessage
                        ? 'URL copying is disabled for security'
                        : 'Links are protected'}
                    </LightText>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <CustomButton
              variant="secondary"
              onClick={onClose}
              className="flex-1 rounded-lg flex items-center justify-center gap-3 px-4 py-3" // Added padding and increased gap
            >
              <FontAwesomeIcon
                icon={faBan}
                className="mr-2 text-sm" // Added margin-right and size control
              />
              {cancelText}
            </CustomButton>

            {/* Continue Button with improved spacing */}
            <CustomButton
              variant="primary"
              onClick={onContinue}
              className="flex-1 rounded-lg flex items-center justify-center gap-3 px-4 py-3" // Added padding and increased gap
              style={{
                background: `linear-gradient(to right, ${colorScheme.primary}, ${colorScheme.secondary})`,
              }}
            >
              {continueText}
              <FontAwesomeIcon
                icon={faArrowRight}
                className="ml-2 text-sm" // Added margin-left and size control
              />
            </CustomButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
