import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      exclude: ['fs'],
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      url: "rollup-plugin-node-polyfills/polyfills/url",
      // ✅ 수정된 부분: react-dom/client를 react-dom으로 리다이렉트
      'react-dom/client': 'react-dom',
    },
  },
  define: {
    'process.env': {}, // ✅ process.env 문제 해결
  },
  optimizeDeps: {
    include: ['sanitize-html', 'react-quill'], // ✅ react-quill을 추가하여 호환성 문제 해결
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
