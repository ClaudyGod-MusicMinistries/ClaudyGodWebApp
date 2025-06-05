import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSpotify, 
  faApple, 
  faYoutube,
  faDeezer,
  faSoundcloud,
  faTiktok
} from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

interface SingleReleaseCardProps {
  loadedImages: Record<string, boolean>;
}

export const SingleReleaseCard = ({ loadedImages }: SingleReleaseCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="bg-[#140f3c]/80 backdrop-blur-sm border border-[#6a11cb]/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-[#ff4d94]/30 transition-all duration-300 hover:-translate-y-2"
  >
    <div className="flex flex-col md:flex-row">
      {/* Image and platform links */}
    </div>
  </motion.div>
);