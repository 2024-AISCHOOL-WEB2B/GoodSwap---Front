// src/features/auth/shared/EmailField.tsx

import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ClearInputIcon } from "../../../shared/assets/icons/ClearInputIcon";
import { useAtom } from "jotai";
import { emailAtom } from "../atoms/auth";

type EmailFieldProps = {
  placeholder?: string;
  enableLocalStorage?: boolean; // 로컬 스토리지 업데이트 활성화 여부 추가
};

const EmailField: React.FC<EmailFieldProps> = ({
  placeholder = "your@email.com",
  enableLocalStorage = false, // 기본값: 로컬 스토리지 비활성화
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [email, setEmail] = useAtom(emailAtom);

  const handleClearInput = () => {
    setValue("email", "");
    setEmail("");
  };

  // useWatch로 입력 값을 실시간 감지
  const inputValue = useWatch({ name: "email", defaultValue: email });

  // 입력 값이 변경될 때마다 로컬 스토리지에 업데이트 (회원가입 폼에서만 활성화)
  useEffect(() => {
    if (enableLocalStorage) {
      setEmail(inputValue);
    }
  }, [inputValue, setEmail, enableLocalStorage]);

  return (
    <div className="mb-4 relative">
      <label htmlFor="email" className="block text-sm mb-2">
        이메일
      </label>
      <div className="flex items-center border-b">
        <input
          id="email"
          type="email"
          {...register("email")}
          value={inputValue}
          className="w-full p-2 focus:outline-none"
          placeholder={placeholder}
        />
        {inputValue && (
          <ClearInputIcon
            onClick={handleClearInput}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          />
        )}
      </div>
      <div className="text-red-500 text-sm mt-1 min-h-[1.25rem]">
        {errors.email ? String(errors.email.message) : ""}
      </div>
    </div>
  );
};

export { EmailField };
