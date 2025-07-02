import { motion } from 'framer-motion';
import { About1 } from '../../assets/';
import { useState } from 'react';

export const ArtistQuote = () => {
  const [loadedImage, setLoadedImage] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="max-w-5xl mx-auto bg-black p-6 md:p-8 rounded-2xl border-l-4 border-[#ff4d94] mb-16"
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-[#ff4d94] to-[#6a11cb] mb-4 md:mb-6">
          <img
            src={About1}
            alt="ClaudyGod"
            className="rounded-xl w-10 h-10 md:w-12 md:h-12 object-cover"
            onLoad={() => setLoadedImage(true)}
          />
          {!loadedImage && (
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 md:w-12 md:h-12 animate-pulse" />
          )}
        </div>
        <blockquote className="text-base md:text-xl font-work-sans mb-4 md:mb-6 text-[#e2e1f3]">
         My Vision is to reach the world with the love of Jesus, to proclaim truth always, and to
          redirect mankind to God through Worship and the Word.
        </blockquote>
        <p className="font-raleway-medium text-lg md:text-xl text-[#ff4d94]">
          — Min. ClaudyGod
        </p>
      </div>
    </motion.div>
  );
};
