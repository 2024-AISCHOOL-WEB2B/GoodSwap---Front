// src/features/auth/LoginForm.tsx

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "../../shared/hooks";
import { loginSchema } from "../../entities";
import { Modal, FormLayout } from "../../widgets";
import { submitLoginForm } from "./utils";
import { EmailField, PasswordField } from "../../shared/components";
import { MultiStepForm } from "./MultiStepForm";

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
  // 회원가입 폼 표시 상태
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  // 세션 스토리지에서 이메일 & 비밀번호 가져오기
  const [storedEmail, setStoredEmail] = useSessionStorage("email", "");
  const [storedPassword, setStoredPassword] = useSessionStorage("password", "");
  // 페이지 이동을 위한 navigate 훅
  const navigate = useNavigate();

  // RHF(React Hook Form)을 이용한 폼 관리
  const {
    register,
    handleSubmit,
    setValue,
    watch, // useWatch로 대체 대부분은 useWatch 사용
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
  const isFirstRender = useRef(true); // useLayoutEffect를 사용해보고 로직을 조금 더 단순화 해보자.
 // useRef를 사용하면 리엑트 life cycle 무시하게 된다. -- 지양하자.

  // 컴포넌트가 처음 렌더링 될 때, 세션 스토리지에서 값 불러오기
  useEffect(() => {
    // early return를 사용해서 if 중첩문 줄이기. 가독성도 높아짐
    if (!isFirstRender.current) return

    // 세션에 저장된 값을 폼에 설정
    if (storedEmail) {
      setValue("email", storedEmail);
    }
    if (storedPassword) {
      setValue("password", storedPassword);
    }
    isFirstRender.current = false; // 첫 렌더링 체크 업데이트

  }, [setValue, storedEmail, storedPassword]);

  // 입력값이 변경될 때 세션 스토리지에 저장
  useEffect(() => {
    if (!isFirstRender.current) {
      // 스토리지 업데이트
      setStoredEmail(email);
      setStoredPassword(password);
    }
  }, [email, password, setStoredEmail, setStoredPassword]);

  // 폼 필드와 세션 스토리지를 초기화하는 함수
  const resetForm = useCallback(() => {
    setStoredEmail(""); // 세션 스토리지의 이메일 초기화
    setStoredPassword(""); // 세션 스토리지의 비밀번호 초기화
    setValue("email", ""); // 폼 필드 초기화
    setValue("password", ""); // 폼 필드 초기화
  }, [setStoredEmail, setStoredPassword, setValue]);

  // 폼 제출 시 호출되는 함수
  const onSubmit = async (data: LoginFormData) => {
    submitLoginForm(
      data.email,
      data.password,
      () => {
        setErrorMessage(null);
        resetForm();
        onLogin();
        navigate("/main");
      },
      (errorMessage) => {
        setErrorMessage(errorMessage);
        // 오류 모달 표시
        setShowModal(true);
        resetForm();
      }
    );
  };

  // 모달 닫기 함수
  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  // 회원가입 폼 표시 상태를 업데이트하는 함수
const handleSignUpClick = useCallback(() => {
  setShowSignUpForm(true); // 회원가입 폼을 표시하도록 상태 업데이트
}, []);

  return (
    <FormLayout title={showSignUpForm ? "회원가입" : "덕업일치 계정을 로그인해주세요."}>
      {showSignUpForm ? ( 
        <MultiStepForm /> // 회원가입 멀티스텝 폼 렌더링
      ) : (
        // 컨벤션 더 쪼개보자.
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailField
          register={register("email")} // 이메일 필드 등록
          errorMessage={errors.email?.message} // 이메일 필드 오류 메시지 표시
        />
        <PasswordField
          register={register("password")} // 비밀번호 필드 등록
          errorMessage={errors.password?.message} // 비밀번호 필드의 오류 메시지 표시
        />

        <SubmitButton />
        <ForgotPasswordText />
        <SignUpLink onClick={handleSignUpClick} />
      </form>
      )}
      
      {showModal && (
        <Modal isVisible={showModal} onClose={closeModal}>
          <h2 className="text-red-500 mb-4">로그인 실패</h2>
          <p>{errorMessage}</p>
        </Modal>
      )}
    </FormLayout>
  );
};

// 제출 버튼 컴포넌트
const SubmitButton = () => (
  <button
    type="submit"
    className="w-full py-2 bg-gradient-to-r from-pink-400 to-orange-400 text-white font-semibold"
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
      className="text-pink-500 font-semibold"
    >
      덕업일치 계정으로 가입하기
    </a>
  </p>
);

// React.memo로 컴포넌트 감싸기 및 displayName 설정
export const LoginForm = React.memo(LoginFormComponent);
LoginForm.displayName = "LoginForm";
