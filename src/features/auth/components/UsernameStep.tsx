// src/features/auth/components/UsernameStep.tsx

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { usernameSchema } from "../entities/UserSchema";

// `UsernameStep` 컴포넌트 타입 정의
type UsernameStepProps = {
  onNext: () => void; // 다음 스텝으로 이동하는 콜백 함수
  onPrevious: () => void; // 이전 단계로 이동하는 콜백 함수
};

const UsernameStep: React.FC<UsernameStepProps> = ({ onNext, onPrevious }) => {
  const [storedUsername, setStoredUsername] = useSessionStorage("username", "");

  // React Hook Form을 이용한 폼 관리
  const methods = useForm({
    resolver: zodResolver(usernameSchema),
    mode: "onBlur",
    defaultValues: { username: storedUsername || "" },
  });

  const { handleSubmit } = methods;

  // 폼 제출 시 호출되는 함수
  const onSubmit = (data: { username: string }) => {
    setStoredUsername(data.username); // 유저네임을 세션 스토리지에 저장
    onNext(); // 다음 스텝으로 이동
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-center text-gray-500 text-sm mb-4">
          5–32자 길이로 숫자, 특수문자 조합의 공통 닉네임이며, 나중에 계정
          설정에서 변경할 수 있습니다.
        </p>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm mb-2">
            닉네임
          </label>
          <input
            id="username"
            type="text"
            {...methods.register("username")}
            className="w-full p-2 border"
            placeholder="닉네임을 입력하세요"
          />
          {methods.formState.errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {methods.formState.errors.username.message}
            </p>
          )}
        </div>
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

export { UsernameStep };
