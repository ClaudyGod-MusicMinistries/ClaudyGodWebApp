// src/components/store/CategoryFilter.tsx
import { categories } from "../data/storeData";


interface CategoryFilterProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const CategoryFilter = ({ 
  activeCategory, 
  setActiveCategory 
}: CategoryFilterProps) => (
  <div className="container mx-auto px-4 md:px-8 py-8">
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`px-6 py-2 rounded-md capitalize transition-colors work-sans ${
            activeCategory === cat
              ? 'bg-purple-900 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  </div>
);