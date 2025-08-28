import { useState } from 'react';
import { motion } from 'framer-motion';

interface CityTourModalProps {
  city: string;
  isOpen: boolean;
  onClose: () => void;
}

const CityTourModal = ({ city, isOpen, onClose }: CityTourModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, city });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setEmail('');
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-[#140f3c] rounded-2xl p-8 max-w-md w-full mx-4 border border-[#6a11cb] relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
          aria-label="Close modal"
        >
          &times;
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-block mb-6"
            >
              <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
            <p className="text-gray-300">
              We'll notify you when Min. ClaudyGod is in {city}
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Stay Updated for <span className="text-purple-400">{city}</span>
            </h2>
            <p className="text-gray-400 text-center mb-6">
              Enter your details to get notified when we're in your city
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0a061a] border border-[#6a11cb] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0a061a] border border-[#6a11cb] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-purple-900 to-purple-700 text-white font-medium rounded-lg shadow-lg hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-[#140f3c]"
              >
                Notify Me
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};
 export default CityTourModal