import { motion } from 'framer-motion';
import { FC, useEffect } from 'react';

interface TourDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tourDetails = `

Nigeria is set to experience a spiritual and musical revival as renowned gospel artist ClaudyGod prepares to embark on an inspiring tour across the country. Known for her soulful melodies and heartfelt messages, ClaudyGod’s upcoming tour promises to be a blend of powerful evangelism, uplifting music, and meaningful outreach.

A Journey of Faith and Music

ClaudyGod’s tour aims to touch lives through her exceptional talent and unwavering faith. The artist’s mission is to spread hope, love, and spiritual renewal among fans and communities alike. With a lineup of electrifying performances and outreach programs, this tour is not just about music but about making a lasting impact.

What to Expect

- *Dynamic Music Performances:* Fans can look forward to live performances of her hit songs that inspire and uplift.
- *Evangelism and Outreach:* The tour includes community outreach activities, gospel seminars, and opportunities for spiritual growth.
- *Engagement and Inspiration:* ClaudyGod will engage with audiences, sharing her journey and encouraging believers to deepen their faith.

Stay Updated

The exact dates and locations of the tour will be announced soon. Keep an eye on official channels and social media platforms for updates, and don’t miss this chance to be part of an unforgettable spiritual and musical experience.

Join the Movement

This tour is more than just a series of concerts; it’s a movement of faith, love, and unity. Be part of this exciting journey with ClaudyGod as she brings her message of hope to Nigeria. Stay tuned for more details and prepare to be inspired!.`;

export const TourDetailsModal: FC<TourDetailsModalProps> = ({ isOpen, onClose }) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-gray-900 rounded-2xl shadow-xl border border-purple-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white roboto-condensed">
             ClaudyGod Announces Exciting Music and Outreach Tour in Nigeria
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="text-gray-300 md:text-sm max-md:text-xx work-sans space-y-4">
            {tourDetails.split('\n\n').map((paragraph, index) => (
              <p key={index} className={index === 0 ? "text-lg" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-700 hover:to-purple-500 text-white rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Close Details
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};