/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#2A4791',
        customLightBlue: '#F6F6F6'
      }
    },
  },
  plugins: [],
}

