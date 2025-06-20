// src/data/storeData.ts
import { Product } from '../types/storeTypes';
import { Shop1, Shop2, Shop3, Shop4, MusicBan8, MusicBan6 } from '../../assets';

// Define Category type
export interface Category {
  id: string;
  name: string;
}

// Updated to array of objects with id and name
export const categories: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'music', name: 'Music' }
];

export const products: Product[] = [
  { id: 1, name: 'ClaudyGod Exclusive Mug', image: Shop1, price: 5, category: 'accessories', description: 'Mug' },
  { id: 2, name: 'Saviour is born, Jesus is here', image: Shop2, price: 5, category: 'accessories', description: 'Mug' },
  { id: 3, name: 'ClaudyGod Premium T-Shirt', image: Shop3, price: 25, category: 'clothing', description: 'T-Shirt' },
  { id: 4, name: 'ClaudyGod Premium T-Shirt', image: Shop4, price: 30, category: 'clothing', description: 'T-Shirt' },
  { id: 5, name: 'ClaudyGod Music EP', image: MusicBan8, price: 10, category: 'music', description: 'Digital EP: Pay. Stream. Download.' },
  { id: 6, name: 'Get our Latest Album', image: MusicBan6, price: 10, category: 'music', description: 'Full album digital download.' },
];