import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import {
  Routes,
  Route,
  useLocation,
  BrowserRouter as Router,
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
import { CityTourLayout } from './components/news/cityHighlight';

// Store components
import { Checkout } from './components/store/Checkout';
import { CartPage } from './components/store/CartPage';
import ZellePaymentWrapper from './components/store/paymentPlatforms/ZelleWrapper';
import { PaymentPending } from './components/store/status/PaymentPending';
import OrderSuccess from './components/store/status/OrderSuccess';

// Legal components
import { PrivacyPolicy } from './components/Legal/PrivacyPolicy';
import { TermsOfService } from './components/Legal/TermsOfService';
import { CookiePolicy } from './components/Legal/CookiePolicy';

// Tour State

import { PortHarcourtTour } from './components/news/State_Tour/Ph';
import { AbaTour } from './components/news/State_Tour/Aba';
// import { OwerriTour } from './components/news/State_Tour/owerri';
import { LagosTour } from './components/news/State_Tour/Lagos';
import { ImoTour } from './components/news/State_Tour/imo';
// import { LagosTour } from './src/pages/tour/LagosTour';
// import { AbujaTour } from './src/pages/tour/AbujaTour';
// import { ImoTour } from './src/pages/tour/ImoTour';
// import { AbaTour } from './src/pages/tour/AbaTour';

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Layout wrapper for main pages */}
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
          <Route path="cart" element={<CartPage />} />
          <Route path="donation-complete" element={<DonationComplete />} />
          <Route path="stream" element={<StreamingPlatforms />} />
          <Route
            path="tour/:city"
            element={
              <CityTourLayout
                city={''}
                heroImage={''}
                description={''}
                children={undefined}
                highlights={[]}
              />
            }
          />

          {/* Legal routes */}
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="cookie-policy" element={<CookiePolicy />} />
        </Route>

        {/* Standalone routes (without Layout) */}
        <Route path="checkout" element={<Checkout />} />
        <Route path="checkout/zelle" element={<ZellePaymentWrapper />} />
        <Route path="payment-pending" element={<PaymentPending />} />
        <Route path="order-success/:orderId" element={<OrderSuccess />} />

        {/* TourState */}
        <Route path="/tour/port-harcourt" element={<PortHarcourtTour />} />
        <Route path="/tour/Aba" element={<AbaTour />} />
        {/* <Route path="/tour/Owerri" element={<OwerriTour />} /> */}
        <Route path="/tour/lagos" element={<LagosTour />} />
        <Route path="/tour/imo" element={<ImoTour />} />

        {/* <Route path="/tour/lagos" element={<LagosTour />} />
<Route path="/tour/abuja" element={<AbujaTour />} />
<Route path="/tour/imo" element={<ImoTour />} />
<Route path="/tour/aba" element={<AbaTour />} /> */}

        {/* Fallback */}
        <Route path="*" element={<div>404 Not Found</div>} />
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
