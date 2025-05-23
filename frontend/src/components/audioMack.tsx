
import { motion } from 'framer-motion';
import {  faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { AudioMack } from '../assets/'; // Make sure to import your Audiomack logo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const AudioMackComponent = () => {
  return (
    <div>
       {/* Audiomack Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5 inline-block p-4 bg-white rounded-full shadow-lg">
              <img 
                src={AudioMack} 
                alt="Audiomack Logo" 
                className="w-[150px] h-[150px] object-contain" 
              />
            </div>
            <h2 className="text-3xl md:text-4xl roboto-condensed font-bold mb-4">
              ClaudyGod Music is Now on AudioMack
            </h2>
            <p className="text-xl text-gray-600 mb-8 slider-font">
              Listen • Stream • Play
            </p>
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-purple-800 text-white rounded-full hover:bg-purple-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
              <span className="robotoMedium">Stream Now on Audiomack</span>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

