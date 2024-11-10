// src/features/auth/components/LoginForm.tsx

import React, { useState, useLayoutEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { loginSchema, LoginSchema } from "../entities/UserSchema";
import { Modal } from "../../../widgets/Modal";
import { FormLayout } from "../../../widgets/FormLayout";
import { submitLoginForm } from "../utils/formHandlers";
import { EmailField } from "../shared/EmailField";
import { PasswordField } from "../shared/PasswordField";

// 로그인 폼 컴포넌트에 전달할 Props 타입 정의
type LoginFormProps = {
  // 로그인 성공 시 호출될 함수
  onLogin: () => void;
};

// 로그인 폼 컴포넌트 정의
const LoginFormComponent: React.FC<LoginFormProps> = ({ onLogin }) => {
  // 에러 메시지 상태
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // 모달 표시 상태
  const [showModal, setShowModal] = useState(false);

  // 제목을 상수로 직접 설정
  const title = "덕업일치 계정을 로그인해주세요.";

  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅

  // React Hook Form 설정 및 유효성 검사 설정
  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema), // Zod 스키마를 사용한 유효성 검사 설정
    mode: "onChange",
    defaultValues: {
      email: "", // undefined 방지를 위해 빈 문자열로 기본값 설정
      password: "",
    },
  });

  const { handleSubmit } = methods;

  // 입력 필드를 초기화하는 함수, 로그인 실패 시 호출됨
  const resetForm = () => {
    methods.reset(); // 폼 전체 초기화
  };

  // 폼 제출 시 호출되는 함수, 로그인 성공 및 실패 처리 로직 포함
  const onSubmit = async (data: LoginSchema) => {
    submitLoginForm(
      data.email,
      data.password,
      () => {
        setErrorMessage(null); // 에러 메시지 초기화
        resetForm(); // 폼 초기화
        onLogin(); // 로그인 성공 콜백 호출
        navigate("/main"); // 메인 페이지로 이동
      },
      (errorMessage) => {
        setErrorMessage(errorMessage); // 에러 메시지 설정
        setShowModal(true); // 오류 모달 표시
        resetForm(); // 로그인 실패 시 폼 초기화
      }
    );
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setShowModal(false);
    resetForm(); // 모달이 닫힐 때 폼 초기화
  };

  // 회원가입 폼 표시 상태를 업데이트하는 함수
  const handleSignUpClick = () => {
    navigate("/signup"); // 회원가입 경로로 URL 이동
  };

  // 전체 배경색을 렌더링 전에 설정
  useLayoutEffect(() => {
    document.documentElement.style.backgroundColor = "rgb(250, 250, 250)";
    document.body.style.backgroundColor = "rgb(250, 250, 250)";

    return () => {
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <FormProvider {...methods}>
      <FormLayout title={title}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <EmailField />
          <PasswordField name="password" />

          <SubmitButton />
          <ForgotPasswordText />
          <SignUpLink onClick={handleSignUpClick} />
        </form>

        {showModal && (
          <Modal isVisible={showModal} onClose={closeModal}>
            <h2 className="text-red-500 mb-4">로그인 실패</h2>
            <p>{errorMessage}</p>
          </Modal>
        )}
      </FormLayout>
    </FormProvider>
  );
};

// 제출 버튼 컴포넌트
const SubmitButton = () => (
  <button
    type="submit"
    className="w-full py-2 bg-gradient-to-r from-custom_magenta to-custom_appricot text-white font-semibold rounded"
  >
    로그인
  </button>
);

// 비밀번호 찾기 텍스트 컴포넌트
const ForgotPasswordText = () => (
  <p className="text-center mt-6">비밀번호를 잊어버리셨나요?</p>
);

// 회원가입 링크 컴포넌트
const SignUpLink: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <p className="text-center mt-12">
    아직 계정이 없다면?{" "}
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="text-custom_magenta font-semibold"
    >
      덕업일치 계정으로 가입하기
    </a>
  </p>
);

// React.memo로 컴포넌트 감싸기 및 displayName 설정
export const LoginForm = React.memo(LoginFormComponent);
LoginForm.displayName = "LoginForm";
