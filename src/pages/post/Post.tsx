import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../shared/components/Header';
import BackgroundImage from '../../shared/components/BackgroundImage';


const Post = () => {
  const { postId } = useParams<{ postId: string }>(); // URL에서 postId를 받아옴

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-white">
      
      {/* 배경 이미지 */}
      <div className="relative w-[768px] h-[1006px] bg-white border overflow-hidden">
        <BackgroundImage src="/PostList/rectangle-970.svg" alt="rectangle" />

        {/* 나머지 요소들 */}
        <div className="relative size-full">

        {/* 상단 아이콘들 */}
        <div className="relative">
          <Header />
        </div>

        {/* 카테고리 */}
        {/* <div className="w-[130px] h-[79px]">
            <div
              className="rounded border-solid border-black border p-2 flex flex-row items-center justify-center w-[130px] h-9 absolute left-[19px] top-20 overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, rgba(8, 204, 202, 1) 0%, rgba(24, 231, 156, 1) 100%)',
              }}
            ></div>
            <div className="text-[#ffffff] text-center font-['Inter-Regular',_sans-serif] text-[28px] font-normal absolute left-[19px] top-[58px] w-[127px] h-[79px] flex items-center justify-center">
              카테고리
            </div>
          </div> */}

          <div className="text-[#292c33] text-left font-['Inter-Regular',_sans-serif] text-[50px] font-normal absolute left-[31px] top-[110px] w-[573px] h-[63px] flex items-center justify-start">
            테스트 제목
          </div>

          <img
            className="size-20 absolute left-[49px] top-[181px] overflow-visible"
            src="/Post/group-368300.svg"
            alt="user icon"
          />

          <div className="text-[#292c33] text-center font-['Inter-Regular',_sans-serif] text-[25px] font-normal absolute left-[115px] top-[179px] w-[122px] h-[55px] flex items-center justify-center">
            회원1
          </div>

          <div className="text-[rgba(41,44,51,0.59)] text-center font-['Inter-Regular',_sans-serif] text-xl font-normal absolute left-[89px] top-[223px] w-[346px] h-[34px] flex items-center justify-center">
            2024.10.09. 22:33 조회 7
          </div>

          <div className="border-solid border-[rgba(0,0,0,0.46)] border-t border-x-0 border-b-0 w-[711px] h-0 absolute left-[31px] top-[273px]"></div>

          <div
            className="bg-var-sds-color-background-brand-tertiary rounded border-solid border-neutral-tertiary border p-2 flex flex-row gap-2 items-center justify-center w-[666px] h-[50px] absolute left-[51px] top-[770px] overflow-hidden"
            style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
          >
            <div className="text-var-sds-color-text-brand-on-brand text-left relative"></div>
          </div>

          <div className="text-[#000000] text-left font-['Inter-Regular',_sans-serif] text-xl font-normal absolute left-[101.02px] top-[774.12px] w-[61.79px] h-[41.24px] flex items-center justify-start">
            클린봇
          </div>

          <img
            className="w-[28.44px] h-[27.84px] absolute left-[67.67px] top-[782.37px] overflow-visible"
            src="/Post/shield0.svg"
            alt="shield"
          />

          <img
            className="w-[59px] h-[66px] absolute left-[53px] top-[825px] overflow-visible"
            src="/Post/group-368330.svg"
            alt="group"
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

          <div className="border-solid border-[rgba(0,0,0,0.46)] border-t border-x-0 border-b-0 w-[711px] h-0 absolute left-[31px] top-[724px]"></div>

          <div className="text-[#000000] text-center font-['Inter-Regular',_sans-serif] text-xl font-normal absolute left-[188px] top-[690px] size-[25px] flex items-center justify-center">
            4
          </div>

          <div className="text-[#000000] text-center font-['Inter-Regular',_sans-serif] text-xl font-normal absolute left-[101px] top-[689px] size-[25px] flex items-center justify-center">
            2
          </div>

          <img
            className="w-[33px] h-[30px] absolute left-[68px] top-[689px] overflow-visible"
            src="/Post/favorite0.svg"
            alt="favorite"
          />

          <img
            className="w-[30.64px] h-[30px] absolute left-[157px] top-[689px] overflow-visible"
            src="/Post/chat-bubble0.svg"
            alt="chat"
          />

          <div className="text-[#000000] text-center font-['Inter-Regular',_sans-serif] text-xl font-normal absolute left-[49px] top-[719px] w-[90px] h-[43px] flex items-center justify-center">
            등록순
          </div>

          <div className="text-[rgba(0,0,0,0.59)] text-center font-['Inter-Regular',_sans-serif] text-xl font-normal absolute left-36 top-[724px] w-[68px] h-[34px] flex items-center justify-center">
            최신순
          </div>

          <img
            className="w-[31px] h-[25px] absolute left-[219px] top-[728px] overflow-visible"
            src="/Post/rotate-ccw0.svg"
            alt="rotate"
          />
        </div>

        <div
          className="text-[#000000] text-left font-['Inter-SemiBold',_sans-serif] text-[55px] leading-[120%] font-semibold absolute left-[calc(50%_-_345px)] top-[calc(50%_-_215.5px)] w-[678px] h-[388px]"
          style={{ letterSpacing: '-0.02em' }}
           >
         내용
         <br />
    </div>

      </div>
    </div>
  );
};

export default Post;
