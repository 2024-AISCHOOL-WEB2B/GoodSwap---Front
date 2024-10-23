import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { nodePolyfills } from 'vite-plugin-node-polyfills'; // 이름 있는 export 사용

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      exclude: ['fs'], // fs 모듈은 브라우저에서 사용할 수 없으므로 제외
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      // Node.js 호환 모듈을 브라우저 버전으로 대체
      url: "rollup-plugin-node-polyfills/polyfills/url",
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
