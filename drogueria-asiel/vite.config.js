import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react({
      // Configuración simplificada que debería funcionar sin problemas
      jsxRuntime: 'automatic',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      }
    }),
    ViteImageOptimizer({
      webp: {
        quality: 70,
        effort: 6,
      },
      jpeg: {
        quality: 60,
      },
      png: {
        quality: 70,
      },
      include: ['**/*.{png,jpg,jpeg,webp}'],
    }),
  ],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          navbar: ['./src/components/navbar/navbar'],
          footer: ['./src/components/footer/footer'],
        },
      },
    },
  }
});