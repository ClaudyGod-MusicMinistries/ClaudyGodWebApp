// components/SecurityModal.tsx
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

interface SecurityModalProps {
  isOpen: boolean;
  redirectUrl: string | null;
  onClose: () => void;
  onRedirect: () => void;
}

export const SecurityModal = ({ 
  isOpen, 
  redirectUrl, 
  onClose, 
  onRedirect 
}: SecurityModalProps) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div 
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-purple-900 flex items-center">
            <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
            Security Notice
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-3">
            Stream our Music on various Streaming Platforms
          </p>
          <div className="bg-gray-100 p-3 rounded-lg break-words text-sm font-mono">
            {redirectUrl}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onRedirect}
            className="flex-1 py-3 px-4 bg-purple-700 hover:bg-purple-800 rounded-lg text-white font-medium transition-colors"
          >
            Continue to Site
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};