// src/components/store/Store.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import NewsletterForm from '../components/Utils/Newsletter';
import { CartHandler } from '../components/store/Cart';

import { useCartStore } from '../Context/Cartcontext';
import { StoreHero } from '../components/store/StoreHero';
import { CategoryFilter } from '../components/store/CategoryFilter';
import { ProductCarousel } from '../components/store/ProductCarousel';
import { ProductGrid } from '../components/store/ProductGrid';
import { products,categories } from '../components/data/storeData';
 import { AddToCartDialog } from '../components/store/AddToCartDialog';
import { Product } from '@/components/types/storeTypes';

export const StoreData = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dialogProduct, setDialogProduct] = useState<Product | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addItem } = useCartStore();

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  useEffect(() => {
    setCurrentSlide(0);
  }, [activeCategory]);

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
    <div className="bg-white">
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
          "telephone": "+1-XXX-XXX-XXXX",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Faith Avenue",
            "addressLocality": "California",
            "postalCode": "90001",
            "addressCountry": "US"
          }
        }}
      />
      <StoreHero />

      <section className="bg-purple-900 text-white py-16 relative">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl roboto-condensed"> ClaudyGod Gospel Store</h1>
          <div className="w-20 h-1 bg-accent-gold mx-auto my-6" />
          <p className="max-w-2xl mx-auto text-lg md:text-xl raleway-medium">
       Shop our curated collection of faith-inspired products, including uplifting mugs, apparel,
        and accessories designed to inspire and uplift your spirit every day.
          </p>
        </div>
      </section>

      <CategoryFilter 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />

      <ProductCarousel 
        products={filteredProducts}
        currentSlide={currentSlide}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        handleAddToCart={handleAddToCart}
      />

      <ProductGrid 
        products={filteredProducts}
        handleAddToCart={handleAddToCart}
      />

      <div className="flex justify-center mt-8 mb-16">
        <Link
          to="/cart"
          className="bg-purple-900 hover:bg-purple-800 text-white px-6 py-3 rounded-full font-roboto-condensed shadow-lg transition transform duration-300 hover:scale-105 flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faShoppingBag} />
          Proceed to Checkout
        </Link>
      </div>

      <hr className="my-8 border-purple-900" />
      <NewsletterForm />

      <CartHandler isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <AddToCartDialog 
        dialogProduct={dialogProduct} 
        setDialogProduct={setDialogProduct} 
      />
    </div>
  );
};