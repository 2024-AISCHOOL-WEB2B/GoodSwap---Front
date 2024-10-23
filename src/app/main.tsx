// src/app/main.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "jotai"; // Jotai Provider 추가
import App from "./App";
import "../shared/styles/index.css"; // 글로벌 스타일 적용

// Mock 설정 임포트
if (process.env.NODE_ENV === "development") {
  import("../mocks/axiosMock"); // 개발 환경에서만 Mock 설정 적용
}

// HTML 파일에서 "root"라는 ID를 가진 요소를 가져옴
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      {/* Jotai의 전역 상태 관리 제공 */}
      <Provider>
        {/* App 컴포넌트를 렌더링 */}
        <App />
      </Provider>
    </StrictMode>
  );
}
