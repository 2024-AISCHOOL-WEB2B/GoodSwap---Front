import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../shared/components/Header';
import BackgroundFrame from '../../shared/components/BackgroundFrame';
const GoodsPost = () => {
  const { postId } = useParams<{ postId: string }>(); // URL에서 postId를 받아옴

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      {/* 배경 이미지 */}
      <div className="relative w-[768px] h-[1006px] bg-white border overflow-hidden">
       <BackgroundFrame />



      {/* 상단 아이콘들 */}
      <div className="relative">
        <Header />
      </div>


      {/* 상품 이미지 */}
      <div className="absolute inset-x-[calc(50%-328px)] top-[calc(50%-217.5px)] size-[300px] bg-gradient-to-l from-gray-200 to-gray-200 border border-black rounded-lg flex items-center justify-center overflow-hidden">
        <img
          className="size-full object-cover"
          src="/GoodsPost/div0.png"
          alt="product"
        />
      </div>



      {/* 가격 정보 */}
      <div className="text-[#000000] text-left absolute left-[calc(50%_-_-3px)] top-[calc(50%_-_223.5px)]">
        테스트 판매 물품
      </div>
      <div className="text-[#000000] text-left text-[28px] font-semibold absolute left-[calc(50%_-_0px)] top-[calc(50%_-_188.5px)]">
        $
      </div>
      <div className="text-[#000000] text-center text-[55px] font-bold absolute left-[calc(50%_-_-15px)] top-[calc(50%_-_200.5px)] w-[100px] h-16">
        100
      </div>


      {/* 카테고리 */}
      {/* <div className="w-[103px] h-[53px] static">
        <div
          className="rounded border-solid border-black border p-2 flex flex-row items-center justify-center w-[103px] h-[24.15px] absolute left-[calc(50%_-_353px)] top-[calc(50%_-_427.74px)] overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, rgba(8, 204, 202, 1) 0%, rgba(24, 231, 156, 1) 100%)',
          }}
        />
        <div className="text-[#ffffff] text-center text-[15px] absolute left-[calc(50%_-_353px)] top-[calc(50%_-_442.5px)] w-[100.62px] h-[53px] flex items-center justify-center">
          카테고리
        </div>
      </div> */}


      {/* 상품 제목 */}
      <div className="text-[#292c33] text-left text-[50px] font-normal absolute left-[calc(50%_-_353px)] top-[calc(50%_-_395.5px)] w-[573px] h-[63px] flex items-center justify-start">
        테스트 제목
      </div>


      {/* 판매자 정보 */}
      <img
        className="size-20 absolute left-[calc(50%_-_335px)] top-[calc(50%_-_330.5px)]"
        src="/GoodsPost/group-368300.svg"
        alt="seller"
      />
      <div className="text-[#292c33] text-center text-[25px] absolute left-[calc(50%_-_269px)] top-[calc(50%_-_332.5px)] w-[122px] h-[55px] flex items-center justify-center">
        회원2
      </div>
      <div className="text-[rgba(41,44,51,0.59)] text-center text-xl absolute left-[calc(50%_-_295px)] top-[calc(50%_-_288.5px)] w-[346px] h-[34px] flex items-center justify-center">
        2024.10.09. 22:33 조회 7
      </div>
      

      {/*신고*/}
      <div className="text-[rgba(41,44,51,0.59)] text-center font-['Inter-Regular',_sans-serif] text-xl font-normal absolute left-[calc(50%_-_-263px)] top-[calc(50%_-_288.5px)] w-[94px] h-[34px] flex items-center justify-center">
       신고
      </div>


      {/* 구분선 */}
      <div className="border-solid border-[rgba(0,0,0,0.46)] border-t border-x-0 border-b-0 w-[711px] h-0 absolute left-[calc(50%_-_353px)] top-[calc(50%_-_238.5px)]" />




      <img
        className="w-[59px] h-[66px] absolute left-[calc(50%_-_331px)] top-[calc(50%_-_-313.5px)]"
        src="/GoodsPost/group-368330.svg"
        alt="회원아이콘"
      />
      <div className="text-[#292c33] text-center text-xl absolute left-[calc(50%_-_283px)] top-[calc(50%_-_-308.5px)] w-[76px] h-[50px] flex items-center justify-center">
        회원1
      </div>
      <div className="text-[rgba(41,44,51,0.59)] text-center text-[15px] absolute left-[calc(50%_-_278px)] top-[calc(50%_-_-339.5px)] w-[140px] h-[38px] flex items-center justify-center">
        2024.10.09. 22:33
      </div>
      <div className="text-[rgba(41,44,51,0.59)] text-center text-[15px] absolute left-[calc(50%_-_138px)] top-[calc(50%_-_-342.5px)] w-24 h-8 flex items-center justify-center">
        답글 쓰기
      </div>


      {/* 댓글 구분선 */}
      <div className="border-solid border-[rgba(0,0,0,0.46)] border-t border-x-0 border-b-0 w-[711px] h-0 absolute left-[calc(50%_-_353px)] top-[calc(50%_-_-212.5px)]" />


      {/* 댓글 정보 */}
      <div className="text-[#000000] text-center text-xl absolute left-[calc(50%_-_196px)] top-[calc(50%_-_-178.5px)] size-[25px] flex items-center justify-center">
        4
      </div>
      <div className="text-[#000000] text-center text-xl absolute left-[calc(50%_-_283px)] top-[calc(50%_-_-177.5px)] size-[25px] flex items-center justify-center">
        2
      </div>
      <img
        className="w-[33px] h-[30px] absolute left-[calc(50%_-_316px)] top-[calc(50%_-_-177.5px)]"
        src="/GoodsPost/favorite0.svg"
        alt="favorite"
      />
      <img
        className="w-[30.64px] h-[30px] absolute left-[calc(50%_-_227px)] top-[calc(50%_-_-177.5px)]"
        src="/GoodsPost/chat-bubble0.svg"
        alt="chat"
      />
      <div className="text-[#000000] text-center text-xl absolute left-[calc(50%_-_335px)] top-[calc(50%_-_-207.5px)] w-[90px] h-[43px] flex items-center justify-center">
        등록순
      </div>
      <div className="text-[rgba(0,0,0,0.59)] text-center text-xl absolute left-[calc(50%_-_240px)] top-[calc(50%_-_-212.5px)] w-[68px] h-[34px] flex items-center justify-center">
        최신순
      </div>
      <img
        className="w-[31px] h-[25px] absolute left-[calc(50%_-_165px)] top-[calc(50%_-_-216.5px)]"
        src="/GoodsPost/rotate-ccw0.svg"
        alt="rotate"
      />


      {/* 구매버튼 */}
      <div
        className="absolute left-[calc(50%-3px)] top-[calc(50%-113.5px)] w-[116px] h-[54px] rounded border border-neutral-400 p-4 flex items-center justify-center bg-gradient-to-r from-teal-500 to-green-400 shadow-lg"
      >
        <div className="text-white">바로구매</div>
      </div>



  {/* 수량 정보 */}
  <div className="relative left-[calc(50%-3px)] top-[calc(50%-15.5px)] w-[92px] h-8 flex items-center justify-center">
    {/* 수량 배경 이미지 */}
    <img
      className="size-full rounded-none"
      src="/GoodsPost/rectangle-1140.svg"
      alt="rectangle"
    />

    {/* 수량 텍스트 */}
    <div className="absolute text-[#000000] text-center">1</div>

    {/* 플러스 아이콘 */}
    <img
      className="w-6 h-7 absolute left-[calc(50%+20px)] top-[calc(50%-13.5px)]"
      src="/GoodsPost/plus0.svg"
      alt="plus"
    />
  </div>

  {/* 수량 텍스트 */}
  <div className="text-[#000000] text-left absolute left-[calc(50%+7px)] top-[calc(50%-38.5px)] w-[62px] h-4">
    수량
  </div>



      {/* 상품 설명 */}
      <div className="bg-gray-200 rounded border-solid border-default-default border p-4 flex flex-col items-start justify-start w-[371px] h-[140px] absolute left-[calc(50%_-_0px)] top-[calc(50%_-_-37.5px)]">
        <div className="flex flex-row items-center justify-start w-full">
          <div className="text-[#000000] text-left flex-1">상품 내용</div>
          <div className="shrink-0 size-5"></div>
        </div>
        <div className="flex flex-row items-center justify-center w-full">
          <div className="text-[#000000] text-left flex-1">
            회원님들 이번 굿즈는 **를 한 **입니다.
            <br />
            35x85 사이즈로 제작되었으며 재질은 **입니다.
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default GoodsPost;
