import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import tailwindcss from "eslint-plugin-tailwindcss";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: ["dist"], // 빌드된 파일 무시
  },
  {
    files: ["**/*.{ts,tsx}"], // TypeScript 및 React 파일 검사
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": typescriptEslint,
      tailwindcss,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules, // TypeScript 추천 규칙
      ...react.configs.recommended.rules, // React 추천 규칙
      ...reactHooks.configs.recommended.rules, // React Hooks 추천 규칙
      "@typescript-eslint/no-unused-vars": ["warn"], // 사용되지 않는 변수 경고
      "react/react-in-jsx-scope": "off", // Vite와 최신 React에서는 불필요
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/enforces-shorthand": "warn", // Tailwind에서 권장하는 축약형 사용
      "tailwindcss/no-custom-classname": "off", // Tailwind와 custom 클래스가 충돌나지 않도록 허용
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
