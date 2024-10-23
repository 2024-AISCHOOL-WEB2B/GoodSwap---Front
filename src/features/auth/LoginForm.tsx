// src/features/auth/LoginForm.tsx

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "../../shared/hooks/useSessionStorage";
import { loginSchema } from "../../entities/UserSchema";
import { Modal } from "../../widgets/Modal";
import { FormLayout } from "../../widgets/FormLayout";
import { submitLoginForm } from "./utils/formHandlers";
import { EmailField } from "./components/EmailField";
import { PasswordField } from "./components/PasswordField";

// 로그인 폼 컴포넌트에 전달할 Props 타입 정의
interface LoginFormProps {
  // 로그인 성공 시 호출될 함수
  onLogin: () => void;
}

// 유효성 검사 스키마 타입 추론
type LoginFormData = z.infer<typeof loginSchema>;

// 로그인 폼 컴포넌트 정의
const LoginFormComponent: React.FC<LoginFormProps> = ({ onLogin }) => {
  // 에러 메시지 상태
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // 모달 표시 상태
  const [showModal, setShowModal] = useState(false);
  // 세션 스토리지에서 이메일 & 비밀번호 가져오기
  const [storedEmail, setStoredEmail] = useSessionStorage("email", "");
  const [storedPassword, setStoredPassword] = useSessionStorage("password", "");
  // 페이지 이동을 위한 navigate 훅
  const navigate = useNavigate();

  // RHF을 이용한 폼 관리
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    // 입력창 필드 유효성 검사 스키마 설정
    resolver: zodResolver(loginSchema),
    mode: "onChange", // 입력된 값이 변경될 때마다 유효성 검사
  });

  // 입력값 감지
  const email = watch("email");
  const password = watch("password");
  // 첫 랜더링 여부 체크
  const isFirstRender = useRef(true);

  // 컴포넌트가 처음 렌더링 될 때, 세션 스토리지에서 값 불러오기
  useEffect(() => {
    if (isFirstRender.current) {
      if (storedEmail) {
        setValue("email", storedEmail);
      }
      if (storedPassword) {
        setValue("password", storedPassword);
      }
      isFirstRender.current = false; // 첫 렌더링 체크 업데이트
    }
  }, [setValue, storedEmail, storedPassword]);

  // 입력값이 변경될 때 세션 스토리지에 저장
  useEffect(() => {
    if (!isFirstRender.current) {
      // 스토리지 업데이트
      setStoredEmail(email);
      setStoredPassword(password);
    }
  }, [email, password, setStoredEmail, setStoredPassword]);

  // 폼 제출 시 호출되는 함수
  const onSubmit = async (data: LoginFormData) => {
    submitLoginForm(
      data.email,
      data.password,
      () => {
        setErrorMessage(null);
        setStoredEmail("");
        setStoredPassword("");
        onLogin();
        navigate("/main");
      },
      (errorMessage) => {
        setErrorMessage(errorMessage);
        setShowModal(true);
        setStoredEmail("");
        setStoredPassword("");
        setValue("email", "");
        setValue("password", "");
      }
    );
  };

  // 모달 닫기 함수
  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <FormLayout title="덕업일치 계정을 로그인해주세요.">
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailField
          register={register("email")}
          errorMessage={errors.email?.message}
        />
        <PasswordField
          register={register("password")}
          errorMessage={errors.password?.message}
        />

        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-pink-400 to-orange-400 text-white font-semibold"
        >
          로그인
        </button>

        <p className="text-center mt-6">비밀번호를 잊어버리셨나요?</p>
        <p className="text-center mt-12">
          아직 계정이 없다면?{" "}
          <a href="#" className="text-pink-500 font-semibold">
            덕업일치 계정으로 가입하기
          </a>
        </p>
      </form>

      {showModal && (
        <Modal isVisible={showModal} onClose={closeModal}>
          <h2 className="text-red-500 mb-4">로그인 실패</h2>
          <p>{errorMessage}</p>
        </Modal>
      )}
    </FormLayout>
  );
};

// React.memo로 컴포넌트 감싸기 및 displayName 설정
export const LoginForm = React.memo(LoginFormComponent);
LoginForm.displayName = "LoginForm";
