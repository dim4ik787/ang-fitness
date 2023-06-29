/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'add-icon': "url('src/assets/images/add.svg')",
      }
    },
  },
  plugins: [],
}

