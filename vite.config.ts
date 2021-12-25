import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';

export default defineConfig({
  root: 'src',
  base: '/',
  build: {
    outDir: path.join(__dirname, 'docs'),
    emptyOutDir: true,
  },
  plugins: [
    Vue(),
    {
      name: 'cname',
      enforce: 'post',
      buildEnd(this) {
        this.emitFile({
          type: 'asset',
          fileName: 'CNAME',
          source: 'bicolor.fancier.dev',
        });
      },
    },
  ],
});
