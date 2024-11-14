/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "Avenir",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        customBackground: "rgb(246, 246, 250)",
        custom_appricot: "#fcc89b",
        custom_magenta: "#ff5fa2",
      },
    },
  },
  plugins: [
      require('tailwind-scrollbar-hide'), // 플러그인 추가
  ],
};
