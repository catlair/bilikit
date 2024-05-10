module.exports = {
  name: 'demo',
  cjs: true,
  version: process.version,
  exports: {
    '.': './index.js',
    './index': './index.js',
    './index.js': './index.js',
  },
}
