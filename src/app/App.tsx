// src/app/App.tsx

import { useLayoutEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { LoginForm } from "../features/auth/components/LoginForm";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "../features/auth/atoms/auth";
import PostDetail from '../pages/PostDetail'; // 새로운 포스트 상세 페이지 컴포넌트 추가
import GoodsDetailPage from '../pages/GoodsDetailPage';
import GoodsList from '../features/mainPage/components/GoodsList'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/main" element={<MainPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
          <Route path="/post/:postId" element={<PostDetail />} /> {/* 새로운 포스트 상세 페이지 추가 */}
          <Route path="/goods/:goodId" element={<GoodsDetailPage />} />
          <Route path="/goods" element={<GoodsList />} />
        </Routes>
      </Router>
    </div>
  );
}

export { App };
