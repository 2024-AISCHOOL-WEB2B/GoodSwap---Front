// src/features/auth/components/UsernameStep.tsx

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { usernameSchema } from "../entities/UserSchema";
import { usernameAtom, emailAtom, passwordAtom } from "../atoms/auth";
import { Modal } from "../../../widgets/Modal";
import { axiosInstance } from "../APIs/axiosInstance";
import { submitRegistrationForm } from "../utils/formHandlers";
import { AxiosError } from "axios";

// `UsernameStep` 컴포넌트 타입 정의
type UsernameStepProps = {
  onNext: () => void; // 다음 스텝으로 이동하는 콜백 함수
  onPrevious: () => void; // 이전 단계로 이동하는 콜백 함수
};

const UsernameStep: React.FC<UsernameStepProps> = ({ onNext, onPrevious }) => {
  const [username, setUsername] = useAtom(usernameAtom); // 유저네임 상태 관리
  const [email] = useAtom(emailAtom); // 최종 제출 시 사용
  const [password] = useAtom(passwordAtom); // 최종 제출 시 사용
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 에러 메시지 상태

  // React Hook Form과 Zod를 이용한 폼 설정 및 유효성 검사
  const methods = useForm({
    resolver: zodResolver(usernameSchema), // 유저네임 필드 유효성 검사 설정
    mode: "onChange",
    defaultValues: { username }, // Atom에서 초기값 로드
  });

  const { handleSubmit } = methods;

  // 폼 제출 및 유저네임 중복 확인 함수
  const onSubmit = async (data: { username: string }) => {
    try {
      const response = await axiosInstance.post("/check-username", {
        username: data.username,
      });

      if (response.status === 200) {
        setUsername(data.username);
        await submitRegistrationForm(
          { email, password, username: data.username },
          () => onNext(),
          (errorMessage) => {
            setErrorMessage(errorMessage);
            setShowModal(true);
          }
        );
      }
    } catch (error) {
      if ((error as AxiosError).response?.status === 409) {
        setErrorMessage("이미 사용 중인 닉네임입니다.");
        setShowModal(true);
        methods.setValue("username", "");
      } else {
        setErrorMessage("오류가 발생했습니다. 다시 시도해주세요.");
        setShowModal(true);
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-center text-gray-500 text-sm mb-4 whitespace-pre-line">
          5–32자 길이로 숫자, 특수문자 조합의 공통 닉네임이며,{"\n"}
          나중에 계정 설정에서 변경할 수 있습니다.
        </p>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm mb-2">
            닉네임
          </label>
          <input
            id="username"
            type="text"
            {...methods.register("username")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        {showModal && (
          <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
            <p>{errorMessage}</p>
          </Modal>
        )}
      </form>
    </FormProvider>
  );
};

export { UsernameStep };
