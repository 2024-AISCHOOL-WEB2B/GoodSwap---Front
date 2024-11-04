// src/features/auth/components/PasswordStep.tsx

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordField } from "../shared/PasswordField";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { loginSchema } from "../entities/UserSchema";

// `PasswordStep` 컴포넌트 타입 정의
type PasswordStepProps = {
  onNext: () => void; // 다음 스텝으로 이동하는 콜백 함수
};

const PasswordStep: React.FC<PasswordStepProps> = ({ onNext }) => {
  const [storedPassword, setStoredPassword] = useSessionStorage("password", "");

  // React Hook Form을 이용한 폼 관리
  const methods = useForm({
    resolver: zodResolver(loginSchema.pick({ password: true })),
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
        <PasswordField name="password" />
        <PasswordField name="confirmPassword" />
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-custom_magenta to-custom_appricot text-white font-semibold rounded"
        >
          다음
        </button>
      </form>
    </FormProvider>
  );
};

export { PasswordStep };
