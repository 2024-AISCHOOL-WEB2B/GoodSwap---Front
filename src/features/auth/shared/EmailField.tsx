// src/features/auth/shared/EmailField.tsx

import React from "react";
import { useFormContext } from "react-hook-form";

type EmailFieldProps = {
  placeholder?: string; // placeholder를 props로 받도록 설정
};

// EmailField 컴포넌트 정의
const EmailField: React.FC<EmailFieldProps> = ({
  placeholder = "your@email.com",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label htmlFor="email" className="block text-sm mb-2">
        이메일
      </label>
      <input
        id="user_email"
        type="email"
        {...register("user_email")}
        className="w-full p-2 border"
        placeholder={placeholder}
      />
      {errors.email && ( // 오류 메시지가 있을 경우 화면에 표시
        <p className="text-red-500 text-sm mt-1">
          {String(errors.email.message)}
        </p>
      )}
    </div>
  );
};

const MemoizedEmailField = React.memo(EmailField);
MemoizedEmailField.displayName = "EmailField";

export { MemoizedEmailField as EmailField };
