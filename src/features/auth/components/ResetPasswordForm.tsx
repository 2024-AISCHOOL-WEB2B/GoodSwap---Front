// src/features/auth/components/ResetPasswordForm.tsx

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailField } from "../shared/EmailField";
import { Modal } from "../../../widgets/Modal";
import { FormLayout } from "../../../widgets/FormLayout";
import {
  resetPasswordSchema,
  ResetPasswordSchema,
  passwordConfirmationSchema,
  PasswordConfirmationSchema,
} from "../entities/UserSchema";
import { apiClient } from "../APIs/axiosInstance";
import { AxiosError } from "axios";

export const ResetPasswordForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeValidated, setIsCodeValidated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5분 타이머

  // `resetCode` 필드를 포함하여 기본값 설정
  const methods = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      resetCode: "", // resetCode 기본값 설정
    },
  });

  const passwordMethods = useForm<PasswordConfirmationSchema>({
    resolver: zodResolver(passwordConfirmationSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, register, watch, reset } = methods;
  const email = watch("email");

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isCodeSent && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsCodeSent(false);
      setTimeLeft(300);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCodeSent, timeLeft]);

  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
      await apiClient.post("/auth/reset-password/request", {
        email: data.email,
      });
      setIsCodeSent(true);
      setErrorMessage(null);
      setShowModal(false);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        setErrorMessage("존재하지 않는 이메일입니다.");
      } else {
        setErrorMessage("인증 요청 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
      setShowModal(true);
    }
  };

  const onCodeSubmit = async () => {
    const resetCode = methods.getValues("resetCode");
    try {
      await apiClient.post("/auth/reset-password/validate-code", {
        email,
        resetCode,
      });
      setIsCodeValidated(true);
      setErrorMessage(null);
    } catch {
      setErrorMessage("인증 코드가 일치하지 않습니다.");
      setShowModal(true);
      methods.setValue("resetCode", ""); // 인증 실패 시 resetCode 초기화
    }
  };

  const onPasswordSubmit = async (data: PasswordConfirmationSchema) => {
    try {
      await apiClient.post("/auth/reset-password/update", {
        email,
        newPassword: data.password,
        confirmPassword: data.confirmPassword,
      });
      setErrorMessage("비밀번호가 성공적으로 재설정되었습니다.");
      setShowModal(true);
      reset(); // 폼 초기화
    } catch {
      setErrorMessage("비밀번호 재설정에 실패했습니다. 다시 시도해주세요.");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (errorMessage === "비밀번호가 성공적으로 재설정되었습니다.") {
      // 비밀번호 재설정 성공 시, 로그인 페이지로 이동
      window.location.href = "/login";
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <FormProvider {...methods}>
      <FormLayout title="비밀번호 재설정">
        <form onSubmit={handleSubmit(onSubmit)}>
          <EmailField />
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-custom_magenta to-custom_appricot text-white font-semibold rounded mt-4"
          >
            이메일 인증
          </button>
        </form>

        {isCodeSent && !isCodeValidated && (
          <div className="mt-4">
            <label className="block text-gray-700">인증 코드 입력</label>
            <input
              type="text"
              {...register("resetCode")}
              className="w-full mt-2 p-2 border rounded"
              placeholder="인증 코드를 입력하세요"
            />
            <button
              onClick={onCodeSubmit}
              className="w-full py-2 bg-gradient-to-r from-custom_magenta to-custom_appricot text-white font-semibold rounded mt-2"
            >
              확인
            </button>
            <p className="text-gray-500">남은 시간: {formatTime(timeLeft)}</p>
          </div>
        )}

        {isCodeValidated && (
          <FormProvider {...passwordMethods}>
            <form onSubmit={passwordMethods.handleSubmit(onPasswordSubmit)}>
              <div className="mt-4">
                <label className="block text-gray-700">새 비밀번호</label>
                <input
                  type="password"
                  {...passwordMethods.register("password")}
                  className="w-full mt-2 p-2 border rounded"
                  placeholder="새 비밀번호를 입력하세요"
                />
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">비밀번호 확인</label>
                <input
                  type="password"
                  {...passwordMethods.register("confirmPassword")}
                  className="w-full mt-2 p-2 border rounded"
                  placeholder="비밀번호를 다시 입력하세요"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-custom_magenta to-custom_appricot text-white font-semibold rounded mt-4"
              >
                비밀번호 재설정
              </button>
            </form>
          </FormProvider>
        )}

        {showModal && (
          <Modal isVisible={showModal} onClose={closeModal}>
            <h2 className="text-red-500 mb-4">{errorMessage}</h2>
          </Modal>
        )}

        {isCodeSent && !isCodeValidated && (
          <p className="text-green-500 mt-4">
            인증 코드가 이메일로 발송되었습니다.
          </p>
        )}
      </FormLayout>
    </FormProvider>
  );
};
