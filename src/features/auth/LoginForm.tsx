// src/features/auth/LoginForm.tsx

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import axios from "axios";
import axiosInstance from "../../shared/services/axiosInstance";
import { useSessionStorage } from "../../shared/hooks/useSessionStorage";

// 로그인 폼 컴포넌트에 전달할 Props 타입 정의
interface LoginFormProps {
  // 로그인 성공 시 호출될 함수
  onLogin: () => void;
}

// 로그인 입력값 유효성 검사 스키마 정의
const schema = z.object({
  email: z.string().email({ message: "유효한 이메일을 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
    .max(32, { message: "비밀번호는 최대 32자까지만 가능합니다." })
    .regex(/[a-zA-Z]/, "비밀번호에는 영문자가 포함되어야 합니다.")
    .regex(/[0-9]/, "비밀번호에는 숫자가 포함되어야 합니다.")
    .regex(/[\W_]/, "비밀번호에는 특수문자가 포함되어야 합니다."),
});

// 유효성 검사 스키마 타입 추론
type LoginFormData = z.infer<typeof schema>;

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
    resolver: zodResolver(schema),
    mode: "onBlur", // 포커스를 잃었을 때 유효성 검사
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

  // 서버 응답에 따른 에러 메시지 처리 함수
  const handleErrorResponse = (statusCode: number) => {
    switch (statusCode) {
      case 404:
        return "존재하지 않는 계정입니다.";
      case 401:
        return "비밀번호가 틀렸습니다. 다시 확인해주세요.";
      default:
        return "서버 오류가 발생했습니다.";
    }
  };

  // 폼 제출 시 호출되는 함수
  const onSubmit = async (data: LoginFormData) => {
    try {
      // 데이터 정화 - 해커들아 혼난다.
      const sanitizedEmail = sanitizeHtml(data.email);
      const sanitizedPassword = sanitizeHtml(data.password);

      // 로그인 요청
      const loginResponse = await axiosInstance.post("/login", {
        email: sanitizedEmail,
        password: sanitizedPassword,
      });

      // 로그인 성공 시 토큰 저장
      if (loginResponse.status === 200) {
        localStorage.setItem("token", loginResponse.data.token);
        // 에러 메시지 & 세션 스토리지 초기화
        setErrorMessage(null);
        setStoredEmail("");
        setStoredPassword("");
        // 로그인 성공 시 호출
        onLogin();
        navigate("/main");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // 서버 응답에 따른 메시지 설정
        setErrorMessage(handleErrorResponse(error.response.status));
      } else if (error instanceof Error) {
        // 일반적인 에러 메시지 설정
        setErrorMessage(error.message);
      } else {
        // 기타 에러 메시지
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
      }
      setShowModal(true);
      setStoredEmail("");
      setStoredPassword("");
      // 입력 필드 초기화
      setValue("email", "");
      setValue("password", "");
    }
  };

  // 모달 닫기 함수
  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <div className="relative">
      <div
        className={`flex justify-center items-start mt-6 ${showModal ? "blur-md" : ""}`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[498px] h-[723px] border p-6 flex flex-col justify-center"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">
            덕업일치 계정으로 로그인해주세요.
          </h1>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm mb-2">
              이메일
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full p-2 border"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm mb-2">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="w-full p-2 border"
              placeholder="비밀번호"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

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
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-red-500 mb-4">로그인 실패</h2>
            <p>{errorMessage}</p>
            <button
              onClick={closeModal}
              className="mt-4 py-2 px-4 bg-gray-800 text-white rounded"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// React.memo로 컴포넌트 감싸기 및 displayName 설정
export const LoginForm = React.memo(LoginFormComponent);
LoginForm.displayName = "LoginForm";
