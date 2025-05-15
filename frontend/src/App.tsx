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
           <Route path="*" element={<div>404 Not Found</div>} />
       </Route>
     
        </Routes>
      
</AnimatePresence>
  )
}

export default App
