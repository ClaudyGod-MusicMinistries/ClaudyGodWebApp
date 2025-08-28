import React from 'react';
import { motion } from 'framer-motion';
import { LightText, SemiBoldText, ExtraBoldText } from '../ui/fonts/typography';
import { useTheme } from '../../contexts/ThemeContext';

interface BlogPostProps {
  id: string;
  title: string;
  date: string;
  image: string;
  onReadArticle: (id: string) => void;
  className?: string;
}

export const BlogPost: React.FC<BlogPostProps> = ({
  id,
  title,
  date,
  image,
  onReadArticle,
  className
}) => {
  const { colorScheme } = useTheme();

  return (
    <motion.div 
      className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Image container */}
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90"
          style={{ background: `linear-gradient(to top, ${colorScheme.primary}/80, transparent)` }}
        />
      </div>
      
      {/* Content container */}
      <div className="p-6">
        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-2"
        >
          <LightText 
            style={{ 
              color: colorScheme.success,
              fontSize: "0.875rem"
            }}
            useThemeColor={false}
          >
            {date}
          </LightText>
        </motion.div>
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4"
        >
          <ExtraBoldText 
            style={{ 
              color: colorScheme.background,
              fontSize: "1.5rem",
              lineHeight: "1.3"
            }}
            useThemeColor={false}
          >
            {title}
          </ExtraBoldText>
        </motion.div>
        
        {/* Read More button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 opacity-0 translate-y-4
           transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
        >
          <button
            onClick={() => onReadArticle(id)}
            className="inline-flex items-center px-6 py-2.5 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/30"
          >
            <SemiBoldText useThemeColor={false}>
              Read Article
            </SemiBoldText>
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogPost;