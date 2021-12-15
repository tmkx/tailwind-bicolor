const { bicolor } = require('tailwind-bicolor');

module.exports = {
  content: ['./src/**/*.{html,vue,ts}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [bicolor()],
};
