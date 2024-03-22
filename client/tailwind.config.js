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
      }
    },
  },
  plugins: [],
}

