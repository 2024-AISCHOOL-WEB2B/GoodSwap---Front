// src/pages/MainPage.tsx

import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { logoutAtom } from "../features/auth/atoms/auth";
import { logout } from "../features/auth/APIs/logout";

interface MainPageProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const MainPageComponent: React.FC<MainPageProps> = ({
  isLoggedIn,
  onLogout,
}) => {
  const navigate = useNavigate();
  const setLogout = useSetAtom(logoutAtom);

  // 로그아웃 처리 함수
  const handleLogout = useCallback(async () => {
    await logout(setLogout); // 로그아웃 호출
    onLogout(); // 추가적인 로그아웃 처리
    navigate("/"); // 로그아웃 후 메인 페이지로 이동
  }, [navigate, onLogout, setLogout]);

  // 로그인 페이지로 이동하는 함수
  const handleLoginClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

    // PostList 페이지로 이동하는 함수
    const handlePostListClick = useCallback(() => {
      navigate("/postlist");
    }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isLoggedIn ? (
        <LoggedInSection onLogout={handleLogout} />
      ) : (
        <LoggedOutSection onLoginClick={handleLoginClick} />
      )}
    </div>
  );
};

// 로그인된 상태에서 보여줄 섹션 컴포넌트
const LoggedInSection: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
  <>
    <h1 className="text-3xl font-bold mb-6">로그인에 성공하셨습니다!</h1>
    <button
      onClick={onLogout}
      className="px-4 py-2 bg-red-500 text-white font-semibold rounded"
    >
      로그아웃
    </button>
  </>
);

// 로그아웃된 상태에서 보여줄 섹션 컴포넌트
const LoggedOutSection: React.FC<{ 
  onLoginClick: () => void 
  onPostListClick: () => void;
  }> = ({ onLoginClick, onPostListClick }) => (
  <>
    <h1 className="text-3xl font-bold mb-6">메인 페이지입니다.</h1>
    <button
      onClick={onLoginClick}
      className="px-4 py-2 bg-blue-500 text-white font-semibold rounded"
    >
      로그인
    </button>


    <button
      onClick={onPostListClick}
      className="px-4 py-2 bg-green-500 text-white font-semibold rounded"
    >
      PostList로 이동
    </button>
  </>
);

const MainPage = React.memo(MainPageComponent);
MainPage.displayName = "MainPage";

export { MainPage };
