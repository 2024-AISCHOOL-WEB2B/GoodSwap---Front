// src/features/auth/shared/PasswordField.tsx

import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ShowPasswordIcon } from "../../../shared/assets/icons/ShowPasswordIcon";
import { HidePasswordIcon } from "../../../shared/assets/icons/HidePasswordIcon";
import { ClearInputIcon } from "../../../shared/assets/icons/ClearInputIcon";
import { useAtom } from "jotai";
import { passwordAtom } from "../atoms/auth";

type PasswordFieldProps = {
  placeholder?: string;
  name: string;
  enableLocalStorage?: boolean; // 로컬 스토리지 업데이트 활성화 여부 추가
};

const PasswordField: React.FC<PasswordFieldProps> = ({
  placeholder = "비밀번호",
  name,
  enableLocalStorage = false, // 기본값: 로컬 스토리지 비활성화
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [password, setPassword] = useAtom(passwordAtom);

  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // useWatch로 입력 값을 실시간 감지
  const inputValue = useWatch({ name, defaultValue: password });

  // 입력 값이 변경될 때마다 로컬 스토리지에 업데이트 (회원가입 폼에서만 활성화)
  useEffect(() => {
    if (enableLocalStorage && name === "password") {
      setPassword(inputValue);
    }
  }, [inputValue, setPassword, enableLocalStorage, name]);

  const handleClearInput = () => {
    setValue(name, "");
    setPassword("");
  };

  const labelText = name === "password" ? "비밀번호" : "새로운 비밀번호 확인";

  return (
    <div className="mb-4 relative">
      <label htmlFor={name} className="block text-sm mb-2">
        {labelText}
      </label>
      <div className="flex items-center border-b">
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          {...register(name)}
          value={inputValue}
          className="w-full p-2 focus:outline-none"
          placeholder={placeholder}
        />
        {inputValue && (
          <ClearInputIcon
            onClick={handleClearInput}
            className="absolute right-10 top-1/2 transform -translate-y-1/2"
          />
        )}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
          {showPassword ? (
            <HidePasswordIcon onClick={togglePasswordVisibility} />
          ) : (
            <ShowPasswordIcon onClick={togglePasswordVisibility} />
          )}
        </div>
      </div>
      <div className="text-red-500 text-sm mt-1 min-h-[1.25rem]">
        {errors[name] ? String(errors[name]?.message) : ""}
      </div>
    </div>
  );
};

export { PasswordField };
