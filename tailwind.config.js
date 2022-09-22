/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#1664c0",
        "weather-secondary": "#016b9c",
        "weather-tertiary": "#00a7c4",
        "weather-fourth": "#d8c7bb",
        "weather-precip": "#75cee6",
        "weather-sun": "#fdea10",
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [],
};
