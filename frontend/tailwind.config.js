/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nightowl: {
          bg: '#011627',
          text: '#abb2bf',
          yellow: '#ecc48d'
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
