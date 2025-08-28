// store/selectors.ts
import { RootState } from './store';

export const selectProducts = (state: RootState) => state.store.products;
export const selectCategories = (state: RootState) => state.store.categories;
export const selectCartItems = (state: RootState) => state.store.cart.items;
export const selectCartIsOpen = (state: RootState) => state.store.cart.isOpen;
export const selectActiveCategory = (state: RootState) =>
  state.store.ui.activeCategory;
export const selectCurrentSlide = (state: RootState) =>
  state.store.ui.currentSlide;
export const selectSlideDirection = (state: RootState) =>
  state.store.ui.slideDirection;
export const selectSlideCount = (state: RootState) => state.store.ui.slideCount;
export const selectDialogProduct = (state: RootState) =>
  state.store.ui.dialogProduct;

export const selectFilteredProducts = (state: RootState) => {
  const activeCategory = selectActiveCategory(state);
  const products = selectProducts(state);
  return activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);
};

export const selectCartTotal = (state: RootState) =>
  selectCartItems(state).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

export const selectCartCount = (state: RootState) =>
  selectCartItems(state).reduce((sum, item) => sum + item.quantity, 0);
