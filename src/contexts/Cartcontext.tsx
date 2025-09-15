import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the shape of each item in the cart
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

// Define the store's API
interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
}

// Create the store with persistence (only persisting items)
export const useCartStore = create<CartStore>()(
  persist(
    set => ({
      items: [],
      isOpen: false,

      addItem: item =>
        set(state => {
          const existing = state.items.find(i => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),

      removeItem: id =>
        set(state => ({
          items: state.items.filter(i => i.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set(state => {
          if (quantity <= 0) {
            return { items: state.items.filter(i => i.id !== id) };
          }
          return {
            items: state.items.map(i => (i.id === id ? { ...i, quantity } : i)),
          };
        }),

      clearCart: () => set({ items: [] }),
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: 'cart-storage',
      partialize: state => ({ items: state.items }),
    }
  )
);

// Selector helpers for derived data
export const selectCartItems = (state: CartStore) => state.items;
export const selectCartTotal = (state: CartStore) =>
  state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const selectCartCount = (state: CartStore) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

// Usage in a component:
// const items = useCartStore(selectCartItems);
// const total = useCartStore(selectCartTotal);
// const count = useCartStore(selectCartCount);
