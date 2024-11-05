// src/features/auth/components/PasswordStep.tsx

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordField } from "../shared/PasswordField";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { passwordConfirmationSchema } from "../entities/UserSchema";

// `PasswordStep` 컴포넌트 타입 정의
type PasswordStepProps = {
  onNext: () => void; // 다음 스텝으로 이동하는 콜백 함수
  onPrevious: () => void; // 이전 단계로 이동하는 콜백 함수
};

const PasswordStep: React.FC<PasswordStepProps> = ({ onNext, onPrevious }) => {
  const [storedPassword, setStoredPassword] = useSessionStorage("password", "");

  // React Hook Form을 이용한 폼 관리
  const methods = useForm({
    resolver: zodResolver(passwordConfirmationSchema),
    mode: "onBlur",
    defaultValues: { password: storedPassword || "", confirmPassword: "" },
  });

  const { handleSubmit } = methods;

  // 폼 제출 시 호출되는 함수
  const onSubmit = (data: { password: string; confirmPassword: string }) => {
    setStoredPassword(data.password); // 비밀번호를 세션 스토리지에 저장
    onNext(); // 다음 스텝으로 이동
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PasswordField name="password" placeholder="새로운 비밀번호" />
        <div className="text-sm text-gray-500 my-5">
          8 - 32자 영문, 숫자, 특수문자 포함해야 합니다.
        </div>
        <PasswordField
          name="confirmPassword"
          placeholder="새로운 비밀번호 확인"
        />
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-custom_magenta to-custom_appricot text-white font-semibold rounded"
        >
          다음
        </button>
        <p
          onClick={onPrevious}
          className="text-center mt-4 text-gray-400 hover:text-custom_magenta cursor-pointer underline"
        >
          이전
        </p>
      </form>
    </FormProvider>
  );
};

export { PasswordStep };
