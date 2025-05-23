
import { Herosection } from '../components/Herosection';
import { Log} from '../assets/';

export const Blogs: React.FC = () => {
  return (
      <div className="bg-white">
            <div className="relative">
              {/* Dark overlay div */}
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              
              <Herosection 
                title="ClaudyGod Music & Ministries / Blogs"
                backgroundImage={Log}
                className="relative z-0"  // Ensure image stays behind overlay
              />
            </div>
        </div>
  );
};
