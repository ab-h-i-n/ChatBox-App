
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}" , "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
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
