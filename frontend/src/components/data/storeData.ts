// src/data/storeData.ts
import { Product } from '../types/storeTypes';
import { product1, product2, product3, product4, Aud1, Aud2 } from '../../assets';

export const categories = ['all', 'clothing', 'accessories', 'music'];

export const products: Product[] = [
  { id: 1, name: 'ClaudyGod Plain Mug', image: product1, price: 5, category: 'accessories', description: 'High-quality plain mug featuring the ClaudyGod logo.' },
  { id: 2, name: 'ClaudyGod Classic T-Shirt', image: product3, price: 15, category: 'clothing', description: 'Comfortable cotton t-shirt featuring the ClaudyGod logo.' },
  { id: 3, name: 'ClaudyGod Premium Mug', image: product2, price: 5, category: 'accessories', description: 'Limited edition premium mug with embossed logo.' },
  { id: 4, name: 'ClaudyGod Premium T-Shirt', image: product4, price: 20, category: 'clothing', description: 'Premium fabric t-shirt with special design.' },
  { id: 5, name: 'ClaudyGod Music EP', image: Aud2, price: 2, category: 'music', description: 'Digital EP: Pay. Stream. Download.' },
  { id: 6, name: 'Get our Latest Album', image: Aud1, price: 5, category: 'music', description: 'Full album digital download.' },
];