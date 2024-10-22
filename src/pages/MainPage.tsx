// src/pages/MainPage.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // useForm 추가

interface MainPageProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const MainPage: React.FC<MainPageProps> = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const { setValue } = useForm(); // useForm 훅에서 setValue 가져오기

  const handleLogout = () => {
    onLogout(); // 로그아웃 상태로 변경
    // 이메일과 비밀번호 초기화
    setValue("email", "");
    setValue("password", "");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");
    navigate("/"); // 로그아웃 후 메인 페이지로 이동
  };

  const handleLoginClick = () => {
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isLoggedIn ? (
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

export { MainPage };
