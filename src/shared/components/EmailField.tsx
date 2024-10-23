// src/shared/components/EmailField.tsx

import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

// 인터페이스 정의
interface EmailFieldProps {
  register: UseFormRegisterReturn; // React Hook Form에서 제공하는 register 반환 타입
  errorMessage?: string; // 오류 메시지 (선택적 프로퍼티)
}

// EmailField 컴포넌트 정의
export const EmailField: React.FC<EmailFieldProps> = ({
  register,
  errorMessage,
}) => (
  <div className="mb-4">
    <label htmlFor="email" className="block text-sm mb-2">
      이메일
    </label>
    <input
      id="email"
      type="email"
      {...register}
      className="w-full p-2 border"
      placeholder="your@email.com"
    />
    {errorMessage && ( // 오류 메시지가 있을 경우 화면에 표시
      <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
    )}
  </div>
);
