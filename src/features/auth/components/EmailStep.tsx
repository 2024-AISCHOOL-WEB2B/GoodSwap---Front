// src/features/auth/components/EmailStep.tsx

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailField } from "../shared/EmailField";
import { useSessionStorage } from "../hooks/useSessionStorage";

// 이메일 유효성 검사 스키마
const emailSchema = z.object({
  email: z.string().email({ message: "유효한 이메일을 입력해주세요." }),
});

// `EmailStep` 컴포넌트 타입 정의
interface EmailStepProps {
  onNext: () => void; // 다음 스텝으로 이동하는 콜백 함수
}

const EmailStep: React.FC<EmailStepProps> = ({ onNext }) => {
  const [storedEmail, setStoredEmail] = useSessionStorage("email", "");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // React Hook Form을 이용한 폼 관리
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
    defaultValues: { email: storedEmail },
  });

  // 폼 제출 시 호출되는 함수
  const onSubmit = (data: { email: string }) => {
    // 서버와 통신하여 이메일 중복 확인을 할 수 있습니다.
    // 예시로 이메일을 세션에 저장하고 다음 스텝으로 이동합니다.
    setStoredEmail(data.email);
    setErrorMessage(null);
    onNext();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailField
          register={register("email")}
          errorMessage={errors.email?.message || errorMessage}
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded"
        >
          다음
        </button>
      </form>
    </div>
  );
};

export { EmailStep };
