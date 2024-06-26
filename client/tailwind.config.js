/** @type {import('tailwindcss').Config} */

const { defineConfig } = require('tailwindcss');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '400': '400px'
      },
      colors: {
        google: {
          '400': '#4285F4',
          '700': '#3C78DC'
        }
      },
      screens: {
        'xs': '540px'
      }
    },
  },
  plugins: [],
}

