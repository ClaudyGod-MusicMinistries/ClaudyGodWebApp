import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './App';
import { NavProvider } from './context/NavContext';
// import App from './App';
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const root = createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
    <NavProvider>
      <Root />
    </NavProvider>
  </React.StrictMode>
 
);