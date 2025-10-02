/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from 'react';
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
import { NewsletterForm } from '../components/util/Newsletter';
import { Cart } from '../components/store/Cart';
import { SEO } from '../components/util/SEO';
import { useCartStore } from '../contexts/Cartcontext';
import { CategoryFilter } from '../components/store/CategoryFilter';
import { products } from '../components/data/storeData';
import { AddToCartDialog } from '../components/store/AddToCartDialog';
import { Product } from '@/components/types/storeTypes';
import { DonationCallToAction } from '../components/util/DonationSupport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faShoppingCart,
  faStar,
  faTag,
} from '@fortawesome/free-solid-svg-icons';
import { LayoutTemplate } from '../components/util/hero';

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
        description="Shop official ClaudyGod merchandise. Uplifting apparel, music albums, and faith-inspired products that support gospel ministry."
        keywords="gospel merchandise, christian store, worship products, claudygod store, faith apparel, christian music"
        canonical="https://claudygod.org/store"
        image="https://claudygod.org/images/store-og.jpg"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Store',
          name: 'ClaudyGod Store',
          description: 'Official merchandise store for ClaudyGod Ministries',
          url: 'https://claudygod.org/store',
          seller: {
            '@type': 'Organization',
            name: 'ClaudyGod Ministries',
          },
        }}
      />

      {/* Hero Section */}
      <LayoutTemplate
        backgroundImage="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        overlayColor="rgba(0,0,0,0.55)"
        backgroundPosition="center center"
        className="h-[100vh] md:h-[100vh]"
        title={''}
      >
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-6"
          >
            <ExtraBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: '1.1',
                textShadow: '0 4px 8px rgba(0,0,0,0.6)',
                marginBottom: '1rem',
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
            className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mb-8 mx-auto"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-3xl"
          >
            <SemiBoldText
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                lineHeight: '1.4',
              }}
              useThemeColor={false}
            >
              Shop official ClaudyGod merchandise. Uplifting apparel, music
              albums, and faith-inspired products.
            </SemiBoldText>
          </motion.div>
        </motion.div>
      </LayoutTemplate>

      {/* Store Content */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Section Header */}
        <header className="mb-12 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-opacity-10 mb-6"
            style={{ backgroundColor: `${colorScheme.primary}20` }}
          >
            <FontAwesomeIcon
              icon={faTag}
              style={{ color: colorScheme.primary }}
            />
            <LightText
              style={{
                color: colorScheme.primary,
                fontSize: '0.875rem',
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
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ExtraBoldText
              style={{
                color: colorScheme.primary,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: '1.2',
                marginBottom: '1rem',
              }}
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
            className="max-w-4xl mx-auto"
          >
            <SemiBoldText
              style={{
                color: colorScheme.accent,
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                lineHeight: '1.6',
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
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-24 h-1 mx-auto mt-6 rounded-full"
            style={{ backgroundColor: colorScheme.accent }}
          />
        </header>

        {/* Category Filter */}
        <section className="mb-12">
          <CategoryFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={[
              { id: 'all', name: 'All' },
              { id: 'music', name: 'Music' },
              { id: 'apparel', name: 'Apparel' },
              { id: 'books', name: 'Books' },
            ]}
          />
        </section>

        {/* Featured Products (Carousel) */}
        <section className="mb-20">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center mb-8"
          >
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: colorScheme.primary }}
              />
              <BoldText fontSize="1.75rem" style={{ color: colorScheme.text }}>
                Featured Products
              </BoldText>
            </div>
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
          </motion.header>

          <motion.div
            key={currentSlide}
            initial={{
              opacity: 0,
              x: slideDirection === 'right' ? 100 : -100,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
                  <BoldText
                    fontSize="1.125rem"
                    style={{ color: colorScheme.text }}
                  >
                    {product.name}
                  </BoldText>
                  <RegularText
                    className="text-sm line-clamp-2"
                    style={{ color: colorScheme.textSecondary }}
                  >
                    {product.description}
                  </RegularText>
                  <div className="mt-3 flex justify-between items-center">
                    <BoldText
                      fontSize="1.25rem"
                      style={{ color: colorScheme.accent }}
                    >
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
            ))}
          </motion.div>
        </section>

        {/* All Products (Grid) */}
        <section className="mb-20">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <BoldText fontSize="1.75rem" style={{ color: colorScheme.text }}>
              All Products
            </BoldText>
            <RegularText style={{ color: colorScheme.textSecondary }}>
              Explore our full collection
            </RegularText>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
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
                  <BoldText style={{ color: colorScheme.text }}>
                    {product.name}
                  </BoldText>
                  <RegularText
                    className="text-sm line-clamp-2"
                    style={{ color: colorScheme.textSecondary }}
                  >
                    {product.description}
                  </RegularText>
                  <div className="mt-3 flex justify-between items-center">
                    <BoldText
                      fontSize="1.25rem"
                      style={{ color: colorScheme.accent }}
                    >
                      ${product.price}
                    </BoldText>
                    <LightText
                      className="text-xs"
                      style={{ color: colorScheme.textSecondary }}
                    >
                      {product.category}
                    </LightText>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </article>

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

      {/* Donation Section */}
      <section className="my-12 md:my-16">
        <DonationCallToAction
          title="Partner with Our Ministry"
          subtitle="Your Support Makes a Difference"
          description="Every purchase helps us spread the gospel through music and outreach. Your support enables us to continue our ministry work and reach more souls."
          goFundMeUrl="https://gofundme.com/your-campaign"
          donateUrl="/donate"
        />
      </section>

      {/* Newsletter Section */}
      <section
        className="py-12 md:py-16"
        style={{
          background: `linear-gradient(135deg, ${colorScheme.gray[50]}, ${colorScheme.gray[100]})`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterForm />
        </div>
      </section>

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
