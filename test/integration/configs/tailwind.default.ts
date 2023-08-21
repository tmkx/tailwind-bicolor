import { bicolor } from '../../..';
import type { Config } from 'tailwindcss/types';

export default {
  corePlugins: {
    preflight: false,
  },
  content: [],
  plugins: [bicolor()],
} satisfies Config;
