import { Outlet, useLocation } from 'react-router-dom';
import { TopBanner } from '../Topbanner';
import { Navbar } from '../navbar/Navbar';
import { Footer } from '../footer/footer';

const Layout: React.FC = () => {
  const location = useLocation();

  // Determine if we're on the home page (where navbar should be inside hero)
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <TopBanner />

      {/* Only show Navbar here if NOT on home page */}
      {!isHomePage && <Navbar isInsideHero={false} />}

      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
