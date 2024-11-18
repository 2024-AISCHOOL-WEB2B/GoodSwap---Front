import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../shared/components/Header";
import { BackgroundFrame } from "../../shared/components/BackgroundFrame";
import Editor from "../../features/post/components/Editor";
import { createPost } from "../../features/post/services/postService"; // 추가된 부분

const PostCreate: React.FC = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [artist, setArtist] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  // 뒤로가기 기능
  const handleGoBack = () => {
    navigate(-1);
  };

  // 작성 완료 버튼 클릭 시 데이터 체크 및 제출
  const handleSubmit = async () => {
    if (!artist || !category || !title || !content) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const postData = { artist, category, title, content };
      const response = await createPost(postData);

      if (response?.status === 201) {
        alert("게시글이 성공적으로 작성되었습니다.");
        navigate("/post-list");
      } else {
        console.error("게시글 작성 실패:", response?.statusText);
      }
    } catch (error) {
      console.error("게시글 작성 중 오류 발생:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[768px] h-[1006px] bg-white border overflow-hidden">
        <BackgroundFrame />

        {/* 상단 아이콘들 */}
        <div className="relative">
          <Header />
        </div>

        <div className="w-[712px] h-[539px] static">

          {/* 아티스트 입력 */}
          <div className="text-[#292c33] text-center text-[13px] font-normal absolute left-[calc(50%_-_326px)] top-[calc(50%_-_353px)] w-[55px] h-[18px] flex items-center justify-center">
            아티스트
          </div>
          <div className="flex flex-col items-start justify-start w-[301px] h-[30px] absolute left-[calc(50%_-_333px)] top-[calc(50%_-_330px)]">
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="아티스트를 입력하세요"
              className="w-full p-2 rounded-[7.8px] border border-gray-300"
            />
          </div>

          {/* 카테고리 입력 */}
          <div className="text-[#292c33] text-center text-[13px] font-normal absolute left-[calc(50%_-_-38px)] top-[calc(50%_-_353px)] w-[60px] h-[18px] flex items-center justify-center">
            카테고리
          </div>
          <div className="flex flex-col items-start justify-start w-[301px] h-[30px] absolute left-[calc(50%_-_-32px)] top-[calc(50%_-_330px)]">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="카테고리를 입력하세요"
              className="w-full p-2 rounded-[7.8px] border border-gray-300"
            />
          </div>

          {/* 제목 입력 */}
          <div className="text-[#292c33] text-center text-[13px] font-normal absolute left-[calc(50%_-_326px)] top-[calc(50%_-_268px)] w-10 h-[18px] flex items-center justify-center">
            제목
          </div>
          <div className="flex flex-col items-start justify-start w-[666px] h-[30px] absolute left-[calc(50%_-_333px)] top-[calc(50%_-_245px)]">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              className="w-full p-2 rounded-[7.8px] border border-gray-300"
            />
          </div>

          {/* 에디터 컴포넌트 */}
          <div className="absolute left-[calc(50%_-_333px)] top-[calc(50%_-_177px)] bg-white">
            <Editor
              className="h-[500px] w-[666px]"
              value={content}
              onChange={(value) => setContent(value)}
              placeholder="여기에 내용을 입력하세요..."
            />
          </div>

          {/* 작성 완료 버튼 */}
          <div className="rounded-lg border border-gray-400 p-4 flex items-center justify-center w-[99px] h-10 absolute left-[calc(50%_-_-259px)] top-[calc(50%_-_-421.5px)] bg-gradient-to-r from-teal-400 to-green-500 shadow-md">
            <button className="text-white" onClick={handleSubmit}>
              작성완료
            </button>
          </div>

          {/* 뒤로 가기 버튼 */}
          <div className="bg-white rounded-lg border border-gray-400 p-4 flex items-center justify-center w-[88px] h-10 absolute left-[calc(50%_-_-157px)] top-[calc(50%_-_-421.5px)]">
            <button className="text-black" onClick={handleGoBack}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PostCreate };
