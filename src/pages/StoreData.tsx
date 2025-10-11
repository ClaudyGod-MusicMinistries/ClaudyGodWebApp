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
import { Link } from 'react-router-dom';
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
import { Back2, StoreBanner } from '../assets';

// Lazy load heavier components
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

const LazyDonationCallToAction = lazy(() =>
  import('../components/util/DonationSupport').then(module => ({
    default: module.DonationCallToAction,
  }))
);

// Skeleton loaders
const NewsletterSkeleton = () => (
  <div className="h-40 bg-gray-200 animate-pulse rounded-xl my-8" />
);

const CartSkeleton = () => (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg w-full max-w-md h-96 animate-pulse" />
  </div>
);

const DonationSkeleton = () => (
  <div className="h-60 bg-gray-200 animate-pulse rounded-xl my-8" />
);

// Optimized Image Component
const OptimizedImage = memo(
  ({
    src,
    alt,
    className,
    loading = 'lazy',
  }: {
    src: string;
    alt: string;
    className?: string;
    loading?: 'lazy' | 'eager';
  }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      style={{ contentVisibility: 'auto' }}
    />
  )
);

// Memoized Product Card Component
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
  }) => {
    const cardClassName = isFeatured
      ? 'rounded-xl sm:rounded-2xl shadow-lg flex flex-col transition-all duration-300'
      : 'rounded-lg sm:rounded-xl overflow-hidden shadow-md flex flex-col transition-all duration-300';

    return (
      <motion.article
        whileHover={{ y: -4 }}
        className={cardClassName}
        style={{ backgroundColor: colorScheme.surface }}
      >
        <div
          className={`relative group flex-grow ${isFeatured ? '' : 'overflow-hidden'}`}
        >
          <OptimizedImage
            src={product.image}
            alt={product.name}
            className={`w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105 ${
              isFeatured ? 'rounded-t-xl sm:rounded-t-2xl' : ''
            }`}
            loading={isFeatured ? 'eager' : 'lazy'}
          />
          {isFeatured && (
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4">
              <CustomButton
                variant="primary"
                onClick={() => onAddToCart(product)}
                size="sm"
                className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
              >
                Add to Cart
              </CustomButton>
            </div>
          )}
        </div>
        <div
          className={`flex flex-col justify-between flex-grow ${isFeatured ? 'p-3 sm:p-4' : 'p-3 sm:p-4'}`}
        >
          <BoldText
            fontSize={
              isFeatured
                ? 'clamp(1rem, 2vw, 1.125rem)'
                : 'clamp(0.875rem, 2vw, 1rem)'
            }
            style={{ color: colorScheme.text }}
            className="mb-1 sm:mb-2"
          >
            {product.name}
          </BoldText>
          <RegularText
            className={`line-clamp-2 mb-2 sm:mb-3 ${isFeatured ? 'text-xs sm:text-sm' : 'text-xs'}`}
            style={{ color: colorScheme.textSecondary }}
          >
            {product.description}
          </RegularText>
          <div className="mt-auto flex justify-between items-center">
            <BoldText
              fontSize={
                isFeatured
                  ? 'clamp(1rem, 2vw, 1.25rem)'
                  : 'clamp(0.875rem, 2vw, 1.125rem)'
              }
              style={{ color: colorScheme.accent }}
            >
              ${product.price}
            </BoldText>
            <LightText
              className={`px-2 py-1 rounded-full ${isFeatured ? 'text-xs' : 'text-xs'}`}
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
    );
  }
);

// Memoized Carousel Controls
const CarouselControls = memo(
  ({
    currentSlide,
    totalSlides,
    onPrev,
    onNext,
    colorScheme,
  }: {
    currentSlide: number;
    totalSlides: number;
    onPrev: () => void;
    onNext: () => void;
    colorScheme: any;
  }) => (
    <div className="flex space-x-2">
      <CustomButton
        variant={currentSlide === 0 ? 'disabled' : 'secondary'}
        onClick={onPrev}
        size="sm"
        className="w-8 h-8 sm:w-10 sm:h-10"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-xs sm:text-sm" />
      </CustomButton>
      <CustomButton
        variant={currentSlide === totalSlides - 1 ? 'disabled' : 'secondary'}
        onClick={onNext}
        size="sm"
        className="w-8 h-8 sm:w-10 sm:h-10"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-xs sm:text-sm" />
      </CustomButton>
    </div>
  )
);

// Memoized Section Header
const StoreHeader = memo(({ colorScheme }: { colorScheme: any }) => (
  <header className="mb-8 sm:mb-12 md:mb-16 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-opacity-10 mb-4 sm:mb-6"
      style={{ backgroundColor: `${colorScheme.primary}20` }}
    >
      <FontAwesomeIcon
        icon={faTag}
        style={{ color: colorScheme.primary }}
        className="text-sm sm:text-base"
      />
      <LightText
        style={{
          color: colorScheme.primary,
          fontSize: 'clamp(0.75rem, 3vw, 0.875rem)',
          letterSpacing: '0.05em',
        }}
        useThemeColor={false}
      >
        MINISTRY STORE
      </LightText>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <ExtraBoldText
        style={{
          color: colorScheme.primary,
          fontSize: 'clamp(1.75rem, 6vw, 3rem)',
          lineHeight: '1.1',
          marginBottom: '0.75rem',
        }}
        useThemeColor={false}
      >
        Support Ministry Through Products
      </ExtraBoldText>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="max-w-4xl mx-auto"
    >
      <SemiBoldText
        style={{
          color: colorScheme.accent,
          fontSize: 'clamp(1rem, 3vw, 1.375rem)',
          lineHeight: '1.5',
        }}
        useThemeColor={false}
      >
        Every purchase helps spread the gospel through music and outreach.
        Explore our collection of faith-inspired products.
      </SemiBoldText>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-16 sm:w-20 md:w-24 h-1 mx-auto mt-4 sm:mt-6 rounded-full"
      style={{ backgroundColor: colorScheme.accent }}
    />
  </header>
));

