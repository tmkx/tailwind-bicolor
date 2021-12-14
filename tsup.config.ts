import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: './dist',
  format: ['esm', 'cjs'],
  external: ['postcss-selector-parser'],
  dts: true,
  clean: true,
});
