import React from 'react';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: Category[];
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  setActiveCategory,
  categories,
}) => {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map(category => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              activeCategory === category.id
                ? 'bg-purple-900 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-300 hover:text-purple-700'
            }`}
          >
            {category.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
