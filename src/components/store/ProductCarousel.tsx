import { Product } from '../types/storeTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBag,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { RegularText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { IconButton } from '../ui/fonts/buttons/IconButton';

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
  handleAddToCart,
}: ProductCarouselProps) => (
  <section className="md:hidden px-4">
    <div className="relative overflow-hidden">
      <div className="grid grid-cols-2 gap-4">
        {products.slice(currentSlide * 2, currentSlide * 2 + 2).map(product => (
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
              <RegularText
                as="h3"
                fontSize="0.75rem"
                fontWeight="bold"
                className="mb-1 text-purple-900"
              >
                {product.name}
              </RegularText>

              <RegularText
                fontSize="0.625rem"
                color="text-gray-600"
                className="mb-2"
              >
                {product.description}
              </RegularText>

              <div className="flex justify-between items-center">
                <RegularText fontSize="0.875rem" fontWeight="medium">
                  ${product.price.toFixed(2)}
                </RegularText>

                <CustomButton
                  onClick={() => handleAddToCart(product)}
                  variant="primary"
                  size="xs"
                  className="flex items-center gap-1"
                >
                  <FontAwesomeIcon icon={faShoppingBag} size="xs" />
                  <span>Add</span>
                </CustomButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <IconButton
          onClick={prevSlide}
          icon={<FontAwesomeIcon icon={faChevronLeft} size="lg" />}
          variant="ghost"
          color="purple"
        />
        <IconButton
          onClick={nextSlide}
          icon={<FontAwesomeIcon icon={faChevronRight} size="lg" />}
          variant="ghost"
          color="purple"
        />
      </div>
    </div>
  </section>
);
