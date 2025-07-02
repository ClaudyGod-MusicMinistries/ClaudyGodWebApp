import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Root from './App';
import { NavProvider } from './contexts/NavContext';
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const container = document.getElementById('root') as HTMLElement;

// Check for pre-rendered content
if (container.hasChildNodes()) {
  hydrateRoot(
    container,
    <StrictMode>
      <NavProvider>
        <Root />
      </NavProvider>
    </StrictMode>
  );
} else {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <NavProvider>
        <Root />
      </NavProvider>
    </StrictMode>
  );
}