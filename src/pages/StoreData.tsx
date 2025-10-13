/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  lazy,
  Suspense,
  memo,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

import {
  BoldText,
  RegularText,
  LightText,
  ExtraBoldText,
  SemiBoldText,
} from '../components/ui/fonts/typography';
import CustomButton from '../components/ui/fonts/buttons/CustomButton';
import { SEO } from '../components/util/SEO';
import { useCartStore } from '../contexts/Cartcontext';
import { CategoryFilter } from '../components/store/CategoryFilter';
import { products } from '../components/data/storeData';
import { Product } from '@/components/types/storeTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faShoppingCart,
  faStar,
  faTag,
} from '@fortawesome/free-solid-svg-icons';
import { LayoutTemplate } from '../components/util/hero';
import { Back2 } from '../assets';

// Lazy load components
const LazyNewsletterForm = lazy(() =>
  import('../components/util/Newsletter').then(module => ({
    default: module.NewsletterForm,
  }))
);

const LazyCart = lazy(() =>
  import('../components/store/Cart').then(module => ({
    default: module.Cart,
  }))
);

const LazyAddToCartDialog = lazy(() =>
  import('../components/store/AddToCartDialog').then(module => ({
    default: module.AddToCartDialog,
  }))
);

// Skeleton loaders
const NewsletterSkeleton = () => (
  <div className="h-32 bg-gray-100 animate-pulse rounded-lg my-6" />
);

const CartSkeleton = () => (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg w-full max-w-md h-80 animate-pulse" />
  </div>
);

// Optimized Image Component
const OptimizedImage = memo(
  ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
    />
  )
);

