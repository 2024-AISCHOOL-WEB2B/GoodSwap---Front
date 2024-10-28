// src/app/App.tsx

import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { LoginForm } from "../features/auth/LoginForm";
import PostListPage from "../pages/post/PostListPage";
import PostCreate from "../pages/post/PostCreate"; // PostCreate import 추가
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
          <Route path="/post/create" element={<PostCreate />} /> {/* PostCreate 페이지 경로 추가 */}
          <Route path="/post/:postId" element={<Post />} /> {/* Post 페이지 경로 추가 */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
