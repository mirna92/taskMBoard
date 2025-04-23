/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f4f4f9",
          100: "#ffffffc4",
        },
        secondary: {
          50: "#8E260C",
          100: "#166534",
          200: "#FFD4D4",
        },
      },
    },
  },
  plugins: [],
};
