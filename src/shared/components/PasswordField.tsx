// src/shared/components/PasswordField.tsx

import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

// 인터페이스 정의
interface PasswordFieldProps {
  register: UseFormRegisterReturn; // React Hook Form에서 제공하는 register 반환 타입
  errorMessage?: string; // 오류 메시지 (선택적 프로퍼티)
  placeholder?: string; // placeholder를 props로 받도록 설정
}

// PasswordField 컴포넌트 정의
const PasswordField: React.FC<PasswordFieldProps> = ({
  register,
  errorMessage,
  placeholder = "비밀번호", // 기본 placeholder 설정
}) => (
  <div className="mb-4">
    <label htmlFor="password" className="block text-sm mb-2">
      비밀번호
    </label>
    <input
      id="password"
      type="password"
      {...register} // React Hook Form의 register 속성을 통해 폼 필드 등록
      className="w-full p-2 border"
      placeholder={placeholder} // placeholder를 props로 사용
    />
    {errorMessage && ( // 오류 메시지가 있을 경우 화면에 표시
      <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
    )}
  </div>
);

// React.memo로 컴포넌트 감싸기 및 displayName 설정
const MemoizedPasswordField = React.memo(PasswordField);
MemoizedPasswordField.displayName = "PasswordField";

export { MemoizedPasswordField as PasswordField };
