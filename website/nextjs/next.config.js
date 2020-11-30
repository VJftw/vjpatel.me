const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const nextConfig = {
  trailingSlash: true,
};

module.exports = withPlugins([
  [optimizedImages, {
  }],
], nextConfig);
