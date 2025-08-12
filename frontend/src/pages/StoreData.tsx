/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

import { BoldText, SemiBoldText, RegularText, LightText } from '../components/ui/fonts/typography';
import CustomButton from '../components/ui/fonts/buttons/CustomButton';
import { NewsletterForm } from '../components/util/Newsletter';
import { Cart } from '../components/store/Cart';
import { SEO } from '../components/util/SEO';
import { useCartStore } from '../contexts/Cartcontext';
import { StoreHero } from '../components/store/StoreHero';
import { CategoryFilter } from '../components/store/CategoryFilter';
import { products, categories } from '../components/data/storeData';
import { AddToCartDialog } from '../components/store/AddToCartDialog';
import { Product } from '@/components/types/storeTypes';
import { DonationCallToAction } from '../components/util/DonationSupport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faShoppingBag, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export const StoreData = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dialogProduct, setDialogProduct] = useState<Product | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left'|'right'>('right');
  const [slideCount, setSlideCount] = useState(4);
  const { items, addItem } = useCartStore();
  const { colorScheme } = useTheme();

  // Calculate cart items count
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  // Calculate responsive slide count
  const calculateSlideCount = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 4;
  };

  useEffect(() => {
    const handleResize = () => {
      setSlideCount(calculateSlideCount());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll detection for cursor change
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current && Math.abs(carouselRef.current.scrollLeft) > 5) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    setDialogProduct(product);
  };

  const totalSlides = Math.ceil(filteredProducts.length / slideCount);
  const startIndex = currentSlide * slideCount;
  const endIndex = startIndex + slideCount;
  const visibleProducts = filteredProducts.slice(startIndex, endIndex);

  const nextSlide = () => {
    setSlideDirection('right');
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setSlideDirection('left');
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div style={{ backgroundColor: colorScheme.background }} className="min-h-screen">
      <SEO
        title="ClaudyGod Store - Gospel Merchandise & Products"
        description="Shop official ClaudyGod merchandise. Uplifting apparel, music albums, and faith-inspired products."
        keywords="gospel merchandise, christian store, worship products"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Store",
          "name": "ClaudyGod Gospel Store",
          "url": "https://claudygod.org/store",
          "description": "Official merchandise store for ClaudyGod Ministries",
          "openingHours": "Mo-Su",
          "telephone": "+1 (385) 219‑6632",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "San Ramon, California",
            "addressLocality": "California",
            "postalCode": "90001",
            "addressCountry": "US"
          }
        }}
      />
      
      {/* Floating Cart Button */}
{cartItemsCount > 0 && (
  <motion.div
    onClick={() => setIsCartOpen(true)}
    className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg group"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {/* Tooltip */}
    <span className="absolute -top-8 right-1/2 translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
      {cartItemsCount} item{cartItemsCount > 1 ? "s" : ""} in cart
    </span>

    <CustomButton
      variant="primary"
      size="circle"
      className="w-10 h-10 p-5 rounded-full flex items-center justify-center shadow-2xl ring-2 ring-white/50"
      icon={<FontAwesomeIcon icon={faShoppingCart} className="h-6 w-6" />}
      badge={cartItemsCount}
    />
  </motion.div>
)}





      <StoreHero />

      <motion.section 
        className="py-16 relative overflow-hidden"
        style={{ background: colorScheme.primaryGradient }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundColor: colorScheme.text }} />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <BoldText as="h1" fontSize="2.5rem" className="tracking-tight" color={colorScheme.text}>
            ClaudyGod Gospel Store
          </BoldText>
          <motion.div 
            className="h-1.5 rounded-full mx-auto my-6"
            style={{ background: `linear-gradient(to right, ${colorScheme.accent}, gold)` }}
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />
          <RegularText className="max-w-3xl mx-auto" fontSize="1.125rem" color={colorScheme.textSecondary}>
            Shop our curated collection of faith-inspired products designed to inspire and uplift your spirit every day.
          </RegularText>
        </div>
      </motion.section>
<CategoryFilter 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory} categories={[]}        />
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="py-8 sticky top-0 z-30 shadow-sm"
        style={{ backgroundColor: colorScheme.success}}
      >
        
      </motion.div> */}

      {/* Featured Products Section - Responsive Carousel */}
      <section className="py-12 px-4 relative" style={{ backgroundColor: colorScheme.gray[100] }}>
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <BoldText as="h2" fontSize="1.75rem" color={colorScheme.background}>
              Featured Products
            </BoldText>
            <div className="flex space-x-2">
            <CustomButton
  variant={currentSlide === 0 ? "disabled" : "secondary"}
  size="sm"
  onClick={prevSlide}
  disabled={currentSlide === 0}
>
  <FontAwesomeIcon icon={faChevronLeft} />
</CustomButton>

<CustomButton
  variant={currentSlide === totalSlides - 1 ? "disabled" : "secondary"}
  size="sm"
  onClick={nextSlide}
  disabled={currentSlide === totalSlides - 1}
>
  <FontAwesomeIcon icon={faChevronRight} />
