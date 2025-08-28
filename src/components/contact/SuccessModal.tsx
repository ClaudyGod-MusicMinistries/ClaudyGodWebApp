import React from 'react';

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 text-center shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Thank You!</h2>
        <p className="text-gray-700 mb-6">
          Thank you for contacting us, our team will get back to you as soon as
          possible.
        </p>
        <button
          onClick={onClose}
          className="bg-purple-900 hover:bg-purple-800 text-white font-medium py-2 px-4 rounded-md transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
