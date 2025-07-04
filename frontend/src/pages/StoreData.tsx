/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  faShoppingBag, 
  faShoppingCart,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';// Added faShoppingCart
import {NewsletterForm} from '../components/util/Newsletter';
import { Cart } from '../components/store/Cart';
import { SEO } from '../components/util/SEO';
import { useCartStore } from '../contexts/Cartcontext';
import { StoreHero } from '../components/store/StoreHero';
import { CategoryFilter } from '../components/store/CategoryFilter';
// import { ProductCarousel } from '../components/store/ProductCarousel';
// import { ProductGrid } from '../components/store/ProductGrid';
import { products, categories } from '../components/data/storeData';
import { AddToCartDialog } from '../components/store/AddToCartDialog';
import { Product } from '@/components/types/storeTypes';

export const StoreData = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dialogProduct, setDialogProduct] = useState<Product | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { items, addItem } = useCartStore(); // Added items from cart context

  // Calculate cart items count
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

 useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleProducts(1);
      else if (window.innerWidth < 1024) setVisibleProducts(2);
      else setVisibleProducts(4);
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(filteredProducts.length / 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(filteredProducts.length / 2)) % Math.ceil(filteredProducts.length / 2));
  };

  return (
   <div className="bg-gradient-to-b from-purple-50 to-white min-h-screen">
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
         <motion.button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-700 to-purple-900 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/40 z-50 flex items-center justify-center ring-2 ring-white/50"
        aria-label="Open cart"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FontAwesomeIcon icon={faShoppingCart} className="h-6 w-6" />
        {cartItemsCount > 0 && (
          <motion.span 
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={cartItemsCount}
          >
            {cartItemsCount}
          </motion.span>
        )}
      </motion.button>

      <StoreHero />

         <motion.section 
        className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-16 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="pattern-cross-dots-md text-purple-300 w-full h-full" />
        </div>
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl roboto-condensed font-bold tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            ClaudyGod Gospel Store
          </motion.h1>
          <motion.div 
            className="w-24 h-1.5 bg-gradient-to-r from-accent-gold to-yellow-300 mx-auto my-6 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />
          <motion.p 
            className="max-w-3xl mx-auto text-lg md:text-xl raleway-medium text-purple-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Shop our curated collection of faith-inspired products designed to inspire and uplift your spirit every day.
          </motion.p>
        </div>
      </motion.section>

    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="py-8 bg-white sticky top-0 z-30 shadow-sm"
      >
        <CategoryFilter 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
      </motion.div>

   {/* Product Carousel */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Featured Products
            </h2>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-purple-900 hover:bg-purple-50 transition-colors"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-purple-900 hover:bg-purple-50 transition-colors"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </motion.button>
            </div>
          </div>
          
          <div 
            ref={carouselRef}
            className={`overflow-x-auto pb-8 scrollbar-hide ${isScrolling ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="flex space-x-6 min-w-max">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="w-72 flex-shrink-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="relative overflow-hidden group">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(product)}
                        className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:from-purple-700 hover:to-purple-900 transition-all"
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                      <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xl font-bold text-purple-900">${product.price}</span>
                        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            All Products
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden group">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(product)}
                    className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:from-purple-700 hover:to-purple-900 transition-all"
                  >
                    Add to Cart
                  </motion.button>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xl font-bold text-purple-900">${product.price}</span>
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       <motion.div 
        className="py-16 bg-gradient-to-r from-purple-900 to-purple-700 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Checkout?
          </h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/cart"
              className="inline-block bg-gradient-to-r from-accent-gold to-yellow-400 text-purple-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
              Proceed to Checkout
            </Link>
          </motion.div>
          <p className="text-purple-200 mt-6">
            {cartItemsCount} items in your cart
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-16 bg-white"
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