// src/app/main.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "jotai"; // Jotai Provider 추가
import { App } from "./App";
import "../shared/styles/index.css"; // 글로벌 스타일 적용

// Mock 설정 임포트
if (process.env.NODE_ENV === "development") {
  // import("../features/auth/mocks/axiosMock"); // 개발 환경에서만 Mock 설정 적용
}

// HTML 파일에서 "root"라는 ID를 가진 요소를 가져옴 -- if문을 제거해서 에러가 발생하게 변경
const rootElement = document.getElementById("root");
createRoot(rootElement!).render(
  // "!" 타입 가드용어
  <StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
