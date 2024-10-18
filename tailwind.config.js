/** @type {import('tailwindcss').Config} */
export default {
  content: [".index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    fontFamily: {
      sans: ["Roboto", "Inter", "sans-serif"],
      mono: ["Source Code Pro", "Consolas", "monospace"],
    },
    extend: {},
  },
  plugins: [],
};
