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
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "799px",
      // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "3xl": "1920px",
      // => @media (min-width: 1920px) { ... }
      "4xl": "2560px",
    },
    extend: {
      size: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
