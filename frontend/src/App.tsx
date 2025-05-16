import React from 'react';
import {AnimatePresence} from 'framer-motion';
import './App.css';
import {  Routes, Route ,useLocation} from 'react-router-dom';

// Pages
import  Layout  from './components/Layout/Mainlayout';
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

// Store Section
import { Cart } from './components/Cart';



function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait"> 

    <Routes location={location} key={location.pathname}>
         <Route path="/" element={<Layout />}>
         <Route index element={<Home />} />
         <Route path='/biography' element={<Biography />} />
          <Route path='/music' element={<MusicData />} />
          <Route path='/videos' element={<VideosData />} />
         <Route path='/bookings' element={<Booking />} />
         <Route path='/contact' element={<ContactData />} />
          <Route path='/donate' element={<DonateData />} />
          <Route path='/store' element={<StoreData />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/ministry' element={<MinistryData />} />
           <Route path="*" element={<div>404 Not Found</div>} />
      <Route path="/cart" element={<Cart />} />
       </Route>
     
        </Routes>
      
</AnimatePresence>
  )
}

export default App
