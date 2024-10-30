// src/features/auth/components/PasswordStep.tsx

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordField } from "../shared/PasswordField";
import { useSessionStorage } from "../hooks/useSessionStorage";

// 비밀번호 유효성 검사 스키마
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
      .max(32, { message: "비밀번호는 최대 32자까지만 가능합니다." })
      .regex(/[a-zA-Z]/, "비밀번호에는 영문자가 포함되어야 합니다.")
      .regex(/[0-9]/, "비밀번호에는 숫자가 포함되어야 합니다.")
      .regex(/[\W_]/, "비밀번호에는 특수문자가 포함되어야 합니다."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

// `PasswordStep` 컴포넌트 타입 정의
interface PasswordStepProps {
  onNext: () => void; // 다음 스텝으로 이동하는 콜백 함수
}

const PasswordStep: React.FC<PasswordStepProps> = ({ onNext }) => {
  const [storedPassword, setStoredPassword] = useSessionStorage("password", "");

  // React Hook Form을 이용한 폼 관리
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
    defaultValues: { password: storedPassword, confirmPassword: "" },
  });

  // 폼 제출 시 호출되는 함수
  const onSubmit = (data: { password: string; confirmPassword: string }) => {
    setStoredPassword(data.password); // 비밀번호를 세션 스토리지에 저장
    onNext(); // 다음 스텝으로 이동
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PasswordField
          register={register("password")}
          errorMessage={errors.password?.message}
        />
        <PasswordField
          register={register("confirmPassword")}
          errorMessage={errors.confirmPassword?.message}
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

export { PasswordStep };
