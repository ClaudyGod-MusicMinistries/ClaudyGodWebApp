import { Outlet } from 'react-router-dom';
import { TopBanner } from '../Topbanner';
// import { Navbar } from '../navbar/Navbar';
import { Footer } from '../footer/footer';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBanner />
      {/* Remove Navbar from here - it will be inside the Hero component */}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
