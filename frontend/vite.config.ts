// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/',
  publicDir: 'public',
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      // Correct proxy configuration
      '/api': {
        target: 'http://localhost:10000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path // Keep the path as-is
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  }
});