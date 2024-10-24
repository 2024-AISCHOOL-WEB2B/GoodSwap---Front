// src/app/App.tsx

import { useEffect, useLayoutEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { LoginForm } from "../features/auth/LoginForm";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "../atoms/auth";

function App() {
  // 로그인 상태를 전역으로 관리하는 jotai atom 사용
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  // 페이지 로드 시 로그인 상태 복원
  useLayoutEffect(() => { // 랜더링 후에 동작
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
    if (token) {
      setIsLoggedIn(true); // 토큰이 존재하면 로그인 상태로 설정
    }
  }, [setIsLoggedIn]);

  // 로그인 핸들러
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // 로그아웃 시 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem("token");
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            }
          />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route
            path="/main"
            element={
              <MainPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

// App 컴포넌트를 기본 내보내기로 설정
export default App;
