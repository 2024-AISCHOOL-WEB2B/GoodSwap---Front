// src/widgets/FormLayout.tsx

import React from "react";

// FormLayout 컴포넌트에 전달할 Props 타입 정의
interface FormLayoutProps {
  title: string; // 폼 제목
  children: React.ReactNode; // 폼 내용 (하위 컴포넌트들을 포함)
}

// 컴포넌트 정의
export const FormLayout: React.FC<FormLayoutProps> = ({ title, children }) => {
  return (
    <div className="relative flex justify-center items-start mt-6">
      {/* 폼 레이아웃 박스 */}
      <div className="w-[498px] h-[723px] border p-6 flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
        {/* 폼 제목 */}
        {children} {/* 폼 내용 렌더링 */}
      </div>
    </div>
  );
};
