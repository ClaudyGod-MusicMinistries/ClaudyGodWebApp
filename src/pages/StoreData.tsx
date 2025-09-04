/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

import {
  BoldText,
  RegularText,
  LightText,
} from '../components/ui/fonts/typography';
import CustomButton from '../components/ui/fonts/buttons/CustomButton';
import { NewsletterForm } from '../components/util/Newsletter';
import { Cart } from '../components/store/Cart';
import { SEO } from '../components/util/SEO';
import { useCartStore } from '../contexts/Cartcontext';
import { StoreHero } from '../components/store/StoreHero';
import { CategoryFilter } from '../components/store/CategoryFilter';
import { products } from '../components/data/storeData';
import { AddToCartDialog } from '../components/store/AddToCartDialog';
import { Product } from '@/components/types/storeTypes';
import { DonationCallToAction } from '../components/util/DonationSupport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faShoppingBag,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';

export const StoreData = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dialogProduct, setDialogProduct] = useState<Product | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>(
    'right'
  );
  const [slideCount, setSlideCount] = useState(4);
  const { items, addItem } = useCartStore();
  const { colorScheme } = useTheme();

  // Cart count
  const cartItemsCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Filtered products
  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter(p => p.category === activeCategory);

  // Responsive slide count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setSlideCount(1);
      else if (window.innerWidth < 1024) setSlideCount(2);
      else setSlideCount(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add to cart
  const handleAddToCart = (product: Product) => {
    addItem(product);
    setDialogProduct(product);
  };

  const totalSlides = Math.ceil(filteredProducts.length / slideCount);
  const startIndex = currentSlide * slideCount;
  const visibleProducts = filteredProducts.slice(
    startIndex,
    startIndex + slideCount
  );

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: colorScheme.background }}
    >
      <SEO
        title="ClaudyGod Store - Gospel Merchandise & Products"
        description="Shop official ClaudyGod merchandise. Uplifting apparel, music albums, and faith-inspired products."
        keywords="gospel merchandise, christian store, worship products"
      />

      {/* Floating Cart */}
      {cartItemsCount > 0 && (
        <motion.div
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 right-8 z-50 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CustomButton
            variant="primary"
            size="circle"
            className="w-12 h-12 shadow-xl"
            icon={<FontAwesomeIcon icon={faShoppingCart} />}
            badge={cartItemsCount}
          />
        </motion.div>
      )}

      {/* Hero */}
      <StoreHero />

      <main className="flex-grow flex flex-col w-full">
        {/* Category Filter */}
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={['all', 'music', 'apparel', 'books']}
        />

        {/* Featured Products (Carousel) */}
        <section
          className="py-12 px-4 relative"
          style={{ backgroundColor: colorScheme.surface }}
        >
          <div className="container mx-auto">
            <header className="flex justify-between items-center mb-8">
              <BoldText fontSize="1.75rem" color={colorScheme.text}>
                Featured Products
              </BoldText>
              <div className="flex space-x-2">
                <CustomButton
                  variant={currentSlide === 0 ? 'disabled' : 'secondary'}
                  onClick={() =>
                    setCurrentSlide(
                      prev => (prev - 1 + totalSlides) % totalSlides
                    )
                  }
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </CustomButton>
                <CustomButton
                  variant={
                    currentSlide === totalSlides - 1 ? 'disabled' : 'secondary'
                  }
                  onClick={() =>
                    setCurrentSlide(prev => (prev + 1) % totalSlides)
                  }
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </CustomButton>
              </div>
            </header>

            <motion.div
              key={currentSlide}
              initial={{
                opacity: 0,
                x: slideDirection === 'right' ? 100 : -100,
              }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: slideDirection === 'right' ? -100 : 100,
              }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {visibleProducts.map(product => (
                <motion.article
                  key={product.id}
                  whileHover={{ y: -8 }}
                  className="rounded-2xl shadow-lg flex flex-col"
                  style={{ backgroundColor: colorScheme.surface }}
                >
                  <div className="relative group flex-grow">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 right-4">
                      <CustomButton
                        variant="primary"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </CustomButton>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between">
                    <BoldText fontSize="1.125rem">{product.name}</BoldText>
                    <RegularText className="text-sm line-clamp-2">
                      {product.description}
                    </RegularText>
                    <div className="mt-3 flex justify-between items-center">
                      <BoldText fontSize="1.25rem" color={colorScheme.accent}>
                        ${product.price}
                      </BoldText>
                      <LightText
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ backgroundColor: colorScheme.surfaceVariant }}
                      >
                        {product.category}
                      </LightText>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* All Products (Grid) */}
        <section
          className="py-12 px-4"
          style={{ backgroundColor: colorScheme.backgroundSecondary }}
        >
          <div className="container mx-auto">
            <header className="text-center mb-8">
              <BoldText fontSize="1.75rem">All Products</BoldText>
              <RegularText color={colorScheme.textSecondary}>
                Explore our full collection
              </RegularText>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -5 }}
                  className="rounded-xl overflow-hidden shadow-md flex flex-col"
                  style={{ backgroundColor: colorScheme.surface }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <BoldText>{product.name}</BoldText>
                    <RegularText className="text-sm line-clamp-2">
                      {product.description}
                    </RegularText>
                    <div className="mt-3 flex justify-between items-center">
                      <BoldText fontSize="1.25rem" color={colorScheme.accent}>
                        ${product.price}
                      </BoldText>
                      <LightText className="text-xs">
                        {product.category}
                      </LightText>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col">
        <DonationCallToAction
          title="Partner with Our Ministry"
          subtitle="Your Support Makes a Difference"
          description="Every purchase helps us spread the gospel through music and outreach."
          goFundMeUrl="https://gofundme.com/your-campaign"
          donateUrl="/donate"
        />
        <NewsletterForm />
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {isCartOpen && (
          <Cart
            isModal
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
        )}
        {dialogProduct && (
          <AddToCartDialog
            dialogProduct={dialogProduct}
            setDialogProduct={setDialogProduct}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
