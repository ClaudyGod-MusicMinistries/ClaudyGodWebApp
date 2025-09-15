import { Product } from '../types/storeTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { RegularText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';

interface ProductGridProps {
  products: Product[];
  handleAddToCart: (product: Product) => void;
}

export const ProductGrid = ({
  products,
  handleAddToCart,
}: ProductGridProps) => (
  <section className="hidden md:grid container mx-auto px-4 md:px-8 py-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {products.map(product => (
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
          <RegularText
            as="h3"
            fontSize="1.125rem"
            weight="bold" // <-- Use 'weight' instead of 'fontWeight'
            className="mb-2 text-purple-900"
          >
            {product.name}
          </RegularText>

          <RegularText
            fontSize="0.75rem"
            color="text-gray-600"
            className="mb-4 flex-grow"
          >
            {product.description}
          </RegularText>

          <div className="flex justify-between items-center">
            <RegularText fontSize="0.75rem" weight="bold">
              ${product.price.toFixed(2)}
            </RegularText>

            <CustomButton
              onClick={() => handleAddToCart(product)}
              variant="primary"
              size="sm"
              className="flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faShoppingBag} size="sm" />
              <span>Add to Cart</span>
            </CustomButton>
          </div>
        </div>
      </div>
    ))}
  </section>
);
