// src/features/auth/components/UsernameStep.tsx

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { usernameSchema } from "../entities/UserSchema";
import { usernameAtom, emailAtom, passwordAtom } from "../atoms/auth";
import { Modal } from "../../../widgets/Modal";
import { submitRegistrationForm } from "../utils/formHandlers";
import axios from "axios";

type UsernameStepProps = {
  onPrevious: () => void;
  onSuccess: () => void;
};

const UsernameStep: React.FC<UsernameStepProps> = ({
  onPrevious,
  onSuccess,
}) => {
  const [username, setUsername] = useAtom(usernameAtom);
  const [email] = useAtom(emailAtom);
  const [password] = useAtom(passwordAtom);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const methods = useForm({
    resolver: zodResolver(usernameSchema),
    mode: "onChange",
    defaultValues: { username: username || "" },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: { username: string }) => {
    try {
      const response = await axios.get(
        `/auth/check-nickname?nickname=${data.username}`,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      );

      if (response.status === 200) {
        setUsername(data.username);
        await submitRegistrationForm(
          email || "",
          password || "",
          password || "",
          data.username
        );
        onSuccess(); // 성공 모달 표시를 위한 콜백 호출
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        setErrorMessage("이미 존재하는 닉네임입니다.");
        setShowModal(true);
        methods.setValue("username", ""); // 입력 필드 초기화
      } else {
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
        setShowModal(true);
        console.error("알 수 없는 오류 발생", error);
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-center text-gray-500 text-sm mb-4 whitespace-pre-line">
          5–32자 길이로 일반 문자, 숫자 조합의 공통 닉네임이며,{"\n"}
          나중에 계정 설정에서 변경할 수 있습니다.
        </p>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm mb-2">
            닉네임
          </label>
          <div className="flex items-center border-b">
            <input
              id="username"
              type="text"
              {...methods.register("username")}
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 focus:outline-none"
              placeholder="닉네임을 입력하세요"
            />
          </div>
          <div className="text-red-500 text-sm mt-1 min-h-[1.25rem]">
            {methods.formState.errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {methods.formState.errors.username.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-custom_magenta to-custom_appricot text-white font-semibold rounded transform transition-transform duration-200 hover:scale-95"
        >
          가입하기
        </button>
        <p
          onClick={onPrevious}
          className="text-center mt-4 text-gray-400 hover:text-custom_magenta cursor-pointer underline"
        >
          이전
        </p>
        {showModal && (
          <Modal
            isVisible={showModal}
            onClose={() => {
              setShowModal(false);
              methods.reset({ username: "" }); // 닫기 시 필드 초기화
            }}
          >
            <p>{errorMessage}</p>
          </Modal>
        )}
      </form>
    </FormProvider>
  );
};

export { UsernameStep };
