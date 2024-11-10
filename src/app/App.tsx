// src/app/App.tsx

import { useLayoutEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { LoginForm } from "../features/auth/components/LoginForm";
import { MultiStepForm } from "../features/auth/components/MultiStepForm";
import { useAtomValue, useSetAtom } from "jotai";
import { isLoggedInAtom, jwtTokenAtom } from "../features/auth/atoms/auth";

function App() {
  const isLoggedIn = useAtomValue(isLoggedInAtom); // 로그인 상태 값을 가져옴
  const setJwtToken = useSetAtom(jwtTokenAtom); // jwtTokenAtom을 설정하는 함수

  // 페이지 로드 시 로그인 상태 복원
  useLayoutEffect(() => {
    const token = localStorage.getItem("jwtToken"); // 로컬 스토리지에서 토큰 가져오기
    if (token) {
      setJwtToken(token); // jwtToken 설정 - 로그인 상태 자동 업데이트
    }
  }, [setJwtToken]);

  // 로그인 핸들러
  const handleLogin = (token: string) => {
    setJwtToken(token); // JWT 토큰 설정 - 로그인 상태는 자동으로 업데이트됨
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem("jwtToken"); // 토큰을 null 대신 완전히 삭제
    setJwtToken(null); // Jotai 상태도 초기화
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

export { App };