// Product Card Component
const ProductCard = memo(
  ({
    product,
    onAddToCart,
    colorScheme,
    isFeatured = false,
  }: {
    product: Product;
    onAddToCart: (product: Product) => void;
    colorScheme: any;
    isFeatured?: boolean;
  }) => (
    <motion.article
      whileHover={{ y: -2 }}
      className={`rounded-lg shadow-md flex flex-col transition-all duration-300 ${
        isFeatured ? 'shadow-lg' : ''
      }`}
      style={{ backgroundColor: colorScheme.surface }}
    >
      <div className="relative group flex-grow overflow-hidden">
        <OptimizedImage
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isFeatured && (
          <div className="absolute bottom-2 right-2">
            <CustomButton
              variant="primary"
              onClick={() => onAddToCart(product)}
              size="sm"
              className="text-xs px-2 py-1"
            >
              Add to Cart
            </CustomButton>
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col justify-between flex-grow">
        <BoldText
          fontSize="0.875rem"
          style={{ color: colorScheme.text }}
          className="mb-1"
        >
          {product.name}
        </BoldText>
        <RegularText
          className="text-xs line-clamp-2 mb-2 text-gray-600"
          style={{ color: colorScheme.textSecondary }}
        >
          {product.description}
        </RegularText>
        <div className="flex justify-between items-center">
          <BoldText fontSize="0.875rem" style={{ color: colorScheme.accent }}>
            ${product.price}
          </BoldText>
          <LightText
            className="text-xs px-2 py-1 rounded-full"
            style={{
              backgroundColor: colorScheme.surfaceVariant,
              color: colorScheme.text,
            }}
          >
            {product.category}
          </LightText>
        </div>
      </div>
    </motion.article>
  )
);

// Store Header
const StoreHeader = memo(({ colorScheme }: { colorScheme: any }) => (
  <header className="mb-8 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-opacity-10 mb-3"
      style={{ backgroundColor: `${colorScheme.primary}20` }}
    >
      <FontAwesomeIcon
        icon={faTag}
        style={{ color: colorScheme.primary }}
        className="text-sm"
      />
      <LightText
        style={{ color: colorScheme.primary }}
        className="text-xs"
        useThemeColor={false}
      >
        MINISTRY STORE
      </LightText>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <ExtraBoldText
        style={{ color: colorScheme.primary }}
        className="text-2xl mb-2"
        useThemeColor={false}
      >
        Support Ministry Through Products
      </ExtraBoldText>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="max-w-2xl mx-auto"
    >
      <SemiBoldText
        style={{ color: colorScheme.accent }}
        className="text-sm"
        useThemeColor={false}
      >
        Every purchase helps spread the gospel through music and outreach.
      </SemiBoldText>
    </motion.div>
  </header>
));

// Floating Cart
const FloatingCart = memo(
  ({
    cartItemsCount,
    onOpenCart,
  }: {
    cartItemsCount: number;
    onOpenCart: () => void;
  }) => (
    <motion.div
      onClick={onOpenCart}
      className="fixed bottom-4 right-4 z-50 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <CustomButton
        variant="primary"
        size="circle"
        className="w-10 h-10 shadow-lg"
        icon={<FontAwesomeIcon icon={faShoppingCart} className="text-sm" />}
        badge={cartItemsCount}
      />
    </motion.div>
  )
);

// Main Store Component
export const StoreData = memo(() => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dialogProduct, setDialogProduct] = useState<Product | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(4);

  const { items, addItem } = useCartStore();
  const { colorScheme } = useTheme();

  // Memoized values
  const cartItemsCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const filteredProducts = useMemo(
    () =>
      activeCategory === 'all'
        ? products
        : products.filter(p => p.category === activeCategory),
    [activeCategory]
  );

  // Responsive slide count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setSlideCount(1);
      else if (window.innerWidth < 768) setSlideCount(2);
      else if (window.innerWidth < 1024) setSlideCount(3);
      else setSlideCount(4);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = useMemo(
    () => Math.ceil(filteredProducts.length / slideCount),
    [filteredProducts.length, slideCount]
  );

  const visibleProducts = useMemo(
    () =>
      filteredProducts.slice(
        currentSlide * slideCount,
        currentSlide * slideCount + slideCount
      ),
    [filteredProducts, currentSlide, slideCount]
  );

  // Event handlers
  const handleAddToCart = useCallback(
    (product: Product) => {
      addItem(product);
      setDialogProduct(product);
    },
    [addItem]
  );

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handleOpenCart = useCallback(() => setIsCartOpen(true), []);
  const handleCloseCart = useCallback(() => setIsCartOpen(false), []);
  const handleCloseDialog = useCallback(() => setDialogProduct(null), []);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setCurrentSlide(0);
  }, []);

  // SEO data
  const seoStructuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Store',
      name: 'ClaudyGod Store',
      description: 'Official merchandise store for ClaudyGod Ministries',
      url: 'https://claudygod.org/store',
    }),
    []
  );

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: colorScheme.background }}
    >
      <SEO
        title="ClaudyGod Store - Gospel Merchandise & Products"
        description="Shop official ClaudyGod merchandise. Uplifting apparel, music albums, and faith-inspired products that support gospel ministry."
        canonical="https://claudygod.org/store"
        structuredData={seoStructuredData}
      />

      {/* Hero Section */}
      <LayoutTemplate
        backgroundImage={Back2}
        overlayColor="rgba(0,0,0,0.45)"
        className="h-60 min-h-[400px]"
        title={''}
      >
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center text-center w-full h-full px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-3"
          >
            <ExtraBoldText
              className="text-3xl text-white mb-2"
              useThemeColor={false}
            >
              ClaudyGod Store
            </ExtraBoldText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mb-3 mx-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <SemiBoldText className="text-white text-sm" useThemeColor={false}>
              Shop official ClaudyGod merchandise
            </SemiBoldText>
          </motion.div>
        </motion.div>
      </LayoutTemplate>

      {/* Store Content */}
      <article className="max-w-6xl mx-auto w-full px-4 py-6">
        <StoreHeader colorScheme={colorScheme} />

        {/* Category Filter */}
        <section className="mb-6">
          <CategoryFilter
            activeCategory={activeCategory}
            setActiveCategory={handleCategoryChange}
            categories={[
              { id: 'all', name: 'All' },
              { id: 'music', name: 'Music' },
              { id: 'apparel', name: 'Apparel' },
              { id: 'books', name: 'Books' },
            ]}
          />
        </section>

        {/* Featured Products */}
        <section className="mb-8">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center mb-4"
          >
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: colorScheme.primary }}
              />
              <BoldText style={{ color: colorScheme.text }}>
                Featured Products
              </BoldText>
            </div>
            <div className="flex gap-2">
              <CustomButton
                variant={currentSlide === 0 ? 'disabled' : 'secondary'}
                onClick={handlePrevSlide}
                size="sm"
                className="w-8 h-8"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </CustomButton>
              <CustomButton
                variant={
                  currentSlide === totalSlides - 1 ? 'disabled' : 'secondary'
                }
                onClick={handleNextSlide}
                size="sm"
                className="w-8 h-8"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </CustomButton>
            </div>
          </motion.header>

          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {visibleProducts.map(product => (
              <ProductCard
                key={`featured-${product.id}`}
                product={product}
                onAddToCart={handleAddToCart}
                colorScheme={colorScheme}
                isFeatured={true}
              />
            ))}
          </motion.div>
        </section>

        {/* All Products */}
        <section className="mb-8">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <BoldText style={{ color: colorScheme.text }} className="mb-1">
              All Products
            </BoldText>
            <RegularText
              style={{ color: colorScheme.textSecondary }}
              className="text-sm"
            >
              Explore our full collection
            </RegularText>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {filteredProducts.map(product => (
              <ProductCard
                key={`all-${product.id}`}
                product={product}
                onAddToCart={handleAddToCart}
                colorScheme={colorScheme}
              />
            ))}
          </motion.div>
        </section>
      </article>

      {/* Floating Cart */}
      {cartItemsCount > 0 && (
        <FloatingCart
          cartItemsCount={cartItemsCount}
          onOpenCart={handleOpenCart}
        />
      )}

      {/* Newsletter Section */}
      <section
        className="py-8"
        style={{
          background: `linear-gradient(135deg, ${colorScheme.gray[50]}, ${colorScheme.gray[100]})`,
        }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <Suspense fallback={<NewsletterSkeleton />}>
            <LazyNewsletterForm />
          </Suspense>
        </div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {isCartOpen && (
          <Suspense fallback={<CartSkeleton />}>
            <LazyCart isModal isOpen={isCartOpen} onClose={handleCloseCart} />
          </Suspense>
        )}
        {dialogProduct && (
          <Suspense fallback={null}>
            <LazyAddToCartDialog
              dialogProduct={dialogProduct}
              setDialogProduct={handleCloseDialog}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
});

export default StoreData;