</CustomButton>
            </div>
          </div>
          
          <div className="relative overflow-hidden h-[420px] md:h-[450px]">
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={currentSlide}
                custom={slideDirection}
                initial={{ 
                  opacity: 0, 
                  x: slideDirection === 'right' ? 100 : -100 
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.5, ease: "easeInOut" } 
                }}
                exit={{ 
                  opacity: 0, 
                  x: slideDirection === 'right' ? -100 : 100,
                  transition: { duration: 0.3, ease: "easeInOut" } 
                }}
                className="absolute inset-0"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {visibleProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      className="rounded-2xl overflow-hidden shadow-lg border h-full flex flex-col"
                      style={{
                        backgroundColor: colorScheme.surface,
                        borderColor: colorScheme.border
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ y: -10 }}
                    >
                      <div className="relative overflow-hidden group flex-grow">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-56 object-cover 
                          transition-transform duration-500
                           group-hover:scale-110"
                        />
                        <div className="absolute bottom-4 right-4">
                          <CustomButton
                            variant="outline"
        
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </CustomButton>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col justify-between flex-grow">
                        <div>
                          <BoldText as="h3" fontSize="1.125rem" color={colorScheme.text}>
                            {product.name}
                          </BoldText>
                          <RegularText className="mt-2 line-clamp-2" color={colorScheme.textSecondary}>
                            {product.description}
                          </RegularText>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <BoldText fontSize="1.25rem" color={colorScheme.accent}>
                            ${product.price}
                          </BoldText>
                          <LightText
                           className="text-xs px-2 py-1 rounded-full"
                           fontSize='0.7rem'
                          style={{
                              backgroundColor: `${colorScheme.primary}70`,
                              color: colorScheme.gray[300]
                            }}>
                {product.category}
                          </LightText>
                          {/* <span 
                            className="text-xs px-2 py-1 rounded-full"
                            style={{
                              backgroundColor: `${colorScheme.primary}20`,
                              color: colorScheme.primary
                            }}
                          >
                          
                          </span> */}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setSlideDirection(index > currentSlide ? 'right' : 'left');
                  setCurrentSlide(index);
                }}
                className={`mx-1 w-3 h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'w-6' 
                    : 'bg-gray-300'
                }`}
                style={{
                  backgroundColor: index === currentSlide ? colorScheme.primary : colorScheme.borderLight
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12" style={{ backgroundColor: colorScheme.backgroundSecondary }}>
        <div className="container mx-auto px-4">
          <BoldText as="h2" fontSize="1.75rem" className="mb-1 text-center" color={colorScheme.text}>
            All Products
          </BoldText>
          <LightText as="h2" fontSize="1.25rem" className="mb-15 text-center" color={colorScheme.text}>
           Explore our full collection, all in one place.
          </LightText>
        
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl overflow-hidden shadow-md border"
                style={{
                  backgroundColor: `${colorScheme.primary}70`,
                  borderColor: colorScheme.border
                }}
              >
                <div className="relative overflow-hidden group">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 right-4">
                    <CustomButton
                      variant="primary"
                //        style={{
                //   backgroundColor: `${colorScheme.accent}70`,
                //   borderColor: colorScheme.border
                // }}
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </CustomButton>
                  </div>
                </div>
                <div className="p-5">
                  <BoldText as="h3" fontSize="1.125rem" color={colorScheme.text}>
                    {product.name}
                  </BoldText>
                  <RegularText className="mt-2 line-clamp-2" color={colorScheme.textSecondary}>
                    {product.description}
                  </RegularText>
                  <div className="mt-4 flex justify-between items-center">
                    <BoldText fontSize="1.25rem" color={colorScheme.accent}>
                      ${product.price}
                    </BoldText>
                    <LightText
                           className="text-xs px-2 py-1 rounded-full"
                           fontSize='0.7rem'
                          style={{
                              backgroundColor: `${colorScheme.primary}70`,
                              color: colorScheme.gray[300]
                            }}>
                {product.category}
                          </LightText>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <motion.div 
        className="py-16 text-center"
        style={{ background: colorScheme.primaryGradient }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="container mx-auto px-4">
          <BoldText as="h2" fontSize="2.5rem" 
          className="mb-6" color={colorScheme.accent}>
            Ready to Checkout?
          </BoldText>
          <Link to="/cart">
           <CustomButton
  variant="accent"
  size="lg"
  icon={<FontAwesomeIcon icon={faShoppingBag} />}
  className="shadow-lg hover:shadow-xl"
>
  Proceed to Checkout
</CustomButton>

          </Link>
          <RegularText className="mt-6" color={colorScheme.textSecondary}>
            {cartItemsCount} items in your cart
          </RegularText>
        </div>
      </motion.div>
<div className="py-16"
        style={{ backgroundColor: colorScheme.text}}>
    <DonationCallToAction
        title="Partner with Our Ministry"
        subtitle="Your Support Makes a Difference"
        description="Join us in spreading the gospel through music. Your generous donations help fund worship events, album productions, and global outreach efforts. Every contribution directly impacts lives and advances God's kingdom."
        goFundMeUrl="https://gofundme.com/your-campaign"
        donateUrl="/donate"
      />

</div>
    

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16"
        style={{ backgroundColor: colorScheme.surface }}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <NewsletterForm />
        </div>
      </motion.div>

      {/* Cart Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <Cart isModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        )}
      </AnimatePresence>

      {/* Add to Cart Dialog */}
      <AnimatePresence>
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