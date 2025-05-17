import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Root from './App';
// import App from './App';
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <Root />
  </StrictMode>
);