// Memoized Floating Cart
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
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 md:bottom-8 md:right-8 z-50 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <CustomButton
        variant="primary"
        size="circle"
        className="w-10 h-10 sm:w-12 sm:h-12 shadow-xl"
        icon={
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-sm sm:text-base"
          />
        }
        badge={cartItemsCount}
      />
    </motion.div>
  )
);

// Main Store Component
export const StoreData = memo(() => {
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

  // Memoized cart count
  const cartItemsCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  // Memoized filtered products
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

  // Memoized carousel data
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

  // Optimized event handlers
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

  const handleOpenCart = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const handleCloseCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogProduct(null);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category);
    setCurrentSlide(0); // Reset to first slide when category changes
  }, []);

  // SEO structured data
  const seoStructuredData = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Store',
      name: 'ClaudyGod Store',
      description: 'Official merchandise store for ClaudyGod Ministries',
      url: 'https://claudygod.org/store',
      seller: {
        '@type': 'Organization',
        name: 'ClaudyGod Ministries',
      },
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
        keywords="gospel merchandise, christian store, worship products, claudygod store, faith apparel, christian music"
        canonical="https://claudygod.org/store"
        image="https://claudygod.org/images/store-og.jpg"
        structuredData={seoStructuredData}
      />

      {/* Hero Section */}
      <LayoutTemplate
        backgroundImage={Back2}
        overlayColor="rgba(0,0,0,0.45)"
        backgroundPosition="center center"
        className="h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-[100vh] min-h-[500px]"
        title={''}
      >
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center text-center w-full h-full px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            <ExtraBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2rem, 8vw, 4.5rem)',
                lineHeight: '1.1',
                textShadow: '0 4px 12px rgba(0,0,0,0.8)',
                marginBottom: '0.5rem',
              }}
              useThemeColor={false}
            >
              ClaudyGod Store
            </ExtraBoldText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mb-4 sm:mb-6 md:mb-8 mx-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <SemiBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.125rem, 4vw, 1.75rem)',
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                lineHeight: '1.4',
              }}
              useThemeColor={false}
            >
              Shop official ClaudyGod merchandise. Uplifting apparel, music
              albums, and faith-inspired products.
            </SemiBoldText>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-5 h-8 border-2 border-white rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-2 bg-white rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </LayoutTemplate>

      {/* Store Content */}
      <article className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <StoreHeader colorScheme={colorScheme} />

        {/* Category Filter */}
        <section className="mb-8 sm:mb-12">
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

        {/* Featured Products (Carousel) */}
        <section className="mb-12 sm:mb-16 md:mb-20">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6 sm:mb-8"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: colorScheme.primary }}
                className="text-sm sm:text-base"
              />
              <BoldText
                fontSize="clamp(1.5rem, 4vw, 1.75rem)"
                style={{ color: colorScheme.text }}
              >
                Featured Products
              </BoldText>
            </div>
            <CarouselControls
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              onPrev={handlePrevSlide}
              onNext={handleNextSlide}
              colorScheme={colorScheme}
            />
          </motion.header>

          <motion.div
            key={currentSlide}
            initial={{
              opacity: 0,
              x: slideDirection === 'right' ? 100 : -100,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
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

        {/* All Products (Grid) */}
        <section className="mb-12 sm:mb-16 md:mb-20">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 sm:mb-8"
          >
            <BoldText
              fontSize="clamp(1.5rem, 4vw, 1.75rem)"
              style={{ color: colorScheme.text }}
              className="mb-2"
            >
              All Products
            </BoldText>
            <RegularText
              style={{ color: colorScheme.textSecondary }}
              className="text-sm sm:text-base"
            >
              Explore our full collection
            </RegularText>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {filteredProducts.map(product => (
              <ProductCard
                key={`all-${product.id}`}
                product={product}
                onAddToCart={handleAddToCart}
                colorScheme={colorScheme}
                isFeatured={false}
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

      {/* Donation Section */}
      <section className="my-8 sm:my-12 md:my-16">
        <Suspense fallback={<DonationSkeleton />}>
          <LazyDonationCallToAction
            title="Partner with Our Ministry"
            subtitle="Your Support Makes a Difference"
            description="Every purchase helps us spread the gospel through music and outreach. Your support enables us to continue our ministry work and reach more souls."
            goFundMeUrl="https://gofundme.com/your-campaign"
            donateUrl="/donate"
          />
        </Suspense>
      </section>

      {/* Newsletter Section */}
      <section
        className="py-8 sm:py-12 md:py-16"
        style={{
          background: `linear-gradient(135deg, ${colorScheme.gray[50]}, ${colorScheme.gray[100]})`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
