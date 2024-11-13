import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../shared/components/Header';
import QuillEditor from '../../features/post/components/QuillEditor';
import BackgroundFrame from '../../shared/components/BackgroundFrame';
import ImageUploader from '../../shared/components/ImageUploader';




//굿즈 가격, 이름, 아티스트, 카테고리 입력 필드의 데이터를 goodsPostAtom에 저장하고, GoodsPostPage에서 표시되도록 구현할 예정




const PostCreate: React.FC = () => {

  const navigate = useNavigate();

  // 뒤로가기 기능
  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

         {/* 배경 이미지 */}
          <div className="relative w-[768px] h-[1006px] bg-white border overflow-hidden">
          <BackgroundFrame />


         {/* 상단 아이콘들 */}
         <div className="relative">
          <Header />
         </div>



        <div className="w-[712px] h-[539px] static">



         <div className="text-[#292c33] text-center font-['Inter-Regular',_sans-serif] text-[13px] font-normal absolute left-[calc(50%_-_326px)] top-[calc(50%_-_440px)] w-[55px] h-[18px] flex items-center justify-center">
          아티스트
         </div>
         <div className="flex flex-col gap-var-sds-size-space-200 items-start justify-start w-[301px] h-[30px] absolute left-[calc(50%_-_333px)] top-[calc(50%_-_420px)]">
          <div className="bg-var-sds-color-background-default-default rounded-[7.8px] border-solid border-var-sds-color-border-default-secondary border-[0.36px] p-var-sds-size-space-300 flex flex-row gap-0 items-center justify-start self-stretch flex-1 min-w-[86.45px] relative overflow-hidden"></div>
         </div>


         <div className="text-[#292c33] text-center font-['Inter-Regular',_sans-serif] text-[13px] font-normal absolute left-[calc(50%_-_326px)] top-[calc(50%_-_380px)] w-[55px] h-[18px] flex items-center justify-center">
          굿즈이름
         </div>
         <div className="flex flex-col gap-var-sds-size-space-200 items-start justify-start w-[301px] h-[30px] absolute left-[calc(50%_-_333px)] top-[calc(50%_-_360px)]">
          <div className="bg-var-sds-color-background-default-default rounded-[7.8px] border-solid border-var-sds-color-border-default-secondary border-[0.36px] p-var-sds-size-space-300 flex flex-row gap-0 items-center justify-start self-stretch flex-1 min-w-[86.45px] relative overflow-hidden"></div>
         </div>


         <div className="text-[#292c33] text-center font-['Inter-Regular',_sans-serif] text-[13px] font-normal absolute left-[calc(50%_-_326px)] top-[calc(50%_-_320px)] w-[60px] h-[18px] flex items-center justify-center">
          굿즈가격
         </div>
         <div className="flex flex-col gap-var-sds-size-space-200 items-start justify-start w-[301px] h-[30px] absolute left-[calc(50%_-_333px)] top-[calc(50%_-_300px)]">
          <div className="bg-var-sds-color-background-default-default rounded-[7.8px] border-solid border-var-sds-color-border-default-secondary border-[0.36px] p-var-sds-size-space-300 flex flex-row gap-0 items-center justify-start self-stretch flex-1 min-w-[86.45px] relative overflow-hidden"></div>
         </div>


         <div className="text-[#292c33] text-center font-['Inter-Regular',_sans-serif] text-[13px] font-normal absolute left-[calc(50%_-_326px)] top-[calc(50%_-_260px)] w-[60px] h-[18px] flex items-center justify-center">
          굿즈수량
         </div>
         <div className="flex flex-col gap-var-sds-size-space-200 items-start justify-start w-[301px] h-[30px] absolute left-[calc(50%_-_333px)] top-[calc(50%_-_240px)]">
          <div className="bg-var-sds-color-background-default-default rounded-[7.8px] border-solid border-var-sds-color-border-default-secondary border-[0.36px] p-var-sds-size-space-300 flex flex-row gap-0 items-center justify-start self-stretch flex-1 min-w-[86.45px] relative overflow-hidden"></div>
         </div>


         <div className="text-[#292c33] text-center font-['Inter-Regular',_sans-serif] text-[13px] font-normal absolute left-[calc(50%_-_326px)] top-[calc(50%_-_200px)] w-10 h-[18px] flex items-center justify-center">
          제목
         </div>
         <div className="flex flex-col gap-var-sds-size-space-200 items-start justify-start w-[301px] h-[30px] absolute left-[calc(50%_-_333px)] top-[calc(50%_-_180px)]">
          <div className="bg-var-sds-color-background-default-default rounded-[7.8px] border-solid border-var-sds-color-border-default-secondary border-[0.36px] p-var-sds-size-space-300 flex flex-row gap-0 items-center justify-start self-stretch flex-1 min-w-[86.45px] relative overflow-hidden"></div>
         </div>


          {/* 이미지 업로더 */}
          <div className="absolute left-[calc(50%_-_-70px)] top-[calc(50%_-_420px)]">
            <ImageUploader />
          </div>

        

         {/* QuillEditor */}
          {/* <div>
            <div className="bg-[#d9d9d9] w-[666px] h-[587px] absolute left-[calc(50%_-_333px)] top-[calc(50%_-_177px)]"></div>
          </div> */}
         
         <div className="absolute left-[calc(50%_-_333px)] top-[calc(50%_-_130px)]   bg-white">
          <QuillEditor className="h-[500px]" />
         </div>

         
        {/* 작성완료 버튼 */}
        <div
          className="rounded-lg border border-gray-400 p-4 flex items-center justify-center w-[92px] h-10 absolute left-[calc(50%_-_-259px)] top-[calc(50%_-_-421.5px)] bg-gradient-to-r from-[#08CCC8] to-[#18E79C] shadow-md"
        >
          <div className="text-white flex items-center justify-center whitespace-nowrap">
            작성완료
          </div>
        </div>


         {/* 뒤로 가기 버튼 */}
         <div className="bg-white rounded-lg border border-gray-400 p-4 flex items-center justify-center w-[88px] h-10 absolute left-[calc(50%_-_-157px)] top-[calc(50%_-_-421.5px)] overflow-hidden">
          <div className="text-green-500 w-[51px] h-4" />
         </div>

         <div onClick={handleGoBack} className="text-black text-center font-['Inter-Regular',_sans-serif] text-xl font-normal absolute left-[calc(50%_-_-173px)] top-[calc(50%_-_-431.5px)] w-[53px] h-5 flex items-center justify-center">
            취소
         </div>
        </div>


      </div> 
    </div>
  );
};

export default PostCreate;
