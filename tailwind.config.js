/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'vox': {
          blue: '#0066CC',
          'blue-dark': '#004C99',
          'blue-light': '#2172b8',
          gray: '#666666',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
} 