const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#7a7490',
          medium: '#3d3658',
          dark: '#282438',
        },
        secondary: {
          light: '#a88be8',
          medium: '#6e3ed8',
          dark: '#422582',
        },
        tertiary: {
          light: '#f0a4a0',
          medium: '#e66860',
          dark: '#94403b',
        },
        neutral: {
          100: '#ebebeb',
          200: '#c2c2c2',
          500: '#999999',
          800: '#4a4a4a',
        },
        surface: {
          primary: '#ffffff',
          secondary: '#f6f6f6',
        },
        positive: {
          light: '#b5e692',
          medium: '#83d649',
          dark: '#4f802c',
        },
      },

      transitionDuration: {
        DEFAULT: '100ms',
      },

      borderRadius: {
        DEFAULT: '8px',
        base: '8px',
        pill: '12px',
      },

      borderWidth: {
        thin: '1px',
        medium: '2px',
        thick: '4px',
      },

      spacing: {
        0: '0rem',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        40: '10rem',
      },

      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
        '4xl': '4rem',
      },

      lineHeight: {
        shorter: '120%',
        short: '140%',
        tall: '160%',
        taller: '180%',
      },

      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },

      zIndex: {
        '-1': -1,
        1: 1,
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
  variants: {
    scrollbar: ['rounded'],
  },
};
