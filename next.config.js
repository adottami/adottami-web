const withPWA = require('next-pwa');

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
};

const pwaConfig = {
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV !== 'production',
  },
};

module.exports = withPWA({ ...baseConfig, ...pwaConfig });
