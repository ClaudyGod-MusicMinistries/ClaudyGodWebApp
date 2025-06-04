// src/components/store/ProductGrid.tsx
import { Product } from '../types/storeTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

interface ProductGridProps {
  products: Product[];
  handleAddToCart: (product: Product) => void;
}

export const ProductGrid = ({ products, handleAddToCart }: ProductGridProps) => (
  <section className="hidden md:grid container mx-auto px-4 md:px-8 py-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {products.map((product) => (
      <div
        key={product.id}
        className="group cursor-pointer border border-purple-900 rounded-lg overflow-hidden shadow-sm flex flex-col transition-transform hover:scale-105"
      >
        <div className="h-64 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg roboto-condensed text-purple-900 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-xs work-sans mb-4 flex-grow">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <p className="work-sans text-xs">${product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-purple-900 hover:bg-purple-800 text-white px-4 py-2 rounded-md text-sm transition-colors flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faShoppingBag} size="lg" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    ))}
  </section>
);