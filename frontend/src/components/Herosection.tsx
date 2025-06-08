
import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  backgroundImage: string;
  className?: string; // Add this line
  children?: React.ReactNode;
}

export const Herosection: React.FC<HeroSectionProps> = ({ title, backgroundImage }) => {
  
  return (
    <section className="relative w-full bg-black h-[500px] overflow-hidden">
      <div className="container mx-auto h-full flex flex-col lg:flex-row items-center justify-center gap-8 px-4 sm:px-6">
        {/* Text Container */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex w-full lg:w-1/2 text-white flex-col justify-center h-full py-8 lg:py-0"
        >
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent roboto-condensed text-30">
                {title}
              </span>
            </h1>
            <div className="border-l-4 border-white pl-4">
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                Experience the divine fusion of American Contemporary Christian Music and Afro-Gospel Songs through ClaudyGod's Inspirational Journey.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Image Container */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 h-full relative flex items-center justify-center"
        
        >
          <div className="relative w-full h-full max-w-[600px]">
            <img
              src={backgroundImage}
              alt="ClaudyGod"
              className="w-full h-full object-cover object-center rounded-xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent lg:bg-gradient-to-l" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};