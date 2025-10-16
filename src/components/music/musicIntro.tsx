// components/MusicIntro.tsx
import { motion } from 'framer-motion';

interface MusicIntroProps {
  title: string;
  description: string;
}

export const MusicIntro = ({ title, description }: MusicIntroProps) => {
  return (
    <section className="pt-32 pb-20 bg-purple-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl roboto-condensed mb-6">
            {title}.
          </h1>
          <div className="w-20 h-1 bg-white mb-8"></div>
          <p className="text-sm max-w-2xl work-sans">{description}</p>
        </motion.div>
      </div>
    </section>
  );
};
