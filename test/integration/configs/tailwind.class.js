const { bicolor } = require('../../..');

module.exports = {
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  },
  plugins: [bicolor()],
};
