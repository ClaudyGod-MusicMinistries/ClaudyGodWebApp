import React, { useState } from 'react';
import { Herosection } from '../components/Herosection';
import { useCartStore } from '../Context/Cartcontext';
import StoreBanner from '../assets/StoreBanner.jpg'; // adjust the import to your actual banner file
import { NewsletterForm } from '../components/Newsletter';
import {
  product1,
  product2,
  product3,
  product4,
  Aud1,
  Aud2
} from '../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag , faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { CartHandler } from '../components/Cart';


/**
 * Product type definition
 */
 type ProductType = {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  description: string;
};

export const StoreData: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, addItem } = useCartStore();

  // Sample product list
  const products: ProductType[] = [
    {
      id: 1,
      name: 'ClaudyGod Plain Mug',
      image: product1,
      price: 30,
      category: 'accessories',
      description: 'High-quality plain mug featuring the ClaudyGod logo.'
    },
    {
      id: 2,
      name: 'ClaudyGod Classic T-Shirt',
      image: product3,
      price: 25,
      category: 'clothing',
      description: 'Comfortable cotton t-shirt featuring the ClaudyGod logo.'
    },
    {
      id: 3,
      name: 'ClaudyGod Premium Mug',
      image: product2,
      price: 35,
      category: 'accessories',
      description: 'Limited edition premium mug with embossed logo.'
    },
    {
      id: 4,
      name: 'ClaudyGod Premium T-Shirt',
      image: product4,
      price: 40,
      category: 'clothing',
      description: 'Premium fabric t-shirt with special design.'
    },
    {
      id: 5,
      name: 'ClaudyGod Music EP',
      image: Aud2,
      price: 5,
      category: 'music',
      description: 'Digital EP: Pay. Stream. Download.'
    },
    {
      id: 6,
      name: 'Get our Latest Album',
      image: Aud1,
      price: 10,
      category: 'music',
      description: 'Full album digital download.'
    }
    ,{
      id: 7,
      name: 'ClaudyGod Premium T-Shirt',
      image: product4,
      price: 40,
      category: 'clothing',
      description: 'Premium fabric t-shirt with special design.'
    },
    {
      id: 8,
      name: 'ClaudyGod Premium T-Shirt',
      image: product4,
      price: 40,
      category: 'clothing',
      description: 'Premium fabric t-shirt with special design.'
    },
  ];

  // Define categories for filtering
  const categories = ['all', 'clothing', 'accessories', 'music'];

  // Filter products based on selected category
  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Herosection
          title="ClaudyGod Music & Ministries / Store"
          backgroundImage={StoreBanner}
          className="relative z-0"
        />
      </div>

      {/* Introduction Banner */}
      <section className="bg-purple-900 h-50 text-white py-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-roboto-condensed ">
            Store
          </h1>
          <div className="w-20 h-1 bg-accent-gold mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-lg md:text-xl font-slider">
            Shop exclusive ClaudyGod merchandise and support the ministry.
          </p>
        </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-white text-purple-900 p-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 md:px-8 py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-md capitalize transition-colors font-roboto-medium cursor-pointer ${
                activeCategory === category
                  ? 'bg-purple-900 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="border border-purple-900 rounded-lg overflow-hidden shadow-sm h-full flex flex-col">
                <div className="h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg text-purple-900 mb-2 font-roboto-condensed">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow font-roboto-medium">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-lg font-roboto-medium">
                      ${product.price}
                    </p>
                    <button
                      onClick={() => addItem(product)}
                      className="bg-purple-900 hover:bg-purple-800 text-white px-4 py-2 rounded-md text-sm transition-colors flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faShoppingBag} size="lg" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
<CartHandler isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        {/* Shop More Button */}
        <div className="flex justify-center mt-12">
          <Link
            to="/store"
            className="bg-purple-900 hover:bg-purple-800 text-white px-6 py-3 rounded-full font-roboto-condensed shadow-lg transition transform duration-300 hover:scale-105 flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faShoppingBag} />
            Shop More
          </Link>
        </div>
      </section>

      <hr className="my-8 border-purple-900" />
      <NewsletterForm />
    </div>
  );
};
