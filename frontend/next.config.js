const path = require('path');

module.exports = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      'Advert': path.resolve(__dirname, 'src/resources/Advert'),
      'SydnoComponents': path.resolve(__dirname, 'src/resources/SydnoComponents')
    };
    return config;
  }
}