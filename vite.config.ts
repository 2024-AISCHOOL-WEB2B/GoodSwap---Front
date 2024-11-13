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
  define: {
    'process.env': {}, // ✅ 수정된 부분: process.env를 빈 객체로 정의하여 브라우저 환경에서의 에러 방지
  },
  optimizeDeps: {
    include: ['sanitize-html'], // ✅ 수정된 부분: sanitize-html을 미리 번들링하여 호환성 문제 해결
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
