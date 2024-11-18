// src/app/App.tsx
import { useLayoutEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { LoginForm } from "../features/auth/components/LoginForm";
import { ResetPasswordForm } from "../features/auth/components/ResetPasswordForm";
import { MultiStepForm } from "../features/auth/components/MultiStepForm";
import { useAtomValue, useSetAtom } from "jotai";
import {
  isAuthenticatedAtom,
  loginAtom,
  logoutAtom,
} from "../features/auth/atoms/auth";
import { setupInterceptors } from "../features/auth/APIs/axiosInstance";
import { logout } from "../features/auth/APIs/logout"; // 로그아웃 함수 임포트
import { getAccessToken } from "../features/auth/utils/tokenUtils";
import { PostListPage } from "../pages/post/PostListPage";
import { PostCreate } from "../pages/post/PostCreate";
import { GoodsPostPage } from "../pages/post/GoodsPostPage";
import { GoodsPost } from "../pages/post/GoodsPost";
import { Post } from "../pages/post/Post";
import { GoodsPostCreate } from "../pages/post/GoodsPostCreate";

function App() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const setLogin = useSetAtom(loginAtom);
  const setLogout = useSetAtom(logoutAtom);

  // 페이지 로드 시 로그인 상태 복원
  useLayoutEffect(() => {
    const savedAccessToken = localStorage.getItem("accessToken");
    if (savedAccessToken) {
      setLogin(savedAccessToken); // 로그인 상태 복원
    }

    // 인터셉터 설정 시 setLogout 전달
    setupInterceptors(setLogout);
  }, [setLogin, setLogout]);

  const handleLogin = (token: string) => {
    localStorage.setItem("accessToken", token);
    setLogin(token);
  };

  // 로그아웃 핸들러 정의
  const handleLogout = () => {
    if (!getAccessToken()) return; // accessToken이 없으면 실행하지 않음
    console.log("Logout button clicked");
    logout(setLogout);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainPage isLoggedIn={isAuthenticated} onLogout={handleLogout} />
        }
      />
      <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
      <Route
        path="/main"
        element={
          <MainPage isLoggedIn={isAuthenticated} onLogout={handleLogout} />
        }
      />
      <Route path="/signup" element={<MultiStepForm />} />
      <Route path="/auth/reset-password" element={<ResetPasswordForm />} />
      <Route path="/postlist" element={<PostListPage />} />
      <Route path="/post/create" element={<PostCreate />} />
      <Route path="/post/:postId" element={<Post />} />
      <Route path="/goods-post" element={<GoodsPostPage />} />
      <Route path="/goods-post/:postId" element={<GoodsPost />} />
      <Route path="/goods-post-create" element={<GoodsPostCreate />} />
      <Route path="/payment" element={<PaymentForm />} /> {/* PaymentForm 경로 추가 */}
    </Routes>
  );
}

export { App };
