import { LayoutTemplate } from '../util/hero';
import { StoreBanner } from '../../assets';

export const StoreHero = () => (
  <div className="relative">
    <div className="absolute inset-0  z-10" />
    <LayoutTemplate
      title="ClaudyGod Music & Ministries"
      backgroundImage={StoreBanner}
      className="relative z-0"
    />
  </div>
);
