
import { useCartStore } from '../Context/Cartcontext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartHandler: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-full md:w-96 bg-white shadow-lg">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" /> Shopping Cart
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 h-[calc(100vh-200px)] overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-purple-900 font-semibold">${item.price}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                      >
                        <FontAwesomeIcon icon={faMinus} className="h-4 w-4" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                      >
                        <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total:</span>
            <span className="text-xl font-bold text-purple-900">${total.toFixed(2)}</span>
          </div>
          <div className="space-y-2">
            <Link
              to="/cart"
              className="w-full bg-purple-900 text-white py-3 px-4 rounded-md text-center font-semibold hover:bg-purple-800 block"
              onClick={onClose}
            >
              View Cart
            </Link>
            <Link
              to="/checkout"
              className={`w-full border border-purple-900 text-purple-900 py-3 px-4 rounded-md text-center font-semibold hover:bg-purple-50 block ${
                items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={onClose}
              style={{ pointerEvents: items.length === 0 ? 'none' : 'auto' }}
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

