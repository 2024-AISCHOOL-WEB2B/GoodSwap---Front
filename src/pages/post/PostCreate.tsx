import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostCreate: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/'); // "/" 경로로 이동 (BoardList 페이지로 이동)
  };

  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="relative w-[768px] h-[740px]">
        <div className="absolute w-full h-full bg-white" />

        <img
          className="absolute top-[37.43%] left-[5.47%] w-[2.73%] h-[2.7%]"
          src="/PostCreate/camera0.svg"
          alt="카메라 아이콘"
        />
        <img
          className="absolute top-[37.43%] left-[10.16%] w-[2.6%] h-[2.7%]"
          src="/PostCreate/vector0.svg"
          alt="따봉 아이콘"
        />
        <img
          className="absolute top-[37.43%] left-[14.71%] w-[2.73%] h-[2.7%]"
          src="/PostCreate/link0.svg"
          alt="링크 아이콘"
        />

        <div className="absolute left-[5.21%] top-[34px] w-[89.58%] h-[29.18px] bg-white flex flex-col items-start justify-start" />

        <img
          className="absolute left-[49.37px] top-[39.04px] w-[66.28px] h-[18.37px]"
          src="/PostCreate/rectangle-10.svg"
          alt="rectangle"
        />
        <div className="absolute left-[65.58px] top-[45.53px] text-black text-[9px] leading-[6.48px] font-bold flex items-center justify-center">
          덕업일치
        </div>
        <img
          className="absolute left-[638.67px] top-[42.29px] w-[33.86px] h-[14.77px]"
          src="/PostCreate/rectangle-120.svg"
          alt="rectangle"
        />
        <img
          className="absolute left-[682.97px] top-[42.29px] w-[33.86px] h-[14.77px]"
          src="/PostCreate/rectangle-130.svg"
          alt="rectangle"
        />
        <div className="absolute left-[648.39px] top-[46.97px] text-black text-[5px] leading-[6.48px] font-bold flex items-center justify-center">
          로그인
        </div>
        <div className="absolute left-[688.02px] top-[46.61px] text-black text-[5px] leading-[6.48px] font-bold flex items-center justify-center">
          마이페이지
        </div>

        <div className="absolute left-1/2 top-[200px] w-[688px] h-[30px] transform -translate-x-1/2 flex flex-col gap-2">
          <div className="w-full h-full border border-gray-300 p-1.5 box-border">
            <div className="text-gray-700">제목</div>
          </div>
        </div>

        <div className="absolute left-[5.21%] top-[17.3%] w-[39.19%] h-[3.92%] flex flex-col">
          <div className="w-full h-full border border-gray-300 p-1.5">
            <div className="text-gray-700">카테고리</div>
          </div>
        </div>

        <div className="absolute left-[52.08%] top-[17.3%] w-[42.71%] h-[3.92%] flex flex-col">
          <div className="w-full h-full border border-gray-300 p-1.5">
            <div className="text-gray-700">가격</div>
          </div>
        </div>

        <div className="absolute left-[5.21%] top-[41.49%] w-[89.58%] h-[49.46%] flex flex-col">
          <div className="w-full h-full border border-gray-300 p-1.5">
            <div className="text-gray-700">내용</div>
          </div>
        </div>

        <div className="absolute left-[5.21%] top-[18.11%] text-gray-500 text-[12px]">
          카테고리 선택
        </div>
        <div className="absolute left-[52.47%] top-[18.11%] text-gray-500 text-[12px]">
          가격을 입력해주세요.
        </div>

        <button className="absolute left-[5.21%] top-[41.49%] w-[89.58%] h-6 rounded bg-gradient-to-r from-teal-400 to-green-400 border border-gray-700">
          등록
        </button>

        <button
          onClick={handleGoBack}
          className="absolute left-[66.67%] top-[93.11%] w-[10.68%] h-[4.73%] bg-white border border-gray-400 rounded"
        >
          <span className="text-black font-medium">취소</span>
        </button>

        <button className="absolute left-[607px] top-[689px] w-[121px] h-[35px] bg-gradient-to-r from-teal-400 to-green-400 border border-gray-400 rounded">
          작성완료
        </button>
      </div>
    </div>
  );
};

export default PostCreate;
