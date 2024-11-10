// src/app/App.tsx

import { useLayoutEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { LoginForm } from "../features/auth/components/LoginForm";
import { MultiStepForm } from "../features/auth/components/MultiStepForm";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "../features/auth/atoms/auth";

function App() {
  // 로그인 상태를 전역으로 관리하는 jotai atom 사용
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  // 페이지 로드 시 로그인 상태 복원
  useLayoutEffect(() => {
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
    if (token) {
      setIsLoggedIn(true); // 토큰이 존재하면 로그인 상태로 설정
    }
  }, [setIsLoggedIn]);

  // 로그인 핸들러
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 삭제
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MainPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
        />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/signup/*" element={<MultiStepForm />} />
        <Route
          path="/main"
          element={<MainPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
        />
      </Routes>
    </Router>
  );
}

// App 컴포넌트를 named export로 설정
export { App };
