import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';

export default defineConfig({
  root: 'src',
  base: '/tailwind-bicolor/',
  build: {
    outDir: path.join(__dirname, 'docs'),
    emptyOutDir: true,
  },
  plugins: [Vue()],
});
