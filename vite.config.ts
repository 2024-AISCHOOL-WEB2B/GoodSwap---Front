import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Alias 설정을 통해 'src' 폴더를 '@'로 접근 가능하게 합니다.
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    // PostCSS 플러그인으로 Tailwind CSS와 autoprefixer 설정
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
