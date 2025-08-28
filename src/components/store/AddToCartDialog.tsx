import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../types/storeTypes';
import { RegularText } from '../ui/fonts/typography';
import CustomButton from '../ui/fonts/buttons/CustomButton';

interface AddToCartDialogProps {
  dialogProduct: Product | null;
  setDialogProduct: (product: Product | null) => void;
}

export const AddToCartDialog = ({
  dialogProduct,
  setDialogProduct,
}: AddToCartDialogProps) => {
  if (!dialogProduct) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 relative">
        <button
          onClick={() => setDialogProduct(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>

        <div className="text-center">
          <RegularText
            as="h3"
            fontSize="1.25rem"
            fontWeight="bold"
            className="mb-4 text-purple-900"
          >
            Item Added to Cart
          </RegularText>

          <RegularText className="mb-2 text-gray-700">
            {dialogProduct.name}
          </RegularText>

          <RegularText fontWeight="medium" className="text-gray-900">
            ${dialogProduct.price.toFixed(2)}
          </RegularText>

          <div className="mt-6">
            <CustomButton
              onClick={() => setDialogProduct(null)}
              variant="primary"
              size="md"
              fullWidth
            >
              Continue Shopping
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};
