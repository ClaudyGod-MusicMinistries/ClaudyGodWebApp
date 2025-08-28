import React from 'react';
import { RegularText } from '../../../components/ui/fonts/typography';
import { useTheme } from '../../../contexts/ThemeContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const { colorScheme } = useTheme();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur effect - using separate elements for better compatibility */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Modal content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-md p-6 rounded-lg shadow-xl"
          style={{
            backgroundColor: colorScheme.background,
            border: `1px solid ${colorScheme.primary}`,
          }}
        >
          <RegularText
            fontSize="1.25rem"
            color={colorScheme.text}
            className="text-center mb-4"
          >
            Service not available now
          </RegularText>

          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md transition-colors duration-200 hover:opacity-90"
              style={{
                backgroundColor: colorScheme.primary,
                color: colorScheme.background,
              }}
            >
              <RegularText>Close</RegularText>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
