const { bicolor } = require('tailwind-bicolor');

module.exports = {
  content: ['./src/**/*.{html,vue,ts}'],
  dark: 'class',
  theme: {
    extend: {},
  },
  plugins: [bicolor()],
};
