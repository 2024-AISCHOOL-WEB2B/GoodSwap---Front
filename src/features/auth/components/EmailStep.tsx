// src/features/auth/components/EmailStep.tsx

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailField } from "../shared/EmailField";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { loginSchema } from "../entities/UserSchema";

// `EmailStep` 컴포넌트 타입 정의
type EmailStepProps = {
  onNext: () => void; // 다음 스텝으로 이동하는 콜백 함수
};

const EmailStep: React.FC<EmailStepProps> = ({ onNext }) => {
  const [storedEmail, setStoredEmail] = useLocalStorage("email", "");

  const methods = useForm({
    resolver: zodResolver(loginSchema.pick({ email: true })),
    mode: "onChange",
    defaultValues: { email: storedEmail || "" },
  });

  const { handleSubmit } = methods;

  // 폼 제출 시 호출되는 함수
  const onSubmit = (data: { email: string }) => {
    // 서버와 통신하여 이메일 중복 확인을 할 수 있습니다.
    // 예시로 이메일을 로컬에 저장하고 다음 스텝으로 이동합니다.
    setStoredEmail(data.email);

    onNext();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailField />
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

export { EmailStep };
