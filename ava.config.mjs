export default {
  files: ['test/*', '!test/_*'],
  extensions: ['ts'],
  require: ['sucrase/register'],
  failFast: true,
  verbose: true,
};
