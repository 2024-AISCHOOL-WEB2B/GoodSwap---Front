// src/pages/MainPage.tsx

import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// MainPageProps 인터페이스 정의
interface MainPageProps {
  isLoggedIn: boolean; // 로그인 상태를 나타내는 프로퍼티
  onLogout: () => void; // 로그아웃을 처리하는 함수
}

// MainPageComponent 컴포넌트 정의
const MainPageComponent: React.FC<MainPageProps> = ({
  isLoggedIn,
  onLogout,
}) => {
  const navigate = useNavigate();

  // 로그아웃 처리 함수
  const handleLogout = useCallback(() => {
    onLogout(); // 로그아웃 상태로 변경
    navigate("/"); // 로그아웃 후 메인 페이지로 이동
  }, [navigate, onLogout]);

  // 로그인 페이지로 이동하는 함수
  const handleLoginClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isLoggedIn ? ( // 로그인 상태에 따라 렌더링 분기
        <>
          <h1 className="text-3xl font-bold mb-6">로그인에 성공하셨습니다!</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded"
          >
            로그아웃
          </button>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">메인 페이지입니다.</h1>
          <button
            onClick={handleLoginClick}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded"
          >
            로그인
          </button>
        </>
      )}
    </div>
  );
};

// React.memo로 컴포넌트 감싸기 및 displayName 설정
const MainPage = React.memo(MainPageComponent);
MainPage.displayName = "MainPage";

// MainPage 컴포넌트를 named export로 내보내기
export { MainPage };
