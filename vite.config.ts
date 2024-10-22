import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // path를 path-browserify로 대체
      path: "path-browserify"
    }
  },
  css: {
    // PostCSS 플러그인으로 Tailwind CSS와 autoprefixer 설정
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
