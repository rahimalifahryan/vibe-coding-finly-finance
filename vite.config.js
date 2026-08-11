import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './src',
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
