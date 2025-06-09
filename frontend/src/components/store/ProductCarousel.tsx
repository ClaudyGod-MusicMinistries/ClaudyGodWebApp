import { Product } from '../types/storeTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface ProductCarouselProps {
  products: Product[];
  currentSlide: number;
  nextSlide: () => void;
  prevSlide: () => void;
  handleAddToCart: (product: Product) => void;
}

export const ProductCarousel = ({ 
  products, 
  currentSlide, 
  nextSlide, 
  prevSlide, 
  handleAddToCart 
}: ProductCarouselProps) => (
  <section className="md:hidden px-4">
    <div className="relative overflow-hidden">
      <div className="grid grid-cols-2 gap-4">
        {products.slice(currentSlide * 2, currentSlide * 2 + 2).map((product) => (
          <div
            key={product.id}
            className="group cursor-pointer border border-purple-900 rounded-lg overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105"
          >
            <div className="h-36 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-3">
              <h3 className="text-xs roboto-condensed text-purple-900 mb-1">
                {product.name}
              </h3>
              <p className="text-gray-600 text-[10px] mb-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <p className="work-sans text-sm">${product.price}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-purple-900 hover:bg-purple-800 text-white px-2 py-1 rounded-md text-xs transition-colors flex items-center gap-1"
                >
                  <FontAwesomeIcon icon={faShoppingBag} />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={prevSlide} className="text-purple-900">
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
        <button onClick={nextSlide} className="text-purple-900">
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </button>
      </div>
    </div>
  </section>
);