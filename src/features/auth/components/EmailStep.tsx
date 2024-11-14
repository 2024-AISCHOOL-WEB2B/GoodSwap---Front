// src/features/auth/components/EmailStep.tsx

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { EmailField } from "../shared/EmailField";
import { loginSchema } from "../entities/UserSchema";
import { emailAtom } from "../atoms/auth";
import { Modal } from "../../../widgets/Modal";
import axios from "axios";

type EmailStepProps = {
  onNext: () => void;
};

const EmailStep: React.FC<EmailStepProps> = ({ onNext }) => {
  const [email, setEmail] = useAtom(emailAtom);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const methods = useForm({
    resolver: zodResolver(loginSchema.pick({ email: true })),
    mode: "onChange",
    defaultValues: { email: email || "" },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: { email: string }) => {
    try {
      const response = await axios.get(
        `/auth/check-email?email=${data.email}`,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      );

      if (response.status === 200) {
        // 중복되지 않은 이메일일 때 이메일 상태를 업데이트하고 다음 단계로 이동
        setEmail(data.email);
        onNext();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        // 409 응답일 때: 이미 존재하는 이메일임을 알리는 모달을 표시
        setErrorMessage("이미 존재하는 이메일 주소입니다.");
        setShowModal(true);
        methods.setValue("email", ""); // 이메일 필드 초기화
      } else {
        // 예기치 않은 오류 처리
        console.error("API call error:", error);
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
        setShowModal(true);
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailField />
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-custom_magenta to-custom_appricot text-white font-semibold rounded transform transition-transform duration-200 hover:scale-95"
        >
          다음
        </button>
        {showModal && (
          <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
            <p>{errorMessage}</p>
          </Modal>
        )}
      </form>
    </FormProvider>
  );
};

export { EmailStep };
