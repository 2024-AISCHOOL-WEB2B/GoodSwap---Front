// src/features/auth/components/UsernameStep.tsx

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSessionStorage } from "../hooks/useSessionStorage";

// 유저네임 유효성 검사 스키마
const usernameSchema = z.object({
  username: z
    .string()
    .min(1, { message: "닉네임은 최소 1자 이상이어야 합니다." })
    .max(32, { message: "닉네임은 최대 32자까지만 가능합니다." })
    .regex(
      /^[a-zA-Z0-9]+$/,
      "닉네임에는 특수문자나 공백을 사용할 수 없습니다."
    ),
});

// `UsernameStep` 컴포넌트 타입 정의
interface UsernameStepProps {
  onNext: () => void; // 다음 스텝으로 이동하는 콜백 함수
}

const UsernameStep: React.FC<UsernameStepProps> = ({ onNext }) => {
  const [storedUsername, setStoredUsername] = useSessionStorage("username", "");

  // React Hook Form을 이용한 폼 관리
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(usernameSchema),
    mode: "onChange",
    defaultValues: { username: storedUsername },
  });

  // 폼 제출 시 호출되는 함수
  const onSubmit = (data: { username: string }) => {
    setStoredUsername(data.username); // 유저네임을 세션 스토리지에 저장
    onNext(); // 다음 스텝으로 이동
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm mb-2">
            닉네임을 입력해주세요
          </label>
          <input
            id="username"
            type="text"
            {...register("username")}
            className="w-full p-2 border"
            placeholder="닉네임을 입력하세요"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
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

export { UsernameStep };
