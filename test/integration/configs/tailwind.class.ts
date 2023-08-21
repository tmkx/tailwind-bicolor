import config from './tailwind.default';
import type { Config } from 'tailwindcss/types';

export default {
  ...config,
  darkMode: 'class',
} satisfies Config;
