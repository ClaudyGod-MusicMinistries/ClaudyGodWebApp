// store/storeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreState, Product, Category } from '../components/types/storeTypes'; // Added Category import

const initialState: StoreState = {
  products: [],
  categories: [],
  cart: {
    items: [],
    isOpen: false,
  },
  ui: {
    activeCategory: 'all',
    currentSlide: 0,
    slideDirection: 'right',
    slideCount: 4,
    dialogProduct: null,
  },
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<string>) {
      state.ui.activeCategory = action.payload;
    },
    setSlideCount(state, action: PayloadAction<number>) {
      state.ui.slideCount = action.payload;
    },
    setSlideDirection(state, action: PayloadAction<'left' | 'right'>) {
      // Added action
      state.ui.slideDirection = action.payload;
    },
    setCurrentSlide(state, action: PayloadAction<number>) {
      // Added action
      state.ui.currentSlide = action.payload;
    },
    nextSlide(state) {
      const filteredProducts =
        state.ui.activeCategory === 'all'
          ? state.products
          : state.products.filter(p => p.category === state.ui.activeCategory);

      const totalSlides = Math.ceil(
        filteredProducts.length / state.ui.slideCount
      );
      state.ui.slideDirection = 'right';
      state.ui.currentSlide = (state.ui.currentSlide + 1) % totalSlides;
    },
    prevSlide(state) {
      const filteredProducts =
        state.ui.activeCategory === 'all'
          ? state.products
          : state.products.filter(p => p.category === state.ui.activeCategory);

      const totalSlides = Math.ceil(
        filteredProducts.length / state.ui.slideCount
      );
      state.ui.slideDirection = 'left';
      state.ui.currentSlide =
        (state.ui.currentSlide - 1 + totalSlides) % totalSlides;
    },
    addToCart(state, action: PayloadAction<Product>) {
      const existingItem = state.cart.items.find(
        item => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.items.push({ ...action.payload, quantity: 1 });
      }
      state.ui.dialogProduct = action.payload;
    },
    removeItem(state, action: PayloadAction<string>) {
      state.cart.items = state.cart.items.filter(
        item => item.id !== action.payload
      );
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const item = state.cart.items.find(item => item.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.cart.items = state.cart.items.filter(
            item => item.id !== action.payload.id
          );
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    clearCart(state) {
      state.cart.items = [];
    },
    toggleCart(state) {
      state.cart.isOpen = !state.cart.isOpen;
    },
    closeCart(state) {
      state.cart.isOpen = false;
    },
    setDialogProduct(state, action: PayloadAction<Product | null>) {
      state.ui.dialogProduct = action.payload;
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
  },
});

// Export all actions including the new ones
export const {
  setActiveCategory,
  setSlideCount,
  setSlideDirection, // Export new action
  setCurrentSlide, // Export new action
  nextSlide,
  prevSlide,
  addToCart,
  removeItem,
  updateQuantity,
  clearCart,
  toggleCart,
  closeCart,
  setDialogProduct,
  setProducts,
  setCategories,
  removeFromCart, // Alias for removeItem
} = storeSlice.actions;

export default storeSlice.reducer;
