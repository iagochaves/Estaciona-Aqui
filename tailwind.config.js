module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/layout/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DC1637',
        secondary: '#1B1B1F',
        notActive: '#7A7A80',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
