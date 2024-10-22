// src/features/auth/LoginForm.tsx

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "../../atoms/auth";
import { useSessionStorage } from "../../shared/hooks/useSessionStorage"; // named import로 수정

// LoginFormData 타입 정의
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

type LoginFormData = z.infer<typeof schema>;

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [storedEmail, setStoredEmail] = useSessionStorage("email", "");
  const [storedPassword, setStoredPassword] = useSessionStorage("password", "");
  const navigate = useNavigate();

  const mockUserData = {
    email: "user@example.com",
    password: "Test@1234",
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    setStoredEmail(email);
    setStoredPassword(password);
  }, [email, password, setStoredEmail, setStoredPassword]);

  useEffect(() => {
    setValue("email", storedEmail);
    setValue("password", storedPassword);
  }, [setValue, storedEmail, storedPassword]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const sanitizedEmail = sanitizeHtml(data.email);
      const sanitizedPassword = sanitizeHtml(data.password);

      if (
        sanitizedEmail === mockUserData.email &&
        sanitizedPassword === mockUserData.password
      ) {
        setErrorMessage(null);
        setIsLoggedIn(true);
        onLogin();
        navigate("/main");
      } else {
        throw new Error("이메일 또는 비밀번호가 잘못되었습니다.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
      }
      setShowModal(true);
      setIsLoggedIn(false);
      setStoredEmail("");
      setStoredPassword("");
      setValue("email", "");
      setValue("password", "");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="relative">
      <div
        className={`mt-6 flex items-start justify-center ${showModal ? "blur-md" : ""}`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center w-[498px] h-[723px] p-6 border"
        >
          <h1 className="mb-4 text-2xl font-bold text-center">
            덕업일치 계정으로 로그인해주세요.
          </h1>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm">
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
              <p className="mt-1 text-sm text-red-500">
                {errors.email?.message?.toString()}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm">
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
              <p className="mt-1 text-sm text-red-500">
                {errors.password?.message?.toString()}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-gradient-to-r from-pink-400 to-orange-400"
          >
            로그인
          </button>

          <p className="mt-6 text-center">비밀번호를 잊어버리셨나요?</p>
          <p className="mt-12 text-center">
            아직 계정이 없다면?{" "}
            <a href="#" className="font-semibold text-pink-500">
              덕업일치 계정으로 가입하기
            </a>
          </p>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded shadow-lg text-center">
            <h2 className="mb-4 text-red-500">로그인 실패</h2>
            <p>{errorMessage}</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 mt-4 text-white bg-gray-800 rounded"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { LoginForm };
