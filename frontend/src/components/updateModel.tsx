import React from 'react';

const UpdateModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-100 rounded-2xl max-w-md w-full p-8 relative shadow-2xl">
        <button 
          className="absolute cursor-pointer top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
          onClick={onClose}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-center">
          <div className="mx-auto bg-purple-200 rounded-full w-20 h-20 flex items-center justify-center mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 text-purple-700 " 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Thank You for Your Patience!
          </h3>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            We're constantly working to bring you more content. We'll notify you as soon as we have new updates available.
            <br /><br />
            Thanks for being part of our journey!
          </p>
          
          <button
            className="bg-purple-700 hover:bg-purple-800 cursor-pointer text-white font-medium py-2 px-8 rounded-full transition-colors shadow-md"
            onClick={onClose}
          >
            Close Notification
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;