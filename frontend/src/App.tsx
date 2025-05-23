// App.tsx

import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Mainlayout';

// Import components
import { Home } from './pages/Home';
import { Biography } from './pages/Bio';
import { MusicData } from './pages/Music';
import { VideosData } from './pages/Videos';
import { Booking } from './pages/Bookings';
import { ContactData } from './pages/Contact';
import { DonateData } from './pages/Donate';
import { StoreData } from './pages/Store';
import { Blogs } from './pages/Blogpost';
import { MinistryData } from './pages/Ministry';
import { CheckoutPage } from './pages/CheckoutPage';
import { CartPage } from './pages/CartPage';



function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.key}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="biography" element={<Biography />} />
          <Route path="music" element={<MusicData />} />
          <Route path="videos" element={<VideosData />} />
          <Route path="bookings" element={<Booking />} />
          <Route path="contact" element={<ContactData />} />
          <Route path="donate" element={<DonateData />} />
          <Route path="store" element={<StoreData />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="ministry" element={<MinistryData />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="cart" element={<CartPage />} />

          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function Root() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}