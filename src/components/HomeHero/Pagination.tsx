// PaginationDots.tsx
import { motion } from 'framer-motion';

export const PaginationDots = ({
  currentSlide,
  totalSlides,
  goToSlide,
  className = '',
}: {
  currentSlide: number;
  totalSlides: number;
  goToSlide: (index: number) => void;
  className?: string;
}) => (
  <div className={`flex items-center gap-2 md:gap-3 ${className}`}>
    {Array.from({ length: totalSlides }).map((_, i) => (
      <motion.div
        key={i}
        onClick={() => goToSlide(i)}
        className="relative cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="h-1.5 md:h-2 rounded-full"
          animate={{
            width: i === currentSlide ? '1.5rem' : '0.75rem',
            backgroundColor:
              i === currentSlide ? '#fff' : 'rgba(255,255,255,0.3)',
          }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
      </motion.div>
    ))}
  </div>
);
