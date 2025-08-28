import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import {
  Routes,
  Route,
  useLocation,
  HashRouter as Router,
} from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Mainlayout';

// Page imports
import { Home } from './pages/Home';
import { Biography } from './pages/Bio';
import { MusicData } from './pages/Music';
import { VideosData } from './pages/Videos';
import { Bookings } from './pages/Bookings';
import { ContactData } from './pages/Contact';
import { DonateData } from './pages/Donate';
import { StoreData } from './pages/StoreData';
import { Blog } from './pages/Blogpost';
import { MinistryData } from './pages/Ministry';
import { News } from './pages/News';
import DonationComplete from './components/donate/DonationSuccess';
import StreamingPlatforms from './components/Homepage/Streaming';

// Store components
import { Checkout } from './components/store/Checkout';
import { CartPage } from './components/store/CartPage';
import ZellePaymentWrapper from './components/store/paymentPlatforms/ZelleWrapper';
import { PaymentPending } from './components/store/status/PaymentPending';
import OrderSuccess from './components/store/status/OrderSuccess';

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
          <Route path="checkout" element={<Checkout />} />
          <Route path="blogs" element={<Blog />} />
          <Route path="ministry" element={<MinistryData />} />
          <Route path="news" element={<News />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="donation-complete" element={<DonationComplete />} />
          <Route path="stream" element={<StreamingPlatforms />} />
          {/* Payment routes */}
          <Route path="checkout/zelle" element={<ZellePaymentWrapper />} />
          <Route path="payment-pending" element={<PaymentPending />} />
          <Route path="order-success/:orderId" element={<OrderSuccess />} />

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
