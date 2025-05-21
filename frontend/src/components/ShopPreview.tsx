import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Shop1, Shop2, Shop3, Shop4 } from '../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ProductProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const products: ProductProps[] = [
  { id: "1", name: "ClaudyGod T-Shirt", price: 30, imageUrl: Shop3 },
  { id: "2", name: "ClaudyGod Mugs", price: 15, imageUrl: Shop2 },
  { id: "3", name: "ClaudyGod Y-Shirt", price: 25, imageUrl: Shop4 },
  { id: "4", name: "ClaudyGod Mugs", price: 15, imageUrl: Shop1 }
];

const ProductCard: React.FC<ProductProps> = ({ id, name, price, imageUrl }) => {
  return (
    <motion.div 
      className="group px-2" // Added horizontal padding for mobile spacing
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
    >
      <Link to={`/shop/${id}`} className="block">
        <div className="flex flex-col items-center justify-center w-full max-w-[280px] mx-auto">
          <div className="relative w-full rounded-lg overflow-hidden bg-gray-100 aspect-square shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
          <div className="w-full mt-2 px-1 text-center">
            <h3 className="text-base roboto-flex text-gray-800 mb-0.5">{name}</h3>
            <p className="text-sm text-primary-dark roboto-condensed">${price}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const CustomArrow = ({ onClick, direction }: { onClick?: () => void; direction: 'left' | 'right' }) => (
  <button
    onClick={onClick}
    className={`hidden md:block absolute top-1/2 -translate-y-1/2 z-10 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white transition-colors ${
      direction === 'left' ? 'left-4' : 'right-4'
    }`}
  >
    <FontAwesomeIcon 
      icon={direction === 'left' ? faChevronLeft : faChevronRight} 
      className="text-gray-800 text-lg"
    />
  </button>
);

export const ShopPreview: React.FC = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          arrows: true,
          prevArrow: <CustomArrow direction="left" />,
          nextArrow: <CustomArrow direction="right" />
        }
      }
    ]
  };

  return (
    <section className="section bg-gray-50 py-12 md:py-20 px-4 sm:px-6">
      <div className="w-full max-w-7xl mx-auto">
        <motion.div 
          className="text-left mb-12 md:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        ><h2 className="roboto-condensed md:text-xl lg:text-5xl xl:text-5xl mb-4 md:mt-12 text-gray-900">
            SHOP EXCLUSIVE CLAUDYGOD STORE
          </h2>
          <div className=" h-2 sm:w-20 md:w-10 lg:w-30 bg-purple-900 mb-30 md:mb-5" />
        </motion.div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Slider {...sliderSettings}>
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </Slider>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
         <Link
  to="/store" // Changed from '/shop' to '/store'
  className="inline-flex items-center bg-purple-900 text-white px-6 py-3 rounded-lg text-base md:text-lg font-medium hover:bg-purple-800 transition-colors duration-300 shadow-lg hover:shadow-xl gap-3"
>
  <FontAwesomeIcon icon={faShoppingBag} className="w-5 h-5" />
  <span className='roboto-condensed'>Shop More</span>
</Link>
        </motion.div>
      </div>
    </section>
  );
};