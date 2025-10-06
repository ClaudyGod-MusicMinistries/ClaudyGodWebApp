import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBag,
  faChevronLeft,
  faChevronRight,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import {
  SemiBoldText,
  BoldText,
  LightText,
  ExtraBoldText,
} from '../ui/fonts/typography';
import { useTheme } from '../../contexts/ThemeContext';
import CustomButton from '../ui/fonts/buttons/CustomButton';
import { products } from '../data/storeData';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// ✅ Match the Product type exactly - rating is optional
interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating?: number; // ✅ Make it optional to match Product type
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  name,
  price,
  image,
  description,
  rating = 4.5, // ✅ Provide default value
}) => {
  const { colorScheme } = useTheme();

  return (
    <motion.div
      className="group px-1 sm:px-2 lg:px-3 py-3 sm:py-4"
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
              borderRadius: colorScheme.borderRadius.large,
            }}
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-contain transform group-hover:scale-[1.03] transition-transform duration-300 p-3 sm:p-4"
            />
            <div
              className="absolute top-2 sm:top-3 right-2 sm:right-3 flex items-center px-2 py-1 rounded-full shadow-sm"
              style={{
                backgroundColor: colorScheme.white + '90',
                backdropFilter: 'blur(4px)',
                borderRadius: colorScheme.borderRadius.full,
              }}
            >
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: colorScheme.warning }}
                className="text-xs mr-1"
              />
              <LightText
                style={{ color: colorScheme.primary }}
                fontSize="10px"
                className="sm:text-xs"
              >
                {rating} {/* ✅ Now safe to use with default value */}
              </LightText>
            </div>
          </div>
          <div className="w-full mt-3 sm:mt-4 px-1 text-center">
            <SemiBoldText
              style={{ color: colorScheme.primary }}
              fontSize="14px"
              className="sm:text-base mb-1 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center"
            >
              {name}
            </SemiBoldText>
            <LightText
              style={{ color: colorScheme.gray[500] }}
              fontSize="11px"
              className="sm:text-xs mb-2 line-clamp-1"
            >
              {description}
            </LightText>
            <div className="flex items-center justify-center">
              <BoldText
                style={{ color: colorScheme.accent }}
                fontSize="13px"
                className="sm:text-sm"
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

const CustomArrow: React.FC<{
  onClick?: () => void;
  direction: 'left' | 'right';
}> = ({ onClick, direction }) => {
  const { colorScheme } = useTheme();

  return (
    <motion.button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full shadow-lg transition-colors ${
        direction === 'left'
          ? 'left-1 sm:left-2 md:left-3'
          : 'right-1 sm:right-2 md:right-3'
      }`}
      style={{
        backgroundColor: colorScheme.white + '95',
        backdropFilter: 'blur(8px)',
        borderRadius: colorScheme.borderRadius.full,
        border: `1px solid ${colorScheme.white}30`,
      }}
      whileHover={{ scale: 1.15, backgroundColor: colorScheme.white }}
      whileTap={{ scale: 0.9 }}
      aria-label={direction === 'left' ? 'Previous' : 'Next'}
    >
      <FontAwesomeIcon
        icon={direction === 'left' ? faChevronLeft : faChevronRight}
        style={{ color: colorScheme.primary }}
        className="text-sm sm:text-base md:text-lg"
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
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomArrow direction="left" />,
    nextArrow: <CustomArrow direction="right" />,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '40px',
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '60px',
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: false,
          centerPadding: '0px',
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          centerMode: false,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          centerMode: false,
        },
      },
    ],
  };

  // ✅ Use the first 4 products for the preview
  const previewProducts = products.slice(0, 4);

  return (
    <section
      className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${colorScheme.white}, ${colorScheme.gray[50]})`,
      }}
    >
      {/* Background Animation */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, ${colorScheme.accent} 0%, transparent 70%)`,
              width: `${Math.random() * 120 + 60}px`,
              height: `${Math.random() * 120 + 60}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0.8] }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div
            className="inline-flex items-center justify-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4"
            style={{
              backgroundColor: colorScheme.gray[300],
              borderRadius: colorScheme.borderRadius.full,
            }}
          >
            <LightText
              style={{ color: colorScheme.background }}
              fontSize="10px"
              className="sm:text-xs tracking-wide uppercase"
            >
              Exclusive Collection
            </LightText>
          </div>

          <ExtraBoldText
            style={{ color: colorScheme.primary }}
            fontSize="28px"
            className="sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4"
          >
            CLAUDYGOD STORE
          </ExtraBoldText>

          <div
            className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 mx-auto mb-4 sm:mb-5 md:mb-6 rounded-full"
            style={{
              background: `linear-gradient(to right, ${colorScheme.accent}, ${colorScheme.secondary})`,
            }}
          />

          <LightText
            style={{ color: colorScheme.gray[600] }}
            fontSize="14px"
            className="sm:text-base md:text-lg max-w-2xl mx-auto px-4 sm:px-6"
          >
            Premium merchandise crafted for your everyday use
          </LightText>
        </motion.div>

        {/* Products Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10"
        >
          {/* Mobile & Tablet - Carousel */}
          <div className="block lg:hidden">
            <Slider {...sliderSettings} className="shop-slider pb-4 sm:pb-6">
              {previewProducts.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </Slider>
          </div>

          {/* Desktop - Grid */}
          <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 xl:gap-8">
            {previewProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link to="/store">
            <CustomButton
              variant="primary"
              size="lg"
              icon={<FontAwesomeIcon icon={faShoppingBag} />}
              className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
            >
              <BoldText className="tracking-wide">Shop More</BoldText>
            </CustomButton>
          </Link>
        </motion.div>
      </div>

      {/* ✅ FIXED: Regular style tag with adjusted spacing */}
      <style>{`
        .shop-slider .slick-dots {
          bottom: -25px !important;
        }
        .shop-slider .slick-dots li {
          margin: 0 2px;
        }
        .shop-slider .slick-dots li button:before {
          font-size: 7px;
          color: ${colorScheme.gray[400]};
          opacity: 0.7;
        }
        .shop-slider .slick-dots li.slick-active button:before {
          color: ${colorScheme.accent};
          opacity: 1;
          font-size: 8px;
        }
        
        /* Enhanced arrow positioning */
        .shop-slider .slick-prev {
          left: 5px !important;
        }
        .shop-slider .slick-next {
          right: 5px !important;
        }
        
        /* Responsive slider adjustments */
        @media (max-width: 480px) {
          .shop-slider .slick-slide {
            padding: 0 4px;
          }
          .shop-slider .slick-dots {
            bottom: -20px !important;
          }
        }
        
        @media (max-width: 640px) {
          .shop-slider .slick-slide {
            padding: 0 8px;
          }
        }
        
        @media (max-width: 768px) {
          .shop-slider .slick-slide {
            padding: 0 6px;
          }
        }
        
        @media (min-width: 769px) {
          .shop-slider .slick-prev {
            left: 10px !important;
          }
          .shop-slider .slick-next {
            right: 10px !important;
          }
        }
      `}</style>
    </section>
  );
};
