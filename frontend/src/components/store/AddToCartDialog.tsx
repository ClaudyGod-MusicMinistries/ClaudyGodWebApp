// src/components/store/AddToCartDialog.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../types/storeTypes';

interface AddToCartDialogProps {
  dialogProduct: Product | null;
  setDialogProduct: (product: Product | null) => void;
}

export const AddToCartDialog = ({ 
  dialogProduct, 
  setDialogProduct 
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
          <h3 className="text-xl font-bold text-purple-900 mb-4">
            Item Added to Cart
          </h3>
          <p className="text-gray-700 mb-2">{dialogProduct.name}</p>
          <p className="text-gray-900 font-medium">${dialogProduct.price}</p>
          <div className="mt-6">
            <button
              onClick={() => setDialogProduct(null)}
              className="bg-purple-900 hover:bg-purple-800 text-white px-6 py-2 rounded-md transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};