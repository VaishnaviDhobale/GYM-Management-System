/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        btn: "#0284c7",
        btnHover: "#3ab0e2",
      },
      fontFamily: {
        sans: ["Mulish", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwindcss"),
    require("postcss-nesting"),
    require("autoprefixer"),
  ],
};
