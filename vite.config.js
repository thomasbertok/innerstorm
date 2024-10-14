import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const svgrOptions = {
  svgrOptions: {
    exportType: "default",
    ref: true,
    svgo: false,
    titleProp: true,
  },
  include: "**/*.svg",
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(svgrOptions)],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
