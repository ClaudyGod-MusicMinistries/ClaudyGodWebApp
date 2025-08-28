import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Shop1, Shop2, Shop3, Shop4 } from '../../assets/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faChevronLeft, faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons';
import { 
  SemiBoldText,
  BoldText,
  LightText,
  ExtraBoldText,
 
} from '../ui/fonts/typography';
import { useTheme } from '../../contexts/ThemeContext';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ProductProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  Desc: string;
  rating: number;
}

const products: ProductProps[] = [
  { id: '1', name: 'ClaudyGod Premium T-Shirt', price: 25, Desc: 'Premium Cotton', imageUrl: Shop3, rating: 4.8 },
  { id: '2', name: 'Savior is Born, Jesus his Here Mug', price: 5, Desc: 'Ceramic Design', imageUrl: Shop2, rating: 4.9 },
  { id: '3', name: 'ClaudyGod Premium T-Shirt', price: 30, Desc: 'Limited Edition', imageUrl: Shop4, rating: 4.7 },
  { id: '4', name: 'ClaudyGod Exclusive Mug', price: 5, Desc: 'Double-Walled', imageUrl: Shop1, rating: 5.0 },
];

const ProductCard: React.FC<ProductProps> = ({ id, name, price, imageUrl, Desc, rating }) => {
  const { colorScheme } = useTheme();

  return (
    <motion.div
      className="group px-2 py-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/shop/${id}`} className="block">
        <div className="flex flex-col items-center w-full max-w-xs mx-auto">
          <div 
            className="relative w-full rounded-xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition-all duration-300"
            style={{
              background: `linear-gradient(to bottom right, ${colorScheme.gray[50]}, ${colorScheme.gray[100]}`,
              borderRadius: colorScheme.borderRadius.large
            }}
          >
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-contain transform group-hover:scale-[1.03] transition-transform duration-300 p-4"
            />
            <div 
              className="absolute top-3 right-3 flex items-center px-2 py-1 rounded-full shadow-sm"
              style={{
                backgroundColor: colorScheme.white + '90',
                backdropFilter: 'blur(4px)',
                borderRadius: colorScheme.borderRadius.full
              }}
            >
              <FontAwesomeIcon 
                icon={faStar} 
                style={{ color: colorScheme.warning }}
                className="text-xs mr-1" 
              />
              <LightText 
                style={{ color: colorScheme.primary }}
                fontSize="12px"
              >
                {rating}
              </LightText>
            </div>
          </div>
          <div className="w-full mt-4 px-1 text-center">
            <SemiBoldText 
              style={{ color: colorScheme.primary }}
              fontSize="16px"
              className="mb-1 line-clamp-1"
            >
              {name}
            </SemiBoldText>
            <LightText 
              style={{ color: colorScheme.gray[500] }}
              fontSize="12px"
              className="mb-2 line-clamp-1"
            >
              {Desc}
            </LightText>
            <div className="flex items-center justify-center">
              <BoldText 
                style={{ color: colorScheme.accent }}
                fontSize="14px"
              >
                ${price.toFixed(2)}
              </BoldText>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const CustomArrow: React.FC<{ onClick?: () => void; direction: 'left' | 'right' }> = ({ onClick, direction }) => {
  const { colorScheme } = useTheme();

  return (
    <motion.button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-colors ${
        direction === 'left' ? 'left-1 md:left-4' : 'right-1 md:right-4'
      }`}
      style={{
        backgroundColor: colorScheme.white + '90',
        backdropFilter: 'blur(4px)',
        borderRadius: colorScheme.borderRadius.full
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={direction === 'left' ? 'Previous' : 'Next'}
    >
      <FontAwesomeIcon
        icon={direction === 'left' ? faChevronLeft : faChevronRight}
        style={{ color: colorScheme.primary }}
        className="text-base md:text-lg"
      />
    </motion.button>
  );
};

export const ShopPreview: React.FC = () => {
  const { colorScheme } = useTheme();
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'ease-in-out',
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
    prevArrow: <CustomArrow direction="left" />,
    nextArrow: <CustomArrow direction="right" />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: true,
          centerPadding: '20px'
        }
      },
      {
        breakpoint: 1024,
        settings: 'unslick'
      }
    ]
  };

  return (
    <section 
      className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${colorScheme.white}, ${colorScheme.gray[50]})`
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, ${colorScheme.accent} 0%, transparent 70%)`,
              width: `${Math.random() * 180 + 80}px`,
              height: `${Math.random() * 180 + 80}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0.8] }}
            transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div 
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full mb-4"
            style={{
              backgroundColor: colorScheme.gray[300],
              borderRadius: colorScheme.borderRadius.full
            }}
          >
            <LightText 
              style={{ color: colorScheme.background }}
              fontSize="12px"
              // className="tracking-wider uppercase"
            >
              Exclusive Collection
            </LightText>
          </div>

          <ExtraBoldText 
            style={{ color: colorScheme.primary }}
            fontSize="40px"
            className="mb-4"
          >
            CLAUDYGOD STORE
          </ExtraBoldText>

          <div 
            className="w-24 h-1 mx-auto rounded-full mb-6"
            style={{
              background: `linear-gradient(to right, ${colorScheme.accent}, ${colorScheme.secondary})`
            }}
          />

          <LightText 
            style={{ color: colorScheme.gray[600] }}
            fontSize="16px"
            className="max-w-2xl mx-auto"
          >
            Premium merchandise crafted for your everyday use
          </LightText>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="block md:hidden">
            <Slider {...sliderSettings} className="shop-slider pb-2">
              {products.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </Slider>
          </div>

          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/store">
            <CustomButton
              variant="primary"
              size="lg"
              icon={<FontAwesomeIcon icon={faShoppingBag} />}
              className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <BoldText className="tracking-wide">
                Shop More
              </BoldText>
            </CustomButton>
          </Link>
        </motion.div>
      </div>

      <style jsx global>{`
        .shop-slider .slick-dots {
          bottom: -30px;
        }
        .shop-slider .slick-dots li button:before {
          font-size: 10px;
          color: ${colorScheme.gray[300]};
        }
        .shop-slider .slick-dots li.slick-active button:before {
          color: ${colorScheme.accent};
        }
      `}</style>
    </section>
  );
};