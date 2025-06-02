// src/components/CityTourModal.tsx
import { motion, AnimatePresence } from 'framer-motion';

interface CityTourModalProps {
  city: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CityTourModal = ({ city, isOpen, onClose }: CityTourModalProps) => {
  // City tour schedule data
  const citySchedule = {
    Lagos: {
      date: "October 15, 2023",
      venue: "Tafawa Balewa Square",
      time: "6:00 PM",
      description: "Join us for a night of worship and praise at the iconic Tafawa Balewa Square. This event will feature special guests and a powerful message of hope."
    },
    Abuja: {
      date: "October 22, 2023",
      venue: "Abuja National Stadium",
      time: "5:30 PM",
      description: "Experience the power of gospel music at the Abuja National Stadium. This event will be broadcast live nationwide."
    },
    'Port Harcourt': {
      date: "October 29, 2023",
      venue: "Yakubu Gowon Stadium",
      time: "4:00 PM",
      description: "A special waterfront worship experience at Yakubu Gowon Stadium. Come expecting miracles and divine encounters."
    },
    Aba: {
      date: "November 5, 2023",
      venue: "Enyimba International Stadium",
      time: "3:00 PM",
      description: "An afternoon of worship and testimony at Enyimba Stadium. Special prayer session for entrepreneurs and business owners."
    },
    Owerri: {
      date: "November 12, 2023",
      venue: "Dan Anyiam Stadium",
      time: "5:00 PM",
      description: "Grand finale of the Nigeria tour at Dan Anyiam Stadium. Featuring a choir of 500 voices and special guest ministers."
    }
  };

  const schedule = citySchedule[city as keyof typeof citySchedule] || {
    date: "",
    venue: "",
    time: "",
    description: "Tour details coming soon"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-gradient-to-br from-[#0a061a] via-[#1a0a2e] to-[#0a061a] rounded-xl max-w-md w-full overflow-hidden border border-[#4e2a8e] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold text-[#c77dff]">{city} Tour</h3>
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-6 space-y-5">
                <div className="flex items-center text-gray-300 border-b border-[#4e2a8e]/50 pb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#9d4edd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">{schedule.date}</span>
                </div>
                
                <div className="flex items-center text-gray-300 border-b border-[#4e2a8e]/50 pb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#9d4edd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium">{schedule.venue}</span>
                </div>
                
                <div className="flex items-center text-gray-300 border-b border-[#4e2a8e]/50 pb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#9d4edd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{schedule.time}</span>
                </div>
                
                <div className="mt-6 text-gray-300 leading-relaxed bg-[#0f0c29]/50 p-4 rounded-lg">
                  <p className="text-[#e0aaff] font-medium mb-2">Event Description:</p>
                  {schedule.description}
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gradient-to-r from-[#4e2a8e] to-[#1a0a2e] rounded-lg text-white font-medium hover:opacity-90 transition-opacity border border-[#7b4ed9]"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};