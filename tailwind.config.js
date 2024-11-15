/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#70C7BA',
        secondary: '#49EACB',
        dark: '#231F20',
        gray: '#B6B6B6',
      },
    },
  },
  plugins: [],
}

