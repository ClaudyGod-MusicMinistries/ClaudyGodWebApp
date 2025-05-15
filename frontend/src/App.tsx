import React from 'react';
import './App.css';
import {  Routes, Route ,useLocation} from 'react-router-dom';

import { Home } from './pages/Home';

function App() {
  const location = useLocation();

  return (
    <div>
     <h2>Welcome </h2>
    <Routes location={location} key={location.pathname}>
       
         <Route index element={<Home />} />
       
        </Routes>
        </div>
  )
}

export default App
