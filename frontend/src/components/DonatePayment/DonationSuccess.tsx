// src/pages/donation-complete.tsx
import { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const DonationComplete = () => {
  useEffect(() => {
    // Notify parent window of completion
    if (window.opener) {
      window.opener.postMessage('paymentCompleted', window.location.origin);
    }
    
    // Close the window after 2 seconds
    const timer = setTimeout(() => {
      window.close();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-5">
          <FaCheckCircle className="text-green-500 text-6xl" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Donation Successful!
        </h1>
        
        <p className="text-gray-700 mb-6">
          Thank you for your generous support. Your contribution will help us continue our mission.
        </p>
        
        <div className="bg-green-50 rounded-lg p-4 border border-green-200 mb-6">
          <p className="text-green-700">
            This window will close automatically in a few seconds.
          </p>
        </div>
        
        <button
          onClick={() => window.close()}
          className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Close Window Now
        </button>
      </div>
    </div>
  );
};

export default DonationComplete;