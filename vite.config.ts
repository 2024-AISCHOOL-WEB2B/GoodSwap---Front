// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      exclude: ["fs"],
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      url: "rollup-plugin-node-polyfills/polyfills/url",
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  server: {
    proxy: {
      "/auth": {
        target: "http://localhost:8081", // 백엔드 서버 주소
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
