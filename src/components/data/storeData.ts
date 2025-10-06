// src/data/storeData.ts
import { Product } from '../types/storeTypes';
import { Shop1, Shop2, Shop3, Shop4, music8, music6 } from '../../assets';
import {
  CreditCard,
  Smartphone,
  Building,
  Globe,
  Landmark,
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

// -----------------
// Category type & data
// -----------------
export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'music', name: 'Music' },
];

// -----------------
// Products data - SINGLE SOURCE OF TRUTH
// -----------------
export const products: Product[] = [
  {
    id: '1',
    name: 'ClaudyGod Exclusive Mug',
    image: Shop1,
    price: 5,
    category: 'accessories',
    description: 'Double-Walled Ceramic Mug',
    rating: 5.0,
  },
  {
    id: '2',
    name: 'Saviour is born, Jesus is here',
    image: Shop2,
    price: 5,
    category: 'accessories',
    description: 'Ceramic Design Mug',
    rating: 4.9,
  },
  {
    id: '3',
    name: 'ClaudyGod Premium T-Shirt',
    image: Shop3,
    price: 25,
    category: 'clothing',
    description: 'Premium Cotton T-Shirt',
    rating: 4.8,
  },
  {
    id: '4',
    name: 'ClaudyGod Premium T-Shirt',
    image: Shop4,
    price: 30,
    category: 'clothing',
    description: 'Limited Edition T-Shirt',
    rating: 4.7,
  },
  {
    id: '5',
    name: 'ClaudyGod Music EP',
    image: music8,
    price: 10,
    category: 'music',
    description: 'Digital EP: Pay. Stream. Download.',
    rating: 4.9,
  },
  {
    id: '6',
    name: 'Get our Latest Album',
    image: music6,
    price: 10,
    category: 'music',
    description: 'Full album digital download.',
    rating: 5.0,
  },
];

// REMOVED: Previewproducts duplicate array

// -----------------
// Payment options
// -----------------
export interface PaymentOption {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{
    size?: number;
    color?: string;
    className?: string;
  }>;
  color: string;
}

// ✅ Hook to get payment options with theme colors
export const usePaymentOptions = (): PaymentOption[] => {
  const { colorScheme } = useTheme();

  return [
    {
      id: 'stripe',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: CreditCard,
      color: colorScheme.info,
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: Smartphone,
      color: colorScheme.primary,
    },
    {
      id: 'zelle',
      name: 'Zelle',
      description: 'Send money with Zelle',
      icon: Building,
      color: colorScheme.primary,
    },
    {
      id: 'paystack',
      name: 'Paystack',
      description: 'Nigerian payment gateway',
      icon: Globe,
      color: colorScheme.success,
    },
    {
      id: 'nigerian-bank',
      name: 'Nigerian Bank Transfer',
      description: 'Direct bank transfer to Nigerian account',
      icon: Landmark,
      color: colorScheme.secondary,
    },
  ];
};
