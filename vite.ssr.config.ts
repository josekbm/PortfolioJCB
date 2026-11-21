import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Server bundle used only at build time by scripts/prerender.mjs.
 * The client bundle keeps using vite.config.ts.
 */
export default defineConfig({
  plugins: [react()],
  base: '/',
  publicDir: false,
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: '.ssr',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        format: 'es',
      },
    },
  },
});
