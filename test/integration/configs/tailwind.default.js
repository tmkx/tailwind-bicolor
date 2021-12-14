const { bicolor } = require('../../..');

module.exports = {
  corePlugins: {
    preflight: false,
  },
  plugins: [bicolor()],
};
