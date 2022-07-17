const withPWA = require('next-pwa');

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
};

const pwaConfig = {
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV !== 'production',
  },
};

module.exports = withPWA({ ...baseConfig, ...pwaConfig });
