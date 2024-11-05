import React from 'react';
import { useNavigate } from 'react-router-dom';


const PostCreate: React.FC = () => {

  const navigate = useNavigate();

  // 뒤로가기 기능
  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[768px] h-[1006px] bg-white border">
        {/* 배경 이미지 */}
        <img
          className="w-[768px] h-[1023px] absolute left-[calc(50%_-_384px)] top-[calc(50%_-_511.5px)] overflow-visible"
          src="/PostCreate/rectangle-970.svg"
          alt="background"
        />

        {/* 상단 아이콘들 */}
        <div className="absolute w-[768px] h-[58px] left-[calc(50%_-_384px)] top-[0px] z-10">
          <div className="absolute top-0 left-0 flex justify-between items-center w-full px-6 py-4 bg-transparent">
            <h2 className="text-2xl font-semibold text-left">Goodswap</h2>
            <div className="flex items-center gap-2">
              <img className="w-6 h-6" src="/PostList/icon-feather-icon0.svg" alt="icon" />
              <img className="w-6 h-6" src="/PostList/icon-feather-icon1.svg" alt="icon" />
              <img className="w-6 h-6" src="/PostList/icon-lucide-icon0.svg" alt="icon" />
            </div>
          </div>
        </div>

        <div className="w-[712px] h-[539px] static">
          <img
            className="w-[22px] h-[23px] absolute left-[calc(50%_-_342px)] top-[calc(50%_-_77.5px)] overflow-visible"
            src="/PostCreate/camera0.svg"
            alt="camera icon"
          />

          <div className="flex flex-col gap-4 items-start justify-start w-[712px] h-[418px] absolute left-[calc(50%_-_356px)] top-[calc(50%_-_45.5px)] overflow-hidden">
            <div className="bg-white rounded-lg border border-gray-300 p-4 flex items-center justify-start self-stretch flex-1 min-w-[240px] relative overflow-hidden">
              <div className="text-gray-700 text-left w-52 h-4" />
            </div>
          </div>

          <div
            className="rounded-lg border border-green-500 p-4 flex items-center justify-center w-[711px] h-[3px] absolute left-[calc(50%_-_355px)] top-[calc(50%_-_45.5px)]"
            style={{
              background: 'linear-gradient(90deg, rgba(8, 204, 202, 1) 0%, rgba(24, 231, 156, 1) 100%)',
            }}
          ></div>

          <div className="bg-white rounded-lg border border-gray-400 p-4 flex items-center justify-center w-[88px] h-10 absolute left-[calc(50%_-_-157px)] top-[calc(50%_-_-421.5px)] overflow-hidden">
            <div className="text-green-500 w-[51px] h-4" />
          </div>

          <div
            className="rounded-lg border border-gray-400 p-4 flex items-center justify-center w-[92px] h-10 absolute left-[calc(50%_-_-259px)] top-[calc(50%_-_-421.5px)]"
            style={{
              background: 'linear-gradient(90deg, rgba(8, 204, 202, 1) 0%, rgba(24, 231, 156, 1) 100%)',
            }}
          >
            <div className="text-green-600 flex items-center justify-center whitespace-nowrap">작성완료</div>
          </div>

          {/* 뒤로 가기 버튼 */}
          <div onClick={handleGoBack} className="text-black text-center font-['Inter-Regular',_sans-serif] text-xl font-normal absolute left-[calc(50%_-_-173px)] top-[calc(50%_-_-431.5px)] w-[53px] h-5 flex items-center justify-center">
            취소
          </div>

          <img
            className="w-[22px] h-[23px] absolute left-[calc(50%_-_298px)] top-[calc(50%_-_77.5px)] overflow-visible"
            src="/PostCreate/vector0.svg"
            alt="vector icon"
          />

          <img
            className="w-[21px] h-[23px] absolute left-[calc(50%_-_254px)] top-[calc(50%_-_77.5px)] overflow-visible"
            src="/PostCreate/link0.svg"
            alt="link icon"
          />
        </div>

        <div className="w-[716px] h-[148px] static">
          <div className="flex flex-col gap-4 items-start justify-start w-[711px] h-[34px] absolute left-[calc(50%_-_355px)] top-[calc(50%_-_169.5px)] overflow-hidden">
            <div className="bg-white rounded-lg border border-gray-300 p-4 flex items-center justify-start self-stretch flex-1 min-w-[240px] relative overflow-hidden">
              <div className="text-gray-700 text-left w-52 h-4" />
            </div>
          </div>

          <div className="flex flex-col gap-4 items-start justify-start w-[325px] h-[34px] absolute left-[calc(50%_-_355px)] top-[calc(50%_-_250.5px)] overflow-hidden">
            <div className="bg-white rounded-lg border border-gray-300 p-4 flex items-center justify-start self-stretch flex-1 min-w-[240px] relative overflow-hidden">
              <div className="text-gray-700 text-left w-52 h-4" />
            </div>
          </div>

          <div className="flex flex-col gap-4 items-start justify-start w-[356px] h-[34px] absolute left-[calc(50%_-_0px)] top-[calc(50%_-_250.5px)] overflow-hidden">
            <div className="bg-white rounded-lg border border-gray-300 p-4 flex items-center justify-start self-stretch flex-1 min-w-[240px] relative overflow-hidden">
              <div className="text-gray-700 text-left w-52 h-4" />
            </div>
          </div>

          <div className="text-gray-800 text-center text-xl absolute left-[calc(50%_-_360px)] top-[calc(50%_-_280.5px)] w-[106px] h-5 flex items-center justify-center">
            카테고리
          </div>

          <div className="text-gray-800 text-center text-xl absolute left-[calc(50%_-_9px)] top-[calc(50%_-_283.5px)] w-[54px] h-5 flex items-center justify-center">
            가격
          </div>

          <div className="text-gray-800 text-center text-xl absolute left-[calc(50%_-_360px)] top-[calc(50%_-_202.5px)] w-[46px] h-[19px] flex items-center justify-center">
            제목
          </div>
        </div>
      </div> 
    </div>
  );
};

export default PostCreate;
