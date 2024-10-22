// src/app/main.tsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "jotai"; // Jotai Provider 추가
import App from "./App";
import "../shared/styles/index.css"; // 상대 경로로 수정

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Provider>
        <App />
      </Provider>
    </StrictMode>
  );
}
