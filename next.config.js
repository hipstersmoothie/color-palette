// next.config.js
const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');

const debug = process.env.NODE_ENV !== 'production';
const assetPrefix = debug ? '' : '/color-palette';

module.exports = withCSS(
  withTypescript({
    assetPrefix
  })
);
