
import { useEffect } from 'react';

interface SuccessModalProps {
  onClose: () => void;
  title: string;
  message: string;
}

export default function SuccessModal({ onClose, title, message }: SuccessModalProps) {

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 md:p-8 transform transition-all duration-300 scale-95 animate-scaleIn"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-3">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 text-center mb-8">{message}</p>
        
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-purple-900 hover:bg-purple-800 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 transform hover:scale-105"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}