import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "jotai"; // Jotai Provider 추가
import App from "./App.tsx";
import "./index.css";

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
