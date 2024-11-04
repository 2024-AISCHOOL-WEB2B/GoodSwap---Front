// src/widgets/FormLayout.tsx

import React from "react";

// FormLayout 컴포넌트에 전달할 Props 타입 정의
interface FormLayoutProps {
  title: string; // 폼 제목
  children: React.ReactNode; // 폼 내용
  width?: string; // 폼 너비 (기본값: 498px)
  height?: string; // 폼 높이 (기본값: 723px)
}

// FormLayout 컴포넌트 정의
const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  children,
  width = "498px", // 기본 너비 설정
  height = "723px", // 기본 높이 설정
}) => {
  return (
    <div className="relative flex justify-center items-start mt-6">
      <div
        className="non-border rounded-lg bg-white p-6 flex flex-col justify-center shadow-lg"
        style={{ width, height }} // width와 height를 props로 받아 동적으로 설정
      >
        <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
        {children}
      </div>
    </div>
  );
};

// React.memo로 컴포넌트 감싸기 및 displayName 설정
const MemoizedFormLayout = React.memo(FormLayout);
MemoizedFormLayout.displayName = "FormLayout";

// FormLayout 컴포넌트를 named export로 내보내기
export { MemoizedFormLayout as FormLayout };
