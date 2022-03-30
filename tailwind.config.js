const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: [
    './src/components/**/*.tsx',
    './src/container/**/*.tsx',
    './src/layout/**/*.tsx',
    './src/pages/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DC1637',
        secondary: '#1B1B1F',
        notActive: '#7A7A80',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
