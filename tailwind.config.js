/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      mytheme: {

        "primary": "#d600ff",

        "secondary": "#d20000",

        "accent": "#00bcff",

        "neutral": "#020a06",

        "base-100": "#2d2c1b",

        "info": "#00bef0",

        "success": "#00d6b3",

        "warning": "#ad4d00",

        "error": "#f04160",
      },
    },],
  },
};