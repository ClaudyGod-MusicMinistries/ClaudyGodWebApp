import React, { useState } from 'react';
import { Herosection } from '../components/Herosection';
import { StoreBanner } from '../assets/'
import { NewsletterForm } from '../components/Newsletter';
import { product1, product2, product3, product4, Aud1, Aud2} from '../assets/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

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
  
  const products: ProductType[] = [
    {
      id: 1,
      name: 'ClaudyGod Plain Mug',
      image: product1,
      price: 30,
      category: 'accessories',
      description: 'Comfortable cotton t-shirt featuring the ClaudyGod logo.'
    },
    {
      id: 2,
      name: 'ClaudyGod Classic T-Shirt',
      image: product3,
      price: 30,
      category: 'clothing',
      description: 'Comfortable cotton t-shirt featuring the ClaudyGod logo.'
    },    {
      id: 3,
      name: 'ClaudyGod Premium Mug',
      image: product2,
      price: 30,
      category: 'accessories',
      description: 'Comfortable cotton t-shirt featuring the ClaudyGod logo.'
    },
    {
      id: 4,
      name: 'ClaudyGod Premium T-Shirt',
      image: product4,
      price: 30,
      category: 'clothing',
      description: 'Comfortable cotton t-shirt featuring the ClaudyGod logo.'
    },
    {
      id: 5,
      name: 'ClaudyGod Music',
      image: Aud2,
      price: 5,
      category: 'music',
      description: 'Pay. Stream. Download'
    },
    {
      id: 6,
      name: 'ClaudyGod Premium Mug',
      image: product2,
      price: 30,
      category: 'accessories',
      description: 'Get Your Premium Mug from our Store'
    },
    {
      id: 7,
      name: 'Get our Latest Albums',
      image: Aud1,
      price: 30,
      category: 'music',
      description: 'Pay. Stream. Stay Blessed.'
    },
    {
      id: 8,
      name: 'ClaudyGod Premium T-Shirt',
      image: product4,
      price: 30,
      category: 'clothing',
      description: 'Comfortable cotton t-shirt featuring the ClaudyGod logo.'
    }

    // ... keep all other product objects the same
  ];

  const categories = ['all', 'clothing', 'accessories', 'music'];
  
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="bg-white">
      <div className="relative">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Herosection 
          title="ClaudyGod Music & Ministries / Store"
          backgroundImage={StoreBanner}
          className="relative z-0"
        />
      </div>

      <div>
        <div className="bg-purple-900 text-white py-16">
          <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl roboto-condensed text-50 mb-4 text-center">Store</h1>
            <div className="w-20 h-1 bg-accent-gold mx-auto mb-6"></div>
            <p className="text-center max-w-2xl mx-auto slider-font text-30">
              Shop exclusive ClaudyGod merchandise and support the ministry.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 py-16">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-md capitalize transition-colors robotoMedium cursor-pointer ${
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
                <div className="card overflow-hidden h-full flex flex-col border border-purple-900 rounded-lg shadow-sm">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg text-purple-900 mb-2 roboto-condensed">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow robotoMedium">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-lg robotoMedium text-15">${product.price}</p>
                      <button className="bg-purple-900 hover:bg-purple-800 text-white px-4 py-2 rounded-md text-sm slider-font transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-15">
          <button className="bg-purple-900 w-70 h-15 text-white px-6 py-3 rounded-full cursor-pointer roboto-condensed shadow-lg transition transform duration-300 hover:scale-105 hover:bg-purple-900 flex items-center justify-center gap-2">
  <FontAwesomeIcon icon={faShoppingBag} className='text-shadow-gray-700 text-20'  />
  Shop More
</button>

</div>
        </div>
      </div>
      <hr className="my-8 border-purple-900" />
      <NewsletterForm />
    </div>

      
  );
};
