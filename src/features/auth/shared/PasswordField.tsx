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
  name,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // name 속성에 따라 동적으로 라벨 텍스트 설정
  const labelText =
    name === "password" ? "새로운 비밀번호" : "새로운 비밀번호 확인";

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm mb-2">
        {labelText}
      </label>
      <input
        id={name}
        type="password"
        {...register(name)}
        className="w-full p-2 border"
        placeholder={placeholder}
      />
      {errors[name] && ( // 오류 메시지가 있을 경우 화면에 표시
        <p className="text-red-500 text-sm mt-1">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
};

const MemoizedPasswordField = React.memo(PasswordField);
MemoizedPasswordField.displayName = "PasswordField";

export { MemoizedPasswordField as PasswordField };
