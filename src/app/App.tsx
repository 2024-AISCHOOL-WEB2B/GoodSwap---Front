// src/app/App.tsx

import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { LoginForm } from "../features/auth/LoginForm";
import PostListPage from "../pages/post/PostListPage";
import PostCreate from "../pages/post/PostCreate";
import GoodsPostPage from "../pages/post/GoodsPostPage"; // GoodsPostPage import 추가
import GoodsPost from "../pages/post/GoodsPost"; // GoodsPost (상세 페이지) import 추가
import Post from "../pages/post/Post"; // Post 페이지 import
import { useAtom } from "jotai";
import { isLoggedInAtom } from "../atoms/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  useEffect(() => {
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
          <Route
            path="/"
            element={<MainPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
          />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route
            path="/main"
            element={<MainPage isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
          />
          <Route path="/postlist" element={<PostListPage />} />
          <Route path="/post/create" element={<PostCreate />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/goods-post" element={<GoodsPostPage />} /> {/* GoodsPostPage 경로 추가 */}
          
          {/* GoodsPost 상세 페이지 경로 추가 */}
          <Route path="/goods-post/:postId" element={<GoodsPost />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
