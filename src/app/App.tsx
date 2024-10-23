// src/app/App.tsx

import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { LoginForm } from "../features/auth/LoginForm";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "../atoms/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  // 페이지 로드 시 로그인 상태 복원
  useEffect(() => {
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
    if (token) {
      setIsLoggedIn(true); // 토큰이 존재하면 로그인 상태로 설정
    }
  }, [setIsLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token"); // 로그아웃 시 토큰 삭제
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

export default App;
