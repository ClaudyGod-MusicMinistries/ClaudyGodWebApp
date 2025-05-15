import React from 'react';
import { Link } from 'react-router-dom';
// import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Shop1 , Shop2 , Shop3 , Shop4} from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

interface ProductProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const products: ProductProps[] = [
  {
    id: "1",
    name: "ClaudyGod T-Shirt",
    price: 30,
    imageUrl: Shop3
  },
  {
    id: "2",
    name: "ClaudyGod Mugs",
    price: 15,
    imageUrl: Shop2
  },
  {
    id: "3",
    name: "ClaudyGod Y-Shirt",
    price: 25,
    imageUrl: Shop4
  },
  {
    id: "4",
    name: "ClaudyGod Mugs",
    price: 15,
    imageUrl: Shop1
  }
];

const ProductCard: React.FC<ProductProps> = ({ id, name, price, imageUrl }) => {
  return (
    <motion.div 
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
    >
      <Link to={`/shop/${id}`} className="block">
      <div className="flex flex-col items-center justify-center w-full max-w-[280px] mx-auto"> {/* Reduced max-width */}
  {/* Image Container */}
  <div className="relative w-full rounded-lg overflow-hidden bg-gray-100 aspect-square shadow-lg hover:shadow-xl transition-shadow duration-300">
    <img 
      src={imageUrl} 
      alt={name} 
      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" // Shortened duration
    />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
  </div>

  {/* Text Content */}
  <div className="w-full mt-2 px-1 text-center"> {/* Reduced margins */}
    <h3 className="text-base font-medium text-gray-800 mb-0.5">{name}</h3> {/* Smaller text */}
    <p className="text-sm text-primary-dark font-semibold">${price}</p> {/* Smaller text */}
  </div>
</div>
      </Link>
    </motion.div>
  );
};

export const ShopPreview: React.FC = () => {
  return (
    <section className="section bg-gray-50 py-20 md:py-28 px-4">
      <div className="w-full">
        <motion.div 
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
        <motion.div 
  className="text-left mb-2 md:mb-1"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
<h2 className=" roboto-condensed text-45 mb-6 text-gray-900">
  SHOP EXCLUSIVE CLAUDYGOD STORE
</h2>
  <div 
    className="h-[10px] w-[125px] bg-purple-900 "
    aria-hidden="true"
  ></div>
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="w-32 h-1 bg-primary"
  />
</motion.div>
<motion.div
  initial={{ scaleX: 0 }}
  whileInView={{ scaleX: 1 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="w-32 h-1 bg-primary mx-auto mb-12"
/>

<div className="grid grid-cols-4 gap-[40px] w-full max-w-5xl mx-auto px-4">
  {products.map((product) => (
    <motion.div 
      key={product.id}
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Container */}
      <div className="w-[200px] h-[200px] rounded-lg overflow-hidden bg-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Text Content */}
      <div className="w-full mt-4 text-center">
        <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
        <p className="text-primary-dark font-semibold mt-2">${product.price}</p>
      </div>
    </motion.div>
  ))}

        
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
       
        <Link
  to="/shop"
  className="inline-flex items-center bg-purple-900 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-primary-dark transition-colors duration-300 shadow-lg hover:shadow-xl gap-3"
>
  <FontAwesomeIcon icon={faShoppingBag} className="w-5 h-5" />
  <span>Shop More</span>
</Link>
        </motion.div>
      </div>
      </motion.div>
      </div>
    </section>
  );
};

