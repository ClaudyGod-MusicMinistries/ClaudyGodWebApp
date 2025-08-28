// src/main.tsx or index.tsx
import React from 'react';
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { NavProvider } from './contexts/NavContext';
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ThemeProvider } from './contexts/ThemeContext';

const container = document.getElementById('root') as HTMLElement;

// Shared app wrapper
const RootApp = (
  <StrictMode>
    <Provider store={store}>
      <NavProvider>
        <ThemeProvider>
        <App />
        </ThemeProvider>
      </NavProvider>
    </Provider>
  </StrictMode>
);

// Hydrate if SSR content exists, else render
if (container.hasChildNodes()) {
  hydrateRoot(container, RootApp);
} else {
  const root = createRoot(container);
  root.render(RootApp);
}
