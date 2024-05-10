export default {
  name: 'demo',
  mjs: true,
  version: process.version,
  exports: {
    '.': './index.js',
    './index': './index.js',
    './index.js': './index.js',
  },
}
