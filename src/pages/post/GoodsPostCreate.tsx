import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/components/Header";
import { BackgroundFrame } from "../../shared/components/BackgroundFrame";
import { ImageUploader } from "../../shared/components/ImageUploader";
import Editor from "../../features/post/components/Editor";
import { createGoodsPost } from "../../features/post/services/goodsPostService";

const GoodsPostCreate: React.FC = () => {
  const navigate = useNavigate();

  // 입력 필드의 상태 관리
  const [artist, setArtist] = useState("");
  const [goodsName, setGoodsName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // 뒤로가기 기능
  const handleGoBack = () => {
    navigate(-1);
  };

  // 작성 완료 시 데이터 전송
  const handleSubmit = async () => {
    try {
      // 입력된 데이터를 객체로 생성
      const goodsPostData = {
        artist,
        category: "goods", // 카테고리 고정값 (필요 시 수정 가능)
        title,
        content,
        imageUrl,
        goodsName,
        price: Number(price), // 문자열 입력을 숫자로 변환
        quantity: Number(quantity), // 문자열 입력을 숫자로 변환
      };
  
      // 서버로 데이터 전송
      await createGoodsPost(goodsPostData);
  
      // 전송 후 페이지 이동
      navigate("/goods-posts");
    } catch (error) {
      console.error("굿즈 게시글 생성 중 오류 발생:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[768px] h-[1006px] bg-white border overflow-hidden">
        <BackgroundFrame />

        <div className="relative">
          <Header />
        </div>

        <div className="w-[712px] h-[539px] static">

          {/* 아티스트 입력 */}

          <div className="absolute left-[calc(50%_-_326px)] top-[calc(50%_-_440px)]">
            <div className="text-[#292c33] ml-2  ">아티스트</div>
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="border-gray-300 rounded border  w-[301px]"
              placeholder="아티스트를 입력하세요"
            />
          </div>

          {/* 굿즈 이름 입력 */}
          <div className="absolute left-[calc(50%_-_326px)] top-[calc(50%_-_380px)]">
            <div className="text-[#292c33] ml-2 ">굿즈 이름</div>
            <input
              type="text"
              value={goodsName}
              onChange={(e) => setGoodsName(e.target.value)}
              className="border-gray-300 rounded border  w-[301px]"
              placeholder="굿즈 이름 입력"
            />
          </div>

          {/* 굿즈 가격 입력 */}
          <div className="absolute left-[calc(50%_-_326px)] top-[calc(50%_-_320px)]">
            <div className="text-[#292c33] ml-2 ">굿즈 가격</div>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border-gray-300 rounded border  w-[301px]"
              placeholder="굿즈 가격 입력"
            />
          </div>

          {/* 굿즈 수량 입력 */}
          <div className="absolute left-[calc(50%_-_326px)] top-[calc(50%_-_260px)]">
            <div className="text-[#292c33] ml-2 ">굿즈 수량</div>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border-gray-300 rounded border  w-[301px]"
              placeholder="굿즈 수량 입력"
            />
          </div>

          {/* 제목 입력 */}
          <div className="absolute left-[calc(50%_-_326px)] top-[calc(50%_-_200px)]">
            <div className="text-[#292c33] ml-2">제목</div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-gray-300 rounded border  w-[301px]"
              placeholder="제목 입력"
            />
          </div>

          {/* 이미지 업로더 */}
          <div className="absolute left-[calc(50%_-_-80px)] top-[calc(50%_-_430px)]">
            <ImageUploader onImageUpload={(url) => setImageUrl(url)} />
          </div>

          {/* 에디터 */}
          <div className="absolute left-[calc(50%_-_333px)] top-[calc(50%_-_140px)] bg-white">
            <Editor
              className="h-[500px] w-[666px]"
              value={content}
              onChange={(value) => setContent(value)}
              placeholder="여기에 내용을 입력하세요..."
            />
          </div>

          {/* 작성완료 버튼 */}
          <div className="rounded-lg border border-gray-400 p-4 flex items-center justify-center w-[92px] h-10 absolute left-[calc(50%_-_-259px)] top-[calc(50%_-_-421.5px)] bg-gradient-to-r from-[#08CCC8] to-[#18E79C] shadow-md">
            <button
              className="text-white flex items-center justify-center whitespace-nowrap"
              onClick={handleSubmit}
            >
              작성완료
            </button>
          </div>

          {/* 뒤로 가기 버튼 */}
          <div className="bg-white rounded-lg border border-gray-400 p-4 flex items-center justify-center w-[88px] h-10 absolute left-[calc(50%_-_-157px)] top-[calc(50%_-_-421.5px)] overflow-hidden">
            <button
              onClick={handleGoBack}
              className="text-black text-center font-['Inter-Regular',_sans-serif] text-xl"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { GoodsPostCreate };
