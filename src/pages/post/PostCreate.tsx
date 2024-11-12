import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../shared/components/Header';
import QuillEditor from '../../features/post/components/QuillEditor';
import BackgroundFrame from '../../shared/components/BackgroundFrame';


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

         <div className="text-[#292c33] text-center font-['Inter-Regular',_sans-serif] text-[13px] font-normal absolute left-[calc(50%_-_326px)] top-[calc(50%_-_353px)] w-[55px] h-[18px] flex items-center justify-center">
          아티스트
         </div>
         <div className="flex flex-col gap-var-sds-size-space-200 items-start justify-start w-[301px] h-[30px] absolute left-[calc(50%_-_333px)] top-[calc(50%_-_330px)]">
          <div className="bg-var-sds-color-background-default-default rounded-[7.8px] border-solid border-var-sds-color-border-default-secondary border-[0.36px] p-var-sds-size-space-300 flex flex-row gap-0 items-center justify-start self-stretch flex-1 min-w-[86.45px] relative overflow-hidden"></div>
         </div>

         <div className="flex flex-col gap-var-sds-size-space-200 items-start justify-start w-[301px] h-[30px] absolute left-[calc(50%_-_-32px)] top-[calc(50%_-_330px)]">
          <div className="bg-var-sds-color-background-default-default rounded-[7.8px] border-solid border-var-sds-color-border-default-secondary border-[0.36px] p-var-sds-size-space-300 flex flex-row gap-0 items-center justify-start self-stretch flex-1 min-w-[86.45px] relative overflow-hidden"></div>
         </div>
         <div className="text-[#292c33] text-center font-['Inter-Regular',_sans-serif] text-[13px] font-normal absolute left-[calc(50%_-_-38px)] top-[calc(50%_-_353px)] w-[60px] h-[18px] flex items-center justify-center">
          카테고리
         </div>

         
         <div className="text-[#292c33] text-center font-['Inter-Regular',_sans-serif] text-[13px] font-normal absolute left-[calc(50%_-_326px)] top-[calc(50%_-_268px)] w-10 h-[18px] flex items-center justify-center">
          제목
         </div>
         <div className="flex flex-col gap-var-sds-size-space-200 items-start justify-start w-[666px] h-[30px] absolute left-[calc(50%_-_333px)] top-[calc(50%_-_245px)]">
          <div className="bg-var-sds-color-background-default-default rounded-[7.8px] border-solid border-var-sds-color-border-default-secondary border-[0.36px] p-var-sds-size-space-300 flex flex-row gap-0 items-center justify-start self-stretch flex-1 min-w-[86.45px] relative overflow-hidden"></div>
         </div>


        
         {/* QuillEditor */}
          {/* <div>
            <div className="bg-[#d9d9d9] w-[666px] h-[587px] absolute left-[calc(50%_-_333px)] top-[calc(50%_-_177px)]"></div>
          </div> */}
         
         <div className="absolute left-[calc(50%_-_333px)] top-[calc(50%_-_177px)]   bg-white">
          <QuillEditor />
         </div>

         
         {/* 작성완료 버튼 */}
         <div
            className="rounded-lg border border-gray-400 p-4 flex items-center justify-center w-[92px] h-10 absolute left-[calc(50%_-_-259px)] top-[calc(50%_-_-421.5px)]"
            style={{
              background: 'linear-gradient(90deg, rgba(8, 204, 202, 1) 0%, rgba(24, 231, 156, 1) 100%)',
            }}
          >
            <div className="text-green-600 flex items-center justify-center whitespace-nowrap">작성완료</div>
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
