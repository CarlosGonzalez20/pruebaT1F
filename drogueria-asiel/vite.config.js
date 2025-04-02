import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      webp: {
        quality: 70, // Más bajo para móvil
        effort: 6,   // Máxima compresión
      },
      jpeg: {
        quality: 60, // Ahorro significativo
      },
      png: {
        quality: 70,
      },
      include: ['**/*.{png,jpg,jpeg,webp}'],
    }),
  ],
  build: {
    chunkSizeWarningLimit: 800, // Aumentar límite para chunks grandes
    rollupOptions: {
      output: {
        manualChunks: {
          navbar: ['./src/components/navbar/navbar'],
          footer: ['./src/components/footer/footer'],
        },
      },
    },
  },
});