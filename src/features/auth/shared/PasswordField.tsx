// src/features/auth/shared/PasswordField.tsx

import React from "react";
import { useFormContext } from "react-hook-form";

type PasswordFieldProps = {
  placeholder?: string; // placeholder를 props로 받도록 설정
  name: string;
};

// PasswordField 컴포넌트 정의
const PasswordField: React.FC<PasswordFieldProps> = ({
  placeholder = "비밀번호",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label htmlFor="password" className="block text-sm mb-2">
        비밀번호
      </label>
      <input
        id="user_pw"
        type="password"
        {...register("user_pw")}
        className="w-full p-2 border"
        placeholder={placeholder}
      />
      {errors.password && ( // 오류 메시지가 있을 경우 화면에 표시
        <p className="text-red-500 text-sm mt-1">
          {String(errors.password.message)}
        </p>
      )}
    </div>
  );
};

const MemoizedPasswordField = React.memo(PasswordField);
MemoizedPasswordField.displayName = "PasswordField";

export { MemoizedPasswordField as PasswordField };
