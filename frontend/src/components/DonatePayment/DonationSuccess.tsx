// src/pages/DonationComplete.tsx
import { useEffect } from 'react';

const DonationComplete = () => {
  useEffect(() => {
    // Notify parent window
    window.opener.postMessage('paymentCompleted', '*');
    
    // Close the window after 1 second
    const timer = setTimeout(() => {
      window.close();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
        <div className="text-green-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Your payment was processed successfully. This window will close automatically.
        </p>
        <div className="text-gray-500 text-sm">
          <p>Not closing automatically? <button 
            onClick={() => window.close()}
            className="text-blue-600 hover:underline"
          >
            Click here to close
          </button></p>
        </div>
      </div>
    </div>
  );
};

export default DonationComplete;