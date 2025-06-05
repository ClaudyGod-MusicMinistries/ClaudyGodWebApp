// // components/SecureStreamButton.jsx
// import { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMusic, faSpinner } from '@fortawesome/free-solid-svg-icons';

// const SecureStreamButton = () => {
//   const [streamUrl, setStreamUrl] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStreamLink = async () => {
//       try {
//         const response = await fetch('/api/primary-stream');
//         const data = await response.json();
        
//         // Security validation
//         if (!isValidUrl(data.url)) {
//           throw new Error('Invalid stream URL');
//         }
        
//         setStreamUrl(data.url);
//       } catch (err) {
//         setError('Failed to load streaming link');
//         console.error('Stream link fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStreamLink();
//   }, []);

//   // URL validation helper
//   const isValidUrl = (url) => {
//     try {
//       const parsed = new URL(url);
//       return ['https:', 'http:'].includes(parsed.protocol);
//     } catch {
//       return false;
//     }
//   };

//   if (loading) {
//     return (
//       <button 
//         disabled
//         className="bg-blue-400 text-white font-medium py-2 px-6 rounded-full inline-flex items-center"
//       >
//         <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
//         Loading...
//       </button>
//     );
//   }

//   if (error || !streamUrl) {
//     return (
//       <button 
//         disabled
//         className="bg-gray-400 text-white font-medium py-2 px-6 rounded-full"
//       >
//         Stream Unavailable
//       </button>
//     );
//   }

//   return (
//     <a 
//       href={streamUrl}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition duration-300 inline-flex items-center shadow-lg transform hover:scale-105"
//     >
//       <FontAwesomeIcon icon={faMusic} className="mr-2" />
//       Stream Now
//     </a>
//   );
// };

// export default SecureStreamButton;