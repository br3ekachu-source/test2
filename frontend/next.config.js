const path = require('path');

module.exports = {
  output: 'export',
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'Advert': path.resolve(__dirname, 'src/resources/Advert'),
      'SydnoComponents': path.resolve(__dirname, 'src/resources/SydnoComponents')
    };
    return config;
  }
}