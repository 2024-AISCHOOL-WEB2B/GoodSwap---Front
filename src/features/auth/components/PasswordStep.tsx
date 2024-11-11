// src/features/auth/components/PasswordStep.tsx

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordField } from "../shared/PasswordField";
import { useAtom } from "jotai";
import { passwordConfirmationSchema } from "../entities/UserSchema";
import { passwordAtom } from "../atoms/auth";

type PasswordStepProps = {
  onNext: () => void;
  onPrevious: () => void;
};

const PasswordStep: React.FC<PasswordStepProps> = ({ onNext, onPrevious }) => {
  const [password, setPassword] = useAtom(passwordAtom);

  const methods = useForm({
    resolver: zodResolver(passwordConfirmationSchema),
    mode: "onChange",
    defaultValues: { password: password || "", confirmPassword: "" },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: { password: string; confirmPassword: string }) => {
    setPassword(data.password);
    onNext();
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
