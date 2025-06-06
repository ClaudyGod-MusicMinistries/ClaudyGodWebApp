// src/components/store/StoreHero.tsx
import { Herosection } from '../Herosection';
import { StoreBanner } from '../../assets';

export const StoreHero = () => (
  <div className="relative">
    <div className="absolute inset-0 bg-black/50 z-10" />
    <Herosection
      title="ClaudyGod Music & Ministries / Store"
      backgroundImage={StoreBanner}
      className="relative z-0"
    />
  </div>
);