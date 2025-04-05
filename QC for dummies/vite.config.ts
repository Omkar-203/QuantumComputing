import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      enforce: 'post',
      generateBundle() {
        if (fs.existsSync('_redirects')) {
          const redirects = fs.readFileSync('_redirects', 'utf-8');
          this.emitFile({
            type: 'asset',
            fileName: '_redirects',
            source: redirects
          });
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});