/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      transitionDuration: {
        DEFAULT: '100ms',
      },

      colors: {},

      fontFamily: {},

      zIndex: {
        '-1': -1,
        1: 1,
      },
    },
  },
  plugins: [],
};
