/** @type {import('tailwindcss').Config} */
export default {
  content: [".index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    fontFamily: {
      //sans: ["Poppins],
      sans: ["Raleway", "Noto Sans", "Roboto", "Inter", "sans-serif"],
      mono: ["Source Code Pro", "Consolas", "monospace"],
    },
    extend: {},
  },
  plugins: [],
};
