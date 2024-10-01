/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors : {
        "primary" : '#082032',
        "secondary" : '#ff4c29',
        "teritiary" : '#334756'
      }
    },
  },
  plugins: [],
}

