import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTriangleExclamation,
  faArrowUpRightFromSquare,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

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
  if (!isOpen || !redirectUrl) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-[1000] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>

        <div className="text-center">
          <FontAwesomeIcon 
            icon={faTriangleExclamation} 
            className="text-yellow-500 text-5xl mb-4" 
          />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Security Notice</h3>
          <p className="text-gray-700 mb-6">
            You are about to be redirected to an external website. 
            We recommend verifying the URL before proceeding.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-6 break-all">
            <span className="text-sm font-mono text-gray-800">{redirectUrl}</span>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
            >
              Cancel
            </button>
            <button
              onClick={onRedirect}
              className="px-6 py-3 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition flex items-center"
            >
              Continue <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};