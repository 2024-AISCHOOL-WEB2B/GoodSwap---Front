import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../shared/components/Header";
import { BackgroundFrame } from "../../shared/components/BackgroundFrame";
import { fetchGoodsPostById } from "../../features/post/services/goodsPostService";
import { useState, useEffect } from "react";


interface GoodsPostData {
  title: string;
  goodsName: string;
  price: number;
  quantity: number;
  content: string;
  artist: string;
  imageUrl: string;
  createdAt: string;
  viewCount: number;
}

const GoodsPost = () => {
  const { postId } = useParams<{ postId: string }>(); // URL에서 postId를 받아옴
  const [postData, setPostData] = useState<GoodsPostData | null>(null);


    // 임시 데이터
    const tempData: GoodsPostData = {
      title: "테스트 제목",
      goodsName: "테스트 판매 물품",
      price: 100,
      quantity: 1,
      content: "회원님들 이번 굿즈는 **를 한 **입니다.\n35x85 사이즈로 제작되었으며 재질은 **입니다.",
      artist: "회원2",
      imageUrl: "/GoodsPost/div0.png",
      createdAt: "2024.10.09. 22:33",
      viewCount: 7,
    };

      // 데이터 불러오기
      useEffect(() => {
        const fetchData = async () => {
          try {
            if (postId) {
              const data = await fetchGoodsPostById(Number(postId));
              setPostData(data);
            }
          } catch (error) {
            console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
            setPostData(tempData); // 오류 발생 시 임시 데이터 사용
          }
        };
      
        fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [postId]);
      

    // 데이터가 없는 경우 로딩 표시
    if (!postData) {
      return <div>로딩 중...</div>;
    }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* 배경 이미지 */}
      <div className="relative w-[768px] h-[1006px] bg-white border overflow-hidden">
        <BackgroundFrame />

        {/* 상단 헤더 */}
        <div className="relative">
          <Header />
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
          {postData.title}
        </div>


        {/* 판매자 정보 */}
        <img
          className="size-20 absolute left-[calc(50%_-_335px)] top-[calc(50%_-_330.5px)]"
          src="/GoodsPost/group-368300.svg"
          alt="seller"
        />
        <div className="text-[#292c33] text-center text-[25px] absolute left-[calc(50%_-_269px)] top-[calc(50%_-_332.5px)] w-[122px] h-[55px] flex items-center justify-center">
          {postData.artist}
        </div>
        <div className="text-[rgba(41,44,51,0.59)] text-center text-xl absolute left-[calc(50%_-_295px)] top-[calc(50%_-_288.5px)] w-[346px] h-[34px] flex items-center justify-center">
          {postData.createdAt} 조회 {postData.viewCount}
        </div>


        {/*신고*/}
        <div className="text-[rgba(41,44,51,0.59)] text-center font-['Inter-Regular',_sans-serif] text-xl font-normal absolute left-[calc(50%_-_-263px)] top-[calc(50%_-_288.5px)] w-[94px] h-[34px] flex items-center justify-center">
          신고
        </div>



        {/* 구분선 */}
        <div className="border-solid border-[rgba(0,0,0,0.46)] border-t border-x-0 border-b-0 w-[711px] h-0 absolute left-[calc(50%_-_353px)] top-[calc(50%_-_238.5px)]" />



        {/* 상품 이미지 */}
        <div className="absolute inset-x-[calc(50%-328px)] top-[calc(50%-217.5px)] size-[300px] bg-gradient-to-l from-gray-200 to-gray-200 border border-black rounded-lg flex items-center justify-center overflow-hidden">
          <img
            className="size-full object-cover"
            src={postData.imageUrl}
            alt="product"
          />
        </div>


        {/* 가격 정보 */}
        <div className="text-[#000000] text-left absolute left-[calc(50%_-_-3px)] top-[calc(50%_-_223.5px)]">
          {postData.goodsName}
        </div>
        <div className="text-[#000000] text-left text-[28px] font-semibold absolute left-[calc(50%_-_0px)] top-[calc(50%_-_188.5px)]">
          $
        </div>
        <div className="text-[#000000] text-center text-[55px] font-bold absolute left-[calc(50%_-_-15px)] top-[calc(50%_-_200.5px)] w-[100px] h-16">
          {postData.price}
        </div>

        {/* 구매버튼 */}
        <div className="absolute left-[calc(50%-3px)] top-[calc(50%-113.5px)] w-[116px] h-[54px] rounded border border-neutral-400 p-4 flex items-center justify-center bg-gradient-to-r from-teal-500 to-green-400 shadow-lg">
          <button className="text-white">바로구매</button>
        </div>

        {/* 수량 정보 */}
        <div className="relative left-[calc(50%-3px)] top-[calc(50%-15.5px)] w-[92px] h-8 flex items-center justify-center">
          {/* 수량 배경 이미지 */}
          <img
            className="size-full rounded-none"
            src="/GoodsPost/rectangle-1140.svg"
            alt="rectangle"
          />

          {/* 수량 숫자 */}
          <div className="absolute text-[#000000] text-center">{postData.quantity}</div>

          {/* 플러스 아이콘
    <img
      className="w-6 h-7 absolute left-[calc(50%+20px)] top-[calc(50%-13.5px)]"
      src="/GoodsPost/plus0.svg"
      alt="plus"
    />*/}
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
              {postData.content}
            </div>
          </div>
        </div>

        {/* 댓글 구분선 */}
        <div className="border-solid border-[rgba(0,0,0,0.46)] border-t border-x-0 border-b-0 w-[711px] h-0 absolute left-[31px] top-[770px]"></div>

        <img
          className="w-[33px] h-[30px] absolute left-[68px] top-[730px] overflow-visible"
          src="/Post/favorite0.svg"
          alt="favorite"
        />

        <div className="text-[#000000] text-center font-['Inter-Regular',_sans-serif] text-xl font-normal absolute left-[100px] top-[730px] size-[25px] flex items-center justify-center">
          2
        </div>

        <img
          className="w-[30.64px] h-[30px] absolute left-[140px] top-[730px] overflow-visible"
          src="/Post/chat-bubble0.svg"
          alt="chat"
        />

        <div className="text-[#000000] text-center font-['Inter-Regular',_sans-serif] text-xl font-normal absolute left-[172px] top-[730px] size-[25px] flex items-center justify-center">
          4
        </div>

        {/* 댓글 */}

        <div className="text-[#000000] text-center font-['Inter-Regular',_sans-serif] text-xl font-normal absolute left-[49px] top-[780px] w-[68px] h-[34px] flex items-center justify-center">
          등록순
        </div>

        <div className="text-[#000000] text-center font-['Inter-Regular',_sans-serif] text-xl font-normal absolute left-[130px] top-[780px] w-[68px] h-[34px] flex items-center justify-center">
          최신순
        </div>

        <img
          className="w-[59px] h-[66px] absolute left-[53px] top-[825px] overflow-visible"
          src="/Post/group-368330.svg"
          alt="회원이미지"
        />

        <div className="text-[#292c33] text-center font-['Inter-Regular',_sans-serif] text-xl font-normal absolute left-[101px] top-[820px] w-[76px] h-[50px] flex items-center justify-center">
          회원1
        </div>

        <div className="text-[rgba(41,44,51,0.59)] text-center font-['Inter-Regular',_sans-serif] text-[15px] font-normal absolute left-[106px] top-[851px] w-[140px] h-[38px] flex items-center justify-center">
          2024.10.09. 22:33
        </div>

        <div className="text-[rgba(41,44,51,0.59)] text-center font-['Inter-Regular',_sans-serif] text-[15px] font-normal absolute left-[246px] top-[854px] w-24 h-8 flex items-center justify-center">
          답글 쓰기
        </div>
      </div>
    </div>
  );
};

export { GoodsPost };
