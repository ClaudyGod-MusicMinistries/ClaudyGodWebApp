import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import {
  Routes,
  Route,
  useLocation,
  BrowserRouter as Router
} from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Mainlayout';

// Import pages
import { Home } from './pages/Home';
import { Biography } from './pages/Bio';
import { MusicData } from './pages/Music';
import { VideosData } from './pages/Videos';
import { Bookings } from './pages/Bookings';
import { ContactData } from './pages/Contact';
import { DonateData } from './pages/Donate';
import { StoreData } from './pages/Store';
import { Blog } from './pages/Blogpost';
import { MinistryData } from './pages/Ministry';
import { News } from './pages/News';

// Store & Checkout
import { Checkout } from './components/store/Checkout';
import { CartPage } from './components/store/CartPage';

// Zelle Flow
import { PaymentPending } from './components/store/status/PaymentPending';
import { OrderSuccess }  from './components/store/status/OrderSuccess';

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.key}>
        <Route path="/" element={<Layout />}>
          {/* Main pages */}
          <Route index element={<Home />} />
          <Route path="biography" element={<Biography />} />
          <Route path="music" element={<MusicData />} />
          <Route path="videos" element={<VideosData />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="contact" element={<ContactData />} />
          <Route path="donate" element={<DonateData />} />
          <Route path="store" element={<StoreData />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="ministry" element={<MinistryData />} />
          <Route path="news" element={<News />} />

          {/* E-commerce & Zelle flow */}
          <Route path="checkout" element={<Checkout />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="paymentPending" element={<PaymentPending />} />
            <Route path="order-success" element={<OrderSuccess />} />

          {/* Fallback */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function Root() {
  return (
    <HelmetProvider>
      <Router>
        <AppRoutes />
      </Router>
    </HelmetProvider>
  );
}
