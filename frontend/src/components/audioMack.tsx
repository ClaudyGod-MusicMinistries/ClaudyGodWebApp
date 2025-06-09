import { motion } from 'framer-motion';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faAmazon } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AudioMackComponent = () => {
  return (
    <section className="py-16 bg-purple-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
       <div className="mb-5 inline-flex items-center justify-center bg-white rounded-full shadow-lg p-8">
  <FontAwesomeIcon
    icon={faAmazon}
    className="text-yellow-400 text-[9rem]"
  />
</div>

          <h2 className="text-3xl md:text-4xl roboto-condensed font-bold mb-4">
            ClaudyGod Music is Now on Amazon Music
          </h2>
          <p className="text-xl text-gray-600 mb-8 slider-font">
            Listen • Stream • Play
          </p>
          <motion.a
            href="https://music.amazon.com/albums/B0DSM7QGLF?tag=fndcmpgns-20"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 bg-purple-800 text-white rounded-full hover:bg-purple-900 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
            <span className="robotoMedium">Stream Now on Amazon Music</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
