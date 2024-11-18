// MainPage Component that aggregates all components for the main view
import React from "react";
import { Header } from "../features/mainPage/components/Header";
import { Carousel } from "../features/mainPage/components/Carousel";
import { GoodsList } from "../features/mainPage/components/GoodsList";
import { PostList } from "../features/mainPage/components/PostList";
import { ArtistGrid } from "../features/mainPage/components/ArtistGrid";
import { Footer } from "../features/mainPage/components/Footer";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅 추가

export const MainPage: React.FC<{
  isLoggedIn: boolean;
  onLogout: () => void;
}> = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 생성

  const handleViewAllGoods = () => {
    navigate("/goods"); // "/goods" 경로로 이동하는 함수 추가
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        width: "768px",
        margin: "10px auto",
        borderRadius: "8px",
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <Carousel />
      <GoodsList />
      <PostList />
      <ArtistGrid />
      <Footer />
    </div>
  );
};
export default MainPage;
